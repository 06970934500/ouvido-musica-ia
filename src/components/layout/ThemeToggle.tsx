
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="h-8 w-8 rounded-full"
      aria-label={`Alternar para modo ${theme === 'light' ? 'escuro' : 'claro'}`}
      title={`Alternar para modo ${theme === 'light' ? 'escuro' : 'claro'}`}
    >
      {theme === "light" ? (
        <Moon className="h-4 w-4" />
      ) : (
        <Sun className="h-4 w-4" />
      )}
      <span className="sr-only">
        Alternar para modo {theme === "light" ? "escuro" : "claro"}
      </span>
    </Button>
  );
};

export default ThemeToggle;
