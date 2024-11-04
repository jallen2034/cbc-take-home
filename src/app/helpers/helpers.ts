import { JobItem, NestedJob } from "@/app/types";

// Builds a hierarchical structure of jobs based on a specified job ID.
const buildTotalJobHierarchy = (
  jobData: JobItem[],
  jobIdToFind: number,
): NestedJob | null => {
  // Locate the primary job by matching the specified jobId, assuming it must exist in jobData.
  const currentJob: JobItem | undefined = jobData.find((job: JobItem) => {
    const { jobId }: JobItem = job;
    return jobId === jobIdToFind;
  });
  
  const foundItemWithJobType: JobItem | undefined = jobData.find((job: JobItem) => {
    const { jobId, jobType }: JobItem = job;
    return jobId === jobIdToFind && jobType === "JOB";
  });
  
  // Safety check that the current job is valid.
  if (!currentJob) {
    return null;
  }
  
  const { jobDescription, jobId }: JobItem | undefined = currentJob;
  
  // Conditionally use itemUnit from currentJob or foundItemWithJobType
  const itemUnit: string = foundItemWithJobType ? foundItemWithJobType.jobUnit : currentJob.jobUnit;
  
  // If no job is found for the specified jobId, return null to indicate no matching hierarchy.
  if (!currentJob) return null;
  
  // Gather all items related to this job that are of type "INPUT". These are considered "inputs" for this job.
  const inputsForThisJob = jobData.filter((job: JobItem) => {
    const { jobType, jobId }: JobItem = job;
    return jobIdToFind === jobId && jobType === "INPUT";
  });
  
  // Find all direct child jobs by checking if they reference this jobId and are of type "JOB".
  const listOfChildJobsForThisJob = jobData.filter((job: JobItem) => {
    const { jobType, jobId }: JobItem = job;
    return jobIdToFind === jobId && jobType === "JOB";
  });
  
  // If no child jobs exist for this job, early return the structure with empty nestedChildJobsForThisOne.
  if (listOfChildJobsForThisJob.length === 0) {
    return {
      jobTitle: jobDescription,
      jobId,
      itemUnit,
      inputsForThisJob,
      listOfChildJobsForThisJob,
      nestedChildJobsForThisOne: [] as NestedJob[], // Empty object as no nested child jobs found.
    }
  }
  
  // If we get down here, recursively build the hierarchy for each child job found, gathering each child's nested structure.
  const nestedChildJobsForThisOne: any[] = listOfChildJobsForThisJob.map(
    (childJob: JobItem) => {
      const { itemId }: JobItem = childJob;
      return buildTotalJobHierarchy(jobData, itemId);
    },
  );
  
  // Return the final hierarchical structure, including inputs and any nested child jobs.
  return {
    jobTitle: jobDescription,
    jobId,
    itemUnit,
    inputsForThisJob,
    listOfChildJobsForThisJob,
    nestedChildJobsForThisOne,
  };
};

export { buildTotalJobHierarchy };
