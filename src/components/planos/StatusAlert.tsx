
import { AlertCircle, CheckCircle } from "lucide-react";

interface StatusAlertProps {
  status: "success" | "canceled" | null;
}

export const StatusAlert = ({ status }: StatusAlertProps) => {
  if (!status) return null;

  if (status === "success") {
    return (
      <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
        <div>
          <h3 className="font-medium text-green-800">Assinatura realizada com sucesso!</h3>
          <p className="text-green-700 text-sm">
            Obrigado por se tornar um assinante Premium. Aproveite todas as funcionalidades exclusivas.
          </p>
        </div>
      </div>
    );
  }

  if (status === "canceled") {
    return (
      <div className="mb-8 p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-3">
        <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
        <div>
          <h3 className="font-medium text-amber-800">Assinatura não concluída</h3>
          <p className="text-amber-700 text-sm">
            Você cancelou o processo de assinatura. Se precisar de ajuda, entre em contato conosco.
          </p>
        </div>
      </div>
    );
  }

  return null;
};
