import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";

const ThemeToggle = ({ compact = false }: { compact?: boolean }) => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <div className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5">
      {!compact && <span className="text-xs font-medium text-text-secondary">Modo oscuro</span>}
      <Sun className={`h-3.5 w-3.5 transition-colors ${isDark ? "text-text-tertiary" : "text-accent"}`} />
      <Switch
        checked={isDark}
        onCheckedChange={(checked) => {
          setTheme(checked ? "dark" : "light");
        }}
        aria-label="Cambiar a modo oscuro"
      />
      <Moon className={`h-3.5 w-3.5 transition-colors ${isDark ? "text-accent" : "text-text-tertiary"}`} />
    </div>
  );
};

export default ThemeToggle;
