import MoonIcon from "@/Icons/MoonIcon";
import SunIcon from "@/Icons/SunIcon";
import { useState, useEffect } from "react";

export default function ThemeSwitcher({ className }: { className?: string }) {
  const userPreference = localStorage.getItem("theme");
  const systemPreference: string = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches
    ? "dark"
    : "light";

  const [theme, setTheme] = useState<string>(
    userPreference || systemPreference
  );

  useEffect(() => {
    document.body.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  return (
    <div className="z-10">
      <button
        aria-label={`${theme} toggle button`}
        onClick={toggleTheme}
        className={"z-10 focus:outline-none " + className}
      >
        {theme === "light" ? (
          <SunIcon className="h-7 w-7" />
        ) : (
          <MoonIcon className="h-7 w-7 text-white" />
        )}
      </button>
    </div>
  );
}
