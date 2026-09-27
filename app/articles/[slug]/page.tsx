import { and, desc, eq, ne } from "drizzle-orm";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { getDb } from "@/db";
import { articles as table } from "@/db/schema";

type Article = { slug:string; title:string; category:string; read:string; excerpt:string; content?:string; imageUrl?:string };

async function find(slug:string):Promise<Article|undefined> {
  try {
    const [x] = await getDb().select().from(table).where(eq(table.slug,slug)).limit(1);
    if (x) return { slug:x.slug,title:x.title,category:x.category,read:x.readTime,excerpt:x.excerpt,content:x.content,imageUrl:x.imageUrl };
  } catch {}
  return undefined;
}

export async function generateMetadata({params}:{params:Promise<{slug:string}>}) {
  const {slug}=await params;
  const a=await find(slug);
  return {title:a?`${a.title} | توطين`:"المقال غير موجود",description:a?.excerpt,alternates:a?{canonical:`/articles/${a.slug}`}:undefined,robots:a?undefined:{index:false,follow:false}};
}

export default async function ArticlePage({params}:{params:Promise<{slug:string}>}) {
  const {slug}=await params;
  const a=await find(slug);
  if(!a) notFound();
  const paragraphs=(a.content??"اقرأ الإعلان بعناية وحدد المهارات المطلوبة، ثم خصص سيرتك الذاتية وطلب التوظيف بما يناسب الفرصة.").split(/\n+/).filter(Boolean);
  let related:{slug:string;title:string;excerpt:string;imageUrl:string}[]=[];
  try {
    related=await getDb().select({slug:table.slug,title:table.title,excerpt:table.excerpt,imageUrl:table.imageUrl}).from(table)
      .where(and(eq(table.status,"published"),ne(table.slug,a.slug))).orderBy(desc(table.createdAt)).limit(3);
  } catch {}
  const schema=JSON.stringify({"@context":"https://schema.org","@type":"Article",headline:a.title,description:a.excerpt,image:a.imageUrl?[a.imageUrl]:undefined,author:{"@type":"Organization",name:"توطين للوظائف"},publisher:{"@type":"Organization",name:"توطين للوظائف"},mainEntityOfPage:`https://tawteenjobs.com/articles/${a.slug}`}).replace(/</g,"\\u003c");

  return <main dir="rtl" className="min-h-screen bg-[#f5f8fa]">
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:schema}}/>
    <SiteHeader/>
    <article className="container-shell max-w-3xl py-12">
      <nav className="mb-6 flex flex-wrap gap-2 text-sm font-black text-[#008f6c]" aria-label="مسار الصفحة"><a href="/">الرئيسية</a><span>/</span><a href="/articles">دليل التوظيف</a></nav>
      <span className="font-black text-[#009b78]">{a.category} • {a.read}</span>
      <h1 className="mt-4 text-3xl font-black leading-[1.5] text-[#071a2e] md:text-4xl">{a.title}</h1>
      <p className="mt-4 text-lg leading-8 text-slate-500">{a.excerpt}</p>
      {a.imageUrl&&<img src={a.imageUrl} alt={a.title} className="mt-8 max-h-[430px] w-full rounded-2xl object-cover"/>}
      <div className="mt-8 space-y-5 rounded-2xl border bg-white p-6 text-[1.05rem] leading-9 text-slate-700">{paragraphs.map((p,i)=><p key={i}>{p}</p>)}</div>
      <aside className="mt-8 rounded-2xl bg-[#071a2e] p-6 text-white"><h2 className="text-xl font-black">هل تبحث عن فرصة في الخليج؟</h2><p className="mt-2 leading-7 text-slate-300">تصفح أحدث الوظائف حسب الدولة والتخصص، أو فعّل التنبيهات لتصلك الفرص الجديدة.</p><div className="mt-4 flex flex-wrap gap-3"><a href="/jobs" className="rounded-xl bg-[#00a67e] px-5 py-3 font-black">تصفح الوظائف</a><a href="/alerts" className="rounded-xl border border-white/20 px-5 py-3 font-black">تنبيهات الوظائف</a></div></aside>
      {related.length>0&&<section className="mt-10"><h2 className="text-2xl font-black text-[#071a2e]">مقالات مرتبطة</h2><div className="mt-5 grid gap-4 md:grid-cols-3">{related.map(item=><a key={item.slug} href={`/articles/${item.slug}`} className="overflow-hidden rounded-2xl border bg-white shadow-sm">{item.imageUrl&&<img src={item.imageUrl} alt={item.title} className="h-32 w-full object-cover" loading="lazy"/>}<div className="p-4"><h3 className="font-black leading-7 text-[#071a2e]">{item.title}</h3><p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">{item.excerpt}</p></div></a>)}</div></section>}
    </article>
  </main>;
}
