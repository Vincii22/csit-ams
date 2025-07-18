import { useEffect, useMemo, useState } from "react";

function getNestedValue(obj: any, path: string): any {
  return path.split(".").reduce((acc, key) => acc?.[key], obj);
}

type Options = {
  debounce?: number;
};

export function useSearch<T>(data: T[], keys: string[], options?: Options) {
  const [search, setSearchState] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  const debounceTime = options?.debounce ?? 300;

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, debounceTime);

    return () => clearTimeout(handler);
  }, [search, debounceTime]);

  const filteredData = useMemo(() => {
    if (!debouncedSearch) return data;

    return data.filter((item) =>
      keys.some((key) => {
        const parts = key.split("+");
        const combined = parts
          .map((part) => getNestedValue(item, part) ?? "")
          .join("-")
          .toLowerCase();

        return combined.includes(debouncedSearch.toLowerCase());
      }),
    );
  }, [debouncedSearch, data, keys]);

  return { search, setSearch: setSearchState, filteredData };
}
