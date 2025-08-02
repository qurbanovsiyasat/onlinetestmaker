import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { useLanguage } from '@/contexts/LanguageContext'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'
import { 
  Search, 
  Plus, 
  FileText, 
  Eye, 
  Heart, 
  MessageSquare, 
  Calendar, 
  Filter,
  Loader2
} from 'lucide-react'

// Like Button Component
function LikeButton({ contentType, contentId, likes }: { contentType: string; contentId: string; likes: number }) {
  const { user } = useAuth()
  const queryClient = useQueryClient()
  
  const { data: isLiked = false } = useQuery({
    queryKey: [`${contentType}-like-status`, contentId, user?.id],
    queryFn: async () => {
      if (!user) return false
      const { data, error } = await supabase
        .from(`${contentType}_likes`)
        .select('id')
        .eq(`${contentType}_id`, contentId)
        .eq('user_id', user.id)
        .maybeSingle()
      
      if (error) {
        console.error('Error checking like status:', error)
        return false
      }
      return !!data
    },
    enabled: !!user
  })

  const toggleLikeMutation = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error('User not authenticated')
      
      const { data, error } = await supabase.rpc('toggle_like', {
        content_type: contentType,
        content_id: contentId,
        user_id: user.id
      })
      
      if (error) throw error
      return data
    },
    onSuccess: (data) => {
      // Invalidate relevant queries to update UI
      queryClient.invalidateQueries({ queryKey: [`${contentType}s`] })
      queryClient.invalidateQueries({ queryKey: [`${contentType}-like-status`, contentId] })
    },
    onError: (error: any) => {
      console.error('Like toggle error:', error)
    }
  })

  const handleLike = () => {
    if (!user) {
      // Could show login modal or redirect to login
      return
    }
    toggleLikeMutation.mutate()
  }

  return (
    <Button
      size="sm"
      variant="outline"
      onClick={handleLike}
      disabled={toggleLikeMutation.isPending}
      className={`btn-secondary flex items-center space-x-1 ${
        isLiked ? 'text-red-600 bg-red-50 dark:bg-red-900/20' : ''
      }`}
    >
      <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
      <span>{likes}</span>
    </Button>
  )
}

export default function FormsPage() {
  const { user } = useAuth()
  const { t } = useLanguage()
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [sortBy, setSortBy] = useState<'recent' | 'popular' | 'liked'>('recent')

  // Real data fetching
  const { data: forms = [], isLoading, error } = useQuery({
    queryKey: ['forms', categoryFilter, sortBy],
    queryFn: async () => {
      // First, get forms data
      let query = supabase
        .from('forms')
        .select('id, title, description, category, created_at, creator_id, view_count, submission_count, likes_count')
      
      if (categoryFilter !== 'all') {
        query = query.eq('category', categoryFilter)
      }
      
      switch (sortBy) {
        case 'popular':
          query = query.order('view_count', { ascending: false })
          break
        case 'liked':
          query = query.order('likes_count', { ascending: false })
          break
        default:
          query = query.order('created_at', { ascending: false })
      }
      
      const { data: formsData, error } = await query
      
      if (error) {
        console.error('Error fetching forms:', error)
        throw error
      }
      
      if (!formsData || formsData.length === 0) {
        return []
      }
      
      // Manually fetch creator names (following Supabase best practices)
      const creatorIds = [...new Set(formsData.map(form => form.creator_id))]
      const { data: creators } = await supabase
        .from('users')
        .select('id, full_name, email, is_private')
        .in('id', creatorIds)
      
      // Map forms with creator data
      return formsData.map(form => {
        const creator = creators?.find(c => c.id === form.creator_id)
        const getDisplayName = () => {
          if (!creator) return 'İstifadəçi'
          if (creator.is_private) return 'Abituriyent'
          return creator.full_name || creator.email?.split('@')[0] || 'İstifadəçi'
        }
        
        return {
          id: form.id,
          title: form.title,
          description: form.description,
          category: form.category || 'Ümumi',
          likes: form.likes_count || 0,
          views: form.view_count || 0,
          submissions: form.submission_count || 0,
          createdAt: form.created_at,
          author: getDisplayName()
        }
      })
    }
  })

  const { data: categories = [] } = useQuery({
    queryKey: ['form-categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('form_categories')
        .select('name')
        .eq('is_active', true)
        .order('name')
      
      if (error) {
        console.error('Error fetching form categories:', error)
        // Return default categories if error
        return ['Təhsil', 'Karyera', 'Sağlamlıq', 'Texnologiya', 'Ümumi']
      }
      return data?.map(cat => cat.name) || ['Təhsil', 'Karyera', 'Sağlamlıq', 'Texnologiya', 'Ümumi']
    }
  })

  const filteredForms = forms.filter(form => 
    form.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    form.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-soft-grey p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-green-700 rounded-design-system flex items-center justify-center">
                <FileText className="h-6 w-6 text-pure-white" />
              </div>
              <div>
                <h1 className="text-page-title">Formlar</h1>
                <p className="text-body">Sorğular və rəy toplama formları</p>
              </div>
            </div>
            <Link to="/forms/create">
              <Button className="btn-primary space-x-2">
                <Plus className="h-4 w-4" />
                <span>Form Yarat</span>
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card className="card-modern">
            <CardContent className="p-6">
              <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-medium-grey h-4 w-4" />
                  <Input
                    placeholder="Formları axtarın..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 input-modern"
                  />
                </div>
                
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Kateqoriya" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Bütün kateqoriyalar</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Sırala" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Ən yeni</SelectItem>
                    <SelectItem value="popular">Ən populyar</SelectItem>
                    <SelectItem value="liked">Ən çox bəyənilən</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Forms Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <Card key={index} className="card-modern animate-pulse">
                  <CardHeader>
                    <div className="h-4 bg-light-grey rounded mb-2"></div>
                    <div className="h-3 bg-light-grey rounded w-2/3"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-20 bg-light-grey rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredForms.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredForms.map((form, index) => (
                <motion.div
                  key={form.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card className="card-modern hover:shadow-card-hover transition-all duration-300 group">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-section-title group-hover:text-vibrant-blue transition-colors">
                            <Link to={`/form/${form.id}`}>
                              {form.title}
                            </Link>
                          </CardTitle>
                          <CardDescription className="mt-2 text-body">
                            {form.description}
                          </CardDescription>
                        </div>
                        <Badge variant="outline" className="ml-2">
                          {form.category}
                        </Badge>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="space-y-4">
                        {/* Stats */}
                        <div className="flex items-center justify-between text-caption text-medium-grey">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                              <Eye className="h-3 w-3" />
                              <span>{form.views}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Heart className="h-3 w-3" />
                              <span>{form.likes}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MessageSquare className="h-3 w-3" />
                              <span>{form.submissions}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3" />
                            <span>{new Date(form.createdAt).toLocaleDateString('az-AZ')}</span>
                          </div>
                        </div>
                        
                        {/* Author */}
                        <div className="flex items-center justify-between">
                          <span className="text-caption text-medium-grey">
                            {form.author} tərəfindən
                          </span>
                        </div>
                        
                        {/* Actions */}
                        <div className="flex items-center space-x-2 pt-2">
                          <Button asChild size="sm" className="btn-primary flex-1">
                            <Link to={`/form/${form.id}`}>
                              <Eye className="h-4 w-4 mr-2" />
                              Bax
                            </Link>
                          </Button>
                          <LikeButton 
                            contentType="form"
                            contentId={form.id}
                            likes={form.likes}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <Card className="card-modern">
              <CardContent className="p-12 text-center">
                <FileText className="h-16 w-16 text-medium-grey mx-auto mb-4" />
                <h3 className="text-section-title text-dark-charcoal mb-2">Heç bir form tapılmadı</h3>
                <p className="text-body text-medium-grey mb-6">
                  {searchTerm ? `"${searchTerm}" axtarışına uyğun form yoxdur` : 'Hələ heç bir form yaradılmayıb'}
                </p>
                <Button asChild className="btn-primary">
                  <Link to="/forms/create">
                    <Plus className="h-4 w-4 mr-2" />
                    İlk Formu Yaradın
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  )
}
