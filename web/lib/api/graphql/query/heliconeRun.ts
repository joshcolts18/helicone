import { ApolloError } from "apollo-server-errors";
import { Context } from "../../../../pages/api/graphql";
import {
  FilterLeaf,
  filterListToTree,
  FilterNode,
} from "../../../../services/lib/filters/filterDefs";
import { resultMap } from "../../../result";
import { getCacheCount, getModelMetrics } from "../../cache/stats";
import { modelCost } from "../../metrics/costCalc";
import { getTotalCostProperties } from "../../property/totalCosts";
import { getRequestCount, getRequestsDateRange } from "../../request/request";
import {
  AggregatedHeliconeRequest,
  HeliconeRun,
  HeliconeRunFilter,
  QueryAggregatedHeliconeRequestArgs,
  QueryHeliconeRunArgs,
} from "../schema/types/graphql";
import { convertTextOperators, convertTimeOperators } from "./helper";
import { getRuns } from "../../runs/runs";

const filterInputToFilterLeaf: {
  [key in keyof HeliconeRunFilter]: (
    filter: HeliconeRunFilter[key]
  ) => FilterLeaf | undefined;
} = {
  id: (id) => {
    if (id === undefined || id === null) {
      return undefined;
    }
    return {
      run: {
        id: convertTextOperators(id),
      },
    };
  },
  property: (property) => {
    if (property === undefined || property === null) {
      return undefined;
    }
    return {
      run: {
        custom_properties: {
          [property.name]: convertTextOperators(property.value),
        },
      },
    };
  },
  name: (name) => {
    if (name === undefined || name === null) {
      return undefined;
    }
    return {
      run: {
        name: convertTextOperators(name),
      },
    };
  },
  description: (description) => {
    if (description === undefined || description === null) {
      return undefined;
    }
    return {
      run: {
        description: convertTextOperators(description),
      },
    };
  },
  updated_at: (updatedAt) => {
    if (updatedAt === undefined || updatedAt === null) {
      return undefined;
    }
    return {
      run: {
        updated_at: convertTimeOperators(updatedAt),
      },
    };
  },
  created_at: (createdAt) => {
    if (createdAt === undefined || createdAt === null) {
      return undefined;
    }
    return {
      run: {
        created_at: convertTimeOperators(createdAt),
      },
    };
  },
};

function convertFilterInputToFilterLeaf(filter: HeliconeRunFilter): FilterNode {
  const keys = Object.keys(filter) as (keyof HeliconeRunFilter)[];
  const convertedFilters = keys
    .map((key) => {
      const toLeaf = filterInputToFilterLeaf[key];
      if (toLeaf === undefined) {
        return undefined;
      }
      return toLeaf(filter[key] as any);
    })
    .filter((f): f is FilterLeaf => f !== undefined);
  return filterListToTree(convertedFilters, "and");
}

export async function heliconeRun(
  root: any,
  args: QueryHeliconeRunArgs,
  context: Context,
  info: any
): Promise<HeliconeRun[]> {
  const orgId = await context.getOrgIdOrThrow();
  const { limit, offset, filters } = {
    limit: args.limit ?? 100,
    offset: args.offset ?? 0,
    filters: args.filters ?? [],
  };
  const convertedFilters: FilterNode[] = filters.map((f) =>
    convertFilterInputToFilterLeaf(f)
  );
  const filter = filterListToTree(convertedFilters, "and");

  const { data, error } = await getRuns(orgId, filter, offset, limit, {
    created_at: "desc",
  });

  if (error !== null) {
    throw new ApolloError(error, "INTERNAL_SERVER_ERROR");
  }
  return data.map((r) => ({
    id: r.id,
    status: r.status,
    name: r.name,
    description: r.description,
    created_at: r.created_at,
    updated_at: r.updated_at,
    timeout_seconds: r.timeout_seconds,
    custom_properties: r.custom_properties,
    request_count: r.request_count,
    task_count: r.task_count,
  }));
}
