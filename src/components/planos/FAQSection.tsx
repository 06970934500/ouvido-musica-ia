
import { Button } from "@/components/ui/button";

export const FAQSection = () => {
  return (
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
  );
};
