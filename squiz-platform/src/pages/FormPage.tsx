import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useForm, useIncrementFormViewCount, useSubmitForm, useReplyToForm } from '@/hooks/useForms'
import { useAuth } from '@/contexts/AuthContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/Textarea'
import { Label } from '@/components/ui/Label'
import { Badge } from '@/components/ui/Badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar'
import { Separator } from '@/components/ui/Separator'
import { motion } from 'framer-motion'
import { 
  Eye, 
  MessageSquare, 
  User, 
  Calendar, 
  Send, 
  Loader2,
  AlertTriangle,
  ArrowLeft,
  Share2
} from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { toast } from 'sonner'

export default function FormPage() {
  const { id } = useParams<{ id: string }>()
  const { user } = useAuth()
  const { data: form, isLoading, error } = useForm(id!)
  const incrementViewMutation = useIncrementFormViewCount()
  const submitFormMutation = useSubmitForm()
  const replyMutation = useReplyToForm()
  
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [replyContent, setReplyContent] = useState('')
  const [showReplyForm, setShowReplyForm] = useState(false)

  // Increment view count on mount
  useEffect(() => {
    if (id && !isLoading && form) {
      incrementViewMutation.mutate(id)
    }
  }, [id, isLoading, form])

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!id) return

    try {
      await submitFormMutation.mutateAsync({
        formId: id,
        submissionData: formData
      })
      setFormData({})
    } catch (error) {
      // Error handled in mutation
    }
  }

  const handleReplySubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!id || !replyContent.trim()) return

    try {
      await replyMutation.mutateAsync({
        formId: id,
        content: replyContent.trim()
      })
      setReplyContent('')
      setShowReplyForm(false)
    } catch (error) {
      // Error handled in mutation
    }
  }

  const renderFormField = (field: any) => {
    const fieldId = `field-${field.id}`
    const value = formData[field.id] || ''

    switch (field.field_type) {
      case 'text':
      case 'email':
      case 'number':
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={fieldId}>
              {field.label}
              {field.is_required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Input
              id={fieldId}
              type={field.field_type}
              value={value}
              onChange={(e) => setFormData(prev => ({ ...prev, [field.id]: e.target.value }))}
              placeholder={field.placeholder || ''}
              required={field.is_required}
            />
          </div>
        )
      
      case 'textarea':
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={fieldId}>
              {field.label}
              {field.is_required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Textarea
              id={fieldId}
              value={value}
              onChange={(e) => setFormData(prev => ({ ...prev, [field.id]: e.target.value }))}
              placeholder={field.placeholder || ''}
              required={field.is_required}
              rows={4}
            />
          </div>
        )
      
      case 'radio':
      case 'checkbox':
        return (
          <div key={field.id} className="space-y-2">
            <Label>
              {field.label}
              {field.is_required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <div className="space-y-2">
              {field.options?.map((option: string, index: number) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type={field.field_type}
                    id={`${fieldId}-${index}`}
                    name={fieldId}
                    value={option}
                    checked={field.field_type === 'radio' 
                      ? value === option 
                      : Array.isArray(value) && value.includes(option)
                    }
                    onChange={(e) => {
                      if (field.field_type === 'radio') {
                        setFormData(prev => ({ ...prev, [field.id]: option }))
                      } else {
                        const currentValue = Array.isArray(value) ? value : []
                        const newValue = e.target.checked
                          ? [...currentValue, option]
                          : currentValue.filter(v => v !== option)
                        setFormData(prev => ({ ...prev, [field.id]: newValue }))
                      }
                    }}
                    required={field.is_required && field.field_type === 'radio'}
                    className="rounded border-gray-300"
                  />
                  <Label htmlFor={`${fieldId}-${index}`} className="text-sm font-normal">
                    {option}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        )
      
      default:
        return null
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-slate-600 dark:text-slate-400">Loading form...</p>
        </div>
      </div>
    )
  }

  if (error || !form) {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <Card>
          <CardContent className="pt-6">
            <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-lg font-semibold mb-2">Form Not Found</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              The form you're looking for doesn't exist or has been removed.
            </p>
            <Button onClick={() => window.history.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 px-4 sm:px-6 lg:px-8 py-6">
      {/* Form Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-2xl mb-2">{form.title}</CardTitle>
                {form.description && (
                  <CardDescription className="text-base mb-4">
                    {form.description}
                  </CardDescription>
                )}
                
                <div className="flex items-center space-x-4 text-sm text-slate-600 dark:text-slate-400">
                  <div className="flex items-center space-x-1">
                    <User className="h-4 w-4" />
                    <span>{form.creator?.full_name || 'Anonymous'}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDistanceToNow(new Date(form.created_at), { addSuffix: true })}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Eye className="h-4 w-4" />
                    <span>{form.view_count || 0} baxış</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MessageSquare className="h-4 w-4" />
                    <span>{form.replies?.length || 0} replies</span>
                  </div>
                </div>
              </div>
              
              <Badge variant={form.is_public ? 'default' : 'secondary'}>
                {form.is_public ? 'Public' : 'Private'}
              </Badge>
            </div>
          </CardHeader>
        </Card>
      </motion.div>

      {/* Form Fields */}
      {form.fields && form.fields.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Form</CardTitle>
              <CardDescription>
                Fill out the form below to submit your response.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleFormSubmit} className="space-y-6">
                {form.fields
                  .sort((a, b) => a.order_index - b.order_index)
                  .map(renderFormField)}
                
                <div className="flex justify-end">
                  <Button 
                    type="submit" 
                    disabled={submitFormMutation.isPending}
                    size="lg"
                  >
                    {submitFormMutation.isPending ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4 mr-2" />
                    )}
                    Submit Form
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Replies Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Discussion</CardTitle>
                <CardDescription>
                  {form.replies?.length || 0} replies
                </CardDescription>
              </div>
              {user && (
                <Button 
                  onClick={() => setShowReplyForm(!showReplyForm)}
                  variant={showReplyForm ? 'outline' : 'default'}
                >
                  {showReplyForm ? 'Cancel' : 'Add Reply'}
                </Button>
              )}
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {/* Reply Form */}
            {showReplyForm && user && (
              <form onSubmit={handleReplySubmit} className="space-y-4">
                <Textarea
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="Write your reply..."
                  rows={4}
                  required
                />
                <div className="flex justify-end space-x-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => {
                      setShowReplyForm(false)
                      setReplyContent('')
                    }}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={replyMutation.isPending || !replyContent.trim()}
                  >
                    {replyMutation.isPending ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4 mr-2" />
                    )}
                    Post Reply
                  </Button>
                </div>
              </form>
            )}
            
            {showReplyForm && <Separator />}
            
            {/* Replies List */}
            {form.replies && form.replies.length > 0 ? (
              <div className="space-y-4">
                {form.replies.map((reply) => (
                  <div key={reply.id} className="flex space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={reply.author?.avatar_url} />
                      <AvatarFallback>
                        {reply.author?.full_name?.charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-sm">
                          {reply.author?.full_name || 'Anonymous'}
                        </span>
                        <span className="text-xs text-slate-500">
                          {formatDistanceToNow(new Date(reply.created_at), { addSuffix: true })}
                        </span>
                      </div>
                      <p className="text-sm text-slate-700 dark:text-slate-300">
                        {reply.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-slate-500">
                <MessageSquare className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>No replies yet. Be the first to start the discussion!</p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
