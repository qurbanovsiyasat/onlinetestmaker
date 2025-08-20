-- Migration: fix_get_categories_by_type_function
-- Created at: 1755686084

-- Fix the get_categories_by_type function to properly return active categories
CREATE OR REPLACE FUNCTION get_categories_by_type(p_type TEXT)
RETURNS TABLE(
    id UUID,
    name TEXT,
    type TEXT,
    description TEXT,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ,
    item_count BIGINT
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        c.id,
        COALESCE(c.name, 'Unnamed Category') as name,
        COALESCE(c.type, 'general') as type,
        COALESCE(c.description, '') as description,
        COALESCE(c.created_at, NOW()) as created_at,
        COALESCE(c.updated_at, NOW()) as updated_at,
        CASE 
            WHEN p_type = 'quiz' THEN COALESCE(
                (SELECT COUNT(*) FROM quizzes q WHERE q.category_id = c.id), 0
            )
            WHEN p_type = 'form' THEN COALESCE(
                (SELECT COUNT(*) FROM forms f WHERE f.category_id = c.id), 0
            )
            WHEN p_type = 'qa' THEN COALESCE(
                (SELECT COUNT(*) FROM qa_questions qq WHERE qq.category_id = c.id), 0
            )
            ELSE 0
        END::BIGINT as item_count
    FROM categories c
    WHERE 
        (p_type = '' OR p_type IS NULL OR c.type = p_type)
        AND (c.is_active IS NULL OR c.is_active = true)
    ORDER BY c.name ASC
    LIMIT 100;
END;
$$;

-- Grant permissions
GRANT EXECUTE ON FUNCTION get_categories_by_type(TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION get_categories_by_type(TEXT) TO anon;;