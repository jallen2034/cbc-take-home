import {
  calculateIndividualTestItem,
  calculateTotalCostForJob,
  sumPricesForIndividualJobInput,
} from "@/app/client-components/job-data-container/helpers";
import {
  expectedTotalCostJobData,
  testInputConcreteMixingOf400LActiveSum,
  testInputConcreteMixingOf400LIdleSum,
  testInputMortarTraceCementLimeAndMediumSandSum,
  testInputWaterproofingWallsSum,
  testItemArr,
  testItemConcreteMixingOf400LActive,
  testItemConcreteMixingOf400LIdle,
  testItemHotWaterReservoirInstallation,
  testItemMortarTraceCementLimeAndMediumSand,
  testItemWaterproofingAdditive,
} from "@/app/__test__/job-data-collector-helpers/test-data-module";
import { JobCostSummary } from "@/app/client-components/job-data-container/types";

describe("sumPricesForIndividualJobInput", (): void => {
  it("should correctly sum of $287.63419999999996 with the inputs for a MORTAR TRACE (CEMENT, LIME AND MEDIUM SAND) input ", (): void => {
    const talliedSumOfInputsForThisJob = sumPricesForIndividualJobInput(
      testInputMortarTraceCementLimeAndMediumSandSum,
    );
    expect(talliedSumOfInputsForThisJob).toEqual(287.63419999999996);
  });

  it("should correctly sum of $1.25 with the inputs for a CONCRETE MIXING OF 400 L - ACTIVE input ", (): void => {
    const talliedSumOfInputsForThisJob = sumPricesForIndividualJobInput(
      testInputConcreteMixingOf400LActiveSum,
    );
    expect(talliedSumOfInputsForThisJob).toEqual(1.25);
  });

  it("should correctly sum of $0.22 with the inputs for a CONCRETE MIXING OF 400 L - IDLE input ", (): void => {
    const talliedSumOfInputsForThisJob = sumPricesForIndividualJobInput(
      testInputConcreteMixingOf400LIdleSum,
    );
    expect(talliedSumOfInputsForThisJob).toEqual(0.22);
  });

  it("should correctly sum of $21.5035 with the inputs for a WATERPROOFING WALLS input ", (): void => {
    const talliedSumOfInputsForThisJob = sumPricesForIndividualJobInput(
      testInputWaterproofingWallsSum,
    );
    expect(talliedSumOfInputsForThisJob).toEqual(21.5035);
  });
});

describe("calculateIndividualTestItem", (): void => {
  it("should correctly return the correct calculated value of the work required for a MORTAR TRACE (CEMENT, LIME AND MEDIUM SAND) job to be $289.1042", (): void => {
    const totalValForThisItem: number = calculateIndividualTestItem(
      testItemMortarTraceCementLimeAndMediumSand,
    );
    expect(totalValForThisItem).toEqual(289.9819);
  });

  it("should correctly return the correct calculated value of the work required for a HOT WATER RESERVOIR INSTALLATION job to be $128.613882", (): void => {
    const totalValForThisItem: number = calculateIndividualTestItem(
      testItemHotWaterReservoirInstallation,
    );
    expect(totalValForThisItem).toEqual(128.61388);
  });

  it("should correctly return the correct calculated value of the work required for a CONCRETE MIXING OF 400 L - IDLE job to be $0.22", (): void => {
    const totalValForThisItem: number = calculateIndividualTestItem(
      testItemConcreteMixingOf400LIdle,
    );
    expect(totalValForThisItem).toEqual(0.22);
  });

  it("should correctly return the correct calculated value of the work required for a CONCRETE MIXING OF 400 L - ACTIVE job to be $1.25", (): void => {
    const totalValForThisItem: number = calculateIndividualTestItem(
      testItemConcreteMixingOf400LActive,
    );
    expect(totalValForThisItem).toEqual(1.25);
  });

  it("should correctly return the correct calculated value of the work required for a WATERPROOF WALLS job to be $28.7530475", (): void => {
    const totalValForThisItem: number = calculateIndividualTestItem(
      testItemWaterproofingAdditive,
    );
    expect(totalValForThisItem).toEqual(28.7530475);
  });
});

describe("calculateTotalCostForItemsAssociatedWithJob", (): void => {
  it("should return the expected output of correct total costs for all the jobs", (): void => {
    const totalCost: (JobCostSummary | null | undefined)[] =
      calculateTotalCostForJob(testItemArr);
    expect(totalCost).toEqual(expectedTotalCostJobData);
  });
});
