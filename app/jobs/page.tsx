import { getPublishedJobs } from "@/lib/live-jobs";
import type { Job } from "@/lib/jobs";
import { JobsClient } from "./jobs-client";

export const dynamic = "force-dynamic";
export const metadata = {title:"وظائف الخليج",description:"تصفح أحدث الوظائف المنشورة في دول الخليج.",alternates:{canonical:"/jobs"}};

export default async function JobsPage({searchParams}:{searchParams:Promise<{country?:string;q?:string;company?:string}>}) {
  const params=await searchParams;
  let liveJobs:Job[] = [];
  try {
    liveJobs = await getPublishedJobs();
  } catch {}
  return <JobsClient initialJobs={liveJobs} initialQuery={params.company??params.q??""} initialCountry={params.country??"all"} />;
}
