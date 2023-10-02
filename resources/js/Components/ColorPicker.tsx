import { ChangeEvent, ChangeEventHandler, useState } from "react";

export default function ColorPicker({
  onColorSelect,
}: {
  onColorSelect: (color: string) => void;
}) {
  const palette = [
    "bg-red-500",
    "bg-rose-500",
    "bg-pink-500",
    "bg-fuchsia-500",
    "bg-purple-500",
    "bg-violet-500",
    "bg-indigo-500",
    "bg-blue-500",
    "bg-sky-500",
    "bg-cyan-500",
    "bg-teal-500",
    "bg-emerald-500",
    "bg-green-500",
    "bg-lime-500",
    "bg-yellow-500",
    "bg-amber-500",
    "bg-orange-500",
    "bg-zinc-500",
  ];

  const [currentColor, setCurrentColor] = useState(palette[0]);

  const handleColorSelect: ChangeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentColor(e.target.value);
    onColorSelect(e.target.value);
  };

  return (
    <div className="grid grid-flow-col grid-rows-2 justify-center gap-1">
      {palette.map((color) => (
        <div key={color} className="relative">
          <input
            id={color}
            name="tag-color"
            type="radio"
            className="absolute top-0 left-0 h-5 w-5 opacity-0"
            value={color}
            onChange={handleColorSelect}
          />
          <label
            htmlFor={color}
            className={`${color} flex ${
              color === currentColor ? "border-2" : "border"
            } h-5 w-5 border-black dark:border-white rounded-sm`}
          ></label>
        </div>
      ))}
    </div>
  );
}
