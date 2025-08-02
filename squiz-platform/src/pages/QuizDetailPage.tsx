import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useQuiz, useDeleteQuiz, useIncrementQuizViewCount, useVerifyQuizAccess } from '@/hooks/useQuiz'
import { useAuth } from '@/contexts/AuthContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { 
  Play, 
  Edit3, 
  Trash2, 
  Share2, 
  Clock, 
  BookOpen, 
  Users, 
  ArrowLeft,
  AlertTriangle,
  CheckCircle,
  Trophy,
  Calendar,
  Tag,
  Loader2,
  Eye
} from 'lucide-react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { formatDate, getDifficultyColor } from '@/lib/utils'
import { cn } from '@/lib/utils'
import { supabase } from '@/lib/supabase'
import LoadingPage from './LoadingPage'

export default function QuizDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { data: quiz, isLoading, error } = useQuiz(id!)
  const deleteQuizMutation = useDeleteQuiz()
  const incrementViewMutation = useIncrementQuizViewCount()
  const verifyAccessMutation = useVerifyQuizAccess()
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [showAccessCodeModal, setShowAccessCodeModal] = useState(false)
  const [accessCode, setAccessCode] = useState('')
  const [participantsCount, setParticipantsCount] = useState(0)

  const canEdit = user && quiz && (user.role === 'admin' || user.id === quiz.creator_id)
  const canDelete = user && quiz && (user.role === 'admin' || user.id === quiz.creator_id)

  // Increment view count and fetch participants when quiz is loaded
  useEffect(() => {
    if (quiz && id) {
      incrementViewMutation.mutate(id)
      fetchParticipantsCount()
    }
  }, [quiz, id])

  // Fetch participants count
  const fetchParticipantsCount = async () => {
    if (!id) return
    try {
      const { data, error } = await supabase
        .from('quiz_results')
        .select('user_id', { count: 'exact', head: true })
        .eq('quiz_id', id)
      
      if (!error && data) {
        setParticipantsCount(data.length || 0)
      }
    } catch (error) {
      console.error('Error fetching participants:', error)
    }
  }

  const handleStartQuiz = () => {
    if (!quiz?.questions || quiz.questions.length === 0) {
      toast.error('This quiz has no questions')
      return
    }
    
    // Check if quiz requires access code
    if (!quiz.is_public && quiz.access_code) {
      setShowAccessCodeModal(true)
      return
    }
    
    navigate(`/quizzes/${id}/take`)
  }

  const handleVerifyAccessCode = async () => {
    if (!quiz || !id) return
    
    try {
      await verifyAccessMutation.mutateAsync({
        quizId: id,
        accessCode: accessCode.trim()
      })
      
      setShowAccessCodeModal(false)
      setAccessCode('')
      navigate(`/quizzes/${id}/take`)
    } catch (error) {
      toast.error('Invalid access code')
    }
  }

  const handleShareQuiz = () => {
    const shareUrl = `${window.location.origin}/quizzes/${id}`
    const shareText = `Check out this quiz: ${quiz?.title}`
    
    if (navigator.share) {
      navigator.share({
        title: quiz?.title,
        text: shareText,
        url: shareUrl
      })
    } else {
      navigator.clipboard.writeText(shareUrl)
      toast.success('Quiz link copied!')
    }
  }

  const handleDeleteQuiz = async () => {
    if (!quiz || !canDelete || !id) return
    
    try {
      await deleteQuizMutation.mutateAsync(id)
      toast.success('Quiz deleted successfully')
      navigate('/quizzes')
    } catch (error) {
      console.error('Delete quiz error:', error)
      toast.error('Failed to delete quiz')
    } finally {
      setShowDeleteConfirm(false)
    }
  }

  if (isLoading) return <LoadingPage />
  
  if (error || !quiz) {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <Card>
          <CardContent className="pt-6">
            <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-lg font-semibold mb-2">Quiz Not Found</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              This quiz does not exist or you don't have access to it.
            </p>
            <Button onClick={() => navigate('/quizzes')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Quiz List
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const hasQuestions = quiz.questions && quiz.questions.length > 0
  const difficultyLabel = quiz.difficulty === 'easy' ? 'Easy' : 
                         quiz.difficulty === 'medium' ? 'Medium' : 'Hard'

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <Button 
          variant="outline" 
          onClick={() => navigate('/quizzes')}
          className="w-full sm:w-auto"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Quiz List
        </Button>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={handleShareQuiz}>
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          {canEdit && (
            <Button variant="outline" onClick={() => navigate(`/quizzes/${id}/edit`)}>
              <Edit3 className="h-4 w-4 mr-2" />
              Edit
            </Button>
          )}
          {canDelete && (
            <Button 
              variant="destructive" 
              onClick={() => setShowDeleteConfirm(true)}
              disabled={deleteQuizMutation.isPending}
            >
              {deleteQuizMutation.isPending ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Trash2 className="h-4 w-4 mr-2" />
              )}
              Delete
            </Button>
          )}
        </div>
      </div>

      {/* Main Quiz Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              <div className="flex-1">
                <CardTitle className="text-2xl sm:text-3xl lg:text-4xl mb-2">
                  {quiz.title}
                </CardTitle>
                <CardDescription className="text-base lg:text-lg">
                  {quiz.description || 'No description provided'}
                </CardDescription>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {quiz.category && (
                    <Badge variant="secondary" className="flex items-center space-x-1">
                      <Tag className="h-3 w-3" />
                      <span>{quiz.category}</span>
                    </Badge>
                  )}
                  <Badge className={getDifficultyColor(quiz.difficulty)}>
                    {difficultyLabel}
                  </Badge>
                  {quiz.is_public ? (
                    <Badge variant="outline">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Public
                    </Badge>
                  ) : (
                    <Badge variant="secondary">
                      Private
                    </Badge>
                  )}
                </div>
              </div>
              
              {/* Start Quiz Button */}
              <div className="lg:ml-6">
                <Button 
                  size="lg" 
                  onClick={handleStartQuiz}
                  disabled={!hasQuestions}
                  className="w-full lg:w-auto px-8 py-3"
                >
                  <Play className="h-5 w-5 mr-2" />
                  Start Quiz
                </Button>
                {!hasQuestions && (
                  <p className="text-sm text-red-600 dark:text-red-400 mt-2 text-center lg:text-left">
                    This quiz has no questions yet
                  </p>
                )}
              </div>
            </div>
          </CardHeader>
        </Card>
      </motion.div>

      {/* Quiz Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    Questions
                  </p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">
                    {quiz.questions?.length || 0}
                  </p>
                </div>
                <BookOpen className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    Time Limit
                  </p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">
                    {quiz.time_limit ? `${quiz.time_limit}m` : 'Unlimited'}
                  </p>
                </div>
                <Clock className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    Max Attempts
                  </p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">
                    {quiz.max_attempts || 'Unlimited'}
                  </p>
                </div>
                <Trophy className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    Views
                  </p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">
                    {quiz.view_count || 0}
                  </p>
                </div>
                <Eye className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    Participants
                  </p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">
                    {participantsCount}
                  </p>
                </div>
                <Users className="h-8 w-8 text-orange-600 dark:text-orange-400" />
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* Questions Preview */}
      {hasQuestions && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5" />
                <span>Sual Önizləməsi</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {quiz.questions.slice(0, 3).map((question, index) => (
                  <div key={question.id} className="border border-slate-200 dark:border-slate-700 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-slate-900 dark:text-white">
                          Sual {index + 1}
                        </h4>
                        <p className="text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">
                          {question.question_text}
                        </p>
                      </div>
                      <Badge variant="outline" className="ml-4">
                        {question.points || 1} xal
                      </Badge>
                    </div>
                  </div>
                ))}
                
                {quiz.questions.length > 3 && (
                  <div className="text-center">
                    <p className="text-slate-600 dark:text-slate-400">
                      Və daha {quiz.questions.length - 3} sual...
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Quiz Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Additional Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-slate-900 dark:text-white mb-2">
                  Yaradma Məlumatı
                </h4>
                <div className="space-y-2 text-sm">
                  <p className="text-slate-600 dark:text-slate-400">
                    Yaradılıb: {formatDate(quiz.created_at)}
                  </p>
                  <p className="text-slate-600 dark:text-slate-400">
                    Son dəyişik: {formatDate(quiz.updated_at)}
                  </p>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-slate-900 dark:text-white mb-2">
                  Quiz Qaydaları
                </h4>
                <div className="space-y-2 text-sm">
                  <p className="text-slate-600 dark:text-slate-400">
                    • Hər sual üçün tək cavab seçin
                  </p>
                  <p className="text-slate-600 dark:text-slate-400">
                    • Vaxt bitdikdə avtomatik təqdim olunur
                  </p>
                  <p className="text-slate-600 dark:text-slate-400">
                    • Nəticələr dərhal göstərilir
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-slate-800 rounded-lg p-6 max-w-md w-full"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                Quizi Sil
              </h3>
            </div>
            
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              "{quiz.title}" quizini silmək istədiyinizə əminsiniz? Bu əməliyyat geri alına bilməz və bütün nəticələr silinəcək.
            </p>
            
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1"
                disabled={deleteQuizMutation.isPending}
              >
                Ləğv et
              </Button>
              <Button
                variant="destructive"
                onClick={handleDeleteQuiz}
                disabled={deleteQuizMutation.isPending}
                className="flex-1"
              >
                {deleteQuizMutation.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Silinir...
                  </>
                ) : (
                  'Sil'
                )}
              </Button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Access Code Modal */}
      {showAccessCodeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-slate-800 rounded-lg p-6 max-w-md w-full"
          >
            <h3 className="text-lg font-semibold mb-4">Enter Access Code</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              This quiz is private. Please enter the access code to continue.
            </p>
            <div className="space-y-4">
              <div>
                <Label htmlFor="access-code">Access Code</Label>
                <Input
                  id="access-code"
                  type="text"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  placeholder="Enter access code"
                  className="mt-1"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleVerifyAccessCode()
                    }
                  }}
                />
              </div>
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowAccessCodeModal(false)
                    setAccessCode('')
                  }}
                  className="flex-1"
                  disabled={verifyAccessMutation.isPending}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleVerifyAccessCode}
                  disabled={verifyAccessMutation.isPending || !accessCode.trim()}
                  className="flex-1"
                >
                  {verifyAccessMutation.isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    'Continue'
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}