import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'
import { toast } from 'sonner'

export interface Form {
  id: string
  title: string
  description?: string
  creator_id: string
  settings: Record<string, any>
  is_public: boolean
  access_code?: string
  view_count: number
  submission_count: number
  created_at: string
  updated_at: string
  creator?: {
    full_name: string
    avatar_url?: string
  }
}

export interface FormField {
  id: string
  form_id: string
  field_type: string
  label: string
  placeholder?: string
  options?: string[]
  is_required: boolean
  order_index: number
  validation_rules: Record<string, any>
  created_at: string
}

export interface FormSubmission {
  id: string
  form_id: string
  submitter_id?: string
  submission_data: Record<string, any>
  submitted_at: string
}

export interface FormReply {
  id: string
  form_id: string
  author_id: string
  content: string
  parent_reply_id?: string
  likes: number
  created_at: string
  updated_at: string
  author?: {
    full_name: string
    avatar_url?: string
  }
}

// Get all forms
export function useForms(filters?: { category?: string; isPublic?: boolean }) {
  return useQuery({
    queryKey: ['forms', filters],
    queryFn: async () => {
      let query = supabase
        .from('forms')
        .select('*')
        .order('created_at', { ascending: false })

      if (filters?.isPublic !== undefined) {
        query = query.eq('is_public', filters.isPublic)
      }

      const { data: formsData, error } = await query
      if (error) throw error
      
      if (!formsData || formsData.length === 0) {
        return []
      }
      
      // Manually fetch creator data (following Supabase best practices)
      const creatorIds = [...new Set(formsData.map(form => form.creator_id))]
      const { data: creators } = await supabase
        .from('users')
        .select('id, full_name, avatar_url, is_private')
        .in('id', creatorIds)
      
      // Map forms with creator data
      return formsData.map(form => ({
        ...form,
        creator: creators?.find(c => c.id === form.creator_id) || null
      })) as Form[]
    },
  })
}

// Get single form with fields
export function useForm(formId: string) {
  return useQuery({
    queryKey: ['form', formId],
    queryFn: async () => {
      // Get form
      const { data: form, error: formError } = await supabase
        .from('forms')
        .select('*')
        .eq('id', formId)
        .maybeSingle()

      if (formError) throw formError
      if (!form) throw new Error('Form not found')

      // Get creator data manually
      const { data: creator } = await supabase
        .from('users')
        .select('id, full_name, avatar_url, is_private')
        .eq('id', form.creator_id)
        .maybeSingle()

      // Get form fields
      const { data: fields, error: fieldsError } = await supabase
        .from('form_fields')
        .select('*')
        .eq('form_id', formId)
        .order('order_index', { ascending: true })

      if (fieldsError) throw fieldsError

      // Get form replies
      const { data: repliesData, error: repliesError } = await supabase
        .from('form_replies')
        .select('*')
        .eq('form_id', formId)
        .order('created_at', { ascending: true })

      if (repliesError) throw repliesError

      // Get reply authors manually
      let replies: FormReply[] = []
      if (repliesData && repliesData.length > 0) {
        const authorIds = [...new Set(repliesData.map(reply => reply.author_id))]
        const { data: authors } = await supabase
          .from('users')
          .select('id, full_name, avatar_url, is_private')
          .in('id', authorIds)
        
        replies = repliesData.map(reply => ({
          ...reply,
          author: authors?.find(a => a.id === reply.author_id) || null
        })) as FormReply[]
      }

      return { 
        ...form, 
        creator,
        fields: fields as FormField[], 
        replies 
      }
    },
    enabled: !!formId,
  })
}

// Create form
export function useCreateForm() {
  const { user } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (formData: Omit<Form, 'id' | 'creator_id' | 'view_count' | 'submission_count' | 'created_at' | 'updated_at'>) => {
      if (!user) throw new Error('User not authenticated')

      const newForm = {
        ...formData,
        creator_id: user.id,
        view_count: 0,
        submission_count: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }

      const { data, error } = await supabase
        .from('forms')
        .insert([newForm])
        .select()
        .single()

      if (error) throw error
      return data as Form
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['forms'] })
      toast.success('Form created successfully')
    },
    onError: (error: any) => {
      toast.error('Failed to create form')
    }
  })
}

// Submit form response
export function useSubmitForm() {
  const { user } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ formId, submissionData }: { formId: string; submissionData: Record<string, any> }) => {
      const newSubmission = {
        form_id: formId,
        submitter_id: user?.id,
        submission_data: submissionData,
        submitted_at: new Date().toISOString(),
      }

      const { data, error } = await supabase
        .from('form_submissions')
        .insert([newSubmission])
        .select()
        .single()

      if (error) throw error
      return data as FormSubmission
    },
    onSuccess: (_, { formId }) => {
      queryClient.invalidateQueries({ queryKey: ['form', formId] })
      toast.success('Form submitted successfully')
    },
    onError: (error: any) => {
      toast.error('Failed to submit form')
    }
  })
}

// Get form replies
export function useFormReplies(formId: string) {
  return useQuery({
    queryKey: ['form-replies', formId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('form_replies')
        .select(`
          *,
          author:users!form_replies_author_id_fkey(
            full_name,
            avatar_url
          )
        `)
        .eq('form_id', formId)
        .order('created_at', { ascending: true })

      if (error) throw error
      return data as FormReply[]
    },
    enabled: !!formId,
  })
}

// Create form reply
export function useCreateFormReply() {
  const { user } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ formId, content, parentReplyId }: { 
      formId: string; 
      content: string; 
      parentReplyId?: string 
    }) => {
      if (!user) throw new Error('User not authenticated')

      const newReply = {
        form_id: formId,
        author_id: user.id,
        content,
        parent_reply_id: parentReplyId,
        votes_score: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }

      const { data, error } = await supabase
        .from('form_replies')
        .insert([newReply])
        .select(`
          *,
          author:users!form_replies_author_id_fkey(
            full_name,
            avatar_url
          )
        `)
        .single()

      if (error) throw error
      return data as FormReply
    },
    onSuccess: (_, { formId }) => {
      queryClient.invalidateQueries({ queryKey: ['form-replies', formId] })
      queryClient.invalidateQueries({ queryKey: ['form', formId] })
      toast.success('Reply added successfully')
    },
    onError: (error: any) => {
      console.error('Reply error:', error)
      toast.error('Failed to add reply')
    }
  })
}

// Reply to form (alias for backward compatibility)
export function useReplyToForm() {
  return useCreateFormReply()
}

// Increment form view count
export function useIncrementFormViewCount() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (formId: string) => {
      const { error } = await supabase.rpc('increment_view_count', {
        table_name: 'forms',
        record_id: formId
      })
      if (error) throw error
    },
    onSuccess: (_, formId) => {
      queryClient.invalidateQueries({ queryKey: ['form', formId] })
    }
  })
}

// Vote on form reply
export function useVoteOnFormReply() {
  const { user } = useAuth()
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async ({ replyId, voteType }: { replyId: string; voteType: 'up' | 'down' }) => {
      if (!user) throw new Error('User not authenticated')
      
      const { data, error } = await supabase.rpc('vote_on_content', {
        content_type: 'form_reply',
        content_id: replyId,
        vote_type: voteType,
        user_id: user.id
      })
      
      if (error) throw error
      return data
    },
    onSuccess: (data, { replyId }) => {
      // Invalidate specific form reply queries to update vote counts immediately
      queryClient.invalidateQueries({ queryKey: ['form-replies'] })
      // Optionally show success message
      toast.success(`Vote ${data.vote_type === 'up' ? 'up' : 'down'} recorded!`)
    },
    onError: (error: any) => {
      toast.error('Failed to vote')
    }
  })
}
