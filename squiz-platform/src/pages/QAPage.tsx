import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { useQAQuestions } from '@/hooks/useQA'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select'
import { Badge } from '@/components/ui/Badge'
import { QAPostSkeleton } from '@/components/ui/Skeleton'
import { QueryErrorFallback } from '@/components/ui/ErrorBoundary'
import { EmptyState } from '@/components/ui/EmptyState'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { motion } from 'framer-motion'
import { Search, Plus, MessageSquare, Eye, ArrowUp, ArrowDown, CheckCircle, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react'
import { formatDate } from '@/lib/utils'

export default function QAPage() {
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [sortBy, setSortBy] = useState<'recent' | 'votes' | 'unanswered'>('recent')
  const [currentPage, setCurrentPage] = useState(1)
  const questionsPerPage = 10
  
  const { data: questions = [], isLoading, error } = useQAQuestions(
    categoryFilter === 'all' ? undefined : categoryFilter,
    sortBy
  )

  const filteredQuestions = questions.filter(question => 
    question.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    question.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (question.tags && question.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
  )
  
  // Pagination calculations
  const totalPages = Math.ceil(filteredQuestions.length / questionsPerPage)
  const startIndex = (currentPage - 1) * questionsPerPage
  const endIndex = startIndex + questionsPerPage
  const currentQuestions = filteredQuestions.slice(startIndex, endIndex)
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  
  // Reset to page 1 when filters change
  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
    setCurrentPage(1)
  }
  
  const handleCategoryChange = (value: string) => {
    setCategoryFilter(value)
    setCurrentPage(1)
  }
  
  const handleSortChange = (value: 'recent' | 'votes' | 'unanswered') => {
    setSortBy(value)
    setCurrentPage(1)
  }

  const categories = [
    'Riyaziyyat', 'Tarix', 'Ədəbiyyat', 'Coğrafiya', 'Biologiya', 
    'Fizika', 'Kimya', 'İnformatika', 'Xarici dil', 'Ümumi'
  ]

  const getDisplayName = (author: any) => {
    if (!author) return 'Anonim'
    if (author.is_private) return 'Abituriyent'
    return author.full_name || 'Abituriyent'
  }

  return (
    <PageWrapper
      title="Sual-Cavab"
      description="Suallarınızı soruşun, cavablar tapın və bilik paylaşın"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              Sual-Cavab
            </h1>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Suallarınızı soruşun, cavablar tapın və bilik paylaşın
            </p>
          </div>
          <Link to="/qa/create">
            <Button size="lg" className="space-x-2">
              <Plus className="h-4 w-4" />
              <span>Sual ver</span>
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
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
              <div className="relative flex-1 sm:flex-2">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                  placeholder="Sualları axtarın..."
                  value={searchTerm}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="pl-10 w-full"
                />
              </div>
              
              <Select value={categoryFilter} onValueChange={handleCategoryChange}>
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
              
              <Select value={sortBy} onValueChange={(value: any) => handleSortChange(value)}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Sırala" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Ən yeni</SelectItem>
                  <SelectItem value="votes">Ən çox səs</SelectItem>
                  <SelectItem value="unanswered">Cavabsız</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Questions List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <QAPostSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <QueryErrorFallback 
            error={error as Error}
            title="Failed to load questions"
            description="We couldn't load the questions. Please check your connection and try again."
          />
        ) : filteredQuestions.length > 0 ? (
          <>
            <div className="space-y-4">
              {currentQuestions.map((question, index) => (
                <motion.div
                  key={question.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card className="card-hover">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        {/* Vote Score & Stats */}
                        <div className="flex flex-col items-center space-y-2 text-center min-w-[60px]">
                          <div className="flex items-center space-x-1 text-sm">
                            <ArrowUp className="h-3 w-3 text-green-600" />
                            <span className="font-medium text-slate-900 dark:text-white">
                              {question.votes_score}
                            </span>
                            <ArrowDown className="h-3 w-3 text-red-600" />
                          </div>
                          
                          {question.is_answered && (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          )}
                          
                          <div className="flex items-center space-x-1 text-xs text-slate-500">
                            <Eye className="h-3 w-3" />
                            <span>{question.views}</span>
                          </div>
                        </div>
                        
                        {/* Question Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-3">
                            <Link 
                              to={`/qa/${question.id}`}
                              className="font-semibold text-lg text-slate-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors line-clamp-2"
                            >
                              {question.title}
                            </Link>
                          </div>
                          
                          <p className="text-slate-600 dark:text-slate-400 line-clamp-2 mb-4">
                            {question.content.substring(0, 200)}...
                          </p>
                          
                          {/* Tags */}
                          {question.tags && question.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-4">
                              {question.tags.slice(0, 5).map((tag, tagIndex) => (
                                <Badge key={tagIndex} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                              {question.tags.length > 5 && (
                                <Badge variant="outline" className="text-xs">
                                  +{question.tags.length - 5}
                                </Badge>
                              )}
                            </div>
                          )}
                          
                          {/* Meta info */}
                          <div className="flex items-center justify-between text-sm text-slate-500">
                            <div className="flex items-center space-x-4">
                              <span>
                                {getDisplayName(question.author)}
                              </span>
                              <span>
                                {formatDate(question.created_at)}
                              </span>
                              {question.category && (
                                <Badge variant="outline" className="text-xs">
                                  {question.category}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-2 mt-8">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="flex items-center space-x-1"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>Əvvəlki</span>
                </Button>
                
                <div className="flex items-center space-x-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const pageNum = i + 1
                    return (
                      <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? "default" : "outline"}
                        size="sm"
                        onClick={() => handlePageChange(pageNum)}
                        className="min-w-[40px]"
                      >
                        {pageNum}
                      </Button>
                    )
                  })}
                  
                  {totalPages > 5 && currentPage < totalPages - 2 && (
                    <>
                      <span className="text-slate-500">...</span>
                      <Button
                        variant={currentPage === totalPages ? "default" : "outline"}
                        size="sm"
                        onClick={() => handlePageChange(totalPages)}
                        className="min-w-[40px]"
                      >
                        {totalPages}
                      </Button>
                    </>
                  )}
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="flex items-center space-x-1"
                >
                  <span>Növbəti</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </>
        ) : (
          <EmptyState
            icon={MessageSquare}
            title="Sual tapılmadı"
            description={searchTerm || categoryFilter !== 'all' 
              ? 'Axtarış meyarlarınıza uyğun sual yoxdur. Filtrləri dəyişdirməyi sınayın.'
              : 'Hələ ki sual yoxdur. İlk sualı sən ver və icmanın böyüməsinə kömək et!'}
            action={user ? {
              label: 'Sual ver',
              onClick: () => window.location.href = '/qa/create',
              icon: Plus
            } : {
              label: 'Giriş et',
              onClick: () => window.location.href = '/login',
              icon: MessageSquare
            }}
          />
        )}
      </motion.div>
    </PageWrapper>
  )
}
