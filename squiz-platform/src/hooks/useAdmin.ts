import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'
import { toast } from 'sonner'

export interface AdminStats {
  users?: {
    total: number
    active: number
  }
  content?: {
    quizzes: number
    forms: number
    questions: number
    submissions: number
  }
  generated_at?: string
  error?: string
  message?: string
}

export function useAdminStats() {
  const { user } = useAuth()
  
  return useQuery({
    queryKey: ['admin-stats'],
    queryFn: async (): Promise<AdminStats> => {
      const { data, error } = await supabase.rpc('get_admin_stats')
      if (error) {
        console.error('Error fetching admin stats:', error)
        return {
          users: { total: 0, active: 0 },
          content: { quizzes: 0, forms: 0, questions: 0, submissions: 0 },
          error: 'Failed to load stats'
        }
      }
      return data
    },
    enabled: !!user && user.role === 'admin',
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export function useAllUsers() {
  const { user } = useAuth()
  
  return useQuery({
    queryKey: ['admin-users'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      return data
    },
    enabled: !!user && user.role === 'admin',
  })
}

export function useUpdateUserRole() {
  const { user } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ userId, role }: { userId: string; role: string }) => {
      if (!user || user.role !== 'admin') throw new Error('Unauthorized')

      const { data, error } = await supabase
        .from('users')
        .update({ role, updated_at: new Date().toISOString() })
        .eq('id', userId)
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] })
      toast.success('User role updated successfully')
    },
    onError: (error: any) => {
      console.error('Error updating user role:', error)
      toast.error('Failed to update user role')
    }
  })
}

export function useGrantQuizPermission() {
  const { user } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ userId, canCreateQuiz }: { userId: string; canCreateQuiz: boolean }) => {
      if (!user || user.role !== 'admin') throw new Error('Unauthorized')

      const { data, error } = await supabase
        .from('users')
        .update({ can_create_quiz: canCreateQuiz, updated_at: new Date().toISOString() })
        .eq('id', userId)
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: (_, { canCreateQuiz }) => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] })
      toast.success(canCreateQuiz ? 'Quiz creation permission granted' : 'Quiz creation permission revoked')
    },
    onError: (error: any) => {
      console.error('Error updating quiz permission:', error)
      toast.error('Failed to update quiz permission')
    }
  })
}

export function useDeleteUser() {
  const { user } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (userId: string) => {
      if (!user || user.role !== 'admin') throw new Error('Unauthorized')
      if (user.id === userId) throw new Error('Cannot delete your own account')

      const { error } = await supabase
        .from('users')
        .delete()
        .eq('id', userId)

      if (error) throw error
      return { success: true }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] })
      queryClient.invalidateQueries({ queryKey: ['admin-stats'] })
      toast.success('User deleted successfully')
    },
    onError: (error: any) => {
      console.error('Error deleting user:', error)
      toast.error('Failed to delete user')
    }
  })
}

export function useQuizCategories() {
  return useQuery({
    queryKey: ['quiz-categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('quiz_categories')
        .select('*')
        .eq('is_active', true)
        .order('name', { ascending: true })
      
      if (error) throw error
      return data || []
    },
  })
}

export function useCreateCategory() {
  const { user } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (categoryData: { name: string; description: string; color: string }) => {
      if (!user || user.role !== 'admin') throw new Error('Unauthorized')

      const { data, error } = await supabase
        .from('quiz_categories')
        .insert([{
          ...categoryData,
          created_by: user.id,
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }])
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quiz-categories'] })
      toast.success('Category created successfully')
    },
    onError: (error: any) => {
      console.error('Error creating category:', error)
      toast.error('Failed to create category')
    }
  })
}

export function useDeleteCategory() {
  const { user } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (categoryId: string) => {
      if (!user || user.role !== 'admin') throw new Error('Unauthorized')

      const { error } = await supabase
        .from('quiz_categories')
        .delete()
        .eq('id', categoryId)

      if (error) throw error
      return { success: true }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quiz-categories'] })
      toast.success('Category deleted successfully')
    },
    onError: (error: any) => {
      console.error('Error deleting category:', error)
      toast.error('Failed to delete category')
    }
  })
}