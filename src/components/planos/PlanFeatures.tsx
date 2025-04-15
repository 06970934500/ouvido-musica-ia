
import { Check, X } from "lucide-react";

export type Feature = {
  name: string;
  free: boolean | string;
  premium: boolean | string;
};

export const planFeatures: Feature[] = [
  { name: "Exercícios básicos de percepção", free: true, premium: true },
  { name: "Análise de músicas", free: "Até 3 por mês", premium: "Ilimitado" },
  { name: "Análise de estrutura musical", free: false, premium: true },
  { name: "Análise de melodias", free: false, premium: true },
  { name: "Salvar e acompanhar progresso", free: "Básico", premium: "Completo" },
  { name: "Exercícios avançados", free: false, premium: true },
  { name: "Exportação de cifras e partituras", free: false, premium: true },
  { name: "Atendimento prioritário", free: false, premium: true },
];

interface FeatureListProps {
  features: Feature[];
  isPremium?: boolean;
}

export const FeatureList = ({ features, isPremium = false }: FeatureListProps) => {
  return (
    <ul className="space-y-2">
      {features.map((feature) => (
        <li key={feature.name} className="flex items-start gap-2">
          {isPremium ? (
            <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
          ) : (
            feature.free ? (
              <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
            ) : (
              <X className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
            )
          )}
          <span>
            {feature.name}
            {isPremium && feature.premium && typeof feature.premium === "string" && (
              <span className="text-sm text-muted-foreground ml-1">
                ({feature.premium})
              </span>
            )}
            {!isPremium && feature.free && typeof feature.free === "string" && (
              <span className="text-sm text-muted-foreground ml-1">
                ({feature.free})
              </span>
            )}
          </span>
        </li>
      ))}
    </ul>
  );
};
