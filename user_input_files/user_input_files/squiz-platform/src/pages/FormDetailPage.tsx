import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useForm as useFormHook, Controller } from 'react-hook-form'
import { useForm, useFormReplies, useSubmitForm, useCreateFormReply, useIncrementFormViewCount, useVoteOnFormReply, useToggleFormLike, useCheckFormLike, useFormAttachments } from '@/hooks/useForms'
import { useAuth } from '@/contexts/AuthContext'
import { useAdmin } from '@/contexts/AdminContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/Badge'
import { Separator } from '@/components/ui/Separator'
import { Label } from '@/components/ui/Label'
import { 
  ArrowLeft, 
  Send, 
  MessageCircle, 
  Eye, 
  Calendar,
  User,
  CheckCircle,
  Loader2,
  Lock,
  ThumbsUp,
  ThumbsDown,
  Paperclip,
  Download,
  FileText,
  Image as ImageIcon,
  Heart
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { formatDistanceToNow } from 'date-fns'
import { toast } from 'sonner'
import ImageUploadCrop from '@/components/ImageUploadCrop'
import { AdminDeleteButton } from '@/components/admin/AdminDeleteButton'

export default function FormDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { isAdmin } = useAdmin()
  const { data: form, isLoading, error } = useForm(id!)
  const { data: replies, refetch: refetchReplies } = useFormReplies(id!)
  const submitFormMutation = useSubmitForm()
  const createReplyMutation = useCreateFormReply()
  const incrementViewMutation = useIncrementFormViewCount()
  const voteOnReplyMutation = useVoteOnFormReply()
  const toggleLikeMutation = useToggleFormLike()
  const { data: formStats } = useCheckFormLike(id!)
  const { data: attachments } = useFormAttachments(id!)
  
  const [accessCode, setAccessCode] = useState('')
  const [hasAccess, setHasAccess] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [replyContent, setReplyContent] = useState('')
  const [showReplies, setShowReplies] = useState(false)
  const [optimisticReplies, setOptimisticReplies] = useState<any[]>([])
  
  // Form submission hook
  const formHook = useFormHook({
    defaultValues: {}
  })
  
  // Sync optimistic replies with actual replies data
  useEffect(() => {
    if (replies) {
      setOptimisticReplies(replies)
    }
  }, [replies])

  // Check access and increment view count
  useEffect(() => {
    if (form) {
      if (form.is_public) {
        setHasAccess(true)
        incrementViewMutation.mutate(form.id)
      } else {
        // Private form - check if user provided access code
        if (accessCode === form.access_code) {
          setHasAccess(true)
          incrementViewMutation.mutate(form.id)
        }
      }
    }
  }, [form, accessCode])
  
  const handleAccessCodeSubmit = () => {
    if (!form) return
    
    if (accessCode === form.access_code) {
      setHasAccess(true)
      incrementViewMutation.mutate(form.id)
      toast.success('Access granted!')
    } else {
      toast.error('Invalid access code')
    }
  }
  
  const handleFormSubmit = formHook.handleSubmit(async (data) => {
    if (!form) return
    
    try {
      await submitFormMutation.mutateAsync({
        formId: form.id,
        submissionData: data
      })
      setIsSubmitted(true)
      toast.success('Form submitted successfully!')
    } catch (error) {
      console.error('Form submission error:', error)
    }
  })
  
  const handleAddReply = async () => {
    if (!form || !replyContent.trim() || !user) return
    
    const tempReply = {
      id: `temp-${Date.now()}`,
      form_id: form.id,
      author_id: user.id,
      content: replyContent.trim(),
      likes: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      author: {
        full_name: user.full_name || 'You',
        avatar_url: user.avatar_url
      }
    }
    
    // Optimistic update - add reply to UI immediately
    setOptimisticReplies(prevReplies => [...prevReplies, tempReply])
    setReplyContent('')
    
    try {
      await createReplyMutation.mutateAsync({
        formId: form.id,
        content: tempReply.content
      })
      // Refetch to get the real reply data and remove optimistic reply
      refetchReplies()
    } catch (error) {
      console.error('Reply error:', error)
      // Remove optimistic reply on error
      setOptimisticReplies(prevReplies => 
        prevReplies.filter(reply => reply.id !== tempReply.id)
      )
      // Restore the content for user to retry
      setReplyContent(tempReply.content)
    }
  }
  
  const handleVoteOnReply = (replyId: string, voteType: 'up' | 'down') => {
    if (!user) {
      toast.error('Please log in to vote')
      return
    }
    
    voteOnReplyMutation.mutate({ replyId, voteType })
  }
  
  const renderFormField = (field: any) => {
    const fieldProps = {
      required: field.is_required,
      placeholder: field.placeholder || `Enter ${field.label.toLowerCase()}`
    }
    
    switch (field.field_type) {
      case 'text':
        return (
          <Controller
            name={field.id}
            control={formHook.control}
            rules={{ required: field.is_required ? `${field.label} is required` : false }}
            render={({ field: hookField, fieldState }) => (
              <div>
                <Input {...fieldProps} {...hookField} />
                {fieldState.error && (
                  <p className="text-sm text-red-600 mt-1">{fieldState.error.message}</p>
                )}
              </div>
            )}
          />
        )
      
      case 'email':
        return (
          <Controller
            name={field.id}
            control={formHook.control}
            rules={{ 
              required: field.is_required ? `${field.label} is required` : false,
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            }}
            render={({ field: hookField, fieldState }) => (
              <div>
                <Input type="email" {...fieldProps} {...hookField} />
                {fieldState.error && (
                  <p className="text-sm text-red-600 mt-1">{fieldState.error.message}</p>
                )}
              </div>
            )}
          />
        )
      
      case 'number':
        return (
          <Controller
            name={field.id}
            control={formHook.control}
            rules={{ required: field.is_required ? `${field.label} is required` : false }}
            render={({ field: hookField, fieldState }) => (
              <div>
                <Input type="number" {...fieldProps} {...hookField} />
                {fieldState.error && (
                  <p className="text-sm text-red-600 mt-1">{fieldState.error.message}</p>
                )}
              </div>
            )}
          />
        )
      
      case 'textarea':
        return (
          <Controller
            name={field.id}
            control={formHook.control}
            rules={{ required: field.is_required ? `${field.label} is required` : false }}
            render={({ field: hookField, fieldState }) => (
              <div>
                <Textarea rows={4} {...fieldProps} {...hookField} />
                {fieldState.error && (
                  <p className="text-sm text-red-600 mt-1">{fieldState.error.message}</p>
                )}
              </div>
            )}
          />
        )
      
      case 'radio':
        return (
          <Controller
            name={field.id}
            control={formHook.control}
            rules={{ required: field.is_required ? `${field.label} is required` : false }}
            render={({ field: hookField, fieldState }) => (
              <div>
                <div className="space-y-2">
                  {field.options?.map((option: string, index: number) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id={`${field.id}-${index}`}
                        value={option}
                        checked={hookField.value === option}
                        onChange={() => hookField.onChange(option)}
                        className="text-blue-600"
                      />
                      <label htmlFor={`${field.id}-${index}`} className="text-sm">
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
                {fieldState.error && (
                  <p className="text-sm text-red-600 mt-1">{fieldState.error.message}</p>
                )}
              </div>
            )}
          />
        )
      
      case 'checkbox':
        return (
          <Controller
            name={field.id}
            control={formHook.control}
            rules={{ required: field.is_required ? `${field.label} is required` : false }}
            render={({ field: hookField, fieldState }) => (
              <div>
                <div className="space-y-2">
                  {field.options?.map((option: string, index: number) => {
                    const values = hookField.value || []
                    const isChecked = values.includes(option)
                    
                    return (
                      <div key={index} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`${field.id}-${index}`}
                          checked={isChecked}
                          onChange={(e) => {
                            if (e.target.checked) {
                              hookField.onChange([...values, option])
                            } else {
                              hookField.onChange(values.filter((v: string) => v !== option))
                            }
                          }}
                          className="text-blue-600"
                        />
                        <label htmlFor={`${field.id}-${index}`} className="text-sm">
                          {option}
                        </label>
                      </div>
                    )
                  })}
                </div>
                {fieldState.error && (
                  <p className="text-sm text-red-600 mt-1">{fieldState.error.message}</p>
                )}
              </div>
            )}
          />
        )
      
      case 'image':
        return (
          <Controller
            name={field.id}
            control={formHook.control}
            rules={{ required: field.is_required ? `${field.label} is required` : false }}
            render={({ field: hookField, fieldState }) => (
              <div>
                <ImageUploadCrop
                  onImageUploaded={(imageUrl) => hookField.onChange(imageUrl)}
                  onImageRemoved={() => hookField.onChange('')}
                  existingImageUrl={hookField.value}
                  allowCrop={true}
                  maxSizeInMB={10}
                />
                {fieldState.error && (
                  <p className="text-sm text-red-600 mt-1">{fieldState.error.message}</p>
                )}
              </div>
            )}
          />
        )
      
      default:
        return <Input {...fieldProps} />
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
  
  // Only show error if there's an actual error AND we're not loading
  if (error && !isLoading && error.message !== 'No rows returned') {
    return (
      <div className="max-w-2xl mx-auto text-center px-4 py-8">
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-lg font-semibold mb-2">Form Not Found</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              This form doesn't exist or you don't have access to it.
            </p>
            <Button onClick={() => navigate('/forms')}>Back to Forms</Button>
          </CardContent>
        </Card>
      </div>
    )
  }
  
  // Only show "not found" if we're definitely done loading and there's no form
  if (!isLoading && !form && !error) {
    return (
      <div className="max-w-2xl mx-auto text-center px-4 py-8">
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-lg font-semibold mb-2">Form Not Found</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              This form doesn't exist or you don't have access to it.
            </p>
            <Button onClick={() => navigate('/forms')}>Back to Forms</Button>
          </CardContent>
        </Card>
      </div>
    )
  }
  
  // Access code required
  if (!form.is_public && !hasAccess) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mb-4">
              <Lock className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
            <CardTitle>Access Code Required</CardTitle>
            <CardDescription>
              This form is private. Please enter the access code to continue.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="access-code">Access Code</Label>
              <Input
                id="access-code"
                type="text"
                placeholder="Enter access code"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAccessCodeSubmit()}
              />
            </div>
            <div className="flex space-x-2">
              <Button 
                onClick={() => navigate('/forms')} 
                variant="outline" 
                className="flex-1"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <Button 
                onClick={handleAccessCodeSubmit}
                disabled={!accessCode.trim()}
                className="flex-1"
              >
                Access Form
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }
  
  return (
    <div className="max-w-4xl mx-auto space-y-6 px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center space-x-4 mb-6">
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => navigate('/forms')}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              {form.title}
            </h1>
            {form.description && (
              <p className="mt-2 text-slate-600 dark:text-slate-400">
                {form.description}
              </p>
            )}
          </div>
        </div>
        
        {/* Form Meta */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
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
            <span>{form.view_count} views</span>
          </div>
          <div className="flex items-center space-x-1">
            <Send className="h-4 w-4" />
            <span>{form.submission_count} submissions</span>
          </div>
          {user && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleLikeMutation.mutate(form.id)}
              disabled={toggleLikeMutation.isPending}
              className="flex items-center space-x-1 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950 dark:hover:text-red-400"
            >
              <Heart 
                className={`h-4 w-4 ${formStats?.user_liked ? 'fill-current text-red-600' : ''}`} 
              />
              <span>{formStats?.total_likes || 0}</span>
            </Button>
          )}
          <Badge variant={form.is_public ? "default" : "secondary"}>
            {form.is_public ? "Public" : "Private"}
          </Badge>
          {isAdmin && (
            <AdminDeleteButton
              itemType="form"
              itemId={form.id}
              itemName={form.title}
              onDeleted={() => navigate('/forms')}
              size="sm"
              variant="button"
              className="ml-4"
            />
          )}
        </div>
      </motion.div>
      
      {/* Form Attachments */}
      {attachments && attachments.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Paperclip className="h-5 w-5" />
                <span>Attachments</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {attachments.map((attachment) => {
                  const isImage = attachment.is_image || attachment.mime_type?.startsWith('image/')
                  const isPdf = attachment.mime_type === 'application/pdf'
                  
                  return (
                    <div
                      key={attachment.id}
                      className="flex items-center space-x-3 p-3 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                    >
                      {/* File Icon or Preview */}
                      <div className="flex-shrink-0">
                        {isImage && attachment.file_path ? (
                          <div className="w-12 h-12 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600">
                            <img
                              src={attachment.file_path}
                              alt={attachment.original_name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                // Fallback to icon if image fails to load
                                const target = e.target as HTMLImageElement
                                target.style.display = 'none'
                                const iconDiv = target.parentElement
                                if (iconDiv) {
                                  iconDiv.innerHTML = '<div class="w-12 h-12 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center"><svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" /></svg></div>'
                                }
                              }}
                            />
                          </div>
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                            {isPdf ? (
                              <FileText className="h-4 w-4 text-red-600" />
                            ) : isImage ? (
                              <ImageIcon className="h-4 w-4 text-blue-600" />
                            ) : (
                              <Paperclip className="h-4 w-4 text-gray-600" />
                            )}
                          </div>
                        )}
                      </div>
                      
                      {/* File Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                            {attachment.original_name}
                          </p>
                          {isImage && (
                            <Badge variant="secondary" className="text-xs">
                              Image
                            </Badge>
                          )}
                          {isPdf && (
                            <Badge variant="secondary" className="text-xs">
                              PDF
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-400">
                          {(attachment.file_size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                      
                      {/* Download/View Button */}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          if (attachment.file_path) {
                            if (isPdf || isImage) {
                              // Open in new tab for viewing
                              window.open(attachment.file_path, '_blank')
                            } else {
                              // Download for other file types
                              const link = document.createElement('a')
                              link.href = attachment.file_path
                              link.download = attachment.original_name
                              link.target = '_blank'
                              document.body.appendChild(link)
                              link.click()
                              document.body.removeChild(link)
                            }
                          }
                        }}
                        className="flex-shrink-0"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
      
      {/* Success Message */}
      {isSubmitted && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="border-green-200 bg-green-50 dark:bg-green-900/20">
            <CardContent className="pt-6">
              <div className="text-center">
                <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">
                  Form Submitted Successfully!
                </h3>
                <p className="text-green-700 dark:text-green-300">
                  Thank you for your submission. Your response has been recorded.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
      
      {/* Form */}
      {!isSubmitted && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Fill Out Form</CardTitle>
              <CardDescription>
                Please complete all required fields marked with *
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleFormSubmit} className="space-y-6">
                {form.fields?.map((field) => (
                  <div key={field.id} className="space-y-2">
                    <Label>
                      {field.label}
                      {field.is_required && <span className="text-red-500 ml-1">*</span>}
                    </Label>
                    {renderFormField(field)}
                  </div>
                ))}
                
                <div className="pt-4">
                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={submitFormMutation.isPending}
                  >
                    {submitFormMutation.isPending ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Submit Form
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      )}
      
      {/* File Attachments Section */}
      {form.settings?.attachments && form.settings.attachments.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Paperclip className="h-5 w-5" />
                <CardTitle>Attachments</CardTitle>
                <Badge variant="outline">{form.settings.attachments.length}</Badge>
              </div>
              <CardDescription>
                Files shared with this form
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {form.settings.attachments.map((attachment: any, index: number) => {
                  const isImage = attachment.isImage || attachment.type?.startsWith('image/')
                  const isPdf = attachment.type === 'application/pdf'
                  
                  return (
                    <div
                      key={attachment.id || index}
                      className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      {/* File Icon or Preview */}
                      <div className="flex-shrink-0">
                        {isImage && attachment.url ? (
                          <div className="w-12 h-12 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600">
                            <img
                              src={attachment.url}
                              alt={attachment.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                // Fallback to icon if image fails to load
                                const target = e.target as HTMLImageElement
                                target.style.display = 'none'
                                const iconDiv = target.parentElement
                                if (iconDiv) {
                                  iconDiv.innerHTML = '<div class="w-12 h-12 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center"><svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" /></svg></div>'
                                }
                              }}
                            />
                          </div>
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                            {isPdf ? (
                              <FileText className="h-4 w-4 text-red-600" />
                            ) : isImage ? (
                              <ImageIcon className="h-4 w-4 text-blue-600" />
                            ) : (
                              <Paperclip className="h-4 w-4 text-gray-600" />
                            )}
                          </div>
                        )}
                      </div>
                      
                      {/* File Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                            {attachment.name}
                          </p>
                          {isImage && (
                            <Badge variant="secondary" className="text-xs">
                              Image
                            </Badge>
                          )}
                          {isPdf && (
                            <Badge variant="secondary" className="text-xs">
                              PDF
                            </Badge>
                          )}
                        </div>
                        
                        {attachment.size && (
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {(attachment.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        )}
                      </div>
                      
                      {/* Download Button */}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          if (attachment.url) {
                            const link = document.createElement('a')
                            link.href = attachment.url
                            link.download = attachment.name
                            link.target = '_blank'
                            link.click()
                          }
                        }}
                        className="h-8 w-8 p-0 hover:bg-blue-50 dark:hover:bg-blue-950/20"
                        title="Download file"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  )
                })}
              </div>
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
              <div className="flex items-center space-x-2">
                <MessageCircle className="h-5 w-5" />
                <CardTitle>Community Discussion</CardTitle>
                <Badge variant="outline">{optimisticReplies?.length || 0}</Badge>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowReplies(!showReplies)}
              >
                {showReplies ? 'Hide' : 'Show'} Replies
              </Button>
            </div>
          </CardHeader>
          
          <AnimatePresence>
            {showReplies && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <CardContent className="space-y-4">
                  {/* Add Reply */}
                  {user && (
                    <div className="space-y-2">
                      <Textarea
                        placeholder="Share your thoughts about this form..."
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        rows={3}
                      />
                      <div className="flex justify-end">
                        <Button 
                          onClick={handleAddReply}
                          disabled={!replyContent.trim() || createReplyMutation.isPending}
                          size="sm"
                        >
                          {createReplyMutation.isPending ? (
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          ) : (
                            <Send className="h-4 w-4 mr-2" />
                          )}
                          Add Reply
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {!user && (
                    <div className="text-center py-4">
                      <p className="text-slate-600 dark:text-slate-400 mb-2">
                        Login to join the discussion
                      </p>
                      <Button onClick={() => navigate('/login')} variant="outline" size="sm">
                        Login
                      </Button>
                    </div>
                  )}
                  
                  <Separator />
                  
                  {/* Replies List */}
                  {optimisticReplies && optimisticReplies.length > 0 ? (
                    <div className="space-y-4">
                      {optimisticReplies.map((reply) => (
                        <div key={reply.id} className="border-l-2 border-slate-200 dark:border-slate-700 pl-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
                              <span className="font-medium">{reply.author?.full_name || 'Anonymous'}</span>
                              <span>•</span>
                              <span>{formatDistanceToNow(new Date(reply.created_at), { addSuffix: true })}</span>
                            </div>
                            {user && (
                              <div className="flex items-center space-x-1">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => voteOnReplyMutation.mutate({ replyId: reply.id, voteType: 'up' })}
                                  disabled={voteOnReplyMutation.isPending}
                                  className="h-8 px-2 text-slate-600 hover:text-green-600"
                                >
                                  <ThumbsUp className="h-3 w-3" />
                                  <span className="ml-1 text-xs">{reply.likes || 0}</span>
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => voteOnReplyMutation.mutate({ replyId: reply.id, voteType: 'down' })}
                                  disabled={voteOnReplyMutation.isPending}
                                  className="h-8 px-2 text-slate-600 hover:text-red-600"
                                >
                                  <ThumbsDown className="h-3 w-3" />
                                </Button>
                              </div>
                            )}
                          </div>
                          <div className="flex items-start justify-between">
                            <p className="text-slate-700 dark:text-slate-300 flex-1">{reply.content}</p>
                            {isAdmin && (
                              <div className="ml-2">
                                <AdminDeleteButton
                                  itemType="form_reply"
                                  itemId={reply.id}
                                  itemName={`Reply by ${reply.author?.full_name || 'Anonymous'}`}
                                  onDeleted={() => refetchReplies()}
                                  size="sm"
                                  variant="icon"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <MessageCircle className="h-12 w-12 text-slate-400 mx-auto mb-2" />
                      <p className="text-slate-600 dark:text-slate-400">
                        No replies yet. Be the first to start the discussion!
                      </p>
                    </div>
                  )}
                </CardContent>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </motion.div>
    </div>
  )
}
