-- ─── CRUISES ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS "cruises" (
  "id" text PRIMARY KEY,
  "name" text NOT NULL,
  "cruise_line" text NOT NULL,
  "ship" text NOT NULL,
  "image" text NOT NULL,
  "gallery" jsonb DEFAULT '[]'::jsonb,
  "departure_port" text NOT NULL,
  "destinations" jsonb DEFAULT '[]'::jsonb,
  "duration" text NOT NULL,
  "nights" integer NOT NULL,
  "price" integer NOT NULL,
  "old_price" integer,
  "rating" real NOT NULL,
  "review_count" integer DEFAULT 0 NOT NULL,
  "description" text NOT NULL,
  "amenities" jsonb DEFAULT '[]'::jsonb,
  "is_active" boolean DEFAULT true NOT NULL,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS "cruise_line_idx" ON "cruises" ("cruise_line");
CREATE INDEX IF NOT EXISTS "cruise_price_idx" ON "cruises" ("price");

-- Extend booking_type enum so future bookings can target a cruise.
ALTER TYPE booking_type ADD VALUE IF NOT EXISTS 'cruise';
