import { useTableStore } from "@/lib/state/table.store";
import { useMemo } from "react";

export function useScopedTable(tableKey: string) {
  const { tables, setSearch, setFilter, setSort, setCurrentPage, resetTable } =
    useTableStore();

  const tableState = useMemo(
    () =>
      tables[tableKey] ?? { search: "", filters: {}, sort: [], currentPage: 1 },
    [tables, tableKey],
  );

  return {
    ...tableState,
    setSearch: (val: string) => setSearch(tableKey, val),
    setFilter: (key: string, val: string) => setFilter(tableKey, key, val),
    setSort: (sort: any) => setSort(tableKey, sort),
    setCurrentPage: (val: number) => setCurrentPage(tableKey, val),
    resetTable: () => resetTable(tableKey),
  };
}
