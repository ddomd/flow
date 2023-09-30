import { useState } from "react";
import { router } from "@inertiajs/react";
import { useTasks } from "@/hooks/useTasks";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  MouseSensor,
  TouchSensor,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { ColumnElement, TagElement, TaskElement } from "@/types/board";
import Column from "./Column";
import Placeholder from "../Task/Placeholder";

export default function ColumnList({
  columns,
  tags,
}: {
  columns: ColumnElement[];
  tags: TagElement[];
}) {
  const [activeTask, setActiveTask] = useState<TaskElement | null>(null);

  const { reorderTasks, moveTasks } = useTasks();

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 200, tolerance: 5 },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const activeTask: TaskElement = event.active.data.current?.task;

    setActiveTask(activeTask);
  };

  // Handles behavior when dragging an item
  const handleDragOver = (event: DragOverEvent) => {
    // Extracting the 'active' and 'over' data from the event
    const { active, over } = event;

    // If there's no 'over' target, return (no action needed)
    if (!over) return;

    if (active.id === over.id) return;

    // Get the currently dragged task from the 'active' data
    const dragging: TaskElement = active.data.current?.task;

    // Get the type of the element being dragged over
    const overType: string = over.data.current?.type;

    // If dragging over a column
    if (overType === "Column") {
      // Get the column being dragged over
      const overColumn: ColumnElement = over.data.current?.column;
      // If the dragged task is already in the over column, return (no action needed)
      if (overColumn.tasks.includes(dragging)) return;

      // Find the column from which the task is being dragged
      const activeColumn = columns.find(
        (column) => column.id === dragging.column_id
      ) as ColumnElement;

      // Get the indices of the dragged task in both the active and over columns
      const activeIndex: number = active.data.current?.index;
      const overIndex: number = over.data.current?.index;

      // Update the dragged task's column_id to the new column
      dragging.column_id = overColumn.id!;

      // Move the task from the active column to the over column
      const { newSource, newDestination } = moveTasks(
        activeColumn.tasks,
        overColumn.tasks,
        activeIndex,
        overIndex
      );

      // Update the tasks arrays in both the active and over columns
      activeColumn.tasks = newSource;
      overColumn.tasks = newDestination;
    } else {
      // Get IDs of both dragging and overing elements
      const activeId: string = active.data.current?.task.column_id;
      const overId: string = over.data.current?.task.column_id;

      // Find the columns corresponding to the active and over IDs
      const activeColumn = columns.find((column) => column.id === activeId)!;
      const overColumn = columns.find((column) => column.id === overId)!;

      // Get the indices of the dragged task in both the active and over columns
      const activeIndex: number = active.data.current?.index;
      const overIndex: number = over.data.current?.index;

      // If dragging within the same column
      if (activeId === overId) {
        // Reorder tasks within the same column
        const reorderedTasks = reorderTasks(
          activeColumn.tasks,
          activeIndex,
          overIndex
        );
        activeColumn.tasks = reorderedTasks;
      } else {
        // Move the task from the active column to the over column
        activeColumn.tasks[activeIndex].column_id = overColumn.id;

        // Move tasks between columns
        const { newSource, newDestination } = moveTasks(
          activeColumn.tasks,
          overColumn.tasks,
          activeIndex,
          overIndex
        );

        // Update the tasks arrays in both the active and over columns
        activeColumn.tasks = newSource;
        overColumn.tasks = newDestination;
      }
    }
  };

  // Handles behavior when an item finishes dragging
  const handleDragEnd = (event: DragEndEvent) => {
    // Deactivate the active task
    setActiveTask(null);

    // Extracting the 'active' and 'over' data from the event
    const { active, over } = event;

    // If there's no 'over' target, return (no action needed)
    if (!over) return;

    // Get the currently dragged task from the 'active' data
    const dragging: TaskElement = active.data.current?.task;

    // Get the index of the active task in its column
    const activeIndex: number = active.data.current?.index;

    // Find the column containing the currently dragged task
    const currentColumn = columns.find(
      (column) => column.id === dragging.column_id
    )!;

    // Get the previous and next tasks relative to the active task
    const prevTask = currentColumn.tasks[activeIndex - 1];
    const nextTask = currentColumn.tasks[activeIndex + 1];

    // Calculate the new position for the dragged task based on adjacent tasks
    if (prevTask && nextTask) {
      dragging.position = (prevTask.position + nextTask.position) / 2;
    } else if (prevTask) {
      dragging.position = prevTask.position + prevTask.position / 2;
    } else if (nextTask) {
      dragging.position = nextTask.position / 2;
    }

    // Update the task's position and column_id using the router
    router.put(
      route("tasks.move", { column: dragging.column_id, task: dragging.id }),
      {
        position: dragging.position,
      }
    );
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      collisionDetection={closestCorners}
    >
      <div className="w-full mt-6 mb-2 flex gap-x-10 overflow-x-scroll touch-pan-x column-scroll">
        {columns.map((column, index) => (
          <Column
            key={column.id}
            column={column}
            boardTags={tags}
            index={index}
          />
        ))}
        <DragOverlay>
          {activeTask && <Placeholder task={activeTask} />}
        </DragOverlay>
      </div>
    </DndContext>
  );
}
