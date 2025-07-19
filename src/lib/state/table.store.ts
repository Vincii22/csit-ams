import { Sort } from "@/components/table";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type TableFilter = Record<string, string>;

type TableState = {
  search: string;
  filters: TableFilter;
  sort: Sort[];
  currentPage: number;
};

type TableStore = {
  tables: Record<string, TableState>;

  setSearch: (key: string, value: string) => void;
  setFilter: (key: string, column: string, value: string) => void;
  setSort: (key: string, sort: Sort[]) => void;
  setCurrentPage: (key: string, page: number) => void;

  resetTable: (key: string) => void;
};

const defaultState: TableState = {
  search: "",
  filters: {},
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

      setFilter: (key, column, value) =>
        set((state) => ({
          tables: {
            ...state.tables,
            [key]: {
              ...defaultState,
              ...state.tables[key],
              filters: {
                ...state.tables[key]?.filters,
                [column]: value,
              },
            },
          },
        })),

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
