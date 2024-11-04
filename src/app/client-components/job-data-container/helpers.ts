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

// Helper function to find and return the jobItemQuantity for a given jobId.
const getJobItemQuantity = (jobId: number, listOfChildJobs: JobItem[]): number => {
  const foundItemQuantity = listOfChildJobs.find(
    ({ itemId }: JobItem) => itemId === jobId
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
    
    // Use the helper function to retrieve the quantity needed for this specific child that's a job (not a input).
    const quantity = getJobItemQuantity(jobId, listOfChildJobsForThisJob);
    
    // Multiply the cost of the child job by its quantity and add it to the current job's total cost.
    if (talliedCostForChildJob) {
      talliedCostForThisJob += (talliedCostForChildJob * quantity);
    }
  }

  return talliedCostForThisJob;
};

// calculates the total cost for an individual test item, including the costs of its inputs + any nested child jobs.
const calculateIndividualTestItem = (testItem: TestItem): number => {
  if (testItem === null) {
    return 0; // Return 0 for null TestItem
  }

  // Calculate the total cost.
  const totalCost = calculateTotalCost(testItem);
  return totalCost || 0;
};

// Calculates the total costs for an array of test items.
const calculateTotalCostForItemsAssociatedWithJob = (
  testItemArr: TestItem[],
): (JobCostSummary | null | undefined)[] => {
  return testItemArr.map((testItem: TestItem) => {
    if (testItem) {
      // Guard clause to check if testItem is of type NestedJob and has the required properties
      if (!("inputsForThisJob" in testItem)) {
        return;
      }

      const { jobTitle, jobId, itemUnit }: NestedJob = testItem;
      const totalValForThisItem: number = calculateIndividualTestItem(testItem);
      const totalValForThisItemRounded: number = Math.round(totalValForThisItem * 100) / 100;
      return { jobTitle, totalValForThisItemRounded, jobId, itemUnit };
    }
    return null;
  });
};

export {
  calculateTotalCostForItemsAssociatedWithJob,
  sumPricesForIndividualJobInput,
  calculateIndividualTestItem,
};
