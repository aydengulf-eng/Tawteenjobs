import { desc, eq } from "drizzle-orm";
import { getDb } from "@/db";
import { articles } from "@/db/schema";

export async function GET() {
  try {
    const rows = await getDb().select({slug:articles.slug,title:articles.title,category:articles.category,excerpt:articles.excerpt,imageUrl:articles.imageUrl,readTime:articles.readTime}).from(articles).where(eq(articles.status,"published")).orderBy(desc(articles.createdAt)).limit(6);
    return Response.json({articles:rows});
  } catch {
    return Response.json({articles:[]});
  }
}
