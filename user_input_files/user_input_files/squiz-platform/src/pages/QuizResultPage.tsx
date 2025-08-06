import { useParams, Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useQuizResult, useQuizLeaderboard } from '@/hooks/useQuiz'
import { useAuth } from '@/contexts/AuthContext'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Progress } from '@/components/ui/progress'
import { 
  Trophy, 
  Medal, 
  Award,
  Clock, 
  Target, 
  Users, 
  ArrowLeft,
  Share2,
  RotateCcw,
  CheckCircle,
  AlertTriangle,
  Loader2
} from 'lucide-react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { formatDate } from '@/lib/utils'
import MathRenderer from '@/components/MathRenderer'
import confetti from 'canvas-confetti'

export default function QuizResultPage() {
  const { quizId, resultId } = useParams<{ quizId: string; resultId: string }>()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { data: result, isLoading: resultLoading, error: resultError } = useQuizResult(resultId!)
  const { data: leaderboard, isLoading: leaderboardLoading } = useQuizLeaderboard(quizId!)

  const formatTime = (seconds: number) => {
    if (!seconds) return 'N/A'
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}d ${secs}s`
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 dark:text-green-400'
    if (score >= 70) return 'text-blue-600 dark:text-blue-400'
    if (score >= 50) return 'text-yellow-600 dark:text-yellow-400'
    return 'text-red-600 dark:text-red-400'
  }

  const getScoreBadgeVariant = (score: number) => {
    if (score >= 90) return 'default'
    if (score >= 70) return 'secondary'
    if (score >= 50) return 'outline'
    return 'destructive'
  }

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-6 w-6 text-yellow-500" />
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />
      default:
        return <span className="font-bold text-slate-600 dark:text-slate-300">#{rank}</span>
    }
  }

  const getRankBackgroundColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'from-yellow-400 to-yellow-600'
      case 2:
        return 'from-gray-300 to-gray-500'
      case 3:
        return 'from-amber-400 to-amber-600'
      default:
        return 'from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800'
    }
  }

  const handleShareResult = () => {
    const shareText = `Bu quizdə ${result?.score}% nəticə aldım! Siz də cəhd edin: ${window.location.origin}/quizzes/${quizId}`
    
    if (navigator.share) {
      navigator.share({
        title: 'Quiz Nəticəm',
        text: shareText,
        url: window.location.href
      })
    } else {
      navigator.clipboard.writeText(shareText)
      toast.success('Nəticə link kopyalandı!')
    }
  }

  const handleRetakeQuiz = () => {
    navigate(`/quizzes/${quizId}/take`)
  }

  // Trigger confetti animation for high scores
  useEffect(() => {
    if (result && result.score >= 70) {
      // Delay the confetti to allow the page to render
      const timer = setTimeout(() => {
        // Create a celebration confetti effect
        const duration = 3000 // 3 seconds
        const animationEnd = Date.now() + duration
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

        function randomInRange(min: number, max: number) {
          return Math.random() * (max - min) + min
        }

        const interval = setInterval(() => {
          const timeLeft = animationEnd - Date.now()

          if (timeLeft <= 0) {
            return clearInterval(interval)
          }

          const particleCount = 50 * (timeLeft / duration)

          // Since particles fall down, start a bit higher than random
          confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
          })
          confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
          })
        }, 250)

        // Also trigger an initial burst
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        })
      }, 500) // Half second delay

      return () => clearTimeout(timer)
    }
  }, [result])

  if (resultLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-slate-600 dark:text-slate-400">Nəticə yüklənir...</p>
        </div>
      </div>
    )
  }

  if (resultError || !result) {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <Card>
          <CardContent className="pt-6">
            <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-lg font-semibold mb-2">Nəticə Tapılmadı</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Bu nəticə mövcud deyil və ya sizin buna giriş icazəniz yoxdur.
            </p>
            <Button onClick={() => navigate('/quizzes')}>Quiz Siyahısına Qayıt</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const userRank = leaderboard?.find(entry => entry.user_id === result.user_id)?.rank || 0
  const topPerformers = leaderboard?.slice(0, 3) || []
  const remainingLeaderboard = leaderboard?.slice(3) || []

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Quiz Nəticəniz
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            {result.quiz?.title}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={() => navigate(`/quizzes/${quizId}`)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Quiz Ətraflı
          </Button>
        </div>
      </div>

      {/* User Result Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="border-2 border-primary-200 dark:border-primary-800">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              {/* Score Display */}
              <div className="space-y-2">
                <div className={cn('text-6xl font-bold', getScoreColor(result.score))}>
                  {result.score}%
                </div>
                <Badge variant={getScoreBadgeVariant(result.score)} className="text-sm px-3 py-1">
                  {result.correct_answers} / {result.total_questions} doğru
                </Badge>
              </div>

              {/* Performance Message */}
              <div className="space-y-2">
                <div className="flex items-center justify-center space-x-2">
                  {result.score >= 90 ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : result.score >= 70 ? (
                    <Target className="h-5 w-5 text-blue-500" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  )}
                  <span className="font-medium">
                    {result.score >= 90 ? 'Əla nəticə! Təbriklər!' :
                     result.score >= 70 ? 'Yaxşı nəticə!' :
                     result.score >= 50 ? 'Orta nəticə' : 'Daha çox cəhd lazımdır'}
                  </span>
                </div>
                {userRank > 0 && (
                  <p className="text-slate-600 dark:text-slate-400">
                    Siz {leaderboard?.length || 0} iştirakçı arasında {userRank}. yerdəsiniz
                  </p>
                )}
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                <div className="text-center p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <Clock className="h-5 w-5 mx-auto mb-1 text-slate-500" />
                  <div className="text-sm font-medium">{formatTime(result.time_taken)}</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">Vaxt</div>
                </div>
                <div className="text-center p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <Target className="h-5 w-5 mx-auto mb-1 text-slate-500" />
                  <div className="text-sm font-medium">{Math.round((result.correct_answers / result.total_questions) * 100)}%</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">Doğruluk</div>
                </div>
                <div className="text-center p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <Users className="h-5 w-5 mx-auto mb-1 text-slate-500" />
                  <div className="text-sm font-medium">#{userRank || 'N/A'}</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">Rəyliv</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button onClick={handleRetakeQuiz} className="flex-1">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Yenidən Cəhd Et
                </Button>
                <Button variant="outline" onClick={handleShareResult} className="flex-1">
                  <Share2 className="h-4 w-4 mr-2" />
                  Nəticəni Paylaş
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Top Performers */}
      {topPerformers.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                <span>Top Performerlar</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {topPerformers.map((performer, index) => (
                  <div
                    key={performer.user_id}
                    className={cn(
                      'relative p-4 rounded-xl text-center transition-transform hover:scale-105',
                      'bg-gradient-to-br',
                      getRankBackgroundColor(performer.rank)
                    )}
                  >
                    {/* Rank Badge */}
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center shadow-lg">
                      {getRankIcon(performer.rank)}
                    </div>
                    
                    {/* Avatar */}
                    <div className="w-16 h-16 mx-auto mb-3 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-lg">
                      {performer.avatar_url ? (
                        <img 
                          src={performer.avatar_url || performer.user?.avatar_url} 
                          alt={performer.full_name || performer.user?.full_name || 'User'} 
                          className="w-16 h-16 rounded-full" 
                        />
                      ) : (
                        <span className="text-lg font-bold text-slate-600 dark:text-slate-300">
                          {(performer.full_name || performer.user?.full_name)?.charAt(0) || '?'}
                        </span>
                      )}
                    </div>
                    
                    {/* User Info */}
                    <h3 className={cn(
                      'font-semibold truncate',
                      performer.rank <= 3 ? 'text-white' : 'text-slate-900 dark:text-white'
                    )}>
                      {performer.full_name || performer.user?.full_name || 'Anonim İstifadəçi'}
                    </h3>
                    <div className={cn(
                      'text-2xl font-bold mt-1',
                      performer.rank <= 3 ? 'text-white' : 'text-slate-900 dark:text-white'
                    )}>
                      {performer.score}%
                    </div>
                    <div className={cn(
                      'text-sm',
                      performer.rank <= 3 ? 'text-white/80' : 'text-slate-600 dark:text-slate-400'
                    )}>
                      {formatTime(performer.time_taken)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Full Leaderboard */}
      {leaderboard && leaderboard.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-blue-500" />
                <span>Bütün Nəticələr</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {leaderboardLoading ? (
                <div className="text-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
                  <p className="text-slate-600 dark:text-slate-400">Rəyləşdirmə yüklənir...</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {leaderboard.map((entry, index) => {
                    const isCurrentUser = entry.user_id === user?.id
                    return (
                      <div
                        key={entry.user_id}
                        className={cn(
                          'flex items-center justify-between p-3 rounded-lg transition-colors',
                          isCurrentUser 
                            ? 'bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800'
                            : 'bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700'
                        )}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 flex items-center justify-center">
                            {entry.rank <= 3 ? (
                              getRankIcon(entry.rank)
                            ) : (
                              <span className="font-medium text-slate-600 dark:text-slate-300">
                                #{entry.rank}
                              </span>
                            )}
                          </div>
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                            {entry.avatar_url ? (
                              <img 
                                src={entry.avatar_url || entry.user?.avatar_url} 
                                alt={entry.full_name || entry.user?.full_name || 'User'} 
                                className="w-8 h-8 rounded-full" 
                              />
                            ) : (
                              <span className="text-white font-medium text-sm">
                                {(entry.full_name || entry.user?.full_name)?.charAt(0) || '?'}
                              </span>
                            )}
                          </div>
                          <div className="flex-1">
                            <p className={cn(
                              'font-medium',
                              isCurrentUser 
                                ? 'text-primary-700 dark:text-primary-300'
                                : 'text-slate-900 dark:text-white'
                            )}>
                              {entry.full_name || entry.user?.full_name || 'Anonim İstifadəçi'}
                              {isCurrentUser && (
                                <span className="ml-2 text-xs text-primary-600 dark:text-primary-400">
                                  (Siz)
                                </span>
                              )}
                            </p>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              {entry.correct_answers} / {entry.total_questions} doğru
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={cn(
                            'font-bold',
                            getScoreColor(entry.score)
                          )}>
                            {entry.score}%
                          </div>
                          <div className="text-sm text-slate-600 dark:text-slate-400">
                            {formatTime(entry.time_taken)}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Completion Info */}
      <div className="text-center text-sm text-slate-600 dark:text-slate-400">
        Quiz tamamlandı: {formatDate(result.completed_at)}
      </div>
    </div>
  )
}