import { getValueByPath } from "@/lib/utils/get-value-by-path";
import { useEffect, useMemo, useState } from "react";

type Options = {
  debounce?: number;
};

export function useSearch<T>(
  data: T[],
  keys: string[],
  search: string,
  setSearch: (value: string) => void,
  options?: Options,
) {
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
          .map((part) => getValueByPath(item, part) ?? "")
          .join("-")
          .toLowerCase();

        return combined.includes(debouncedSearch.toLowerCase());
      }),
    );
  }, [debouncedSearch, data, keys]);

  return { search, setSearch, filteredData };
}
