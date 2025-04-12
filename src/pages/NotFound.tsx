
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MoveLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-music-50 to-background p-4">
      <div className="text-center space-y-6 max-w-md">
        <h1 className="text-8xl font-bold gradient-text">404</h1>
        <p className="text-2xl font-medium">Página não encontrada</p>
        <p className="text-muted-foreground">
          Parece que você está tentando acessar uma página que não existe ou foi movida.
        </p>
        <Button asChild size="lg">
          <Link to="/">
            <MoveLeft className="mr-2 h-5 w-5" />
            Voltar para Início
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
