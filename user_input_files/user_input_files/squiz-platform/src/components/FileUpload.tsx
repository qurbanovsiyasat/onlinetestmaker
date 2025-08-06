import { useState, useRef, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Progress } from '@/components/ui/progress'
import { 
  Upload, 
  Camera, 
  File, 
  Image as ImageIcon, 
  Trash2, 
  Eye, 
  Download,
  FileText,
  X,
  Plus,
  Loader2
} from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { useIsMobile } from '@/hooks/use-mobile'

export interface FileItem {
  id: string
  name: string
  type: string
  size: number
  url: string
  isImage: boolean
  uploadProgress?: number
}

interface FileUploadProps {
  onFilesUploaded?: (files: FileItem[]) => void
  onFileRemoved?: (fileId: string) => void
  existingFiles?: FileItem[]
  maxFiles?: number
  maxSizeInMB?: number
  acceptedTypes?: string[]
  showPreview?: boolean
  className?: string
}

const DEFAULT_ACCEPTED_TYPES = [
  'image/jpeg',
  'image/png', 
  'image/gif',
  'image/webp',
  'application/pdf'
]

const MAX_FILE_SIZE_MB = 10

export default function FileUpload({
  onFilesUploaded,
  onFileRemoved,
  existingFiles = [],
  maxFiles = 5,
  maxSizeInMB = MAX_FILE_SIZE_MB,
  acceptedTypes = DEFAULT_ACCEPTED_TYPES,
  showPreview = true,
  className
}: FileUploadProps) {
  const [files, setFiles] = useState<FileItem[]>(existingFiles)
  const [dragActive, setDragActive] = useState(false)
  const [uploadingFiles, setUploadingFiles] = useState<Set<string>>(new Set())
  const fileInputRef = useRef<HTMLInputElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)
  const isMobile = useIsMobile()

  // File validation
  const validateFile = useCallback((file: File): string | null => {
    if (!acceptedTypes.includes(file.type)) {
      return `File type ${file.type} is not supported`
    }
    
    if (file.size > maxSizeInMB * 1024 * 1024) {
      return `File size exceeds ${maxSizeInMB}MB limit`
    }
    
    if (files.length >= maxFiles) {
      return `Maximum ${maxFiles} files allowed`
    }
    
    return null
  }, [acceptedTypes, maxSizeInMB, maxFiles, files.length])

  // Upload file to server
  const uploadFile = useCallback(async (file: File): Promise<FileItem> => {
    const fileId = `${Date.now()}_${Math.random().toString(36).substring(2)}`
    
    // Convert file to base64
    const base64Data = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result as string)
      reader.onerror = reject
      reader.readAsDataURL(file)
    })

    // For now, simulate upload - replace with actual upload logic
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    return {
      id: fileId,
      name: file.name,
      type: file.type,
      size: file.size,
      url: base64Data, // In production, this would be the server URL
      isImage: file.type.startsWith('image/'),
      uploadProgress: 100
    }
  }, [])

  // Handle file selection
  const handleFileSelect = useCallback(async (selectedFiles: FileList) => {
    const newFiles: FileItem[] = []
    const errors: string[] = []
    
    Array.from(selectedFiles).forEach(file => {
      const error = validateFile(file)
      if (error) {
        errors.push(`${file.name}: ${error}`)
      } else {
        const fileId = `${Date.now()}_${Math.random().toString(36).substring(2)}`
        newFiles.push({
          id: fileId,
          name: file.name,
          type: file.type,
          size: file.size,
          url: '',
          isImage: file.type.startsWith('image/'),
          uploadProgress: 0
        })
      }
    })
    
    if (errors.length > 0) {
      toast.error(errors.join('\n'))
    }
    
    if (newFiles.length === 0) return
    
    // Add files to state with pending upload status
    setFiles(prev => [...prev, ...newFiles])
    
    // Upload files one by one
    for (let i = 0; i < newFiles.length; i++) {
      const fileItem = newFiles[i]
      const originalFile = Array.from(selectedFiles)[files.length + i]
      
      setUploadingFiles(prev => new Set([...prev, fileItem.id]))
      
      try {
        const uploadedFile = await uploadFile(originalFile)
        
        setFiles(prev => prev.map(f => 
          f.id === fileItem.id ? { ...uploadedFile, id: fileItem.id } : f
        ))
        
        toast.success(`${originalFile.name} uploaded successfully`)
      } catch (error) {
        console.error('Upload failed:', error)
        toast.error(`Failed to upload ${originalFile.name}`)
        
        // Remove failed file
        setFiles(prev => prev.filter(f => f.id !== fileItem.id))
      } finally {
        setUploadingFiles(prev => {
          const next = new Set(prev)
          next.delete(fileItem.id)
          return next
        })
      }
    }
    
    // Notify parent component
    setTimeout(() => {
      onFilesUploaded?.(files.filter(f => f.url))
    }, 100)
  }, [files.length, validateFile, uploadFile, onFilesUploaded])

  // Remove file
  const removeFile = useCallback((fileId: string) => {
    setFiles(prev => prev.filter(f => f.id !== fileId))
    onFileRemoved?.(fileId)
    toast.success('File removed')
  }, [onFileRemoved])

  // Drag and drop handlers
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files)
    }
  }, [handleFileSelect])

  // Format file size
  const formatFileSize = useCallback((bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }, [])

  // Get file icon
  const getFileIcon = useCallback((type: string, isImage: boolean) => {
    if (isImage) return <ImageIcon className="h-4 w-4" />
    if (type === 'application/pdf') return <FileText className="h-4 w-4" />
    return <File className="h-4 w-4" />
  }, [])

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">File Attachments</CardTitle>
          <Badge variant="outline" className="text-xs">
            {files.length}/{maxFiles} files
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Upload Area */}
        <div
          className={cn(
            "border-2 border-dashed rounded-lg p-6 text-center transition-colors",
            dragActive 
              ? "border-blue-500 bg-blue-50 dark:bg-blue-950/20" 
              : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500",
            files.length >= maxFiles && "opacity-50 pointer-events-none"
          )}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="mx-auto w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
            <Upload className="h-6 w-6 text-gray-600 dark:text-gray-400" />
          </div>
          
          <h3 className="text-lg font-semibold mb-2">Upload Files</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Drag and drop files here, or click to select
            <br />
            <span className="text-xs">
              Supports: Images (JPG, PNG, GIF, WebP) and PDF files
              <br />
              Max size: {maxSizeInMB}MB per file
            </span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-2 items-center justify-center">
            <Button 
              variant="outline" 
              onClick={() => fileInputRef.current?.click()}
              disabled={files.length >= maxFiles}
              className="w-full sm:w-auto"
            >
              <Plus className="h-4 w-4 mr-2" />
              Select Files
            </Button>
            
            {isMobile && (
              <Button 
                variant="outline" 
                onClick={() => cameraInputRef.current?.click()}
                disabled={files.length >= maxFiles}
                className="w-full sm:w-auto"
              >
                <Camera className="h-4 w-4 mr-2" />
                Take Photo
              </Button>
            )}
          </div>
        </div>

        {/* File Inputs */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={acceptedTypes.join(',')}
          onChange={(e) => e.target.files && handleFileSelect(e.target.files)}
          className="hidden"
        />
        
        {isMobile && (
          <input
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={(e) => e.target.files && handleFileSelect(e.target.files)}
            className="hidden"
          />
        )}

        {/* File List */}
        {files.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium text-sm text-gray-700 dark:text-gray-300">
              Uploaded Files ({files.length})
            </h4>
            
            <div className="grid gap-3">
              {files.map((file) => {
                const isUploading = uploadingFiles.has(file.id)
                
                return (
                  <div
                    key={file.id}
                    className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50"
                  >
                    {/* File Icon or Preview */}
                    <div className="flex-shrink-0">
                      {file.isImage && file.url && showPreview ? (
                        <div className="w-12 h-12 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600">
                          <img
                            src={file.url}
                            alt={file.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                          {getFileIcon(file.type, file.isImage)}
                        </div>
                      )}
                    </div>
                    
                    {/* File Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                          {file.name}
                        </p>
                        {file.isImage && (
                          <Badge variant="secondary" className="text-xs">
                            Image
                          </Badge>
                        )}
                        {file.type === 'application/pdf' && (
                          <Badge variant="secondary" className="text-xs">
                            PDF
                          </Badge>
                        )}
                      </div>
                      
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {formatFileSize(file.size)}
                      </p>
                      
                      {isUploading && (
                        <div className="mt-2">
                          <Progress value={file.uploadProgress || 0} className="h-1" />
                          <p className="text-xs text-gray-500 mt-1">Uploading...</p>
                        </div>
                      )}
                    </div>
                    
                    {/* Actions */}
                    <div className="flex items-center gap-1">
                      {file.url && file.isImage && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            // Open image in modal or new tab
                            const link = document.createElement('a')
                            link.href = file.url
                            link.target = '_blank'
                            link.click()
                          }}
                          disabled={isUploading}
                          className="h-8 w-8 p-0"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      )}
                      
                      {file.url && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const link = document.createElement('a')
                            link.href = file.url
                            link.download = file.name
                            link.click()
                          }}
                          disabled={isUploading}
                          className="h-8 w-8 p-0"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      )}
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(file.id)}
                        disabled={isUploading}
                        className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20"
                      >
                        {isUploading ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}