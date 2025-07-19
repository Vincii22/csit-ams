import type { Sort } from "@/lib/types";
import { getValueByPath } from "@/lib/utils/get-value-by-path";
import { useMemo } from "react";

export function useTableSort<T>(data: T[], sorts: Sort[]) {
  return useMemo(() => {
    return [...data].sort((a, b) => {
      for (const sort of sorts) {
        const valA = getValueByPath(a, sort.key);
        const valB = getValueByPath(b, sort.key);

        if (valA < valB) return sort.direction === "asc" ? -1 : 1;
        if (valA > valB) return sort.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [data, sorts]);
}
