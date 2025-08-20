# Supabase Migration Analysis Report

## Current Database Structure

**Current Project:** `vwbtqlckqybctnglbbdk.supabase.co` (US Region)
**Target:** New Europe Region Project

### Core Tables Identified

#### 1. **User Management**
- `users` - Main user profiles table with roles (admin, teacher, student, super_admin)
- Linked to `auth.users` for authentication
- Roles: admin, teacher, student, super_admin
- Permissions: can_create_quiz, is_private flags

#### 2. **Categories System**
- `categories` - Universal category system for all content types
- Types: quiz, form, qa
- Features: name, description, type-based filtering
- Used by: quizzes, forms, qa_questions

#### 3. **Quiz System**
- `quizzes` - Main quiz table with category_id reference
- `quiz_likes` - User likes for quizzes
- `quiz_views` - View tracking with IP and user agent
- Special function: `create_quiz_first_attempts_leaderboard`

#### 4. **Forms System**
- `forms` - Main forms table with category_id reference
- `form_likes` - User likes for forms
- `form_views` - View tracking
- `form_attachments` - File upload system
- Enhanced with stats functions

#### 5. **Q&A System**
- `qa_questions` - Questions with category_id
- `qa_answers` - Answers to questions
- `qa_likes` - Likes for both questions and answers
- `qa_views` - Question view tracking
- Vote system integration

#### 6. **Engagement Systems**
- Comprehensive likes system across all content types
- View tracking with IP address and user agent logging
- Statistical functions for engagement metrics

### Edge Functions

#### 1. **file-upload**
- Handles file uploads for forms
- Supports: images (jpeg, png, gif, webp), PDFs
- Max file size: 10MB
- Base64 processing with proper validation

#### 2. **create-admin-user**
- Administrative function for creating users
- Direct auth.users table manipulation
- Role assignment capabilities

#### 3. **data-migration**
- Utility function for data operations

### Key Database Functions

1. **get_categories_by_type()** - Category filtering with item counts
2. **get_all_users_with_admin_info()** - Admin panel user management
3. **Forms statistics functions** - Enhanced form analytics
4. **Admin role management functions** - User permission handling
5. **Like/view tracking functions** - Engagement metrics

### Row Level Security (RLS)

- **Categories**: Full RLS with super_admin restrictions for CUD operations
- **User-generated content**: Role-based access control
- **Admin functions**: Restricted to admin/super_admin roles

### Authentication Features

- Email/password authentication
- Role-based permissions (student, teacher, admin, super_admin)
- Session management with auto-refresh
- Email verification system

### Storage Requirements

- **File uploads**: Form attachments, user avatars
- **Image processing**: Support for cropping and resizing
- **Storage buckets**: Organized by content type

## Migration Checklist

### ✅ Database Schema
- [ ] All migration files (29 total)
- [ ] Core tables: users, categories, quizzes, forms, qa_questions, qa_answers
- [ ] Engagement tables: *_likes, *_views, form_attachments
- [ ] Indexes and constraints
- [ ] RLS policies

### ✅ Functions & Procedures
- [ ] Category management functions
- [ ] Admin management functions  
- [ ] Statistics and analytics functions
- [ ] User role assignment functions

### ✅ Edge Functions
- [ ] file-upload (file handling)
- [ ] create-admin-user (admin operations)
- [ ] data-migration (utility)

### ✅ Authentication Setup
- [ ] Auth configuration
- [ ] Email templates
- [ ] Role-based policies
- [ ] Session management

### ✅ Storage Configuration
- [ ] Storage buckets
- [ ] File upload policies
- [ ] CORS configuration

## Critical Configuration Notes

1. **Super Admin Setup**: Ensure `qurbanov@gmail.com` retains super admin access
2. **File Upload Size**: 10MB limit configured in edge function
3. **CORS Headers**: Comprehensive CORS setup for all functions
4. **Environment Variables**: 
   - SUPABASE_URL
   - SUPABASE_ANON_KEY  
   - SUPABASE_SERVICE_ROLE_KEY

## Data Preservation

**Note**: This migration will create a fresh database structure in the Europe region. If there's existing user data in the current US database that needs to be preserved, we'll need to export and import that data after setting up the new schema.

---

**Next Steps**: Create new Supabase project in Europe region and begin schema migration.
