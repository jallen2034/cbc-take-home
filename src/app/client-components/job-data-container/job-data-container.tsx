"use client";
import React from "react";
import { TestItemArr } from "@/app/types"; // Import the type if needed

interface JobDataContainerProps {
  testItemArr: TestItemArr;
}

const JobDataContainer: React.FC<JobDataContainerProps> = ({ testItemArr }) => {
  console.log({ testItemArr });
  
  return (
    <div>
      <h1>TODO: Render job data here later</h1>
    </div>
  );
};

export default JobDataContainer;
