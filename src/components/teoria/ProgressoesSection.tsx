
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookText, HeadphonesIcon } from "lucide-react";
import { TabsContent } from "@/components/ui/tabs";

const ProgressoesSection = () => {
  return (
    <TabsContent value="progressoes" className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookText className="h-5 w-5 text-music-600" />
              Progressões harmônicas básicas
            </CardTitle>
            <CardDescription>
              Sequências de acordes comuns na música ocidental
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              As progressões harmônicas são sequências de acordes que dão movimento e direção à música.
            </p>
            <p className="mb-4">
              <strong>Progressões comuns (representadas por números romanos):</strong>
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li><strong>I - IV - V:</strong> A progressão mais básica do pop e rock (ex: C - F - G)</li>
              <li><strong>I - V - vi - IV:</strong> Progressão "pop punk" usada em centenas de músicas (ex: C - G - Am - F)</li>
              <li><strong>ii - V - I:</strong> A progressão mais comum no jazz (ex: Dm - G7 - CMaj7)</li>
              <li><strong>I - vi - IV - V:</strong> Progressão dos anos 50 ou "doo-wop" (ex: C - Am - F - G)</li>
              <li><strong>vi - IV - I - V:</strong> Versão da progressão anterior, começando pelo vi (ex: Am - F - C - G)</li>
            </ul>
            <p>
              A função dos acordes dentro de uma tonalidade (tônica, subdominante, dominante) define seu papel na progressão.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HeadphonesIcon className="h-5 w-5 text-music-600" />
              Reconhecendo progressões de acordes
            </CardTitle>
            <CardDescription>
              Como identificar sequências harmônicas pelo ouvido
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Estratégias para reconhecer progressões de acordes:
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li><strong>Escute o baixo:</strong> As notas do baixo geralmente indicam a fundamental do acorde</li>
              <li><strong>Identifique pontos de tensão e relaxamento:</strong> Acordes dominantes (V) criam tensão, acordes tônicos (I) trazem resolução</li>
              <li><strong>Reconheça padrões cadenciais:</strong> Especialmente as cadências V-I (conclusivas) e IV-I (plagais)</li>
              <li><strong>Associe a músicas conhecidas:</strong> Relacione progressões a músicas que você já conhece</li>
            </ul>
            <p className="mb-4">
              Exercícios práticos:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Tente identificar apenas se um acorde é o I, IV ou V em uma progressão simples</li>
              <li>Pratique encontrar a tônica (acorde I) em diferentes músicas</li>
              <li>Escute músicas populares e tente identificar a progressão de acordes</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </TabsContent>
  );
};

export default ProgressoesSection;
