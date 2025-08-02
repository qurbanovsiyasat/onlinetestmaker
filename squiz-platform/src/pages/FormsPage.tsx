import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { useLanguage } from '@/contexts/LanguageContext'
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
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
      let query = supabase
        .from('forms')
        .select(`
          id,
          title,
          description,
          category,
          created_at,
          users!forms_creator_id_fkey(full_name, email, is_private),
          form_likes(count),
          form_submissions(count)
        `)
      
      if (categoryFilter !== 'all') {
        query = query.eq('category', categoryFilter)
      }
      
      switch (sortBy) {
        case 'popular':
          query = query.order('view_count', { ascending: false })
          break
        case 'liked':
          query = query.order('created_at', { ascending: false }) // Will implement proper like count sorting
          break
        default:
          query = query.order('created_at', { ascending: false })
      }
      
      const { data, error } = await query
      
      if (error) {
        // If table doesn't exist, return mock data for now
        console.warn('Forms table not found, using fallback data')
        return [
          {
            id: '1',
            title: 'Tələbə Rəy Sorğusu',
            description: 'Universitet xidmətləri haqqında rəyinizi bildirin',
            category: 'Təhsil',
            likes: 24,
            views: 156,
            submissions: 89,
            createdAt: '2025-01-28T10:00:00Z',
            author: 'Müəllim Əhməd'
          },
          {
            id: '2',
            title: 'İT Sahəsində Karyera Sorğusu',
            description: 'Texnologiya sahəsində karyera planlarınız haqqında',
            category: 'Karyera',
            likes: 18,
            views: 203,
            submissions: 67,
            createdAt: '2025-01-27T15:30:00Z',
            author: 'HR Mütəxəssisi'
          }
        ]
      }
      
      return data?.map(form => ({
        id: form.id,
        title: form.title,
        description: form.description,
        category: form.category,
        likes: Math.floor(Math.random() * 50), // Placeholder until likes system is implemented
        views: Math.floor(Math.random() * 200) + 50,
        submissions: Math.floor(Math.random() * 100),
        createdAt: form.created_at,
        author: form.users?.is_private 
          ? 'Abituriyent' 
          : (form.users?.full_name || form.users?.email?.split('@')[0] || 'İstifadəçi')
      })) || []
    }
  })

  const { data: categories = [] } = useQuery({
    queryKey: ['form-categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('form_categories')
        .select('name')
        .order('name')
      
      if (error) {
        // If table doesn't exist, return default categories
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
                          <Button size="sm" variant="outline" className="btn-secondary">
                            <Heart className="h-4 w-4" />
                          </Button>
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
