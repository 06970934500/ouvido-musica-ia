
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookText, HeadphonesIcon } from "lucide-react";
import { TabsContent } from "@/components/ui/tabs";

const AcordesSection = () => {
  return (
    <TabsContent value="acordes" className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookText className="h-5 w-5 text-music-600" />
              Estrutura dos acordes
            </CardTitle>
            <CardDescription>
              Como os acordes são formados e classificados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <img 
                src="/lovable-uploads/52a2c01c-5c0a-421f-996e-5b53368e9b07.png" 
                alt="Diagrama de acorde C maior" 
                className="w-3/4 mx-auto rounded-lg shadow-md mb-4"
              />
              <p className="text-sm text-center text-muted-foreground mb-4">
                Diagrama do acorde C maior (Dó maior) no violão
              </p>
            </div>
            <p className="mb-4">
              Acordes são grupos de três ou mais notas tocadas simultaneamente que criam uma harmonia. 
            </p>
            <p className="mb-4">
              <strong>Tríades básicas:</strong>
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li><strong>Maior:</strong> formado por uma tônica, 3ª maior e 5ª justa</li>
              <li><strong>Menor:</strong> formado por uma tônica, 3ª menor e 5ª justa</li>
              <li><strong>Diminuto:</strong> formado por uma tônica, 3ª menor e 5ª diminuta</li>
              <li><strong>Aumentado:</strong> formado por uma tônica, 3ª maior e 5ª aumentada</li>
            </ul>
            <p>
              A característica sonora de um acorde é determinada principalmente pelo intervalo de terça (maior ou menor).
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HeadphonesIcon className="h-5 w-5 text-music-600" />
              Reconhecendo acordes pelo ouvido
            </CardTitle>
            <CardDescription>
              Como identificar diferentes tipos de acordes auditivamente
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Para reconhecer acordes pelo ouvido, preste atenção às suas qualidades emocionais:
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li><strong>Acordes maiores:</strong> soam alegres, brilhantes, afirmativos</li>
              <li><strong>Acordes menores:</strong> soam tristes, melancólicos, introspectivos</li>
              <li><strong>Acordes diminutos:</strong> soam tensos, instáveis, misteriosos</li>
              <li><strong>Acordes aumentados:</strong> soam etéreos, flutuantes, dramáticos</li>
            </ul>
            <p className="mb-4">
              Técnicas para treinar o reconhecimento de acordes:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Pratique a identificação das tríades básicas isoladamente</li>
              <li>Escute as notas individuais de cada acorde (arpejo)</li>
              <li>Compare acordes maiores e menores com a mesma fundamental</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </TabsContent>
  );
};

export default AcordesSection;
