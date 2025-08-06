import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useCreateForm } from '@/hooks/useForms'
import { useAuth } from '@/contexts/AuthContext'
import { CategorySelect } from '@/components/admin/CategorySelect'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/Label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/Checkbox'
import { Switch } from '@/components/ui/Switch'
import { Separator } from '@/components/ui/Separator'
import { Badge } from '@/components/ui/Badge'
import MathInput from '@/components/MathInput'
import MathRenderer from '@/components/MathRenderer'
import { motion } from 'framer-motion'
import { Plus, Trash2, Save, Eye, EyeOff, Loader2, ArrowLeft, Paperclip, Calculator } from 'lucide-react'
import { toast } from 'sonner'
import FileUpload, { FileItem } from '@/components/FileUpload'
import { useFileUpload } from '@/hooks/useFileUpload'

const fieldSchema = z.object({
  field_type: z.enum(['text', 'email', 'number', 'textarea', 'radio', 'checkbox']),
  label: z.string().min(1, 'Label is required'),
  placeholder: z.string().optional(),
  options: z.array(z.string()).optional(),
  is_required: z.boolean().default(false),
  validation_rules: z.record(z.any()).default({})
})

const formSchema = z.object({
  title: z.string().min(1, 'Form title is required'),
  description: z.string().optional(),
  category_id: z.string().optional(),
  is_public: z.boolean().default(true),
  access_code: z.string().optional(),
  fields: z.array(fieldSchema).min(1, 'At least one field is required')
})

type FormData = z.infer<typeof formSchema>
type FieldData = z.infer<typeof fieldSchema>

const FIELD_TYPES = [
  { value: 'text', label: 'Text Input' },
  { value: 'email', label: 'Email Input' },
  { value: 'number', label: 'Number Input' },
  { value: 'textarea', label: 'Textarea' },
  { value: 'radio', label: 'Radio Buttons' },
  { value: 'checkbox', label: 'Checkboxes' }
]

export default function CreateFormPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [previewMode, setPreviewMode] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [attachedFiles, setAttachedFiles] = useState<FileItem[]>([])
  const [useMathDescription, setUseMathDescription] = useState(false)
  const createFormMutation = useCreateForm()
  const { uploadFiles } = useFileUpload({ maxFiles: 5, maxSizeInMB: 10 })
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      category_id: '',
      is_public: true,
      access_code: '',
      fields: []
    }
  })
  
  const { fields, append, remove, update } = useFieldArray({
    control: form.control,
    name: 'fields'
  })
  
  const watchedFields = form.watch('fields')
  const watchedForm = form.watch()
  
  const addField = () => {
    append({
      field_type: 'text',
      label: '',
      placeholder: '',
      options: [],
      is_required: false,
      validation_rules: {}
    })
  }
  
  const updateField = (index: number, updates: Partial<FieldData>) => {
    const currentField = watchedFields[index]
    update(index, { ...currentField, ...updates })
  }
  
  const addOption = (fieldIndex: number) => {
    const field = watchedFields[fieldIndex]
    const newOptions = [...(field.options || []), '']
    updateField(fieldIndex, { options: newOptions })
  }
  
  const updateOption = (fieldIndex: number, optionIndex: number, value: string) => {
    const field = watchedFields[fieldIndex]
    const newOptions = [...(field.options || [])]
    newOptions[optionIndex] = value
    updateField(fieldIndex, { options: newOptions })
  }
  
  const removeOption = (fieldIndex: number, optionIndex: number) => {
    const field = watchedFields[fieldIndex]
    const newOptions = (field.options || []).filter((_, i) => i !== optionIndex)
    updateField(fieldIndex, { options: newOptions })
  }
  
  const onSubmit = async (data: FormData) => {
    try {
      const result = await createFormMutation.mutateAsync({
        title: data.title,
        description: data.description,
        category_id: selectedCategory || null,
        is_public: data.is_public,
        access_code: data.access_code,
        settings: {
          fields: data.fields.map((field, index) => ({
            ...field,
            order_index: index + 1
          })),
          attachments: attachedFiles.map(file => ({
            id: file.id,
            name: file.name,
            type: file.type,
            size: file.size,
            url: file.url,
            isImage: file.isImage
          }))
        }
      })
      
      toast.success('Form created successfully!')
      navigate(`/form/${result.id}`)
    } catch (error) {
      // Error handled in mutation
    }
  }
  
  if (!user) {
    return (
      <div className="min-h-[400px] flex items-center justify-center px-4">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 text-center">
            <h2 className="text-lg font-semibold mb-2">Login Required</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Please login to create forms.
            </p>
            <Button onClick={() => navigate('/login')} className="w-full sm:w-auto">
              Login
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }
  
  const renderFieldEditor = (field: FieldData, index: number) => {
    const needsOptions = ['radio', 'checkbox'].includes(field.field_type)
    
    return (
      <Card key={index}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Field {index + 1}</CardTitle>
            <Button 
              type="button" 
              variant="destructive" 
              size="sm" 
              onClick={() => remove(index)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Field Type</Label>
              <Select 
                value={field.field_type || 'text'} 
                onValueChange={(value) => updateField(index, { field_type: value as any })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select field type" />
                </SelectTrigger>
                <SelectContent>
                  {FIELD_TYPES.map(type => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label>Label</Label>
              <Input
                value={field.label || ''}
                onChange={(e) => updateField(index, { label: e.target.value })}
                placeholder="Enter field label"
              />
            </div>
          </div>
          
          <div>
            <Label>Placeholder</Label>
            <Input
              value={field.placeholder || ''}
              onChange={(e) => updateField(index, { placeholder: e.target.value })}
              placeholder="Enter placeholder text (optional)"
            />
          </div>
          
          {needsOptions && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>Options</Label>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  onClick={() => addOption(index)}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Option
                </Button>
              </div>
              <div className="space-y-2">
                {(field.options || []).map((option, optionIndex) => (
                  <div key={optionIndex} className="flex items-center space-x-2">
                    <Input
                      value={option}
                      onChange={(e) => updateOption(index, optionIndex, e.target.value)}
                      placeholder={`Option ${optionIndex + 1}`}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeOption(index, optionIndex)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={field.is_required || false}
              onCheckedChange={(checked) => updateField(index, { is_required: !!checked })}
            />
            <Label>Required field</Label>
          </div>
        </CardContent>
      </Card>
    )
  }
  
  const renderFieldPreview = (field: FieldData, index: number) => {
    const fieldId = `preview-field-${index}`
    
    switch (field.field_type) {
      case 'text':
      case 'email':
      case 'number':
        return (
          <div key={index} className="space-y-2">
            <Label htmlFor={fieldId}>
              {field.label}
              {field.is_required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Input
              id={fieldId}
              type={field.field_type}
              placeholder={field.placeholder || ''}
              disabled
            />
          </div>
        )
        
      case 'textarea':
        return (
          <div key={index} className="space-y-2">
            <Label htmlFor={fieldId}>
              {field.label}
              {field.is_required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Textarea
              id={fieldId}
              placeholder={field.placeholder || ''}
              disabled
              rows={4}
            />
          </div>
        )
        
      case 'radio':
      case 'checkbox':
        return (
          <div key={index} className="space-y-2">
            <Label>
              {field.label}
              {field.is_required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <div className="space-y-2">
              {(field.options || []).map((option, optionIndex) => (
                <div key={optionIndex} className="flex items-center space-x-2">
                  <input
                    type={field.field_type}
                    id={`${fieldId}-${optionIndex}`}
                    name={fieldId}
                    disabled
                    className="rounded border-gray-300"
                  />
                  <Label htmlFor={`${fieldId}-${optionIndex}`} className="text-sm font-normal">
                    {option || `Option ${optionIndex + 1}`}
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
  
  return (
    <div className="max-w-6xl mx-auto space-y-6 px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">Create Form</h1>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Build custom forms for data collection and community interaction
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setPreviewMode(!previewMode)}
            >
              {previewMode ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
              {previewMode ? 'Edit' : 'Preview'}
            </Button>
            <Button onClick={() => navigate(-1)} variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </div>
        </div>
      </motion.div>
      
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form Settings */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Form Settings</CardTitle>
                <CardDescription>
                  Configure your form's basic information and access settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Form Title</Label>
                  <Input
                    {...form.register('title')}
                    placeholder="Enter form title"
                  />
                  {form.formState.errors.title && (
                    <p className="text-sm text-red-500 mt-1">
                      {form.formState.errors.title.message}
                    </p>
                  )}
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>Description</Label>
                    <div className="flex items-center space-x-2">
                      <Calculator className="h-4 w-4" />
                      <Label htmlFor="desc-math-toggle" className="text-sm">Riyazi düstur</Label>
                      <Switch 
                        id="desc-math-toggle"
                        checked={useMathDescription}
                        onCheckedChange={setUseMathDescription}
                      />
                    </div>
                  </div>
                  
                  {useMathDescription ? (
                    <div className="space-y-2">
                      <MathInput
                        value={form.watch('description') || ''}
                        onChange={(value) => form.setValue('description', value)}
                        placeholder="LaTeX syntax istifadə edərək formun təsvirini yazın"
                        label=""
                      />
                      {form.watch('description') && (
                        <div className="p-3 border rounded-lg bg-slate-50 dark:bg-slate-900">
                          <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Önizləmə:</p>
                          <MathRenderer>{form.watch('description') || ''}</MathRenderer>
                        </div>
                      )}
                    </div>
                  ) : (
                    <Textarea
                      {...form.register('description')}
                      placeholder="Describe your form's purpose"
                      rows={3}
                    />
                  )}
                </div>
                
                <div>
                  <CategorySelect
                    type="form"
                    value={selectedCategory}
                    onValueChange={setSelectedCategory}
                    placeholder="Select a category (optional)"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Public Form</Label>
                    <p className="text-sm text-slate-500">Allow anyone to view and fill out this form</p>
                  </div>
                  <Switch
                    checked={watchedForm.is_public}
                    onCheckedChange={(checked) => form.setValue('is_public', checked)}
                  />
                </div>
                
                {!watchedForm.is_public && (
                  <div>
                    <Label>Access Code</Label>
                    <Input
                      {...form.register('access_code')}
                      placeholder="Enter access code"
                    />
                  </div>
                )}
                
                <Separator />
                
                {/* File Attachments Section */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Paperclip className="h-4 w-4" />
                    <Label className="text-sm font-medium">File Attachments</Label>
                    <Badge variant="secondary" className="text-xs">Beta</Badge>
                  </div>
                  <p className="text-xs text-slate-500 mb-3">
                    Add files that will be shared with form submissions (images & PDFs)
                  </p>
                  <FileUpload
                    onFilesUploaded={setAttachedFiles}
                    onFileRemoved={(fileId) => {
                      setAttachedFiles(prev => prev.filter(f => f.id !== fileId))
                    }}
                    existingFiles={attachedFiles}
                    maxFiles={5}
                    maxSizeInMB={10}
                    showPreview={true}
                    className="border-0 shadow-none p-0"
                  />
                </div>
                
                <Separator />
                
                <Button
                  type="submit"
                  disabled={createFormMutation.isPending || fields.length === 0}
                  className="w-full"
                >
                  {createFormMutation.isPending ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4 mr-2" />
                  )}
                  Create Form
                </Button>
              </CardContent>
            </Card>
          </div>
          
          {/* Form Builder / Preview */}
          <div className="lg:col-span-2">
            {previewMode ? (
              <Card>
                <CardHeader>
                  <CardTitle>Form Preview</CardTitle>
                  <CardDescription>
                    This is how your form will appear to users
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {fields.length > 0 ? (
                    <div className="space-y-6">
                      {fields.map((field, index) => renderFieldPreview(field, index))}
                      <Button disabled className="w-full">
                        Submit Form
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-slate-500">
                      No fields added yet. Switch to edit mode to add fields.
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Form Fields</h2>
                  <Button type="button" onClick={addField}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Field
                  </Button>
                </div>
                
                {fields.length > 0 ? (
                  <div className="space-y-4">
                    {fields.map((field, index) => renderFieldEditor(field, index))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <p className="text-slate-500 mb-4">No fields added yet</p>
                      <Button type="button" onClick={addField}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Your First Field
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  )
}
