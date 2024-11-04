/* TODO: Implement a function to calculate the total cost for a job, including:
 - The job's own cost (if applicable).
 - Costs of all direct inputs and recursively nested child jobs.
 - Handle cases with missing or null costs and avoid double-counting. */
import { JobItem, NestedJob, TestItem } from "@/app/types";
import { JobCostSummary } from "@/app/client-components/job-data-container/types";

// Sums the prices of all job inputs.
const sumPricesForIndividualJobInput = (inputsForThisJob: JobItem[]) => {
  let totalCost: number = 0;

  inputsForThisJob.forEach((job: JobItem) => {
    const { pricePerUnit, jobItemQuantity }: JobItem = job;
    const calculatedTotalOfJob = Number(pricePerUnit) * Number(jobItemQuantity);
    totalCost += Number(calculatedTotalOfJob);
  });

  return totalCost;
};

/* Helper function that finds the job item quantity for a specified jobId
 * within the provided list of child jobs. If the jobId is found, it returns
 * the corresponding jobItemQuantity; otherwise, it defaults to returning 1. */
const getJobItemQuantity = (
  jobId: number,
  listOfChildJobs: JobItem[],
): number => {
  const foundItemQuantity = listOfChildJobs.find(
    ({ itemId }: JobItem) => itemId === jobId,
  )?.jobItemQuantity;

  return foundItemQuantity ? Number(foundItemQuantity) : 1;
};

// Function to recursively calculate total cost of a selected job.
const calculateTotalCost = (testItem: TestItem) => {
  let talliedCostForThisJob: number = 0;

  // Guard clause for null or invalid testItem.
  if (!testItem) {
    return;
  }

  const {
    inputsForThisJob,
    nestedChildJobsForThisOne,
    listOfChildJobsForThisJob,
  }: NestedJob = testItem;
  const talliedSumOfInputsForThisJob: number =
    sumPricesForIndividualJobInput(inputsForThisJob);

  // Add the calculated tallied sum of inputs for this job to the total tallied cost for this job.
  talliedCostForThisJob += talliedSumOfInputsForThisJob;

  // Guard clause. If there are no nested child jobs, return the total cost calculated so far.
  if (!nestedChildJobsForThisOne || nestedChildJobsForThisOne.length === 0) {
    return talliedCostForThisJob;
  }

  // Recurse down nested jobs and calculate sum of their inputs there.
  for (const childJob of nestedChildJobsForThisOne) {
    const talliedCostForChildJob: number | undefined =
      calculateTotalCost(childJob);

    const { jobId }: NestedJob = childJob;

    // Helper function needed to retrieve the quantity for a specific child that's of type "JOB" (Not "INPUT").
    const quantity = getJobItemQuantity(jobId, listOfChildJobsForThisJob);

    // Multiply the cost of the child "JOB" by its quantity. Add it to the current job's total cost.
    if (talliedCostForChildJob) {
      talliedCostForThisJob += talliedCostForChildJob * quantity;
    }
  }

  return talliedCostForThisJob;
};

// Calculates the total cost for an individual test item, including the costs of its inputs + any nested child jobs.
const calculateIndividualTestItem = (testItem: TestItem): number => {
  if (testItem === null) {
    return 0; // Return 0 for null TestItem.
  }

  // Calculate the total cost.
  const totalCost = calculateTotalCost(testItem);
  return totalCost || 0;
};

/* Computes total costs for job items in the array, returning summaries with jobTitle, jobId, itemUnit,
 * and the rounded total cost for each valid item. Returns null for invalid items. */
const calculateTotalCostForJob = (
  testItemArr: TestItem[],
): (JobCostSummary | null)[] => {
  return testItemArr.map((testItem: TestItem | null) => {
    // Guard clause: Skip invalid items.
    if (!testItem || !("inputsForThisJob" in testItem)) {
      return null;
    }

    // Destructure required properties from testItem, assumed to be of type NestedJob.
    const { jobTitle, jobId, itemUnit }: NestedJob = testItem;

    // Calculate and round the total value for this job item.
    const totalValForThisItem: number = calculateIndividualTestItem(testItem);
    const totalValForThisItemRounded: number =
      Math.round(totalValForThisItem * 100) / 100;

    // Return the structured result for this item
    return {
      jobTitle,
      totalValForThisItemRounded,
      jobId,
      itemUnit,
    } as JobCostSummary;
  });
};

export {
  calculateTotalCostForJob,
  sumPricesForIndividualJobInput,
  calculateIndividualTestItem,
};
