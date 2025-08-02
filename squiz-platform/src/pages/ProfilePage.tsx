import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useUserStats, useRecentActivity } from '@/hooks/useUserStats'
import { useUserPrivacySettings, useUpdatePrivacySetting } from '@/hooks/useSettings'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { Textarea } from '@/components/ui/Textarea'
import { Badge } from '@/components/ui/Badge'
import { User, Mail, Calendar, Edit, Save, X, BookOpen, MessageSquare, Trophy, TrendingUp, Clock, Star } from 'lucide-react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { formatDate } from '@/lib/utils'

export default function ProfilePage() {
  const { user, updateProfile } = useAuth()
  const { data: userStats, isLoading: statsLoading } = useUserStats()
  const { data: recentActivity, isLoading: activityLoading } = useRecentActivity()
  const { data: privacySettings, isLoading: privacyLoading } = useUserPrivacySettings()
  const updatePrivacyMutation = useUpdatePrivacySetting()
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    full_name: user?.full_name || '',
    email: user?.email || '',
    bio: ''
  })

  // Update bio from privacy settings when loaded
  useEffect(() => {
    if (privacySettings?.bio !== undefined) {
      setEditData(prev => ({
        ...prev,
        bio: privacySettings.bio || ''
      }))
    }
  }, [privacySettings])

  if (!user) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 text-center">
            <h2 className="text-lg font-semibold mb-2">Giriş Tələb Olunur</h2>
            <p className="text-slate-600 dark:text-slate-400">
              Profil səhifəsini görmək üçün giriş edin.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const handleSave = async () => {
    try {
      // Update profile (name)
      if (editData.full_name !== user?.full_name) {
        await updateProfile({
          full_name: editData.full_name
        })
      }
      
      // Update bio separately using privacy settings
      if (editData.bio !== (privacySettings?.bio || '')) {
        await updatePrivacyMutation.mutateAsync({
          bio: editData.bio
        })
      }
      
      setIsEditing(false)
      toast.success('Profil uğurla yeniləndi!')
    } catch (error) {
      toast.error('Profil yenilənərkən xəta baş verdi')
      console.error('Profile update error:', error)
    }
  }

  const handleCancel = () => {
    setEditData({
      full_name: user?.full_name || '',
      email: user?.email || '',
      bio: user?.bio || ''
    })
    setIsEditing(false)
  }

  const getRoleLabel = (role: string) => {
    const roleMap = {
      admin: 'Administrator',
      teacher: 'Müəllim',
      student: 'Tələbə'
    }
    return roleMap[role as keyof typeof roleMap] || role
  }

  const getRoleColor = (role: string) => {
    const colorMap = {
      admin: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      teacher: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      student: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    }
    return colorMap[role as keyof typeof colorMap] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6 px-4 sm:px-6 lg:px-8">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <CardTitle className="text-xl sm:text-2xl">İstifadəçi Profili</CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(!isEditing)}
                className="w-full sm:w-auto"
              >
                {isEditing ? (
                  <>
                    <X className="h-4 w-4 mr-2" />
                    Ləğv et
                  </>
                ) : (
                  <>
                    <Edit className="h-4 w-4 mr-2" />
                    Düzəlt
                  </>
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Avatar */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 text-center sm:text-left">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                {user.avatar_url ? (
                  <img 
                    src={user.avatar_url} 
                    alt={user.full_name} 
                    className="w-20 h-20 rounded-full object-cover"
                  />
                ) : (
                  <span className="text-2xl font-bold text-white">
                    {user.full_name?.charAt(0) || user.email?.charAt(0)?.toUpperCase() || 'U'}
                  </span>
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                  {user.full_name || 'Ad təyin edilməyib'}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 break-all">{user.email || 'Email not set'}</p>
                <div className="mt-2">
                  <Badge className={getRoleColor(user.role)}>
                    {getRoleLabel(user.role)}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Profile Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="full_name">Ad Soyad</Label>
                  {isEditing ? (
                    <Input
                      id="full_name"
                      value={editData.full_name}
                      onChange={(e) => setEditData(prev => ({ ...prev, full_name: e.target.value }))}
                      className="mt-1"
                    />
                  ) : (
                    <p className="mt-1 text-slate-900 dark:text-white font-medium">
                      {user.full_name || 'Ad təyin edilməyib'}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email">E-poçt</Label>
                  <div className="flex items-center mt-1">
                    <Mail className="h-4 w-4 mr-2 text-slate-400 flex-shrink-0" />
                    <span className="text-slate-900 dark:text-white break-all">{user.email || 'Email not set'}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label>Rol</Label>
                  <div className="flex items-center mt-1">
                    <User className="h-4 w-4 mr-2 text-slate-400" />
                    <Badge className={getRoleColor(user.role)}>
                      {getRoleLabel(user.role)}
                    </Badge>
                  </div>
                </div>

                <div>
                  <Label>Qeydiyyat Tarixi</Label>
                  <div className="flex items-center mt-1">
                    <Calendar className="h-4 w-4 mr-2 text-slate-400" />
                    <span className="text-slate-900 dark:text-white">
                      {new Date(user.created_at).toLocaleDateString('az-AZ')}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bio Section */}
            <div className="space-y-2">
              <Label htmlFor="bio">Bioqrafiya</Label>
              {isEditing ? (
                <Textarea
                  id="bio"
                  placeholder="Özünüz haqqında qısa məlumat yazın..."
                  value={editData.bio}
                  onChange={(e) => setEditData(prev => ({ ...prev, bio: e.target.value }))}
                  className="mt-1"
                  rows={4}
                  maxLength={500}
                />
              ) : (
                <div className="mt-1 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg min-h-[100px]">
                  {privacyLoading ? (
                    <p className="text-slate-500">Yüklənir...</p>
                  ) : privacySettings?.bio ? (
                    <p className="text-slate-900 dark:text-white whitespace-pre-wrap">
                      {privacySettings.bio}
                    </p>
                  ) : (
                    <p className="text-slate-500 italic">
                      Bioqrafiya məlumatı yoxdur. Düzəlt düyməsinə basaraq əlavə edin.
                    </p>
                  )}
                </div>
              )}
              {isEditing && (
                <p className="text-xs text-slate-500">
                  {editData.bio.length}/500 simvol
                </p>
              )}
            </div>

            {/* Save Button */}
            {isEditing && (
              <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3">
                <Button variant="outline" onClick={handleCancel} className="w-full sm:w-auto">
                  Ləğv et
                </Button>
                <Button onClick={handleSave} className="w-full sm:w-auto">
                  <Save className="h-4 w-4 mr-2" />
                  Saxla
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card className="card-hover">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <BookOpen className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {statsLoading ? '...' : userStats?.quizzesCreated || 0}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Yaradılan Quizlər</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="card-hover">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Trophy className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {statsLoading ? '...' : userStats?.quizzesCompleted || 0}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Tamamlanan Quizlər</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="card-hover">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <MessageSquare className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {statsLoading ? '...' : userStats?.forumPosts || 0}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Forum Yazıları</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="card-hover">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Star className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                  {statsLoading ? '...' : userStats?.averageScore || 0}%
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Ortalama Bal</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <span>Son Fəaliyyətlər</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {activityLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                <p className="mt-2 text-slate-600 dark:text-slate-400">Fəaliyyətlər yüklənir...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Quizzes */}
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-3">Son Quizlər</h4>
                  <div className="space-y-2">
                    {recentActivity?.quizzes?.slice(0, 3).map((quiz) => (
                      <div key={quiz.id} className="p-2 bg-slate-50 dark:bg-slate-800 rounded text-sm">
                        <p className="font-medium truncate">{quiz.title}</p>
                        <p className="text-slate-600 dark:text-slate-400 text-xs">
                          {formatDate(quiz.created_at)}
                        </p>
                      </div>
                    )) || <p className="text-slate-500 text-sm">Quiz yoxdur</p>}
                  </div>
                </div>

                {/* Recent Forum Posts */}
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-3">Son Forum Yazıları</h4>
                  <div className="space-y-2">
                    {recentActivity?.forumPosts?.slice(0, 3).map((post) => (
                      <div key={post.id} className="p-2 bg-slate-50 dark:bg-slate-800 rounded text-sm">
                        <p className="font-medium truncate">{post.title}</p>
                        <p className="text-slate-600 dark:text-slate-400 text-xs">
                          {formatDate(post.created_at)}
                        </p>
                      </div>
                    )) || <p className="text-slate-500 text-sm">Forum yazısı yoxdur</p>}
                  </div>
                </div>

                {/* Recent Quiz Attempts */}
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-3">Son Quiz Cəhdləri</h4>
                  <div className="space-y-2">
                    {recentActivity?.quizAttempts?.slice(0, 3).map((attempt) => (
                      <div key={attempt.id} className="p-2 bg-slate-50 dark:bg-slate-800 rounded text-sm">
                        <p className="font-medium truncate">{(attempt as any).quizzes?.title}</p>
                        <p className="text-slate-600 dark:text-slate-400 text-xs">
                          {formatDate(attempt.created_at)}
                        </p>
                      </div>
                    )) || <p className="text-slate-500 text-sm">Quiz cəhdi yoxdur</p>}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}