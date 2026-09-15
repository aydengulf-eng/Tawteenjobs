CREATE TABLE `jobs` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`slug` text NOT NULL,
	`title_ar` text NOT NULL,
	`title_en` text DEFAULT '' NOT NULL,
	`company` text NOT NULL,
	`country` text NOT NULL,
	`city` text NOT NULL,
	`category` text NOT NULL,
	`employment_type` text DEFAULT 'دوام كامل' NOT NULL,
	`work_mode` text DEFAULT 'حضوري' NOT NULL,
	`salary` text DEFAULT '' NOT NULL,
	`description_ar` text NOT NULL,
	`requirements_ar` text DEFAULT '[]' NOT NULL,
	`status` text DEFAULT 'draft' NOT NULL,
	`featured` integer DEFAULT false NOT NULL,
	`published_at` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `jobs_slug_unique` ON `jobs` (`slug`);