
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, HeadphonesIcon } from "lucide-react";
import { TabsContent } from "@/components/ui/tabs";

const IntervalosSection = () => {
  return (
    <TabsContent value="intervalos" className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-music-600" />
              O que são intervalos musicais?
            </CardTitle>
            <CardDescription>
              Conceitos fundamentais para reconhecimento auditivo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <img 
                src="/lovable-uploads/81b7b9fa-54b7-412c-9092-bcf0c52a42c6.png" 
                alt="Tabela de intervalos musicais" 
                className="w-full rounded-lg shadow-md mb-4"
              />
              <p className="text-sm text-center text-muted-foreground mb-4">
                Tabela de intervalos musicais e suas distâncias em tons
              </p>
            </div>
            <p className="mb-4">
              Intervalos musicais são a distância entre duas notas. São a base para entender 
              melodias, acordes e progressões harmônicas.
            </p>
            <p className="mb-4">
              Existem dois aspectos principais dos intervalos:
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li><strong>Quantidade:</strong> 2ª, 3ª, 4ª, 5ª, 6ª, 7ª e 8ª (oitava)</li>
              <li><strong>Qualidade:</strong> maior, menor, justo, aumentado ou diminuto</li>
            </ul>
            <p>
              Treinar o reconhecimento de intervalos é o primeiro passo para desenvolver um bom ouvido musical.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HeadphonesIcon className="h-5 w-5 text-music-600" />
              Como identificar intervalos pelo ouvido
            </CardTitle>
            <CardDescription>
              Estratégias para reconhecimento auditivo de intervalos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Uma estratégia eficaz para identificar intervalos é associá-los a inícios de músicas conhecidas:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>2ª Maior:</strong> "Parabéns a Você"</li>
              <li><strong>3ª Menor:</strong> "Greensleeves" ou tema de "O Poderoso Chefão"</li>
              <li><strong>3ª Maior:</strong> "Oh When The Saints"</li>
              <li><strong>4ª Justa:</strong> "Aqui Vem o Sol" (Here Comes the Sun)</li>
              <li><strong>5ª Justa:</strong> "Twinkle Twinkle Little Star"</li>
              <li><strong>6ª Menor:</strong> "Love Story" (tema)</li>
              <li><strong>6ª Maior:</strong> "My Bonnie Lies Over The Ocean"</li>
              <li><strong>7ª Menor:</strong> "Star Trek" (tema)</li>
              <li><strong>8ª (Oitava):</strong> "Somewhere Over The Rainbow"</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </TabsContent>
  );
};

export default IntervalosSection;
