import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { 
  useQAQuestion, 
  useQAAnswers, 
  useCreateQAAnswer, 
  useVoteQAQuestion,
  useVoteQAAnswer,
  useUserVote,
  useIncrementQuestionViews,
  useAcceptAnswer,
  QAAnswer
} from '@/hooks/useQA'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Textarea } from '@/components/ui/Textarea'
import { Badge } from '@/components/ui/Badge'
import { Separator } from '@/components/ui/Separator'
import { motion } from 'framer-motion'
import { 
  ArrowUp, 
  ArrowDown, 
  MessageSquare, 
  Eye, 
  CheckCircle, 
  User,
  Calendar,
  Reply,
  Save,
  Loader2,
  ArrowLeft
} from 'lucide-react'
import { formatDate } from '@/lib/utils'
import { toast } from 'sonner'

export default function QAQuestionPage() {
  const { id } = useParams<{ id: string }>()
  const { user } = useAuth()
  const [newAnswer, setNewAnswer] = useState('')
  const [replyTo, setReplyTo] = useState<string | null>(null)
  const [replyContent, setReplyContent] = useState('')
  
  const { data: question, isLoading: questionLoading } = useQAQuestion(id!)
  const { data: answers = [], isLoading: answersLoading } = useQAAnswers(id!)
  const createAnswerMutation = useCreateQAAnswer()
  const voteQuestionMutation = useVoteQAQuestion()
  const voteAnswerMutation = useVoteQAAnswer()
  const incrementViewsMutation = useIncrementQuestionViews()
  const acceptAnswerMutation = useAcceptAnswer()
  
  // Increment views when component mounts
  useEffect(() => {
    if (id) {
      incrementViewsMutation.mutate(id)
    }
  }, [id])

  const getDisplayName = (author: any) => {
    if (!author) return 'Anonim'
    if (author.is_private) return 'Abituriyent'
    return author.full_name || 'Abituriyent'
  }

  const handleCreateAnswer = async () => {
    if (!newAnswer.trim() || !id) return
    
    try {
      await createAnswerMutation.mutateAsync({
        content: newAnswer,
        question_id: id,
      })
      setNewAnswer('')
    } catch (error) {
      // Error handled in mutation
    }
  }

  const handleCreateReply = async (parentAnswerId: string) => {
    if (!replyContent.trim() || !id) return
    
    try {
      await createAnswerMutation.mutateAsync({
        content: replyContent,
        question_id: id,
        parent_answer_id: parentAnswerId,
      })
      setReplyContent('')
      setReplyTo(null)
    } catch (error) {
      // Error handled in mutation
    }
  }

  const handleVote = (voteType: 1 | -1, questionId?: string, answerId?: string) => {
    if (!user) {
      toast.error('Səs vermək üçün giriş edin')
      return
    }
    
    if (questionId) {
      voteQuestionMutation.mutate({
        questionId,
        voteType: voteType === 1 ? 'up' : 'down'
      })
    } else if (answerId && id) {
      voteAnswerMutation.mutate({
        answerId,
        questionId: id,
        voteType: voteType === 1 ? 'up' : 'down'
      })
    }
  }

  const handleAcceptAnswer = (answerId: string) => {
    if (!user || !question || question.author_id !== user.id) {
      toast.error('Yalnız sualın müəllifi cavabı qəbul edə bilər')
      return
    }
    
    acceptAnswerMutation.mutate({
      questionId: id!,
      answerId,
    })
  }

  if (questionLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-slate-600 dark:text-slate-400">Sual yüklənir...</p>
        </div>
      </div>
    )
  }

  if (!question) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 text-center">
            <h2 className="text-lg font-semibold mb-2">Sual tapılmadı</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Axtarılan sual mövcud deyil vəya silinib.
            </p>
            <Link to="/qa">
              <Button>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Sual-Cavaba qayıt
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 px-4 sm:px-6 lg:px-8">
      {/* Back Navigation */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Link 
          to="/qa" 
          className="inline-flex items-center text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Sual-Cavaba qayıt
        </Link>
      </motion.div>

      {/* Question */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <QuestionCard 
          question={question} 
          onVote={handleVote}
          getDisplayName={getDisplayName}
          currentUser={user}
        />
      </motion.div>

      {/* Answers */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            Cavablar ({answers.length})
          </h2>
          
          {answersLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="skeleton h-32 rounded-lg" />
              ))}
            </div>
          ) : answers.length > 0 ? (
            <div className="space-y-4">
              {answers.map((answer, index) => (
                <motion.div
                  key={answer.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <AnswerCard
                    answer={answer}
                    onVote={handleVote}
                    onReply={setReplyTo}
                    onAccept={handleAcceptAnswer}
                    getDisplayName={getDisplayName}
                    currentUser={user}
                    isQuestionAuthor={question.author_id === user?.id}
                    replyTo={replyTo}
                    replyContent={replyContent}
                    setReplyContent={setReplyContent}
                    onCreateReply={handleCreateReply}
                    createAnswerMutation={createAnswerMutation}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <MessageSquare className="h-12 w-12 text-slate-400 mx-auto mb-3" />
              <p className="text-slate-600 dark:text-slate-400">
                Hələ ki cavab yoxdur. İlk cavabı siz verin!
              </p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Answer Form */}
      {user && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Cavabınızı yazın</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Cavabınızı buraya yazın..."
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
                rows={6}
                className="min-h-[150px]"
              />
              <div className="flex justify-end">
                <Button 
                  onClick={handleCreateAnswer}
                  disabled={!newAnswer.trim() || createAnswerMutation.isPending}
                >
                  {createAnswerMutation.isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Göndərilir...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Cavabı göndər
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}

// Question Card Component
function QuestionCard({ question, onVote, getDisplayName, currentUser }: any) {
  const { data: userVote } = useUserVote('question', question.id)
  
  return (
    <Card className={question.is_answered ? 'border-green-200 dark:border-green-800' : ''}>
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          {/* Vote buttons */}
          <div className="flex flex-col items-center space-y-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onVote(1, question.id, undefined)}
              className={`p-1 ${userVote === 1 ? 'text-green-600 bg-green-50 dark:bg-green-900' : 'text-slate-500'}`}
            >
              <ArrowUp className="h-5 w-5" />
            </Button>
            <span className="font-bold text-lg text-slate-900 dark:text-white">
              {question.votes_score}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onVote(-1, question.id, undefined)}
              className={`p-1 ${userVote === -1 ? 'text-red-600 bg-red-50 dark:bg-red-900' : 'text-slate-500'}`}
            >
              <ArrowDown className="h-5 w-5" />
            </Button>
            {question.is_answered && (
              <CheckCircle className="h-6 w-6 text-green-600 mt-2" />
            )}
          </div>
          
          {/* Question content */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              {question.title}
            </h1>
            
            <div className="prose prose-slate dark:prose-invert max-w-none mb-6">
              <p className="whitespace-pre-wrap">{question.content}</p>
            </div>
            
            {/* Question Images */}
            {question.image_urls && question.image_urls.length > 0 && (
              <div className="mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {question.image_urls.map((imageUrl: string, index: number) => (
                    <div key={index} className="relative group">
                      <img
                        src={imageUrl}
                        alt={`Question image ${index + 1}`}
                        className="w-full h-auto rounded-lg border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-colors cursor-pointer"
                        onClick={() => window.open(imageUrl, '_blank')}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 rounded-lg transition-colors pointer-events-none" />
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Tags */}
            {question.tags && question.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {question.tags.map((tag: string, index: number) => (
                  <Badge key={index} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
            
            {/* Question meta */}
            <div className="flex items-center justify-between text-sm text-slate-500">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <User className="h-4 w-4" />
                  <span>{getDisplayName(question.author)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(question.created_at)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Eye className="h-4 w-4" />
                  <span>{question.views} baxış</span>
                </div>
              </div>
              {question.category && (
                <Badge variant="outline">{question.category}</Badge>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Answer Card Component
function AnswerCard({ 
  answer, 
  onVote, 
  onReply, 
  onAccept, 
  getDisplayName, 
  currentUser, 
  isQuestionAuthor,
  replyTo,
  replyContent,
  setReplyContent,
  onCreateReply,
  createAnswerMutation
}: any) {
  const { data: userVote } = useUserVote('answer', answer.id)
  
  return (
    <Card className={answer.is_accepted ? 'border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-900/10' : ''}>
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          {/* Vote buttons */}
          <div className="flex flex-col items-center space-y-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onVote(1, undefined, answer.id)}
              className={`p-1 ${userVote === 1 ? 'text-green-600 bg-green-50 dark:bg-green-900' : 'text-slate-500'}`}
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
            <span className="font-medium text-slate-900 dark:text-white">
              {answer.votes_score}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onVote(-1, undefined, answer.id)}
              className={`p-1 ${userVote === -1 ? 'text-red-600 bg-red-50 dark:bg-red-900' : 'text-slate-500'}`}
            >
              <ArrowDown className="h-4 w-4" />
            </Button>
            {answer.is_accepted && (
              <CheckCircle className="h-5 w-5 text-green-600" />
            )}
          </div>
          
          {/* Answer content */}
          <div className="flex-1">
            <div className="prose prose-slate dark:prose-invert max-w-none mb-4">
              <p className="whitespace-pre-wrap">{answer.content}</p>
            </div>
            
            {/* Answer actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {currentUser && (
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => onReply(answer.id)}
                    className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                  >
                    <Reply className="h-4 w-4 mr-1" />
                    Cavabla
                  </Button>
                )}
                {isQuestionAuthor && !answer.is_accepted && (
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => onAccept(answer.id)}
                    className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
                  >
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Qəbul et
                  </Button>
                )}
              </div>
              <div className="flex items-center space-x-2 text-sm text-slate-500">
                <span>{getDisplayName(answer.author)}</span>
                <span>•</span>
                <span>{formatDate(answer.created_at)}</span>
              </div>
            </div>
            
            {/* Reply form */}
            {replyTo === answer.id && (
              <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg space-y-3">
                <Textarea
                  placeholder="Cavabınızı yazın..."
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  rows={3}
                />
                <div className="flex space-x-2">
                  <Button 
                    size="sm"
                    onClick={() => onCreateReply(answer.id)}
                    disabled={!replyContent.trim() || createAnswerMutation.isPending}
                  >
                    {createAnswerMutation.isPending ? (
                      <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                    ) : (
                      <Save className="h-3 w-3 mr-1" />
                    )}
                    Göndər
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => onReply(null)}
                  >
                    Ləğv et
                  </Button>
                </div>
              </div>
            )}
            
            {/* Nested replies */}
            {answer.replies && answer.replies.length > 0 && (
              <div className="mt-4 space-y-3">
                {answer.replies.map((reply: QAAnswer) => (
                  <div key={reply.id} className="border-l-2 border-slate-200 dark:border-slate-700 pl-4">
                    <div className="prose prose-sm prose-slate dark:prose-invert max-w-none mb-2">
                      <p className="whitespace-pre-wrap">{reply.content}</p>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-slate-500">
                      <span>{getDisplayName(reply.author)}</span>
                      <span>•</span>
                      <span>{formatDate(reply.created_at)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
