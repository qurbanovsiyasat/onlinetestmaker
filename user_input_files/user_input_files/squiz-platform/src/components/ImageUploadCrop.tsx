import { useState, useRef, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Label } from '@/components/ui/Label'
import { Badge } from '@/components/ui/Badge'
import { Upload, Crop, Download, Trash2, RotateCw, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

interface ImageUploadCropProps {
  onImageUploaded?: (imageUrl: string) => void
  onImageRemoved?: () => void
  existingImageUrl?: string
  maxSizeInMB?: number
  aspectRatio?: number
  cropWidth?: number
  cropHeight?: number
  allowCrop?: boolean
}

export default function ImageUploadCrop({
  onImageUploaded,
  onImageRemoved,
  existingImageUrl,
  maxSizeInMB = 5,
  aspectRatio = 16 / 9,
  cropWidth = 400,
  cropHeight = 300,
  allowCrop = true
}: ImageUploadCropProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(existingImageUrl || null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [showCropModal, setShowCropModal] = useState(false)
  const [cropCanvas, setCropCanvas] = useState<HTMLCanvasElement | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Handle file selection
  const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file')
      return
    }

    // Validate file size
    if (file.size > maxSizeInMB * 1024 * 1024) {
      toast.error(`Image size must be less than ${maxSizeInMB}MB`)
      return
    }

    // Read file and show preview
    const reader = new FileReader()
    reader.onload = (e) => {
      const imageSrc = e.target?.result as string
      setSelectedImage(imageSrc)
      
      if (allowCrop) {
        setShowCropModal(true)
      } else {
        // Upload directly without cropping
        uploadImage(imageSrc)
      }
    }
    reader.readAsDataURL(file)
  }, [maxSizeInMB, allowCrop])

  // Upload image (placeholder for actual upload logic)
  const uploadImage = useCallback(async (imageData: string) => {
    setIsProcessing(true)
    try {
      // Convert base64 to blob
      const response = await fetch(imageData)
      const blob = await response.blob()
      
      // Create form data
      const formData = new FormData()
      formData.append('file', blob, 'image.jpg')
      
      // TODO: Replace with actual upload endpoint
      // For now, we'll just use the base64 data
      
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // For demo purposes, we'll use the base64 data as the URL
      const uploadedUrl = imageData
      
      setSelectedImage(uploadedUrl)
      onImageUploaded?.(uploadedUrl)
      toast.success('Image uploaded successfully!')
    } catch (error) {
      console.error('Upload error:', error)
      toast.error('Failed to upload image')
    } finally {
      setIsProcessing(false)
      setShowCropModal(false)
    }
  }, [onImageUploaded])

  // Crop image
  const cropImage = useCallback(() => {
    if (!imageRef.current || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const img = imageRef.current

    if (!ctx) return

    // Set canvas dimensions
    canvas.width = cropWidth
    canvas.height = cropHeight

    // Calculate crop area (center crop)
    const imgAspect = img.naturalWidth / img.naturalHeight
    const cropAspect = cropWidth / cropHeight

    let sourceX = 0
    let sourceY = 0
    let sourceWidth = img.naturalWidth
    let sourceHeight = img.naturalHeight

    if (imgAspect > cropAspect) {
      // Image is wider than crop area
      sourceWidth = img.naturalHeight * cropAspect
      sourceX = (img.naturalWidth - sourceWidth) / 2
    } else {
      // Image is taller than crop area
      sourceHeight = img.naturalWidth / cropAspect
      sourceY = (img.naturalHeight - sourceHeight) / 2
    }

    // Draw cropped image
    ctx.drawImage(
      img,
      sourceX, sourceY, sourceWidth, sourceHeight,
      0, 0, cropWidth, cropHeight
    )

    // Get cropped image data
    const croppedImageData = canvas.toDataURL('image/jpeg', 0.8)
    uploadImage(croppedImageData)
  }, [cropWidth, cropHeight, uploadImage])

  // Remove image
  const removeImage = useCallback(() => {
    setSelectedImage(null)
    onImageRemoved?.()
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }, [onImageRemoved])

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Image Upload</CardTitle>
            {selectedImage && (
              <Badge variant="outline" className="text-green-600">
                Image Added
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {!selectedImage ? (
            <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-8 text-center">
              <div className="mx-auto w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                <Upload className="h-6 w-6 text-slate-600 dark:text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Upload Image</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                Choose an image file to upload. Max size: {maxSizeInMB}MB
              </p>
              <Button onClick={() => fileInputRef.current?.click()}>
                <Upload className="h-4 w-4 mr-2" />
                Select Image
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
                <img
                  src={selectedImage}
                  alt="Uploaded"
                  className="w-full h-48 object-cover"
                />
                {isProcessing && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="text-white text-center">
                      <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
                      <p>Processing...</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isProcessing}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Replace
                </Button>
                {allowCrop && (
                  <Button
                    variant="outline"
                    onClick={() => setShowCropModal(true)}
                    disabled={isProcessing}
                  >
                    <Crop className="h-4 w-4 mr-2" />
                    Crop
                  </Button>
                )}
                <Button
                  variant="outline"
                  onClick={removeImage}
                  disabled={isProcessing}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Remove
                </Button>
              </div>
            </div>
          )}
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </CardContent>
      </Card>

      {/* Crop Modal */}
      {showCropModal && selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Crop Image</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowCropModal(false)}
              >
                Cancel
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="text-center">
                <img
                  ref={imageRef}
                  src={selectedImage}
                  alt="To crop"
                  className="max-w-full max-h-64 mx-auto"
                  onLoad={() => {
                    // Image loaded, ready for cropping
                  }}
                />
              </div>
              
              <canvas
                ref={canvasRef}
                className="hidden"
              />
              
              <div className="text-center text-sm text-slate-600 dark:text-slate-400">
                Image will be cropped to {cropWidth} × {cropHeight} pixels
              </div>
              
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setShowCropModal(false)}
                  className="flex-1"
                  disabled={isProcessing}
                >
                  Cancel
                </Button>
                <Button
                  onClick={cropImage}
                  disabled={isProcessing}
                  className="flex-1"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Crop className="h-4 w-4 mr-2" />
                      Crop & Upload
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
