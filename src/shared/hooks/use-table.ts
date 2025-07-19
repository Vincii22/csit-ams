import { useTableStore, defaultState } from "@/lib/state/table.store";
import { Filter, Sort } from "@/lib/types";
import { useMemo } from "react";

export const useTable = (key: string) => {
  const {
    tables,

    // state actions
    setSearch,
    setFilter,
    addFilter,
    removeFilter,
    updateFilter,

    setSort,
    addSort,
    removeSort,
    updateSort,

    setCurrentPage,
    resetTable,
  } = useTableStore();

  const state = tables[key] ?? defaultState;

  // computed state
  const activeFilters = useMemo(
    () => state.filters.filter((f) => f.value && f.value !== ""),
    [state.filters],
  );

  const activeSort = useMemo(
    () => [...state.sort].sort((a, b) => a.order - b.order),
    [state.sort],
  );

  return {
    key,

    // raw state
    search: state.search,
    filters: state.filters,
    sort: state.sort,
    currentPage: state.currentPage,
    activeFilters,
    activeSort,

    // setters
    setSearch: (value: string) => setSearch(key, value),
    setFilter: (filters: Filter[]) => setFilter(key, filters),
    addFilter: (filter: Filter) => addFilter(key, filter),
    removeFilter: (variable: string) => removeFilter(key, variable),
    updateFilter: (filterKey: string, updater: (prev: Filter) => Filter) =>
      updateFilter(key, filterKey, updater),

    setSort: (sort: Sort[]) => setSort(key, sort),
    addSort: (sort: Sort) => addSort(key, sort),
    removeSort: (variable: string) => removeSort(key, variable),
    updateSort: (sortKey: string, updater: (prev: Sort) => Sort) =>
      updateSort(key, sortKey, updater),

    setCurrentPage: (page: number) => setCurrentPage(key, page),
    reset: () => resetTable(key),
  };
};
