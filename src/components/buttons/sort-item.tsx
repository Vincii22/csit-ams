import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  ChevronDown,
  Plus,
  Trash,
} from "lucide-react";
import { renderPopoverLabel } from "../table";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { SelectSortItemButton } from "./select-sort-item";
import { Button } from "../ui/button";
import { ColumnHeader, Sort } from "@/lib/types";

export function SortItemButton({
  columns,
  sortItems,
  setSort,
  addSort,
  removeSort,
  updateSort,
}: {
  sortItems: Sort[];
  columns: ColumnHeader[];
  setSort: (sort: Sort[]) => void;
  addSort: (sort: Sort) => void;
  removeSort: (key: string) => void;
  updateSort: (sortKey: string, updater: (prev: Sort) => Sort) => void;
}) {
  const hasMultiple = sortItems.length > 1;

  const label = hasMultiple
    ? `${sortItems.length} sorts`
    : (sortItems[0]?.label ?? "Sort");

  const icon = hasMultiple ? (
    <ArrowUpDown className="size-4" />
  ) : sortItems[0]?.direction === "asc" ? (
    <ArrowUp className="size-4" />
  ) : (
    <ArrowDown className="size-4" />
  );

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = sortItems.findIndex((s) => s.key === active.id);
    const newIndex = sortItems.findIndex((s) => s.key === over.id);

    const newSorted = arrayMove(sortItems, oldIndex, newIndex).map((s, i) => ({
      ...s,
      order: i,
    }));

    setSort(newSorted);
  }

  return (
    <Popover>
      <PopoverTrigger className="cursor-pointer h-8 flex text-sm items-center bg-blue-950/40 text-blue-400 gap-1.5 px-3 rounded-lg">
        {icon}
        {label}
        <ChevronDown className="size-4" />
      </PopoverTrigger>
      <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
        <PopoverContent
          key={JSON.stringify(sortItems.map((s) => s.key))}
          align="start"
          sideOffset={7}
          className="!p-3 flex flex-col w-fit"
        >
          <SortableContext
            items={[...sortItems]
              .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
              .map((s) => s.key)}
            strategy={verticalListSortingStrategy}
          >
            {[...sortItems]
              .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
              .map((sort, i) => (
                <SelectSortItemButton
                  key={`select-sortItem-${i}`}
                  columns={columns}
                  sort={sort}
                  removeSort={removeSort}
                  updateSort={updateSort}
                />
              ))}
          </SortableContext>
          <Popover>
            <PopoverTrigger className="ghost-btn !text-sm !text-muted-foreground justify-start w-full">
              <Plus className="size-4" /> Sort
            </PopoverTrigger>
            <PopoverContent
              align="end"
              sideOffset={7}
              className="!p-3 flex flex-col w-[10rem]"
            >
              <span className="text-muted-foreground text-sm uppercase mb-2.5">
                Sort by
              </span>
              {columns.map((column) =>
                renderPopoverLabel("sort", column, sortItems, addSort),
              )}
            </PopoverContent>
          </Popover>
          <Button
            size="sm"
            variant="ghost"
            className="!text-sm !text-red-400 justify-start w-full"
            onClick={() => setSort([])}
          >
            <Trash className="size-4" /> Clear all
          </Button>
        </PopoverContent>
      </DndContext>
    </Popover>
  );
}
