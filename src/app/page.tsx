import { buildTotalJobHierarchy } from "@/app/helpers/helpers";
import { JobItem, TestItemArr } from "@/app/types";
import { jobIdArr } from "../../util/constants";
import JobDataContainer from "@/app/client-components/job-data-container/job-data-container";
import "./page.module.css";

// Main component responsible for fetching job data, generating job hierarchies, and rendering the UI on the server side.
export default async function Home() {
  const res: Response = await fetch(
    "http://localhost:3000/data/composition-data.json",
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  // Parse the json data and display it before we attempt to calculate the job hierarchy later on.
  const jobData: JobItem[] = await res.json();
  
  // Generate an array of job hierarchies for each job ID in jobIdArr.
  const testItemArr: TestItemArr = jobIdArr.map((jobId: number) =>
    buildTotalJobHierarchy(jobData, jobId),
  );

  return (
    <main className="main">
      <div className="description">
      </div>
      <JobDataContainer {...{ testItemArr }} />
    </main>
  );
}
