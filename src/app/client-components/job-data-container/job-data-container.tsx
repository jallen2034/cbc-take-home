"use client";
import React, { useMemo } from "react";
import { TestItem } from "@/app/types";
import { calculateTotalCostForItemsAssociatedWithJob } from "@/app/client-components/job-data-container/helpers"; // Import the type if needed

interface JobDataContainerProps {
  testItemArr: TestItem[];
}

const JobDataContainer: React.FC<JobDataContainerProps> = ({ testItemArr }) => {
  console.log({ testItemArr });
  
  const totalCost = useMemo(
    () => calculateTotalCostForItemsAssociatedWithJob(testItemArr),
    [testItemArr],
  );
  
  console.log(totalCost);
  
  return (
    <div>
      <h1>TODO: Render job data here later</h1>
    </div>
  );
};

export default JobDataContainer;
