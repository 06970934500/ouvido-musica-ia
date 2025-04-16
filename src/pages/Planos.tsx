
import { AuthDialog } from "@/components/auth/AuthDialog";
import { PlanCards } from "@/components/planos/PlanCards";
import { SubscriptionStatus as SubStatus } from "@/components/planos/SubscriptionStatus";
import { StatusAlert } from "@/components/planos/StatusAlert";
import { FAQSection } from "@/components/planos/FAQSection";
import { usePlanosLogic } from "@/hooks/usePlanosLogic";

const Planos = () => {
  const {
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
  } = usePlanosLogic();

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
