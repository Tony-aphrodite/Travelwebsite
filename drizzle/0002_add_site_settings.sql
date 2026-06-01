-- ─── SITE SETTINGS (singleton, id=1) ─────────────────────────
CREATE TABLE IF NOT EXISTS "site_settings" (
  "id" integer PRIMARY KEY DEFAULT 1,
  "tax_rate" integer DEFAULT 12 NOT NULL,
  "member_discount_percent" integer DEFAULT 5 NOT NULL,
  "currency" text DEFAULT 'USD' NOT NULL,
  "loyalty_points_per_dollar" integer DEFAULT 1 NOT NULL,
  "silver_threshold" integer DEFAULT 0 NOT NULL,
  "rose_gold_threshold" integer DEFAULT 2000 NOT NULL,
  "platinum_threshold" integer DEFAULT 8000 NOT NULL,
  "contact_email" text DEFAULT 'hola@aureliaviajes.com' NOT NULL,
  "contact_phone" text DEFAULT '+52 55 0000 0000' NOT NULL,
  "whatsapp_number" text DEFAULT '+525500000000' NOT NULL,
  "booking_email_subject" text DEFAULT 'Tu reserva con Aurelia Viajes' NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL
);

-- Seed singleton row
INSERT INTO "site_settings" ("id") VALUES (1) ON CONFLICT ("id") DO NOTHING;
