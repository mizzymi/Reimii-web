"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
export function Controls({
  locale,
  locales,
}: {
  locale: string;
  locales: string[];
}) {
  const router = useRouter(),
    path = usePathname();
  const [light, setLight] = useState(false);
  useEffect(() => {
    const value = localStorage.getItem("theme") === "light";
    setLight(value);
    document.documentElement.dataset.theme = value ? "light" : "dark";
  }, []);
  return (
    <div className="controls">
      <button
        aria-label="Toggle theme"
        onClick={() => {
          const value = !light;
          setLight(value);
          document.documentElement.dataset.theme = value ? "light" : "dark";
          localStorage.setItem("theme", value ? "light" : "dark");
        }}
      >
        {light ? "☾" : "☀"}
      </button>
      <select
        aria-label="Language"
        value={locale}
        onChange={(e) =>
          router.push("/" + e.target.value + path.slice(locale.length + 1))
        }
      >
        {locales.map((l) => (
          <option key={l} value={l}>
            {l.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
}
