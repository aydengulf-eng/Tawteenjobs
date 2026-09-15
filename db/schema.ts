import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const jobs = sqliteTable("jobs", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull().unique(),
  titleAr: text("title_ar").notNull(),
  titleEn: text("title_en").notNull().default(""),
  company: text("company").notNull(),
  country: text("country").notNull(),
  city: text("city").notNull(),
  category: text("category").notNull(),
  employmentType: text("employment_type").notNull().default("دوام كامل"),
  workMode: text("work_mode").notNull().default("حضوري"),
  salary: text("salary").notNull().default(""),
  applyUrl: text("apply_url").notNull().default(""),
  descriptionAr: text("description_ar").notNull(),
  requirementsAr: text("requirements_ar").notNull().default("[]"),
  status: text("status").notNull().default("draft"),
  featured: integer("featured", { mode: "boolean" }).notNull().default(false),
  publishedAt: text("published_at"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const jobAlerts = sqliteTable("job_alerts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull().unique(),
  country: text("country").notNull().default("all"),
  category: text("category").notNull().default("all"),
  language: text("language").notNull().default("ar"),
  active: integer("active", { mode: "boolean" }).notNull().default(true),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const contactMessages = sqliteTable("contact_messages", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  status: text("status").notNull().default("new"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const articles = sqliteTable("articles", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  category: text("category").notNull(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  imageUrl: text("image_url").notNull(),
  readTime: text("read_time").notNull().default("6 دقائق"),
  status: text("status").notNull().default("published"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});
