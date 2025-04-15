
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Check, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FeatureList, planFeatures } from "./PlanFeatures";
import { SubscriptionStatus as SubscriptionStatusType } from "./SubscriptionStatus";

interface PlanCardsProps {
  subscriptionStatus: SubscriptionStatusType;
  isLoadingPortal: boolean;
  isLoadingCheckout: boolean;
  isLoadingTrial: boolean;
  onCheckout: (withTrial: boolean) => Promise<void>;
  onManageSubscription: () => Promise<void>;
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

export const PlanCards = ({ 
  subscriptionStatus, 
  isLoadingPortal, 
  isLoadingCheckout,
  isLoadingTrial,
  onCheckout,
  onManageSubscription
}: PlanCardsProps) => {
  const navigate = useNavigate();

  return (
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
          <FeatureList features={planFeatures} isPremium={false} />
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
          <FeatureList features={planFeatures} isPremium={true} />
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          {subscriptionStatus.subscribed ? (
            <>
              <p className="text-sm text-center mb-2">
                Sua assinatura está ativa até {formatDate(subscriptionStatus.subscription_end)}
              </p>
              <Button 
                className="w-full"
                onClick={onManageSubscription}
                disabled={isLoadingPortal}
              >
                {isLoadingPortal ? "Carregando..." : "Gerenciar Assinatura"}
              </Button>
            </>
          ) : (
            <>
              <Button 
                className="w-full"
                onClick={() => onCheckout(false)}
                disabled={isLoadingCheckout || isLoadingTrial}
              >
                {isLoadingCheckout ? "Carregando..." : "Assinar Agora"}
              </Button>
              <Button 
                variant="link" 
                onClick={() => onCheckout(true)}
                disabled={isLoadingCheckout || isLoadingTrial}
              >
                {isLoadingTrial ? "Carregando..." : "Faça um teste grátis de 7 dias"}
              </Button>
            </>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};
