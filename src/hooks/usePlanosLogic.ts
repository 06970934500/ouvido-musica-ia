
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SubscriptionStatus as SubscriptionStatusType } from "@/components/planos/SubscriptionStatus";

export const usePlanosLogic = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isLoadingCheckout, setIsLoadingCheckout] = useState(false);
  const [isLoadingPortal, setIsLoadingPortal] = useState(false);
  const [isLoadingTrial, setIsLoadingTrial] = useState(false);
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const [isCheckingSubscription, setIsCheckingSubscription] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState<SubscriptionStatusType>({
    subscribed: false,
    subscription_tier: null,
    subscription_end: null,
  });

  // Type "success" | "canceled" | null for alertStatus
  const alertStatus = searchParams.get("success") === "true" 
    ? "success" as const
    : searchParams.get("canceled") === "true" 
      ? "canceled" as const
      : null;

  // Effect to handle URL parameters
  useEffect(() => {
    if (searchParams.get("success") === "true") {
      toast({
        title: "Assinatura realizada com sucesso!",
        description: "Obrigado por assinar o plano Premium.",
        variant: "default",
      });
      // Clear the URL parameter
      navigate("/planos", { replace: true });
      // Refresh subscription status
      checkSubscriptionStatus();
    } else if (searchParams.get("canceled") === "true") {
      toast({
        title: "Assinatura cancelada",
        description: "Você cancelou o processo de assinatura.",
        variant: "destructive",
      });
      // Clear the URL parameter
      navigate("/planos", { replace: true });
    }
  }, [searchParams, toast, navigate]);

  // Check subscription status when user logs in
  useEffect(() => {
    if (user) {
      checkSubscriptionStatus();
    } else {
      setSubscriptionStatus({
        subscribed: false,
        subscription_tier: null,
        subscription_end: null,
      });
    }
  }, [user]);

  // Function to check subscription status
  const checkSubscriptionStatus = async () => {
    if (!user) return;

    try {
      setIsCheckingSubscription(true);
      const { data, error } = await supabase.functions.invoke('check-subscription');
      
      if (error) {
        console.error("Error checking subscription:", error);
        toast({
          title: "Erro ao verificar assinatura",
          description: error.message,
          variant: "destructive",
        });
        return;
      }
      
      setSubscriptionStatus(data as SubscriptionStatusType);
    } catch (error) {
      console.error("Error checking subscription:", error);
      toast({
        title: "Erro ao verificar assinatura",
        description: "Não foi possível verificar o status da sua assinatura.",
        variant: "destructive",
      });
    } finally {
      setIsCheckingSubscription(false);
    }
  };

  // Function to handle checkout
  const handleCheckout = async (withTrial = false) => {
    if (!user) {
      setIsAuthDialogOpen(true);
      return;
    }

    try {
      if (withTrial) {
        setIsLoadingTrial(true);
      } else {
        setIsLoadingCheckout(true);
      }
      
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { trial: withTrial }
      });
      
      if (error) {
        console.error("Error creating checkout session:", error);
        toast({
          title: "Erro ao criar sessão de checkout",
          description: error.message,
          variant: "destructive",
        });
        return;
      }
      
      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Error creating checkout:", error);
      toast({
        title: "Erro ao processar pagamento",
        description: "Não foi possível iniciar o processo de pagamento.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingTrial(false);
      setIsLoadingCheckout(false);
    }
  };

  // Function to open customer portal for subscription management
  const handleManageSubscription = async () => {
    if (!user) return;

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

  return {
    user,
    alertStatus,
    isLoadingCheckout,
    isLoadingPortal,
    isLoadingTrial,
    isAuthDialogOpen,
    setIsAuthDialogOpen,
    isCheckingSubscription,
    subscriptionStatus,
    handleCheckout,
    handleManageSubscription,
    checkSubscriptionStatus
  };
};
