#! /usr/bin/env node

const pool = require("./pool");

const SQL = `
-- ======================================
-- 1. Create Categories Table
-- ======================================

CREATE TABLE IF NOT EXISTS Categories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT
);

-- ======================================
-- 2. Create Brands Table
-- ======================================

CREATE TABLE IF NOT EXISTS Brands (
    brand_id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT
);

-- ======================================
-- 3. Create Products Table with Indexes
-- ======================================

CREATE TABLE IF NOT EXISTS Products (
    product_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price NUMERIC(10, 2) NOT NULL,
    quantity_in_stock INT DEFAULT 0, -- New column for stock tracking
    category_id INT,
    brand_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES Categories(category_id) ON DELETE SET NULL,
    FOREIGN KEY (brand_id) REFERENCES Brands(brand_id) ON DELETE SET NULL,
    CONSTRAINT unique_product_name UNIQUE (name)
);

-- ======================================
-- 4. Drop Existing Indexes (if they exist)
-- ======================================

DROP INDEX IF EXISTS idx_category_id;
DROP INDEX IF EXISTS idx_brand_id;

-- Add indexes on foreign key columns for performance optimization
CREATE INDEX idx_category_id ON Products (category_id);
CREATE INDEX idx_brand_id ON Products (brand_id);

-- ======================================
-- 5. Drop Existing Trigger (if it exists)
-- ======================================

DROP TRIGGER IF EXISTS set_updated_at ON Products;

-- ======================================
-- 6. Create Trigger Function for updated_at
-- ======================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ======================================
-- 7. Create Trigger for Products Table
-- ======================================

CREATE TRIGGER set_updated_at
BEFORE UPDATE ON Products
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- ======================================
-- 8. Clear Existing Data
-- ======================================

DELETE FROM Products;  -- Clear existing products
DELETE FROM Brands;    -- Clear existing brands
DELETE FROM Categories; -- Clear existing categories

-- ======================================
-- 9. Reset Sequences
-- ======================================

ALTER SEQUENCE products_product_id_seq RESTART WITH 1;
ALTER SEQUENCE brands_brand_id_seq RESTART WITH 1;
ALTER SEQUENCE categories_category_id_seq RESTART WITH 1;

-- ======================================
-- 10. Insert Sample Data into Categories
-- ======================================

INSERT INTO Categories (name, description) VALUES
    ('Hoodies', 'Comfortable and stylish hoodies.'),
    ('T-Shirts', 'Graphic and plain t-shirts.'),
    ('Jackets', 'Various types of jackets.'),
    ('Pants', 'Jeans, joggers, and more.'),
    ('Sweaters', 'Warm and cozy sweaters for colder days.'),
    ('Accessories', 'Fashion accessories like hats and bags.'),
    ('Footwear', 'Stylish shoes and boots for all occasions.')
ON CONFLICT (name) DO NOTHING;

-- ======================================
-- 11. Insert Sample Data into Brands
-- ======================================

INSERT INTO Brands (name, description) VALUES
    ('StreetStyle Co.', 'Urban-inspired streetwear brand.'),
    ('UrbanPulse', 'Modern designs with a focus on comfort.'),
    ('RetroWave', 'Vintage styles with a contemporary twist.'),
    ('NightOwl', 'Edgy and bold apparel for the nightlife.'),
    ('ClassicThreads', 'Timeless styles for every occasion.'),
    ('EcoWear', 'Sustainable fashion for a better planet.'),
    ('SneakerCulture', 'Trendy footwear for sneaker enthusiasts.')
ON CONFLICT (name) DO NOTHING;

-- ======================================
-- 12. Insert Sample Data into Products with CTEs
-- ======================================

WITH category_ids AS (
    SELECT name, category_id FROM Categories
),
brand_ids AS (
    SELECT name, brand_id FROM Brands
)
INSERT INTO Products (name, description, price, quantity_in_stock, category_id, brand_id)
VALUES 
    -- Hoodies
    (
        'Urban Explorer Hoodie',
        'A stylish and comfortable hoodie perfect for urban adventures.',
        59.99,
        50,
        (SELECT category_id FROM category_ids WHERE name = 'Hoodies'),
        (SELECT brand_id FROM brand_ids WHERE name = 'StreetStyle Co.')
    ),
    (
        'UrbanPulse Zip-Up Hoodie',
        'A comfortable zip-up hoodie with a modern design.',
        69.99,
        30,
        (SELECT category_id FROM category_ids WHERE name = 'Hoodies'),
        (SELECT brand_id FROM brand_ids WHERE name = 'UrbanPulse')
    ),
    (
        'NightOwl Stealth Hoodie',
        'A sleek black hoodie with minimal branding.',
        79.99,
        20,
        (SELECT category_id FROM category_ids WHERE name = 'Hoodies'),
        (SELECT brand_id FROM brand_ids WHERE name = 'NightOwl')
    ),
    (
        'Classic Comfort Hoodie',
        'A classic hoodie that combines style and comfort.',
        54.99,
        40,
        (SELECT category_id FROM category_ids WHERE name = 'Hoodies'),
        (SELECT brand_id FROM brand_ids WHERE name = 'ClassicThreads')
    ),

    -- T-Shirts
    (
        'Sunset Graphic T-Shirt',
        'Vibrant sunset graphic print on a soft cotton t-shirt.',
        29.99,
        100,
        (SELECT category_id FROM category_ids WHERE name = 'T-Shirts'),
        (SELECT brand_id FROM brand_ids WHERE name = 'RetroWave')
    ),
    (
        'StreetStyle Logo T-Shirt',
        'StreetStyle Co. branded t-shirt with a bold logo print.',
        34.99,
        80,
        (SELECT category_id FROM category_ids WHERE name = 'T-Shirts'),
        (SELECT brand_id FROM brand_ids WHERE name = 'StreetStyle Co.')
    ),
    (
        'UrbanPulse Minimal Tee',
        'A plain yet stylish t-shirt with a minimalist design.',
        24.99,
        120,
        (SELECT category_id FROM category_ids WHERE name = 'T-Shirts'),
        (SELECT brand_id FROM brand_ids WHERE name = 'UrbanPulse')
    ),
    (
        'Classic Striped T-Shirt',
        'A classic striped tee that never goes out of style.',
        19.99,
        90,
        (SELECT category_id FROM category_ids WHERE name = 'T-Shirts'),
        (SELECT brand_id FROM brand_ids WHERE name = 'ClassicThreads')
    ),

    -- Jackets
    (
        'NightOwl Leather Jacket',
        'Edgy black leather jacket with a modern fit.',
        149.99,
        15,
        (SELECT category_id FROM category_ids WHERE name = 'Jackets'),
        (SELECT brand_id FROM brand_ids WHERE name = 'NightOwl')
    ),
    (
        'RetroWave Bomber Jacket',
        'Classic bomber jacket with a retro design.',
        129.99,
        25,
        (SELECT category_id FROM category_ids WHERE name = 'Jackets'),
        (SELECT brand_id FROM brand_ids WHERE name = 'RetroWave')
    ),
    (
        'StreetStyle Windbreaker',
        'Lightweight and weather-resistant windbreaker for city streets.',
        99.99,
        40,
        (SELECT category_id FROM category_ids WHERE name = 'Jackets'),
        (SELECT brand_id FROM brand_ids WHERE name = 'StreetStyle Co.')
    ),
    (
        'UrbanPulse Denim Jacket',
        'Trendy denim jacket that pairs well with any outfit.',
        89.99,
        35,
        (SELECT category_id FROM category_ids WHERE name = 'Jackets'),
        (SELECT brand_id FROM brand_ids WHERE name = 'UrbanPulse')
    ),

    -- Pants
    (
        'UrbanPulse Joggers',
        'Comfortable and trendy joggers for everyday wear.',
        49.99,
        70,
        (SELECT category_id FROM category_ids WHERE name = 'Pants'),
        (SELECT brand_id FROM brand_ids WHERE name = 'UrbanPulse')
    ),
    (
        'StreetStyle Cargo Pants',
        'Utility-style cargo pants with multiple pockets.',
        54.99,
        60,
        (SELECT category_id FROM category_ids WHERE name = 'Pants'),
        (SELECT brand_id FROM brand_ids WHERE name = 'StreetStyle Co.')
    ),
    (
        'RetroWave Slim Fit Jeans',
        'Vintage-inspired slim-fit jeans with distressed details.',
        59.99,
        50,
        (SELECT category_id FROM category_ids WHERE name = 'Pants'),
        (SELECT brand_id FROM brand_ids WHERE name = 'RetroWave')
    ),
    (
        'Classic Chinos',
        'Versatile chinos that can be dressed up or down.',
        44.99,
        80,
        (SELECT category_id FROM category_ids WHERE name = 'Pants'),
        (SELECT brand_id FROM brand_ids WHERE name = 'ClassicThreads')
    ),

    -- Sweaters
    (
        'Classic Crew Neck Sweater',
        'A timeless crew neck sweater for a classic look.',
        59.99,
        30,
        (SELECT category_id FROM category_ids WHERE name = 'Sweaters'),
        (SELECT brand_id FROM brand_ids WHERE name = 'ClassicThreads')
    ),
    (
        'UrbanPulse Crew Neck Sweater',
        'A relaxed fit crew neck sweater.',
        49.99,
        40,
        (SELECT category_id FROM category_ids WHERE name = 'Sweaters'),
        (SELECT brand_id FROM brand_ids WHERE name = 'UrbanPulse')
    ),

    -- Accessories
    (
        'StreetStyle Cap',
        'Trendy cap to complete your outfit.',
        19.99,
        100,
        (SELECT category_id FROM category_ids WHERE name = 'Accessories'),
        (SELECT brand_id FROM brand_ids WHERE name = 'StreetStyle Co.')
    ),
    (
        'UrbanPulse Backpack',
        'Durable backpack for everyday use.',
        39.99,
        70,
        (SELECT category_id FROM category_ids WHERE name = 'Accessories'),
        (SELECT brand_id FROM brand_ids WHERE name = 'UrbanPulse')
    ),

    -- Footwear
    (
        'SneakerCulture Classic Sneakers',
        'Timeless sneakers that go with any outfit.',
        79.99,
        50,
        (SELECT category_id FROM category_ids WHERE name = 'Footwear'),
        (SELECT brand_id FROM brand_ids WHERE name = 'SneakerCulture')
    ),
    (
        'NightOwl Combat Boots',
        'Edgy combat boots for a bold look.',
        99.99,
        30,
        (SELECT category_id FROM category_ids WHERE name = 'Footwear'),
        (SELECT brand_id FROM brand_ids WHERE name = 'NightOwl')
    )
ON CONFLICT (name) DO NOTHING;
`;

async function main() {
  console.log("seeding...");
  const client = await pool.connect();
  try {
    console.log("connected...");
    await client.query(SQL);
    console.log("query executed...");
  } catch (error) {
    console.error("Error executing query:", error);
  } finally {
    client.release();
    console.log("client released");
  }
  console.log("done");
}

main().catch((err) => console.error("Error in main:", err));
