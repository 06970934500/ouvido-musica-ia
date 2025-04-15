
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, X, AlertCircle, CheckCircle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AuthDialog } from "@/components/auth/AuthDialog";

type SubscriptionStatus = {
  subscribed: boolean;
  subscription_tier: string | null;
  subscription_end: string | null;
};

const Planos = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isLoadingCheckout, setIsLoadingCheckout] = useState(false);
  const [isLoadingPortal, setIsLoadingPortal] = useState(false);
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const [isCheckingSubscription, setIsCheckingSubscription] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState<SubscriptionStatus>({
    subscribed: false,
    subscription_tier: null,
    subscription_end: null,
  });

  // Features list for plans
  const features = [
    { name: "Exercícios básicos de percepção", free: true, premium: true },
    { name: "Análise de músicas", free: "Até 3 por mês", premium: "Ilimitado" },
    { name: "Análise de estrutura musical", free: false, premium: true },
    { name: "Análise de melodias", free: false, premium: true },
    { name: "Salvar e acompanhar progresso", free: "Básico", premium: "Completo" },
    { name: "Exercícios avançados", free: false, premium: true },
    { name: "Exportação de cifras e partituras", free: false, premium: true },
    { name: "Atendimento prioritário", free: false, premium: true },
  ];

  // Check for success or canceled payment status
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
      
      setSubscriptionStatus(data as SubscriptionStatus);
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
  const handleCheckout = async () => {
    if (!user) {
      setIsAuthDialogOpen(true);
      return;
    }

    try {
      setIsLoadingCheckout(true);
      const { data, error } = await supabase.functions.invoke('create-checkout');
      
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

  return (
    <div className="container py-12">
      <div className="flex flex-col items-center space-y-4 text-center mb-12">
        <h1 className="text-3xl font-bold">Planos e Assinatura</h1>
        <p className="text-muted-foreground max-w-2xl">
          Escolha o plano que melhor se adapta às suas necessidades de treinamento musical
        </p>
        
        {user && (
          <div className="flex items-center gap-2 mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={checkSubscriptionStatus}
              disabled={isCheckingSubscription}
            >
              {isCheckingSubscription ? "Verificando..." : "Verificar status da assinatura"}
            </Button>
            
            {subscriptionStatus.subscribed && (
              <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-md">
                <CheckCircle className="h-4 w-4" />
                <span className="text-sm font-medium">
                  Premium ativo até {formatDate(subscriptionStatus.subscription_end)}
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Notification message for subscription success/failure */}
      {searchParams.get("success") === "true" && (
        <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-green-800">Assinatura realizada com sucesso!</h3>
            <p className="text-green-700 text-sm">
              Obrigado por se tornar um assinante Premium. Aproveite todas as funcionalidades exclusivas.
            </p>
          </div>
        </div>
      )}

      {searchParams.get("canceled") === "true" && (
        <div className="mb-8 p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-amber-800">Assinatura não concluída</h3>
            <p className="text-amber-700 text-sm">
              Você cancelou o processo de assinatura. Se precisar de ajuda, entre em contato conosco.
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <Card className="border-muted">
          <CardHeader>
            <CardTitle className="text-2xl">Plano Gratuito</CardTitle>
            <CardDescription>Ideal para iniciantes</CardDescription>
            <div className="mt-4">
              <span className="text-3xl font-bold">R$ 0</span>
              <span className="text-muted-foreground">/mês</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Comece seu treinamento auditivo com as funcionalidades básicas
            </p>
            <ul className="space-y-2">
              {features.map((feature) => (
                <li key={feature.name} className="flex items-start gap-2">
                  {feature.free ? (
                    <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  ) : (
                    <X className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                  )}
                  <span>
                    {feature.name}
                    {feature.free && typeof feature.free === "string" && (
                      <span className="text-sm text-muted-foreground ml-1">
                        ({feature.free})
                      </span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => navigate("/")}
            >
              Começar Grátis
            </Button>
          </CardFooter>
        </Card>

        <Card className={`border-music-400 ${subscriptionStatus.subscribed ? 'bg-gradient-to-br from-music-50 to-background ring-2 ring-music-400 ring-opacity-50' : 'bg-gradient-to-br from-music-50 to-background'}`}>
          <CardHeader>
            {subscriptionStatus.subscribed ? (
              <div className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium w-fit mb-2">
                Seu plano atual
              </div>
            ) : (
              <div className="px-3 py-1 rounded-full bg-music-100 text-music-800 text-sm font-medium w-fit mb-2">
                Recomendado
              </div>
            )}
            <CardTitle className="text-2xl">Plano Premium</CardTitle>
            <CardDescription>Para músicos que desejam evoluir rapidamente</CardDescription>
            <div className="mt-4">
              <span className="text-3xl font-bold">R$ 29,90</span>
              <span className="text-muted-foreground">/mês</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Acesso completo a todas as funcionalidades e recursos avançados
            </p>
            <ul className="space-y-2">
              {features.map((feature) => (
                <li key={feature.name} className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>
                    {feature.name}
                    {feature.premium && typeof feature.premium === "string" && (
                      <span className="text-sm text-muted-foreground ml-1">
                        ({feature.premium})
                      </span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            {subscriptionStatus.subscribed ? (
              <>
                <p className="text-sm text-center mb-2">
                  Sua assinatura está ativa até {formatDate(subscriptionStatus.subscription_end)}
                </p>
                <Button 
                  className="w-full"
                  onClick={handleManageSubscription}
                  disabled={isLoadingPortal}
                >
                  {isLoadingPortal ? "Carregando..." : "Gerenciar Assinatura"}
                </Button>
              </>
            ) : (
              <>
                <Button 
                  className="w-full"
                  onClick={handleCheckout}
                  disabled={isLoadingCheckout}
                >
                  {isLoadingCheckout ? "Carregando..." : "Assinar Agora"}
                </Button>
                <Button variant="link">
                  Faça um teste grátis de 7 dias
                </Button>
              </>
            )}
          </CardFooter>
        </Card>
      </div>

      <div className="max-w-3xl mx-auto mt-16 text-center space-y-6">
        <h2 className="text-2xl font-bold">Perguntas Frequentes</h2>
        
        <div className="space-y-4 text-left">
          <div className="space-y-2">
            <h3 className="font-medium">Como funciona o teste grátis?</h3>
            <p className="text-muted-foreground">
              Você pode testar todas as funcionalidades Premium por 7 dias sem compromisso. 
              Cancelamento simples a qualquer momento durante o período de teste.
            </p>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-medium">Posso cancelar minha assinatura a qualquer momento?</h3>
            <p className="text-muted-foreground">
              Sim, você pode cancelar sua assinatura a qualquer momento. 
              O acesso Premium permanecerá ativo até o final do período já pago.
            </p>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-medium">Existe algum desconto para assinatura anual?</h3>
            <p className="text-muted-foreground">
              Sim, oferecemos 20% de desconto para assinaturas anuais, o que significa uma economia de mais de 2 meses.
            </p>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-medium">Quais formas de pagamento são aceitas?</h3>
            <p className="text-muted-foreground">
              Aceitamos cartões de crédito, débito, PayPal e Pix para pagamentos no Brasil.
            </p>
          </div>
        </div>
        
        <div className="pt-6">
          <Button variant="link">Ver todas as perguntas frequentes</Button>
        </div>
      </div>

      {/* Auth Dialog for non-authenticated users */}
      <AuthDialog 
        defaultTab="login"
        open={isAuthDialogOpen}
        onOpenChange={setIsAuthDialogOpen}
        onSuccess={handleCheckout}
      />
    </div>
  );
};

export default Planos;
