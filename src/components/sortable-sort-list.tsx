import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function SortableSortList({ sortItems, setSort }) {
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = sortItems.findIndex((s) => s.variable === active.id);
    const newIndex = sortItems.findIndex((s) => s.variable === over.id);

    const newSorts = arrayMove(sortItems, oldIndex, newIndex).map((s, i) => ({
      ...s,
      order: i,
    }));

    setSort(newSorts);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={sortItems.map((s) => s.variable)}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex flex-col gap-1">
          {sortItems.map((sort) => (
            <SortableItem key={sort.variable} id={sort.variable} sort={sort} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}

function SortableItem({ id, sort }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-muted px-3 py-2 rounded flex items-center justify-between"
      {...attributes}
      {...listeners}
    >
      <span className="text-sm">{sort.label}</span>
      <span className="text-muted-foreground text-xs">{sort.direction}</span>
    </div>
  );
}
