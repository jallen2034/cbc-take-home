import { buildTotalJobHierarchy } from "@/app/helpers/helpers";
import {
  expectedResultConcreteMixingOf400LActiveJob,
  expectedResultConcreteMixingOf400LIdleJob,
  expectedResultHotWaterReservoirInstallationJob,
  expectedResultMortarTraceJob,
  expectedResultWaterproofingWallsJob,
  testJobDataInput,
} from "@/app/__test__/test-data-module";
import {
  CONCRETE_MIXING_OF_400L_ACTIVE_JOB_ID,
  CONCRETE_MIXING_OF_400L_IDLE_JOB_ID,
  HOT_WATER_RESERVOIR_INSTALLATION_JOB_ID,
  MORTAR_TRACE_JOB_ID,
  WATERPROOFING_WALLS_JOB_ID,
} from "../../../util/constants";
import { NestedJob } from "@/app/types";

describe("buildTotalJobHierarchy", (): void => {
  it("returns the expected payload when building a job hierarchy object for a Mortar Trace Job", (): void => {
    const result: NestedJob | null = buildTotalJobHierarchy(
      testJobDataInput,
      MORTAR_TRACE_JOB_ID,
    );
    expect(result).toEqual(expectedResultMortarTraceJob);
  });

  it("returns the expected payload when building a job hierarchy object for a Waterproofing Walls Job", (): void => {
    const result: NestedJob | null = buildTotalJobHierarchy(
      testJobDataInput,
      WATERPROOFING_WALLS_JOB_ID,
    );
    expect(result).toEqual(expectedResultWaterproofingWallsJob);
  });

  it("returns the expected payload when building a job hierarchy object for a hot water reservoir installation Job", (): void => {
    const result: NestedJob | null = buildTotalJobHierarchy(
      testJobDataInput,
      HOT_WATER_RESERVOIR_INSTALLATION_JOB_ID,
    );
    expect(result).toEqual(expectedResultHotWaterReservoirInstallationJob);
  });

  it("returns the expected payload when building a job hierarchy object for a concrete mixing idle Job", (): void => {
    const result: NestedJob | null = buildTotalJobHierarchy(
      testJobDataInput,
      CONCRETE_MIXING_OF_400L_IDLE_JOB_ID,
    );
    expect(result).toEqual(expectedResultConcreteMixingOf400LIdleJob);
  });

  it("returns the expected payload when building a job hierarchy object for a concrete mixing active Job", (): void => {
    const result: NestedJob | null = buildTotalJobHierarchy(
      testJobDataInput,
      CONCRETE_MIXING_OF_400L_ACTIVE_JOB_ID,
    );
    expect(result).toEqual(expectedResultConcreteMixingOf400LActiveJob);
  });
});
