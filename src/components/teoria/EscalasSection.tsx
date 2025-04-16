
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Music, HeadphonesIcon } from "lucide-react";
import { TabsContent } from "@/components/ui/tabs";

const EscalasSection = () => {
  return (
    <TabsContent value="escalas" className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Music className="h-5 w-5 text-music-600" />
              Escalas musicais fundamentais
            </CardTitle>
            <CardDescription>
              As escalas mais importantes e suas características
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <img 
                src="/lovable-uploads/9bdc3702-7be6-4236-8de3-894bf3e0cc02.png" 
                alt="Tabela de escalas maiores" 
                className="w-full rounded-lg shadow-md mb-4"
              />
              <p className="text-sm text-center text-muted-foreground mb-4">
                Escalas maiores e seus intervalos
              </p>
            </div>
            <p className="mb-4">
              As escalas são sequências organizadas de notas que formam a base da melodia e da harmonia.
            </p>
            <p className="mb-4">
              <strong>Escalas principais:</strong>
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li><strong>Escala maior:</strong> Tom - Tom - Semitom - Tom - Tom - Tom - Semitom</li>
              <li><strong>Escala menor natural:</strong> Tom - Semitom - Tom - Tom - Semitom - Tom - Tom</li>
              <li><strong>Escala menor harmônica:</strong> Tom - Semitom - Tom - Tom - Semitom - Tom e meio - Semitom</li>
              <li><strong>Escala menor melódica:</strong> Tom - Semitom - Tom - Tom - Tom - Tom - Semitom (subindo)
                Tom - Tom - Semitom - Tom - Tom - Semitom - Tom (descendo)</li>
              <li><strong>Escala pentatônica maior:</strong> Tom - Tom - Tom e meio - Tom - Tom e meio</li>
              <li><strong>Escala pentatônica menor:</strong> Tom e meio - Tom - Tom - Tom e meio - Tom</li>
            </ul>
            <p>
              Cada escala tem um caráter e sonoridade próprios que influenciam o humor de uma peça musical.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HeadphonesIcon className="h-5 w-5 text-music-600" />
              Aplicação das escalas
            </CardTitle>
            <CardDescription>
              Como as escalas são utilizadas na música
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              As escalas têm diversas aplicações musicais:
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li><strong>Construção melódica:</strong> As melodias geralmente seguem as notas de uma escala específica</li>
              <li><strong>Construção harmônica:</strong> Os acordes são derivados de notas da escala</li>
              <li><strong>Improvisação:</strong> Músicos usam escalas como base para improvisar sobre progressões de acordes</li>
              <li><strong>Características culturais:</strong> Diferentes culturas utilizam diferentes escalas (como as escalas pentatônicas na música asiática)</li>
            </ul>
            <p className="mb-4">
              Dicas para treinar o reconhecimento de escalas:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Escute e cante as escalas regularmente</li>
              <li>Associe as escalas a estilos musicais específicos</li>
              <li>Pratique identificar se uma melodia está em modo maior ou menor</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </TabsContent>
  );
};

export default EscalasSection;
