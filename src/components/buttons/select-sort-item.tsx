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
  columns,
  sort,
  removeSort,
  updateSort,
}: {
  columns: ColumnHeader[];
  sort: Sort;
  removeSort: (key: string) => void;
  updateSort: (sortKey: string, updater: (prev: Sort) => Sort) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: sort.key });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
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
          defaultValue={sort.key}
          onValueChange={(val) => {
            const matchedColumn = columns.find((col) =>
              Array.isArray(col.key) ? col.key.includes(val) : col.key === val,
            );

            const label = matchedColumn?.label.includes("&")
              ? matchedColumn.label
                .split("&")
              [(matchedColumn.key as string[]).indexOf(val)]?.trim()
              : matchedColumn?.label;

            updateSort(sort.key, (prev) => ({
              ...prev,
              key: val,
              label: label ?? val,
            }));
          }}
        >
          <SelectTrigger className="w-[130px] !h-8">
            <SelectValue placeholder="Select column" />
          </SelectTrigger>
          <SelectContent>
            {columns.map((col, i) => {
              if (Array.isArray(col.key) && col.label.includes("&")) {
                const selectLabels = col.label.split("&").map((l) => l.trim());

                return (
                  <React.Fragment key={`wrapper-${i}-btn`}>
                    {col.key.map((v, j) => (
                      <SelectItem key={v} value={v}>
                        {selectLabels[j] ?? v}
                      </SelectItem>
                    ))}
                  </React.Fragment>
                );
              }

              return (
                <SelectItem key={col.key as string} value={col.key as string}>
                  {col.label}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>

        <Select
          defaultValue={sort.direction}
          onValueChange={(val) =>
            updateSort(sort.key, (prev) => ({
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
        onClick={() => removeSort(sort.key)}
      />
    </div>
  );
}
