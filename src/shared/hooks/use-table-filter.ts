import type { Filter } from "@/lib/types";
import { getValueByPath } from "@/lib/utils/get-value-by-path";
import { useMemo } from "react";

export function useTableFilter<T>(data: T[], filters: Filter[]) {
  return useMemo(() => {
    return data.filter((item) => {
      return filters.every((filter) => {
        const field = getValueByPath(item, filter.key);
        const value = filter.value?.toLowerCase() ?? "";

        switch (filter.type) {
          case "is":
            return String(field).toLowerCase() === value;
          case "isNot":
            return String(field).toLowerCase() !== value;
          case "contains":
            return String(field).toLowerCase().includes(value);
          case "doesNotContain":
            return !String(field).toLowerCase().includes(value);
          case "startsWith":
            return String(field).toLowerCase().startsWith(value);
          case "endsWith":
            return String(field).toLowerCase().endsWith(value);
          case "isEmpty":
            return !field || field === "";
          case "isNotEmpty":
            return !!field && field !== "";
          default:
            return true;
        }
      });
    });
  }, [data, filters]);
}
