import { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function SortableItem({ id }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="p-3 mb-2 bg-gray-100 border rounded cursor-move"
    >
      {id}
    </div>
  );
}

export default function SortableList() {
  const [items, setItems] = useState([
    "React",
    "Node",
    "Vue",
    "Angular",
  ]);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    setItems((items) => {
      const oldIndex = items.indexOf(active.id);
      const newIndex = items.indexOf(over.id);
      return arrayMove(items, oldIndex, newIndex);
    });
  };

  return (
    <>
      <h2 className="text-xl mb-3 font-semibold">
        Drag & Drop (dnd-kit – Best Practice)
      </h2>

      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={items}
          strategy={verticalListSortingStrategy}
        >
          {items.map((item) => (
            <SortableItem key={item} id={item} />
          ))}
        </SortableContext>
      </DndContext>
    </>
  );
}
