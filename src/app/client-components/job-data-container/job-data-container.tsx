"use client";
import React, { useMemo } from "react";
import { TestItem } from "@/app/types";
import { calculateTotalCostForItemsAssociatedWithJob } from "@/app/client-components/job-data-container/helpers";
import { JobCostSummary } from "@/app/client-components/job-data-container/types";
import "./job-container.scss";

interface JobDataContainerProps {
  testItemArr: TestItem[];
}

const JobDataContainer: React.FC<JobDataContainerProps> = ({ testItemArr }) => {
  console.log({ testItemArr });
  
  const totalCost: (JobCostSummary | null | undefined)[] = useMemo(
    () => calculateTotalCostForItemsAssociatedWithJob(testItemArr),
    [testItemArr],
  );
  
  return (
    <div className="jobDataContainer">
      <h3>Job Cost Summary</h3>
      <table className="table">
        <thead>
          <tr className="tr">
            <th className="th">ID</th>
            <th className="th">Description</th>
            <th className="th">Unit</th> {/* New column for Unit */}
            <th className="th">Price</th>
          </tr>
        </thead>
        <tbody>
          {totalCost.map(
            (item: JobCostSummary | null | undefined, index) =>
              item && (
                <tr key={index} className="tr">
                  <td className="td">{item.jobId}</td>
                  <td className="td">{item.jobTitle}</td>
                  <td className="td">{item.itemUnit}</td>
                  <td className="td">
                    ${item.totalValForThisItemRounded.toFixed(2)}
                  </td>
                </tr>
              ),
          )}
        </tbody>
      </table>
    </div>
  );
};

export default JobDataContainer;
