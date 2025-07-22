import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

// Check if Cloudinary credentials are set
const cloudinaryConfigured = process.env.CLOUDINARY_CLOUD_NAME && 
                            process.env.CLOUDINARY_API_KEY && 
                            process.env.CLOUDINARY_API_SECRET;

if (cloudinaryConfigured) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  console.log('✅ Cloudinary configured successfully');
} else {
  console.log('⚠️ Cloudinary credentials not found, image upload will be disabled');
}

// Create storage configuration
let storage;

if (cloudinaryConfigured) {
  storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'onlinetestmaker',
      format: async (req, file) => 'png',
      public_id: (req, file) => new Date().toISOString() + '-' + file.originalname,
    },
  });
} else {
  // Fallback to memory storage if Cloudinary is not configured
  storage = multer.memoryStorage();
}

export const parser = multer({ storage: storage });
export const isCloudinaryConfigured = cloudinaryConfigured;