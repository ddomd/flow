import { ChangeEvent, ChangeEventHandler, useState } from "react";

export default function ColorPicker({
  onColorSelect,
}: {
  onColorSelect: (color: string) => void;
}) {
  const palette = [
    "bg-red-400",
    "bg-rose-400",
    "bg-pink-400",
    "bg-fuchsia-400",
    "bg-purple-400",
    "bg-violet-400",
    "bg-indigo-400",
    "bg-blue-400",
    "bg-sky-400",
    "bg-cyan-400",
    "bg-teal-400",
    "bg-emerald-400",
    "bg-green-400",
    "bg-lime-400",
    "bg-yellow-400",
    "bg-amber-400",
    "bg-orange-400",
    "bg-white",
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
            } h-5 w-5 border-black rounded-sm`}
          ></label>
        </div>
      ))}
    </div>
  );
}
