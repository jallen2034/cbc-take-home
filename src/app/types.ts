export interface JobItem {
  jobId: number;
  jobDescription: string;
  jobUnit: string;
  jobType: 'INPUT' | 'JOB';
  itemId: number;
  itemDescription: string;
  itemUnit: string;
  jobItemQuantity: string;
  pricePerUnit: string;
}

export interface NestedJob {
  jobTitle: string;
  jobId: number;
  inputsForThisJob: JobItem[];
  listOfChildJobsForThisJob: JobItem[];
  nestedChildJobsForThisOne?: NestedJob[];
}

export interface JobHierarchy {
  jobTitle: string;
  jobId: number;
  inputsForThisJob: JobItem[];
  childJobsForThisJob: JobHierarchy[];
  totalCost?: number;
}

export type TestItem = (NestedJob | null);