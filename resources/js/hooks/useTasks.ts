// useReorderTasks.js
import { TaskElement } from '@/types/board';

export function useTasks() {
  const reorderTasks = (tasks: TaskElement[], sourceIdx: number, destIdx: number) => {
    const listCopy = Array.from(tasks);

    const [removed] = listCopy.splice(sourceIdx, 1);
    listCopy.splice(destIdx, 0, removed);

    return listCopy;
  };

  const moveTasks = (
    sourceTasks: TaskElement[],
    destinationTasks: TaskElement[],
    source: number,
    destination: number
  ) => {
    const sourceCopy = Array.from(sourceTasks);
    const destCopy = Array.from(destinationTasks);
    const [removed] = sourceCopy.splice(source, 1);

    destCopy.splice(destination, 0, removed);

    const newLists = {
      newSource: sourceCopy,
      newDestination: destCopy,
    };

    return newLists;
  };

  return { reorderTasks, moveTasks };
}
