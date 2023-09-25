import { TaskElement } from "@/types/board";

export default function Placeholder({ task }: { task: TaskElement }) {
  return (
    <div className="rotate-2 shadow-slanted-sm bg-orange-100/75 backdrop-blur-sm shrink-0 p-3 w-full h-36 border-2 border-black rounded-md touch-manipulation cursor-grab">
      {task.title}
    </div>
  );
}
