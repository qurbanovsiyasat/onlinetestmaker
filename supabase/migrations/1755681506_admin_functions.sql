-- Migration: admin_functions
-- Created at: 1755681506

-- Admin management functions

-- Enhanced user management function
CREATE OR REPLACE FUNCTION get_all_users_with_admin_info()
RETURNS TABLE (
    id UUID,
    email TEXT,
    full_name TEXT,
    role TEXT,
    can_create_quiz BOOLEAN,
    is_active BOOLEAN,
    is_private BOOLEAN,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ,
    is_super_admin BOOLEAN,
    is_admin BOOLEAN
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    current_user_role TEXT;
BEGIN
    -- Check if current user is admin or super admin
    SELECT u.role INTO current_user_role
    FROM users u 
    WHERE u.id = auth.uid();
    
    -- If not admin, check auth.users table for super admin
    IF current_user_role NOT IN ('admin', 'super_admin') THEN
        IF NOT EXISTS (
            SELECT 1 FROM auth.users au 
            WHERE au.id = auth.uid() 
            AND (au.raw_user_meta_data->>'role' IN ('admin', 'super_admin') OR au.email = 'qurbanov@gmail.com')
        ) THEN
            RAISE EXCEPTION 'Access denied. Admin privileges required.';
        END IF;
    END IF;

    RETURN QUERY
    SELECT 
        u.id,
        u.email,
        COALESCE(u.full_name, 'Anonymous') as full_name,
        COALESCE(u.role, 'student') as role,
        COALESCE(u.can_create_quiz, false) as can_create_quiz,
        CASE 
            WHEN au.last_sign_in_at IS NULL AND u.created_at > NOW() - INTERVAL '7 days' THEN true
            WHEN au.last_sign_in_at > NOW() - INTERVAL '30 days' THEN true
            ELSE false
        END as is_active,
        COALESCE(u.is_private, false) as is_private,
        u.created_at,
        u.updated_at,
        (COALESCE(u.role, 'student') = 'super_admin')::BOOLEAN as is_super_admin,
        (COALESCE(u.role, 'student') IN ('admin', 'super_admin'))::BOOLEAN as is_admin
    FROM users u
    LEFT JOIN auth.users au ON u.id = au.id
    ORDER BY u.created_at DESC
    LIMIT 200;
END;
$$;

-- Check email exists function
CREATE OR REPLACE FUNCTION check_email_exists(email_address TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM auth.users 
        WHERE email = email_address
    );
END;
$$;;