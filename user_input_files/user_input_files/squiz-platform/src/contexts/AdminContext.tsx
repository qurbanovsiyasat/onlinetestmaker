import React, { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'

interface AdminContextType {
  isAdmin: boolean
  isSuperAdmin: boolean
  canCreateQuiz: boolean
  userRole: string
  loading: boolean
  refetchAdminInfo: () => Promise<void>
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const [isAdmin, setIsAdmin] = useState(false)
  const [isSuperAdmin, setIsSuperAdmin] = useState(false)
  const [canCreateQuiz, setCanCreateQuiz] = useState(false)
  const [userRole, setUserRole] = useState('student')
  const [loading, setLoading] = useState(false)

  const fetchAdminInfo = async () => {
    if (!user) {
      setIsAdmin(false)
      setIsSuperAdmin(false)
      setCanCreateQuiz(false)
      setUserRole('student')
      return
    }

    setLoading(true)
    try {
      const { data, error } = await supabase.rpc('get_user_role_info', {
        user_id: user.id
      })

      if (error) {
        console.error('Error fetching admin info:', error)
        return
      }

      if (data && data.length > 0) {
        const roleInfo = data[0]
        setUserRole(roleInfo.role || 'student')
        setIsAdmin(roleInfo.is_admin || false)
        setIsSuperAdmin(roleInfo.is_super_admin || false)
        setCanCreateQuiz(roleInfo.can_create_quiz || false)
      }
    } catch (error) {
      console.error('Error fetching admin info:', error)
    } finally {
      setLoading(false)
    }
  }

  const refetchAdminInfo = async () => {
    await fetchAdminInfo()
  }

  useEffect(() => {
    fetchAdminInfo()
  }, [user])

  const value = {
    isAdmin,
    isSuperAdmin,
    canCreateQuiz,
    userRole,
    loading,
    refetchAdminInfo
  }

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const context = useContext(AdminContext)
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider')
  }
  return context
}
