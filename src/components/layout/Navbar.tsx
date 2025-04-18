
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Music, BookOpen } from "lucide-react";
import { UserMenu } from "@/components/auth/UserMenu";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Music className="h-6 w-6 text-music-600" />
          <span className="text-xl font-bold hidden sm:inline">
            <span className="gradient-text">Música de Ouvido</span>
            <span className="text-accent">.IA</span>
          </span>
          <span className="text-xl font-bold sm:hidden">
            <span className="gradient-text">MdO</span>
            <span className="text-accent">.IA</span>
          </span>
        </Link>

        <nav className="flex items-center gap-4 md:gap-6">
          <Link
            to="/teoria"
            className={`text-sm font-medium transition-colors ${
              isActive("/teoria")
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <span className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Teoria</span>
            </span>
          </Link>
          <Link
            to="/treinamento"
            className={`text-sm font-medium transition-colors ${
              isActive("/treinamento")
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Treinamento
          </Link>
          <Link
            to="/analise"
            className={`text-sm font-medium transition-colors ${
              isActive("/analise")
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Análise
          </Link>
          <Link
            to="/progresso"
            className={`text-sm font-medium transition-colors ${
              isActive("/progresso")
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Progresso
          </Link>
          <Link
            to="/planos"
            className={`text-sm font-medium transition-colors ${
              isActive("/planos")
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Planos
          </Link>
          <ThemeToggle />
          <UserMenu />
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
