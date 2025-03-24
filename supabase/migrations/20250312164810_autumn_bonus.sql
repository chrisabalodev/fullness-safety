/*
  # Schéma initial de la base de données

  1. Tables
    - categories
      - id (uuid, clé primaire)
      - name (text, non null)
      - description (text)
      - slug (text, unique)
      - image_url (text)
      - created_at (timestamp)

    - sub_categories
      - id (uuid, clé primaire)
      - name (text, non null)
      - category_id (uuid, clé étrangère)
      - slug (text, unique)
      - created_at (timestamp)

    - products
      - id (uuid, clé primaire)
      - name (text, non null)
      - description (text)
      - price (numeric)
      - image_url (text)
      - technical_sheet_url (text)
      - specifications (jsonb)
      - sub_category_id (uuid, clé étrangère)
      - documentation (jsonb)
      - created_at (timestamp)

  2. Sécurité
    - RLS activé sur toutes les tables
    - Politiques de lecture publique
    - Politiques d'écriture pour les administrateurs
*/

-- Categories
CREATE TABLE categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  slug text UNIQUE NOT NULL,
  image_url text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Categories are viewable by everyone" ON categories
  FOR SELECT USING (true);

CREATE POLICY "Categories are editable by authenticated users only" ON categories
  FOR ALL USING (auth.role() = 'authenticated');

-- Sub-categories
CREATE TABLE sub_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category_id uuid REFERENCES categories(id) ON DELETE CASCADE,
  slug text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE sub_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Sub-categories are viewable by everyone" ON sub_categories
  FOR SELECT USING (true);

CREATE POLICY "Sub-categories are editable by authenticated users only" ON sub_categories
  FOR ALL USING (auth.role() = 'authenticated');

-- Products
CREATE TABLE products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  price numeric,
  image_url text,
  technical_sheet_url text,
  specifications jsonb DEFAULT '{}'::jsonb,
  sub_category_id uuid REFERENCES sub_categories(id) ON DELETE CASCADE,
  documentation jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Products are viewable by everyone" ON products
  FOR SELECT USING (true);

CREATE POLICY "Products are editable by authenticated users only" ON products
  FOR ALL USING (auth.role() = 'authenticated');

-- Index pour améliorer les performances
CREATE INDEX idx_products_sub_category ON products(sub_category_id);
CREATE INDEX idx_sub_categories_category ON sub_categories(category_id);