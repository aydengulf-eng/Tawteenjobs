import { desc, eq } from "drizzle-orm";
import { getDb } from "@/db";
import { articles, jobs } from "@/db/schema";
import { HomeClient, type HomeArticle, type HomeJob } from "./home-client";

export const dynamic="force-dynamic";
export const metadata = { alternates:{canonical:"/"}, openGraph:{url:"/",title:"توطين للوظائف | فرص العمل في الخليج",description:"اكتشف أحدث الوظائف وفرص التوطين في دول الخليج."} };

export default async function HomePage(){
  let liveJobs:HomeJob[]=[];
  let liveArticles:HomeArticle[]=[];
  try{
    const db=getDb();
    const [jobRows,articleRows]=await Promise.all([
      db.select().from(jobs).where(eq(jobs.status,"published")).orderBy(desc(jobs.publishedAt),desc(jobs.createdAt)),
      db.select({slug:articles.slug,title:articles.title,category:articles.category,excerpt:articles.excerpt,imageUrl:articles.imageUrl,readTime:articles.readTime}).from(articles).where(eq(articles.status,"published")).orderBy(desc(articles.createdAt)).limit(6)
    ]);
    liveJobs=jobRows.filter(row=>!row.company.includes("تجريب")).map(row=>({slug:row.slug,title:row.titleAr,company:row.company,city:row.city,country:row.country,category:row.category,type:row.employmentType,mode:row.workMode,age:"حديثاً",badge:row.featured?"مميزة":"جديدة",initials:row.company.split(/\s+/).map(x=>x[0]).join("").slice(0,2).toUpperCase(),color:"bg-[#0c9b78]"}));
    liveArticles=articleRows;
  }catch{}
  return <HomeClient initialJobs={liveJobs} initialArticles={liveArticles}/>;
}
