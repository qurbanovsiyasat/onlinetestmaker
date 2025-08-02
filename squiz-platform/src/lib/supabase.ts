import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://bhykzkqlyfcagrnkubnr.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJoeWt6a3FseWZjYWdybmt1Ym5yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM5NzU1MzYsImV4cCI6MjA2OTU1MTUzNn0.Y8vaK5AJBKhdI5HJx1aBM3zg3tQQ8tNkx4jgwTI10ps'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Image upload helper function
export async function uploadImage(file: File, folder: string = 'general'): Promise<string> {
  try {
    // Convert file to base64
    const base64Data = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result as string)
      reader.onerror = reject
      reader.readAsDataURL(file)
    })

    // Call the edge function
    const { data, error } = await supabase.functions.invoke('image-upload', {
      body: {
        imageData: base64Data,
        fileName: file.name,
        folder
      }
    })

    if (error) throw error
    return data.data.publicUrl
  } catch (error) {
    console.error('Image upload failed:', error)
    throw new Error(error instanceof Error ? error.message : 'Image upload failed')
  }
}

// Database Types
export interface User {
  id: string
  email: string
  full_name?: string
  role: 'admin' | 'teacher' | 'student'
  avatar_url?: string
  bio?: string
  is_private?: boolean
  can_create_quiz?: boolean
  settings?: {
    notifications?: {
      email?: boolean
      push?: boolean
      forum?: boolean
      quiz?: boolean
    }
    privacy?: {
      profilePublic?: boolean
      showEmail?: boolean
      showActivity?: boolean
    }
    preferences?: {
      theme?: 'light' | 'dark' | 'system'
      language?: string
      timeZone?: string
    }
  }
  last_sign_in_at?: string
  is_active?: boolean
  created_at: string
  updated_at: string
}

export interface Quiz {
  id: string
  title: string
  description?: string
  creator_id: string
  category?: string
  difficulty: 'easy' | 'medium' | 'hard'
  time_limit?: number
  max_attempts: number
  is_public: boolean
  access_code?: string
  settings: Record<string, any>
  created_at: string
  updated_at: string
  questions?: Question[]
  attempts_count?: number
}

export interface Question {
  id: string
  quiz_id: string
  question_text: string
  question_type: 'multiple_choice' | 'true_false' | 'text' | 'math'
  options?: string[]
  correct_answer: string
  explanation?: string
  points: number
  order_index: number
  image_url?: string
  created_at: string
  updated_at: string
}

export interface QuizResult {
  id: string
  quiz_id: string
  user_id: string
  score: number
  total_questions: number
  correct_answers: number
  time_taken?: number
  answers: Record<string, any>
  started_at?: string
  completed_at: string
  created_at: string
}

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
  created_at: string
  updated_at: string
  author?: { id: string; full_name?: string; avatar_url?: string }
  replies_count?: number
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
}

export interface AIConversation {
  id: string
  user_id?: string
  session_id: string
  messages: Array<{ role: 'user' | 'assistant', content: string }>
  context_type?: string
  context_id?: string
  created_at: string
  updated_at: string
}

export interface Notification {
  id: string
  user_id: string
  type: string
  title: string
  message?: string
  is_read: boolean
  data: Record<string, any>
  created_at: string
}