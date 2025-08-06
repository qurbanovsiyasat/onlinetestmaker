import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { useAdmin } from '@/contexts/AdminContext'
import { useQuizCreatePermission } from '@/hooks/useQuizCreatePermission'
import { RoleBadge } from '@/components/ui/RoleBadge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Home,
  BookOpen,
  MessageSquare,
  User,
  Settings,
  Shield,
  BarChart3,
  X,
  Sparkles,
  ChevronRight,
  Plus,
  FileText,
  HelpCircle
} from 'lucide-react'

interface SidebarProps {
  isOpen: boolean
  onClose?: () => void
  isMobile: boolean
}

interface NavItem {
  icon: React.ComponentType<{ className?: string }>
  label: string
  href?: string
  onClick?: () => void
  badge?: string
  badgeVariant?: 'default' | 'secondary' | 'destructive' | 'outline'
  adminOnly?: boolean
}

export default function Sidebar({ isOpen, onClose, isMobile }: SidebarProps) {
  const { user } = useAuth()
  const { isAdmin, isSuperAdmin } = useAdmin()
  const location = useLocation()
  const { checkPermissionAndNavigate } = useQuizCreatePermission()

  const navigation: NavItem[] = [
    {
      icon: Home,
      label: 'Dashboard',
      href: '/dashboard'
    },
    {
      icon: BookOpen,
      label: 'Quizlər',
      href: '/quizzes'
    },
    {
      icon: Plus,
      label: 'Quiz Yarat',
      onClick: checkPermissionAndNavigate
    },
    {
      icon: MessageSquare,
      label: 'Sual-Cavab',
      href: '/qa'
    },
    {
      icon: FileText,
      label: 'Formlar',
      href: '/forms',
      badge: 'Yeni',
      badgeVariant: 'secondary'
    },
    {
      icon: BarChart3,
      label: 'Statistika',
      href: '/stats'
    },
    {
      icon: User,
      label: 'Profil',
      href: user?.id ? `/profile/${user.id}` : '/profile'
    },
    {
      icon: Settings,
      label: 'Tənzimləmələr',
      href: '/settings'
    },
    {
      icon: Shield,
      label: 'Admin Panel',
      href: '/admin',
      adminOnly: true
    }
  ]

  const filteredNavigation = navigation.filter(item => 
    !item.adminOnly || isAdmin || isSuperAdmin
  )

  const sidebarContent = (
    <div className="flex flex-col h-full bg-pure-white border-r border-light-grey">
      {/* Header */}
      <div className="p-6 border-b border-light-grey">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-vibrant-blue to-purple-600 rounded-xl flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-pure-white" />
            </div>
            <div>
              <h2 className="text-section-title text-dark-charcoal">Squiz</h2>
              <p className="text-caption text-medium-grey">Təhsil Platforması</p>
            </div>
          </div>
          {isMobile && onClose && (
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {filteredNavigation.map((item, index) => {
          const isActive = item.href && (location.pathname === item.href || 
            (item.href !== '/dashboard' && location.pathname.startsWith(item.href)))
          
          const handleClick = () => {
            if (item.onClick) {
              item.onClick()
            }
            if (isMobile) {
              onClose?.()
            }
          }
          
          return (
            <motion.div
              key={item.href || item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              {item.href ? (
                <Link
                  to={item.href}
                  onClick={() => isMobile && onClose?.()}
                  className={cn(
                    'flex items-center justify-between w-full p-3 rounded-xl text-ui-label transition-all duration-200 group',
                    isActive
                      ? 'bg-vibrant-blue text-pure-white shadow-md'
                      : 'text-medium-grey hover:bg-soft-grey hover:text-dark-charcoal'
                  )}
                >
                  <div className="flex items-center space-x-3">
                    <item.icon 
                      className={cn(
                        'h-5 w-5 transition-colors',
                        isActive ? 'text-pure-white' : 'text-medium-grey group-hover:text-vibrant-blue'
                      )} 
                    />
                    <span>{item.label}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {item.badge && (
                      <Badge 
                        variant={item.badgeVariant || 'default'} 
                        className="text-xs px-2 py-0.5"
                      >
                        {item.badge}
                      </Badge>
                    )}
                    {!isActive && (
                      <ChevronRight className="h-4 w-4 text-medium-grey opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </div>
                </Link>
              ) : (
                <button
                  onClick={handleClick}
                  className={cn(
                    'flex items-center justify-between w-full p-3 rounded-xl text-ui-label transition-all duration-200 group',
                    'text-medium-grey hover:bg-soft-grey hover:text-dark-charcoal'
                  )}
                >
                  <div className="flex items-center space-x-3">
                    <item.icon 
                      className="h-5 w-5 transition-colors text-medium-grey group-hover:text-vibrant-blue" 
                    />
                    <span>{item.label}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {item.badge && (
                      <Badge 
                        variant={item.badgeVariant || 'default'} 
                        className="text-xs px-2 py-0.5"
                      >
                        {item.badge}
                      </Badge>
                    )}
                    <ChevronRight className="h-4 w-4 text-medium-grey opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </button>
              )}
            </motion.div>
          )
        })}
      </nav>

      {/* User Profile Section */}
      <div className="p-4 border-t border-light-grey">
        <Card className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-vibrant-blue rounded-full flex items-center justify-center">
              <span className="text-sm font-semibold text-pure-white">
                {user?.full_name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || 'U'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-ui-label text-dark-charcoal truncate">
                {user?.is_private ? 'Abituriyent' : (user?.full_name || user?.email?.split('@')[0] || 'İstifadəçi')}
              </p>
              <div className="flex items-center space-x-2">
                <p className="text-caption text-medium-grey capitalize">
                  {user?.role === 'admin' ? 'Administrator' : 
                   user?.role === 'teacher' ? 'Müəllim' : 'Tələbə'}
                </p>
                {(isAdmin || isSuperAdmin) && (
                  <RoleBadge 
                    role={user?.role || 'student'} 
                    isSuperAdmin={isSuperAdmin}
                    size="sm"
                  />
                )}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )

  // Desktop sidebar
  if (!isMobile) {
    return (
      <aside className="hidden lg:flex lg:flex-shrink-0">
        <div className="w-80">
          {sidebarContent}
        </div>
      </aside>
    )
  }

  // Mobile sidebar with overlay
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-dark-charcoal/50 lg:hidden"
            onClick={onClose}
          />
          
          {/* Mobile Sidebar */}
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-y-0 left-0 z-50 w-80 lg:hidden"
          >
            {sidebarContent}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}