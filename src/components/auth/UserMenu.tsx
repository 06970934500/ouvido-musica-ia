
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { LogIn, User, Settings, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { AuthDialog } from "./AuthDialog";

export const UserMenu = () => {
  const { user, signOut } = useAuth();
  const [showAuthDialog, setShowAuthDialog] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Erro ao fazer logout", error);
    }
  };

  // Se o usuário não estiver logado, mostra o botão de login
  if (!user) {
    return (
      <>
        <Button 
          variant="outline" 
          size="sm" 
          className="hidden md:flex gap-1"
          onClick={() => setShowAuthDialog(true)}
        >
          <LogIn className="h-4 w-4 mr-1" />
          Entrar
        </Button>

        {showAuthDialog && (
          <AuthDialog 
            defaultTab="login" 
            onSuccess={() => setShowAuthDialog(false)} 
          />
        )}
      </>
    );
  }

  // Se o usuário estiver logado, mostra o menu do usuário
  const initials = user.email ? user.email.substring(0, 2).toUpperCase() : "U";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-music-100 text-music-800">
              {initials}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.email}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/progresso" className="flex items-center">
            <User className="mr-2 h-4 w-4" />
            <span>Meu Progresso</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/planos" className="flex items-center">
            <Settings className="mr-2 h-4 w-4" />
            <span>Minha Assinatura</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
