import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'

export interface UserStats {
  quizzesCreated: number
  quizzesCompleted: number
  forumPosts: number
  averageScore: number
}

export interface UserActivity {
  quizzes: Array<{
    id: string
    title: string
    created_at: string
  }>
  forumPosts: Array<{
    id: string
    title: string
    created_at: string
  }>
  quizAttempts: Array<{
    id: string
    created_at: string
    score: number
  }>
}

export function useUserStats() {
  const { user } = useAuth()
  
  return useQuery({
    queryKey: ['user-stats', user?.id],
    queryFn: async (): Promise<UserStats> => {
      if (!user) throw new Error('User not authenticated')
      
      // Get quizzes created
      const { data: quizzesCreated, error: quizzesError } = await supabase
        .from('quizzes')
        .select('id')
        .eq('creator_id', user.id)
      
      if (quizzesError) throw quizzesError
      
      // Get quizzes completed
      const { data: quizzesCompleted, error: completedError } = await supabase
        .from('quiz_results')
        .select('id')
        .eq('user_id', user.id)
      
      if (completedError) throw completedError
      
      // Get forum posts
      const { data: forumPosts, error: forumError } = await supabase
        .from('forum_posts')
        .select('id')
        .eq('author_id', user.id)
      
      if (forumError) throw forumError
      
      // Get average score
      const { data: avgScore, error: scoreError } = await supabase
        .from('quiz_results')
        .select('score')
        .eq('user_id', user.id)
      
      if (scoreError) throw scoreError
      
      const averageScore = avgScore.length > 0 
        ? Math.round(avgScore.reduce((sum, result) => sum + result.score, 0) / avgScore.length)
        : 0
      
      return {
        quizzesCreated: quizzesCreated.length,
        quizzesCompleted: quizzesCompleted.length,
        forumPosts: forumPosts.length,
        averageScore
      }
    },
    enabled: !!user,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export function useRecentActivity() {
  const { user } = useAuth()
  
  return useQuery({
    queryKey: ['user-activity', user?.id],
    queryFn: async (): Promise<UserActivity> => {
      if (!user) throw new Error('User not authenticated')
      
      // Get recent quizzes
      const { data: quizzes, error: quizzesError } = await supabase
        .from('quizzes')
        .select('id, title, created_at')
        .eq('creator_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5)
      
      if (quizzesError) throw quizzesError
      
      // Get recent forum posts
      const { data: forumPosts, error: forumError } = await supabase
        .from('forum_posts')
        .select('id, title, created_at')
        .eq('author_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5)
      
      if (forumError) throw forumError
      
      // Get recent quiz attempts
      const { data: quizAttempts, error: attemptsError } = await supabase
        .from('quiz_results')
        .select('id, created_at, score')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5)
      
      if (attemptsError) throw attemptsError
      
      return {
        quizzes: quizzes || [],
        forumPosts: forumPosts || [],
        quizAttempts: quizAttempts || []
      }
    },
    enabled: !!user,
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}