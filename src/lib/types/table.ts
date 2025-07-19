export const filterTypes = [
  "is",
  "isNot",
  "contains",
  "doesNotContain",
  "startsWith",
  "endsWith",
  "isEmpty",
  "isNotEmpty",
] as const;

export type FilterType = (typeof filterTypes)[number];

export type ColumnHeader = {
  label: string;
  variable: string | string[];
  icon?: string;

  // for concatenated headers
  filterable?: { label: string; variable: string }[];
  sortable?: { label: string; variable: string }[];
};

export type Sort = {
  label: string;
  variable: string;
  direction: "asc" | "desc";
  order: number;
};

export type Filter = {
  variable: string;
  label: string;
  value?: string;
  type: FilterType;
};
