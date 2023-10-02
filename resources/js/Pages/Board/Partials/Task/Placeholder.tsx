import { TaskElement } from "@/types/board";

export default function Placeholder({ task }: { task: TaskElement }) {
  return (
    <div className="dark:text-white rotate-2 shadow-slanted-sm dark:shadow-white bg-orange-100/75 dark:bg-zinc-900/75 backdrop-blur-sm shrink-0 p-3 w-full h-36 border-2 border-black dark:border-white rounded-md touch-manipulation cursor-grab">
      {task.title}
    </div>
  );
}
