CREATE TABLE `articles` (
  `id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  `slug` text NOT NULL UNIQUE,
  `title` text NOT NULL,
  `category` text NOT NULL,
  `excerpt` text NOT NULL,
  `content` text NOT NULL,
  `image_url` text NOT NULL,
  `read_time` text DEFAULT '6 دقائق' NOT NULL,
  `status` text DEFAULT 'published' NOT NULL,
  `created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
  `updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
