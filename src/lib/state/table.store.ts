import type { Sort, Filter } from "../types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type TableState = {
  search: string;
  filters: Filter[];
  sort: Sort[];
  currentPage: number;
};

type TableStore = {
  tables: Record<string, TableState>;

  setSearch: (key: string, value: string) => void;
  setFilter: (key: string, filters: Filter[]) => void;
  addFilter: (key: string, filter: Filter) => void;
  removeFilter: (key: string, variable: string) => void;
  updateFilter: (
    key: string,
    filterKey: string,
    updater: (prev: Filter) => Filter,
  ) => void;

  setSort: (key: string, sort: Sort[]) => void;
  addSort: (key: string, sort: Sort) => void;
  removeSort: (key: string, variable: string) => void;
  updateSort: (
    key: string,
    sortKey: string,
    updater: (prev: Sort) => Sort,
  ) => void;

  setCurrentPage: (key: string, page: number) => void;

  resetTable: (key: string) => void;
};

export const defaultState: TableState = {
  search: "",
  filters: [],
  sort: [],
  currentPage: 1,
};

export const useTableStore = create<TableStore>()(
  persist(
    (set) => ({
      tables: {},

      setSearch: (key, value) =>
        set((state) => ({
          tables: {
            ...state.tables,
            [key]: {
              ...defaultState,
              ...state.tables[key],
              search: value,
            },
          },
        })),

      setFilter: (key, filters) =>
        set((state) => ({
          tables: {
            ...state.tables,
            [key]: {
              ...defaultState,
              ...state.tables[key],
              filters,
            },
          },
        })),

      addFilter: (key, filter) =>
        set((state) => {
          const prev = state.tables[key]?.filters ?? [];
          const existingIndex = prev.findIndex((f) => f.key === filter.key);
          const updated = [...prev];

          if (existingIndex !== -1) {
            updated[existingIndex] = filter;
          } else {
            updated.push(filter);
          }

          return {
            tables: {
              ...state.tables,
              [key]: {
                ...defaultState,
                ...state.tables[key],
                filters: updated,
              },
            },
          };
        }),

      removeFilter: (key, variable) =>
        set((state) => {
          const updated =
            state.tables[key]?.filters.filter((f) => f.key !== variable) ?? [];

          return {
            tables: {
              ...state.tables,
              [key]: {
                ...defaultState,
                ...state.tables[key],
                filters: updated,
              },
            },
          };
        }),

      updateFilter: (key, filterKey, updater) =>
        set((state) => {
          const prev = state.tables[key]?.filters ?? [];
          const updated = [...prev];
          const index = updated.findIndex((f) => f.key === filterKey);

          if (index !== -1) {
            updated[index] = updater(updated[index]);
          }

          return {
            tables: {
              ...state.tables,
              [key]: {
                ...defaultState,
                ...state.tables[key],
                filters: updated,
              },
            },
          };
        }),

      setSort: (key, sort) =>
        set((state) => ({
          tables: {
            ...state.tables,
            [key]: {
              ...defaultState,
              ...state.tables[key],
              sort,
            },
          },
        })),

      addSort: (key, sortItem) =>
        set((state) => {
          const prev = state.tables[key]?.sort ?? [];
          const exists = prev.some((s) => s.key === sortItem.key);
          if (exists) return state;

          return {
            tables: {
              ...state.tables,
              [key]: {
                ...defaultState,
                ...state.tables[key],
                sort: [...prev, sortItem],
              },
            },
          };
        }),

      removeSort: (key, variable) =>
        set((state) => {
          const updated =
            state.tables[key]?.sort.filter((s) => s.key !== variable) ?? [];

          return {
            tables: {
              ...state.tables,
              [key]: {
                ...defaultState,
                ...state.tables[key],
                sort: updated,
              },
            },
          };
        }),

      updateSort: (key, variable, updater: (prev: Sort) => Sort) =>
        set((state) => {
          const prevSorts = state.tables[key]?.sort ?? [];
          const updated = [...prevSorts];
          const index = updated.findIndex((s) => s.key === variable);

          if (index !== -1) {
            updated[index] = updater(updated[index]);
          }

          return {
            tables: {
              ...state.tables,
              [key]: {
                ...defaultState,
                ...state.tables[key],
                sort: updated,
              },
            },
          };
        }),

      setCurrentPage: (key, page) =>
        set((state) => ({
          tables: {
            ...state.tables,
            [key]: {
              ...defaultState,
              ...state.tables[key],
              currentPage: page,
            },
          },
        })),

      resetTable: (key) =>
        set((state) => ({
          tables: {
            ...state.tables,
            [key]: defaultState,
          },
        })),
    }),
    {
      name: "scoped-table-store",
    },
  ),
);
