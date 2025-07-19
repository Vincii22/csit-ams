import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Grip, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ColumnHeader, Sort } from "@/lib/types";

export function SelectSortItemButton({
  setSort,
  columns,
  sort,
}: {
  sortItems: Sort[];
  setSort: React.Dispatch<React.SetStateAction<Sort[]>>;
  columns: ColumnHeader[];
  sort: Sort;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: sort.variable });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const updateSort = (updater: (prev: Sort) => Sort) => {
    setSort((prev) => {
      const updated = [...prev];
      const index = updated.findIndex((s) => s.variable === sort.variable);
      if (index !== -1) {
        updated[index] = updater(updated[index]);
      }
      return updated;
    });
  };

  return (
    <div className="flex items-center gap-2 mb-2">
      <div
        ref={setNodeRef}
        style={style}
        className="flex items-center gap-2 cursor-grab bg-popover"
        {...attributes}
        {...listeners}
      >
        <Grip className="size-4 text-muted-foreground" />
        <Select
          defaultValue={sort.variable}
          onValueChange={(val) => {
            const matchedColumn = columns.find((col) => {
              if (Array.isArray(col.variable)) {
                return col.variable.includes(val);
              }
              return col.variable === val;
            });

            const label = matchedColumn?.label.includes("&")
              ? matchedColumn.label
                  .split("&")
                  [matchedColumn.variable.indexOf(val)]?.trim()
              : matchedColumn?.label;

            updateSort((prev) => ({
              ...prev,
              variable: val,
              label: label ?? val,
            }));
          }}
        >
          <SelectTrigger className="w-[130px] !h-8">
            <SelectValue placeholder="Select column" />
          </SelectTrigger>
          <SelectContent>
            {columns.map((col, i) => {
              if (Array.isArray(col.variable) && col.label.includes("&")) {
                const selectLabels = col.label.split("&").map((l) => l.trim());
                return (
                  <React.Fragment key={`wrapper-${i}-btn`}>
                    {col.variable.map((v, j) => (
                      <SelectItem key={v} value={v}>
                        {selectLabels[j] ?? v}
                      </SelectItem>
                    ))}
                  </React.Fragment>
                );
              }

              return (
                <SelectItem
                  key={col.variable as string}
                  value={col.variable as string}
                >
                  {col.label}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
        <Select
          defaultValue={sort.direction}
          onValueChange={(val) =>
            updateSort((prev) => ({
              ...prev,
              direction: val as "asc" | "desc",
            }))
          }
        >
          <SelectTrigger className="w-[130px] !h-8">
            <SelectValue placeholder="Direction" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">Ascending</SelectItem>
            <SelectItem value="desc">Descending</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <X
        className="size-4 cursor-pointer text-muted-foreground hover:text-red-400 transition"
        onClick={() =>
          setSort((prev) => prev.filter((s) => s.variable !== sort.variable))
        }
      />
    </div>
  );
}
