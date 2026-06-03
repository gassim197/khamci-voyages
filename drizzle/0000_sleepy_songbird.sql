CREATE TYPE "public"."blog_category" AS ENUM('destinations', 'conseils', 'offres', 'actualites');--> statement-breakpoint
CREATE TYPE "public"."blog_post_status" AS ENUM('draft', 'published');--> statement-breakpoint
CREATE TYPE "public"."quote_status" AS ENUM('pending', 'in_progress', 'completed', 'rejected');--> statement-breakpoint
CREATE TYPE "public"."role" AS ENUM('user', 'admin');--> statement-breakpoint
CREATE TYPE "public"."testimonial_status" AS ENUM('pending', 'approved', 'rejected');--> statement-breakpoint
CREATE TABLE "admin_settings" (
	"id" serial PRIMARY KEY NOT NULL,
	"key" varchar(100) NOT NULL,
	"value" text NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "admin_settings_key_unique" UNIQUE("key")
);
--> statement-breakpoint
CREATE TABLE "blog_posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(500) NOT NULL,
	"slug" varchar(500) NOT NULL,
	"excerpt" text,
	"content" text NOT NULL,
	"coverImage" varchar(1000),
	"category" "blog_category" DEFAULT 'destinations' NOT NULL,
	"status" "blog_post_status" DEFAULT 'draft' NOT NULL,
	"authorName" varchar(255) DEFAULT 'KHAMCI VOYAGES',
	"readTime" integer DEFAULT 5,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"publishedAt" timestamp,
	CONSTRAINT "blog_posts_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "newsletter_subscribers" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(320) NOT NULL,
	"name" varchar(255),
	"isActive" boolean DEFAULT true NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "newsletter_subscribers_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "quotes" (
	"id" serial PRIMARY KEY NOT NULL,
	"clientName" varchar(255) NOT NULL,
	"clientEmail" varchar(320) NOT NULL,
	"clientPhone" varchar(50),
	"destination" varchar(255),
	"departureDate" varchar(50),
	"returnDate" varchar(50),
	"passengers" integer DEFAULT 1,
	"serviceType" varchar(100),
	"message" text,
	"adminNotes" text,
	"status" "quote_status" DEFAULT 'pending' NOT NULL,
	"source" varchar(100) DEFAULT 'website',
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "testimonials" (
	"id" serial PRIMARY KEY NOT NULL,
	"clientName" varchar(255) NOT NULL,
	"clientTitle" varchar(255),
	"clientLocation" varchar(255),
	"content" text NOT NULL,
	"rating" integer DEFAULT 5,
	"status" "testimonial_status" DEFAULT 'pending' NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"openId" varchar(64) NOT NULL,
	"name" text,
	"email" varchar(320),
	"loginMethod" varchar(64),
	"role" "role" DEFAULT 'user' NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"lastSignedIn" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_openId_unique" UNIQUE("openId")
);
