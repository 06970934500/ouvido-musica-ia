
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, X } from "lucide-react";

const Planos = () => {
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

  return (
    <div className="container py-12">
      <div className="flex flex-col items-center space-y-4 text-center mb-12">
        <h1 className="text-3xl font-bold">Planos e Assinatura</h1>
        <p className="text-muted-foreground max-w-2xl">
          Escolha o plano que melhor se adapta às suas necessidades de treinamento musical
        </p>
      </div>

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
            <Button variant="outline" className="w-full">Começar Grátis</Button>
          </CardFooter>
        </Card>

        <Card className="border-music-400 bg-gradient-to-br from-music-50 to-background">
          <CardHeader>
            <div className="px-3 py-1 rounded-full bg-music-100 text-music-800 text-sm font-medium w-fit mb-2">
              Recomendado
            </div>
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
            <Button className="w-full">Assinar Agora</Button>
            <Button variant="link">
              Faça um teste grátis de 7 dias
            </Button>
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
    </div>
  );
};

export default Planos;
