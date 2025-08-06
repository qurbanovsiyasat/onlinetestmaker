import React from 'react'
import { Badge } from '@/components/ui/Badge'
import { Crown, Shield, User } from 'lucide-react'
import { cn } from '@/lib/utils'

interface RoleBadgeProps {
  role: string
  isSuperAdmin?: boolean
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function RoleBadge({ role, isSuperAdmin = false, size = 'sm', className }: RoleBadgeProps) {
  const isAdmin = role === 'admin'
  
  const sizeClasses = {
    sm: 'text-xs px-2 py-1 h-6',
    md: 'text-sm px-3 py-1.5 h-8',
    lg: 'text-base px-4 py-2 h-10'
  }
  
  const iconSizes = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5'
  }

  if (isSuperAdmin) {
    return (
      <Badge 
        variant="default"
        className={cn(
          // Squiz Gold colors as per design specification
          'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-bold border-none shadow-lg',
          'hover:from-yellow-600 hover:to-yellow-700 transition-all duration-200',
          'flex items-center gap-1',
          sizeClasses[size],
          className
        )}
      >
        <Crown className={cn(iconSizes[size], 'text-yellow-100')} />
        <span className="font-bold tracking-wide">SUPER ADMIN</span>
      </Badge>
    )
  }

  if (isAdmin) {
    return (
      <Badge 
        variant="default"
        className={cn(
          // Squiz Blue colors as per design specification
          'bg-blue-600 text-white font-semibold border-blue-700',
          'hover:bg-blue-700 transition-colors duration-200',
          'flex items-center gap-1',
          sizeClasses[size],
          className
        )}
      >
        <Shield className={cn(iconSizes[size], 'text-blue-100')} />
        <span className="font-semibold tracking-wide">ADMIN</span>
      </Badge>
    )
  }

  // Regular user badge (optional - can be hidden for cleaner UI)
  return null
}

// Helper function to get display name with privacy consideration
export function getDisplayName(user: any, currentUserIsAdmin = false) {
  if (!user) return 'Anonymous'
  
  // If user is private and current user is not admin, show generic name
  if (user.is_private && !currentUserIsAdmin) {
    return 'Abituriyent'
  }
  
  return user.full_name || user.name || 'Anonymous'
}

// Enhanced user display component that includes role badge
export function UserDisplay({ 
  user, 
  showRole = true, 
  currentUserIsAdmin = false,
  className 
}: {
  user: any
  showRole?: boolean
  currentUserIsAdmin?: boolean
  className?: string
}) {
  const displayName = getDisplayName(user, currentUserIsAdmin)
  const isSuperAdmin = user?.email === 'user@squiz.com' && user?.role === 'admin'
  
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <span className="font-medium">{displayName}</span>
      {showRole && user?.role && (
        <RoleBadge 
          role={user.role} 
          isSuperAdmin={isSuperAdmin}
          size="sm"
        />
      )}
    </div>
  )
}
