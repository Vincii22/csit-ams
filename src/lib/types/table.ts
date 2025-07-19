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
  key: string | string[];
  icon?: string;

  // for concatenated headers
  filterable?: { label: string; key: string }[];
  sortable?: { label: string; key: string }[];
};

export type Action = {
  label: string;
  content: React.ReactNode;
  action?: void;
};

export type Sort = {
  label: string;
  key: string;
  direction: "asc" | "desc";
  order: number;
};

export type Filter = {
  label: string;
  key: string;
  type: FilterType;
  value?: string;
};
