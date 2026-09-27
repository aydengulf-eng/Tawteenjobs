import { BriefcaseBusiness, Building2, Globe2, ShieldCheck } from "lucide-react";
import { SiteHeader } from "@/components/site-header";

export const metadata = {
  title: "من نحن | توطين للوظائف",
  description: "تعرف على منصة توطين ورسالتها في مساعدة الباحثين عن العمل على اكتشاف فرص موثوقة في دول الخليج.",
  alternates: { canonical: "/about" },
  openGraph: {
    url: "/about",
    title: "من نحن | توطين للوظائف",
    description: "منصة عربية للوظائف وفرص التوطين في دول الخليج.",
  },
};

const values = [
  { icon: ShieldCheck, title: "فرص من مصادر رسمية", text: "نحرص على توجيه الباحثين إلى صفحات التقديم التابعة للشركات وأصحاب العمل." },
  { icon: Globe2, title: "تغطية دول الخليج", text: "نجمع فرصاً من السعودية والإمارات وقطر والكويت وعُمان والبحرين في مكان واحد." },
  { icon: BriefcaseBusiness, title: "بحث أسهل عن العمل", text: "ننظم الوظائف حسب الدولة والتخصص والشركة لتسهيل الوصول إلى الفرص المناسبة." },
  { icon: Building2, title: "محتوى مهني عربي", text: "ننشر أدلة ومقالات عملية تساعد الباحث على التقديم والاستعداد للمقابلات بأمان." },
];

export default function AboutPage() {
  return <main dir="rtl" className="min-h-screen bg-[#f5f8fa]">
    <SiteHeader />
    <section className="hero-shell py-16 text-white">
      <div className="container-shell max-w-4xl">
        <p className="font-black text-[#dfc27f]">منصة توظيف عربية للخليج</p>
        <h1 className="mt-3 text-4xl font-black md:text-5xl">من نحن</h1>
        <p className="mt-5 max-w-3xl text-lg leading-9 text-slate-300">توطين منصة عربية مستقلة تساعد الباحثين عن العمل على اكتشاف أحدث الوظائف وفرص التوطين لدى شركات ومؤسسات في دول الخليج، مع الوصول المباشر إلى مصدر الإعلان الرسمي كلما كان متاحاً.</p>
      </div>
    </section>

    <section className="container-shell py-12">
      <div className="grid gap-6 md:grid-cols-2">
        {values.map(({icon:Icon,title,text}) => <article key={title} className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
          <div className="grid h-12 w-12 place-items-center rounded-xl bg-emerald-50 text-[#009b78]"><Icon /></div>
          <h2 className="mt-5 text-xl font-black text-[#071a2e]">{title}</h2>
          <p className="mt-3 leading-8 text-slate-600">{text}</p>
        </article>)}
      </div>

      <article className="mt-8 rounded-2xl border border-slate-200 bg-white p-7 md:p-9">
        <h2 className="text-2xl font-black text-[#071a2e]">رسالتنا</h2>
        <p className="mt-4 leading-8 text-slate-600">نهدف إلى جعل البحث عن وظيفة في الخليج أكثر وضوحاً وأماناً، وتوفير معلومات مفيدة باللغة العربية دون فرض أي رسوم على الباحثين عن العمل. لا تمثل توطين الشركات المعلنة ولا تضمن القبول أو التوظيف، وتبقى شروط التقديم والاختيار من مسؤولية صاحب العمل.</p>
        <h2 className="mt-8 text-2xl font-black text-[#071a2e]">السلامة والشفافية</h2>
        <p className="mt-4 leading-8 text-slate-600">ننصح دائماً بمراجعة رابط الشركة الرسمي وعدم دفع أي مبلغ مقابل وعد بالتوظيف، وعدم مشاركة المعلومات البنكية أو الوثائق الحساسة مع جهات غير موثوقة. يمكن الإبلاغ عن إعلان أو رابط غير صالح عبر صفحة التواصل.</p>
        <div className="mt-7 flex flex-wrap gap-3">
          <a href="/jobs" className="rounded-xl bg-[#00a67e] px-6 py-3 font-black text-white">تصفح الوظائف</a>
          <a href="/contact" className="rounded-xl border border-slate-200 px-6 py-3 font-black text-[#071a2e]">تواصل معنا</a>
        </div>
      </article>
    </section>
  </main>;
}
