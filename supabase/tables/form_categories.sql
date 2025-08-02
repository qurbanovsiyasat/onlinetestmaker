CREATE TABLE form_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    color VARCHAR(50) DEFAULT 'blue',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);