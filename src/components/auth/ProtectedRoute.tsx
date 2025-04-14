
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

type ProtectedRouteProps = {
  children: React.ReactNode;
  redirectTo?: string;
};

const ProtectedRoute = ({ 
  children, 
  redirectTo = "/auth" 
}: ProtectedRouteProps) => {
  const { user, isLoading } = useAuth();

  // Enquanto estamos verificando se o usuário está autenticado, podemos mostrar algum indicador de carregamento
  if (isLoading) {
    return <div className="flex justify-center items-center h-[calc(100vh-64px)]">Carregando...</div>;
  }

  // Se o usuário não estiver autenticado, redirecionar para a página de login
  if (!user) {
    return <Navigate to={redirectTo} />;
  }

  // Se o usuário estiver autenticado, renderizar o conteúdo da rota
  return <>{children}</>;
};

export default ProtectedRoute;
