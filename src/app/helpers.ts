import { JobHierarchy, JobItem } from "@/app/types";

/* TODO: Implement a function to calculate the total cost for a job, including:
 - The job's own cost (if applicable).
 - Costs of all direct inputs and recursively nested child jobs.
 - Handle cases with missing or null costs and avoid double-counting. */
const calculateTotalCostForItemsAssociatedWithJob = () => {};

const buildTotalJobHierarchy = (
  jobData: JobItem[],
  jobIdToFind: number,
): any => {
  // Locate the primary job by matching the specified jobId, assuming it must exist in jobData.
  const currentJob = jobData.find((job: JobItem) => {
    const { jobId }: JobItem = job;
    return jobId === jobIdToFind;
  });
  
  // If no job is found for the specified jobId, return null to indicate no matching hierarchy.
  if (!currentJob) return null;
  
  // Gather all items related to this job that are of type "INPUT". These are considered "inputs" for this job.
  const inputsForThisJob = jobData.filter((job: JobItem) => {
    const { jobType, jobId }: JobItem = job;
    return jobIdToFind === jobId && jobType === "INPUT";
  });
  
  // Find all direct child jobs by checking if they reference this jobId and are of type "JOB".
  const listOfChildJobsForThisJob = jobData.filter((job: JobItem) => {
    const { jobType, jobId }: JobItem = job; // Assuming 'parentId' associates child jobs with a parent job.
    return jobIdToFind === jobId && jobType === "JOB";
  });
  
  // If no child jobs exist for this job, early return the structure with empty nestedChildJobsForThisOne.
  if (listOfChildJobsForThisJob.length === 0) {
    return {
      jobTitle: currentJob.jobDescription,
      jobId: currentJob.jobId,
      inputsForThisJob,
      nestedChildJobsForThisOne: {}, // Empty object as no nested child jobs found.
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
    jobTitle: currentJob.jobDescription,
    jobId: currentJob.jobId,
    inputsForThisJob,
    nestedChildJobsForThisOne,
  };
};

export { calculateTotalCostForItemsAssociatedWithJob, buildTotalJobHierarchy };
