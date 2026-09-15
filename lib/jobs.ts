export type Job = {
  slug: string; title: string; company: string; city: string; country: string;
  type: string; mode: string; age: string; badge: string; initials: string;
  category: string; salary: string; description: string; requirements: string[];
};

export const jobs: Job[] = [
  { slug: "business-development-manager-riyadh", title: "مدير تطوير أعمال", company: "شركة تقنية رائدة", city: "الرياض", country: "السعودية", type: "دوام كامل", mode: "حضوري", age: "منذ ساعتين", badge: "جديدة", initials: "TR", category: "المبيعات والتسويق", salary: "12,000 – 18,000 ر.س", description: "قيادة فرص النمو وبناء الشراكات التجارية وتطوير قنوات مبيعات جديدة داخل السوق السعودي.", requirements: ["خبرة 4 سنوات أو أكثر في تطوير الأعمال", "مهارات تفاوض وعرض قوية", "إجادة العربية والإنجليزية", "معرفة جيدة بسوق التقنية في الخليج"] },
  { slug: "senior-accountant-dubai", title: "محاسب أول", company: "مجموعة استثمارية", city: "دبي", country: "الإمارات", type: "دوام كامل", mode: "هجين", age: "منذ 4 ساعات", badge: "مميزة", initials: "MI", category: "المالية والمحاسبة", salary: "14,000 – 17,000 د.إ", description: "إدارة التقارير المالية الشهرية والمطابقات ومتابعة العمليات المحاسبية لمجموعة استثمارية متنامية.", requirements: ["بكالوريوس محاسبة أو مالية", "خبرة لا تقل عن 5 سنوات", "إجادة Excel وأنظمة ERP", "يفضل توفر شهادة مهنية"] },
  { slug: "customer-experience-specialist-jeddah", title: "أخصائي تجربة العملاء", company: "منصة تجارة إلكترونية", city: "جدة", country: "السعودية", type: "دوام كامل", mode: "حضوري", age: "منذ 6 ساعات", badge: "توطين", initials: "EC", category: "خدمة العملاء", salary: "7,000 – 9,000 ر.س", description: "تحسين رحلة العميل ومعالجة الملاحظات بالتنسيق مع فرق التشغيل والمنتج.", requirements: ["مهارات تواصل ممتازة", "خبرة في خدمة العملاء", "القدرة على تحليل الملاحظات", "إجادة استخدام أنظمة CRM"] },
  { slug: "frontend-engineer-abu-dhabi", title: "مهندس برمجيات Frontend", company: "حلول السحابة الخليجية", city: "أبوظبي", country: "الإمارات", type: "دوام كامل", mode: "هجين", age: "منذ 8 ساعات", badge: "جديدة", initials: "GC", category: "التقنية والبرمجة", salary: "18,000 – 25,000 د.إ", description: "تطوير واجهات رقمية سريعة وقابلة للتوسع ضمن فريق منتج يعمل على حلول سحابية للمنطقة.", requirements: ["خبرة قوية في React وTypeScript", "فهم تجربة المستخدم وإمكانية الوصول", "خبرة في الاختبارات والأداء", "إجادة العمل ضمن فرق Agile"] },
  { slug: "hr-specialist-doha", title: "أخصائي موارد بشرية", company: "مجموعة خدمات الخليج", city: "الدوحة", country: "قطر", type: "دوام كامل", mode: "حضوري", age: "منذ يوم", badge: "جديدة", initials: "GS", category: "الموارد البشرية", salary: "10,000 – 13,000 ر.ق", description: "دعم عمليات التوظيف وشؤون الموظفين وتطوير تجربة العاملين.", requirements: ["خبرة 3 سنوات في الموارد البشرية", "معرفة بقوانين العمل", "مهارات تنظيمية عالية", "العربية والإنجليزية"] },
  { slug: "digital-marketing-kuwait", title: "أخصائي تسويق رقمي", company: "شركة تجارة حديثة", city: "مدينة الكويت", country: "الكويت", type: "دوام كامل", mode: "هجين", age: "منذ يوم", badge: "مميزة", initials: "MC", category: "المبيعات والتسويق", salary: "900 – 1,200 د.ك", description: "إدارة الحملات الرقمية وقياس الأداء وتنمية قنوات الاستحواذ.", requirements: ["خبرة في إعلانات Google وMeta", "تحليل بيانات الحملات", "كتابة محتوى تسويقي", "إعداد التقارير الشهرية"] },
];

export const countryData: Record<string, { name: string; blurb: string }> = {
  "saudi-arabia": { name: "السعودية", blurb: "فرص مهنية في الرياض وجدة والدمام ومختلف مناطق المملكة." },
  uae: { name: "الإمارات", blurb: "وظائف في دبي وأبوظبي والشارقة ضمن قطاعات سريعة النمو." },
  qatar: { name: "قطر", blurb: "فرص عمل في الدوحة والقطاعات المالية والتقنية والخدمية." },
  kuwait: { name: "الكويت", blurb: "وظائف متنوعة للمواطنين والمقيمين في السوق الكويتي." },
  oman: { name: "عُمان", blurb: "فرص التعمين والعمل في مسقط وباقي محافظات السلطنة." },
  bahrain: { name: "البحرين", blurb: "وظائف في المنامة والقطاعات المصرفية والتقنية والخدمية." },
};
