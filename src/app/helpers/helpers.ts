import { JobItem, NestedJob } from "@/app/types";

/* Helper function to retrieve the unit of measurement for a job based on its jobId.
 * It checks if there is a job in the provided jobData with the specified jobId
 * and returns its jobUnit if found, or the defaultUnit if not. */
const getJobUnit = (
  jobData: JobItem[],
  jobIdToFind: number,
  defaultUnit: string,
): string => {
  const foundItemWithJobType: JobItem | undefined = jobData.find(
    ({ jobId, jobType }: JobItem) => jobId === jobIdToFind && jobType === "JOB",
  );

  // Use the jobUnit from foundItemWithJobType if it's available, otherwise use the provided defaultUnit.
  return foundItemWithJobType ? foundItemWithJobType.jobUnit : defaultUnit;
};

// Helper function to recursively builds a hierarchical tree-like structure of jobs based on a specified job ID.
const buildJobHierarchyTree = (
  jobData: JobItem[],
  jobIdToFind: number,
): NestedJob | null => {
  // Gather all items related to this job that are of type "INPUT".
  const inputs: JobItem[] = jobData.filter(
    (job) => job.jobId === jobIdToFind && job.jobType === "INPUT",
  );

  // Find all direct child jobs by checking if they reference this jobId and are of type "JOB".
  const childJobs: JobItem[] = jobData.filter(
    (job) => job.jobId === jobIdToFind && job.jobType === "JOB",
  );

  // Guard clause: If no inputs are found, return null.
  if (inputs.length === 0) {
    return null;
  }

  // Assign currentJob as the first item in inputs as they all share the same jobId.
  const currentJob: JobItem = inputs[0];

  // Safety check to ensure a job with id can even be found in the jobData JSON.
  if (!currentJob) {
    return null;
  }

  // Destructure the description, id and units of measurement from this found job.
  const { jobDescription, jobId, jobUnit }: JobItem = currentJob;

  // We also want to scan through the jobData JSON and determine if another job exists in it.
  const itemUnit: string = getJobUnit(jobData, jobIdToFind, jobUnit);

  // If no child jobs exist for this current jobId, return the structure with empty nestedChildJobs.
  if (childJobs.length === 0) {
    return {
      jobTitle: jobDescription,
      jobId,
      itemUnit,
      inputsForThisJob: inputs,
      listOfChildJobsForThisJob: childJobs,
      nestedChildJobsForThisOne: [] as NestedJob[], // No nested child jobs exist :)
    };
  }

  // Otherwise, recursively drill down and build out the hierarchy for every child job in the tree we are building.
  const nestedChildJobsForThisOne: NestedJob[] = childJobs.map(
    (childJob) => buildJobHierarchyTree(jobData, childJob.itemId) as NestedJob,
  );

  // Return the final hierarchical structure, including inputs and nested child jobs.
  return {
    jobTitle: jobDescription,
    jobId,
    itemUnit,
    inputsForThisJob: inputs,
    listOfChildJobsForThisJob: childJobs,
    nestedChildJobsForThisOne,
  };
};

export { buildJobHierarchyTree };
