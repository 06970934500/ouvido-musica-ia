
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AuthDialog } from "@/components/auth/AuthDialog";
import { PlanCards } from "@/components/planos/PlanCards";
import { SubscriptionStatus as SubStatus, SubscriptionStatus as SubscriptionStatusType } from "@/components/planos/SubscriptionStatus";
import { StatusAlert } from "@/components/planos/StatusAlert";
import { FAQSection } from "@/components/planos/FAQSection";

const Planos = () => {
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

  // Determine alert status from URL parameters
  const alertStatus = searchParams.get("success") === "true" 
    ? "success" 
    : searchParams.get("canceled") === "true" 
      ? "canceled" 
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

  return (
    <div className="container py-12">
      <div className="flex flex-col items-center space-y-4 text-center mb-12">
        <h1 className="text-3xl font-bold">Planos e Assinatura</h1>
        <p className="text-muted-foreground max-w-2xl">
          Escolha o plano que melhor se adapta às suas necessidades de treinamento musical
        </p>
        
        <SubStatus 
          status={subscriptionStatus} 
          isLoading={isCheckingSubscription}
          onCheckStatus={checkSubscriptionStatus}
          userId={user?.id}
        />
      </div>

      {/* Notification message for subscription success/failure */}
      <StatusAlert status={alertStatus} />

      <PlanCards 
        subscriptionStatus={subscriptionStatus}
        isLoadingPortal={isLoadingPortal}
        isLoadingCheckout={isLoadingCheckout}
        isLoadingTrial={isLoadingTrial}
        onCheckout={handleCheckout}
        onManageSubscription={handleManageSubscription}
      />

      <FAQSection />

      {/* Auth Dialog for non-authenticated users */}
      <AuthDialog 
        defaultTab="login"
        open={isAuthDialogOpen}
        onOpenChange={setIsAuthDialogOpen}
        onSuccess={() => handleCheckout(false)}
      />
    </div>
  );
};

export default Planos;
