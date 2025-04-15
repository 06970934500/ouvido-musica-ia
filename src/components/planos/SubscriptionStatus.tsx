
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export type SubscriptionStatus = {
  subscribed: boolean;
  subscription_tier: string | null;
  subscription_end: string | null;
};

interface SubscriptionStatusProps {
  status: SubscriptionStatus;
  isLoading: boolean;
  onCheckStatus: () => Promise<void>;
  userId: string | undefined;
}

// Function to format date
const formatDate = (dateString: string | null) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(date);
};

export const SubscriptionStatus = ({ 
  status, 
  isLoading, 
  onCheckStatus,
  userId 
}: SubscriptionStatusProps) => {
  const [isLoadingPortal, setIsLoadingPortal] = useState(false);
  const { toast } = useToast();

  // Function to open customer portal for subscription management
  const handleManageSubscription = async () => {
    if (!userId) return;

    try {
      setIsLoadingPortal(true);
      const { data, error } = await supabase.functions.invoke('customer-portal');
      
      if (error) {
        console.error("Error creating portal session:", error);
        toast({
          title: "Erro ao acessar portal de assinatura",
          description: error.message,
          variant: "destructive",
        });
        return;
      }
      
      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Error accessing customer portal:", error);
      toast({
        title: "Erro ao acessar portal de assinatura",
        description: "Não foi possível acessar o portal de gerenciamento da assinatura.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingPortal(false);
    }
  };

  if (!userId) return null;

  return (
    <div className="flex items-center gap-2 mt-4">
      <Button
        variant="outline"
        size="sm"
        onClick={onCheckStatus}
        disabled={isLoading}
      >
        {isLoading ? "Verificando..." : "Verificar status da assinatura"}
      </Button>
      
      {status.subscribed && (
        <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-md">
          <CheckCircle className="h-4 w-4" />
          <span className="text-sm font-medium">
            Premium ativo até {formatDate(status.subscription_end)}
          </span>
        </div>
      )}

      {status.subscribed && (
        <Button 
          variant="outline"
          size="sm"
          onClick={handleManageSubscription}
          disabled={isLoadingPortal}
        >
          {isLoadingPortal ? "Carregando..." : "Gerenciar"}
        </Button>
      )}
    </div>
  );
};
