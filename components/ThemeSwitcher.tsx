"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Switch } from "@headlessui/react";

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <div className="py-2 flex items-center gap-2">
        <span className="block uppercase tracking-wide text-gray-700 dark:text-darkTextSecondary text-xs font-bold ">
          Dark Mode
        </span>

        <Switch
          checked={theme === "dark"}
          onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
          className={`${theme === "dark" ? "bg-black" : "bg-black"}
          relative inline-flex h-9 w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
        >
          <span className="sr-only">Use setting</span>
          <span
            aria-hidden="true"
            className={`${
              theme === "dark" ? "translate-x-9 bg-green-600" : "translate-x-0"
            }
            pointer-events-none inline-block h-8 w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
          />
        </Switch>
      </div>
    </>
  );
};
