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

// Get all forms using improved RPC function to avoid HTTP 400 errors
export function useForms(filters?: { category?: string; isPublic?: boolean }) {
  return useQuery({
    queryKey: ['forms', filters],
    queryFn: async () => {
      try {
        // Use the RPC function to get forms with stats reliably
        const { data: formsData, error } = await supabase
          .rpc('get_forms_with_stats')
        
        if (error) {
          console.error('Forms RPC error:', error)
          throw error
        }
        
        if (!formsData || formsData.length === 0) {
          return []
        }
        
        // Apply client-side filtering if needed
        let filteredData = formsData
        
        if (filters?.category) {
          filteredData = filteredData.filter(form => form.category === filters.category)
        }
        
        if (filters?.isPublic !== undefined) {
          // Already filtered by RLS policies in the RPC function
        }
        
        // Map to expected format
        return filteredData.map(form => ({
          id: form.id,
          title: form.title,
          description: form.description,
          category: form.category,
          created_at: form.created_at,
          likes_count: form.likes_count,
          view_count: form.views_count,
          submission_count: form.submission_count,
          creator: {
            full_name: form.creator_full_name,
            email: form.creator_email,
            is_private: form.creator_is_private
          }
        })) as Form[]
      } catch (error) {
        console.error('Error fetching forms:', error)
        // Fallback to basic query if RPC fails
        const { data: basicForms, error: basicError } = await supabase
          .from('forms')
          .select('id, title, description, category, created_at, likes_count, submission_count')
          .eq('is_public', true)
          .order('created_at', { ascending: false })
          .limit(20)
        
        if (basicError) throw basicError
        return basicForms || []
      }
    },
  })
}

// Get single form with fields using improved RPC function
export function useForm(formId: string) {
  return useQuery({
    queryKey: ['form', formId],
    queryFn: async () => {
      try {
        // Use RPC function to get form details reliably
        const { data: formData, error: formError } = await supabase
          .rpc('get_form_with_stats', { p_form_id: formId })
        
        if (formError) {
          console.error('Form RPC error:', formError)
          throw formError
        }
        
        if (!formData || formData.length === 0) {
          throw new Error('Form not found')
        }
        
        const form = formData[0]
        
        // Get form fields
        const { data: fields, error: fieldsError } = await supabase
          .from('form_fields')
          .select('*')
          .eq('form_id', formId)
          .order('order_index', { ascending: true })

        if (fieldsError) {
          console.error('Form fields error:', fieldsError)
          // Don't throw error, just return empty fields
        }

        // Get form replies
        const { data: repliesData, error: repliesError } = await supabase
          .from('form_replies')
          .select('*')
          .eq('form_id', formId)
          .order('created_at', { ascending: true })

        if (repliesError) {
          console.error('Form replies error:', repliesError)
          // Don't throw error, just return empty replies
        }

        // Get reply authors manually if replies exist
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
          id: form.id,
          title: form.title,
          description: form.description,
          category: form.category,
          creator_id: form.creator_id,
          settings: form.settings,
          is_public: form.is_public,
          access_code: form.access_code,
          view_count: form.views_count,
          submission_count: form.submission_count,
          likes_count: form.likes_count,
          created_at: form.created_at,
          updated_at: form.updated_at,
          creator: {
            full_name: form.creator_full_name,
            avatar_url: form.creator_avatar_url,
            is_private: form.creator_is_private
          },
          fields: (fields || []) as FormField[], 
          replies: replies || []
        }
      } catch (error) {
        console.error('Error fetching form:', error)
        throw error
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
        likes: 0,
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
      const { data, error } = await supabase.rpc('record_form_view', {
        p_form_id: formId
      })
      if (error) throw error
      return data
    },
    onSuccess: (_, formId) => {
      queryClient.invalidateQueries({ queryKey: ['form', formId] })
      queryClient.invalidateQueries({ queryKey: ['forms'] })
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

// Toggle like on form
export function useToggleFormLike() {
  const { user } = useAuth()
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (formId: string) => {
      if (!user) throw new Error('User not authenticated')
      
      const { data, error } = await supabase.rpc('toggle_form_like', {
        p_form_id: formId
      })
      
      if (error) throw error
      return data
    },
    onSuccess: (data, formId) => {
      // Invalidate forms list and specific form to update like counts immediately
      queryClient.invalidateQueries({ queryKey: ['forms'] })
      queryClient.invalidateQueries({ queryKey: ['form', formId] })
      queryClient.invalidateQueries({ queryKey: ['form-like', formId] })
      queryClient.invalidateQueries({ queryKey: ['form-stats', formId] })
      
      // data should be an array of objects with liked and total_likes properties
      const result = data?.[0]
      if (result) {
        toast.success(result.liked ? 'Form liked!' : 'Like removed')
      }
    },
    onError: (error: any) => {
      console.error('Like toggle error:', error)
      toast.error('Failed to toggle like')
    }
  })
}

// Check if user has liked a form and get form stats
export function useCheckFormLike(formId: string) {
  const { user } = useAuth()
  
  return useQuery({
    queryKey: ['form-like', formId, user?.id],
    queryFn: async () => {
      if (!user || !formId) return false
      
      const { data, error } = await supabase.rpc('get_form_stats', {
        p_form_id: formId
      })
      
      if (error) {
        console.error('Check like error:', error)
        return false
      }
      
      // data should be an array with [total_likes, total_views, user_liked]
      return data?.[0]?.user_liked || false
    },
    enabled: !!user && !!formId,
  })
}

// Get complete form stats (likes, views, user interaction)
export function useFormStats(formId: string) {
  return useQuery({
    queryKey: ['form-stats', formId],
    queryFn: async () => {
      if (!formId) return null
      
      const { data, error } = await supabase.rpc('get_form_stats', {
        p_form_id: formId
      })
      
      if (error) {
        console.error('Form stats error:', error)
        return null
      }
      
      // data should be an array with [total_likes, total_views, user_liked]
      const stats = data?.[0]
      return {
        totalLikes: stats?.total_likes || 0,
        totalViews: stats?.total_views || 0,
        userLiked: stats?.user_liked || false
      }
    },
    enabled: !!formId,
  })
}

// Record form view
export function useRecordFormView() {
  return useMutation({
    mutationFn: async (formId: string) => {
      const { data, error } = await supabase.rpc('record_form_view', {
        p_form_id: formId
      })
      
      if (error) throw error
      return data
    },
    onError: (error: any) => {
      console.error('Record view error:', error)
      // Don't show error to user for view tracking
    }
  })
}

// Get form attachments
export function useFormAttachments(formId: string) {
  return useQuery({
    queryKey: ['form-attachments', formId],
    queryFn: async () => {
      if (!formId) return []
      
      const { data, error } = await supabase
        .from('form_attachments')
        .select('*')
        .eq('form_id', formId)
        .order('created_at', { ascending: false })
      
      if (error) throw error
      return data || []
    },
    enabled: !!formId
  })
}

// Upload form attachment
export function useUploadFormAttachment() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async ({ 
      formId, 
      file, 
      fileName, 
      originalName 
    }: { 
      formId: string
      file: File
      fileName: string
      originalName: string
    }) => {
      // Upload file to storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('form-attachments')
        .upload(fileName, file)
      
      if (uploadError) throw uploadError
      
      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('form-attachments')
        .getPublicUrl(fileName)
      
      // Save attachment record to database
      const { data, error } = await supabase.rpc('save_form_attachment', {
        p_form_id: formId,
        p_file_name: fileName,
        p_original_name: originalName,
        p_mime_type: file.type,
        p_file_size: file.size,
        p_file_path: publicUrl,
        p_storage_bucket: 'form-attachments'
      })
      
      if (error) throw error
      return { id: data, fileName, originalName, url: publicUrl }
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['form-attachments', variables.formId] })
      toast.success('File uploaded successfully')
    },
    onError: (error: any) => {
      console.error('Upload error:', error)
      toast.error(error.message || 'Failed to upload file')
    }
  })
}
