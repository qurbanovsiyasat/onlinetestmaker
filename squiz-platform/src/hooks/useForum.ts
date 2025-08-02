import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'
import { toast } from 'sonner'

export interface ForumPost {
  id: string
  title: string
  content: string
  author_id: string
  category?: string
  tags?: string[]
  views: number
  likes: number
  is_pinned: boolean
  is_locked: boolean
  image_url?: string
  shared_quiz_id?: string
  replies_count: number
  created_at: string
  updated_at: string
  author?: {
    id: string
    full_name?: string
    avatar_url?: string
    is_private: boolean
  }
  shared_quiz?: {
    id: string
    title: string
    description?: string
    difficulty: string
  }
}

export interface ForumReply {
  id: string
  post_id: string
  author_id: string
  content: string
  parent_reply_id?: string
  likes: number
  created_at: string
  updated_at: string
  author?: {
    id: string
    full_name?: string
    avatar_url?: string
    is_private: boolean
  }
}

// Get all forum posts
export function useForumPosts(category?: string) {
  return useQuery({
    queryKey: ['forum-posts', category],
    queryFn: async (): Promise<ForumPost[]> => {
      let query = supabase
        .from('forum_posts')
        .select(`
          *,
          author:users(id, full_name, avatar_url, is_private)
        `)
        .order('created_at', { ascending: false })

      if (category && category !== 'all') {
        query = query.eq('category', category)
      }

      const { data, error } = await query
      if (error) {
        console.error('Forum posts error:', error)
        return []
      }
      return data || []
    },
    staleTime: 30 * 1000, // 30 seconds
  })
}

// Get single forum post
export function useForumPost(postId: string) {
  return useQuery({
    queryKey: ['forum-post', postId],
    queryFn: async (): Promise<ForumPost | null> => {
      const { data, error } = await supabase
        .from('forum_posts')
        .select(`
          *,
          author:users!forum_posts_author_id_fkey(id, full_name, avatar_url, is_private),
          shared_quiz:quizzes!forum_posts_shared_quiz_id_fkey(id, title, description, difficulty)
        `)
        .eq('id', postId)
        .single()

      if (error) {
        if (error.code === 'PGRST116') return null // Not found
        throw error
      }
      return data
    },
    enabled: !!postId,
  })
}

// Get replies for a forum post
export function useForumReplies(postId: string) {
  return useQuery({
    queryKey: ['forum-replies', postId],
    queryFn: async (): Promise<ForumReply[]> => {
      const { data, error } = await supabase
        .from('forum_replies')
        .select(`
          *,
          author:users!forum_replies_author_id_fkey(id, full_name, avatar_url, is_private)
        `)
        .eq('post_id', postId)
        .order('created_at', { ascending: true })

      if (error) throw error
      return data || []
    },
    enabled: !!postId,
  })
}

// Create a new forum post
export function useCreateForumPost() {
  const { user } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (post: {
      title: string
      content: string
      category?: string
      tags?: string[]
      image_url?: string
      shared_quiz_id?: string
    }) => {
      if (!user) throw new Error('User not authenticated')

      const { data, error } = await supabase
        .from('forum_posts')
        .insert({
          title: post.title,
          content: post.content,
          category: post.category,
          tags: post.tags,
          image_url: post.image_url,
          shared_quiz_id: post.shared_quiz_id,
          author_id: user.id,
        })
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['forum-posts'] })
      toast.success('Post created successfully')
    },
    onError: (error) => {
      console.error('Create forum post error:', error)
      toast.error('Failed to create post')
    },
  })
}

export function useShareQuizToForum() {
  const { user } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: {
      quizId: string
      title: string
      content: string
      category?: string
    }) => {
      if (!user) throw new Error('User not authenticated')

      const { data: result, error } = await supabase
        .from('forum_posts')
        .insert({
          title: data.title,
          content: data.content,
          category: data.category || 'Quiz Paylaşımı',
          shared_quiz_id: data.quizId,
          author_id: user.id,
        })
        .select()
        .single()

      if (error) throw error
      return result
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['forum-posts'] })
      toast.success('Quiz forum-da uğurla paylaşıldı')
    },
    onError: (error) => {
      console.error('Share quiz to forum error:', error)
      toast.error('Quiz paylaşılarkən xəta baş verdi')
    },
  })
}

// Toggle like on forum post
export function useToggleForumLike() {
  const { user } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ postId }: { postId: string }) => {
      if (!user) throw new Error('User not authenticated')

      // Check if user already liked this post
      const { data: existingLike, error: checkError } = await supabase
        .from('forum_likes')
        .select('id')
        .eq('post_id', postId)
        .eq('user_id', user.id)
        .maybeSingle()

      if (checkError) throw checkError

      if (existingLike) {
        // Remove like
        const { error: deleteError } = await supabase
          .from('forum_likes')
          .delete()
          .eq('id', existingLike.id)

        if (deleteError) throw deleteError

        // Decrement likes count
        const { error: updateError } = await supabase
          .from('forum_posts')
          .update({ likes: supabase.sql`likes - 1` })
          .eq('id', postId)

        if (updateError) throw updateError
      } else {
        // Add like
        const { error: insertError } = await supabase
          .from('forum_likes')
          .insert({ post_id: postId, user_id: user.id })

        if (insertError) throw insertError

        // Increment likes count
        const { error: updateError } = await supabase
          .from('forum_posts')
          .update({ likes: supabase.sql`likes + 1` })
          .eq('id', postId)

        if (updateError) throw updateError
      }

      return !existingLike
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['forum-posts'] })
    },
    onError: (error) => {
      console.error('Toggle forum like error:', error)
      toast.error('Failed to update like')
    },
  })
}

// Get forum like status for current user
export function useForumLikeStatus(postId: string) {
  const { user } = useAuth()

  return useQuery({
    queryKey: ['forum-like-status', postId, user?.id],
    queryFn: async (): Promise<boolean> => {
      if (!user) return false

      const { data, error } = await supabase
        .from('forum_likes')
        .select('id')
        .eq('post_id', postId)
        .eq('user_id', user.id)
        .maybeSingle()

      if (error) throw error
      return !!data
    },
    enabled: !!user && !!postId,
  })
}