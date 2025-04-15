import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, BookText, Music, HeadphonesIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Images } from 'lucide-react';

const Teoria = () => {
  const musicConcepts = [
    { 
      name: 'Intervalos', 
      placeholderImage: '/placeholder.svg',
      description: 'Distância entre duas notas musicais'
    },
    { 
      name: 'Escalas', 
      placeholderImage: '/placeholder.svg', 
      description: 'Sequência de notas em ordem ascendente ou descendente'
    },
    { 
      name: 'Acordes', 
      placeholderImage: '/placeholder.svg',
      description: 'Combinação de três ou mais notas tocadas simultaneamente'
    }
  ];

  return (
    <div className="container py-12">
      <div className="flex flex-col items-center space-y-4 text-center mb-8">
        <h1 className="text-3xl font-bold">Teoria Musical Aplicada</h1>
        <p className="text-muted-foreground max-w-2xl">
          Fundamentos teóricos essenciais para desenvolver seu ouvido musical
        </p>
      </div>

      <section className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {musicConcepts.map((concept) => (
            <Card key={concept.name} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-center mb-4">
                  <Images className="h-12 w-12 text-music-600" />
                </div>
                <CardTitle>{concept.name}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <img 
                  src={concept.placeholderImage} 
                  alt={concept.name} 
                  className="mx-auto mb-4 rounded-lg shadow-sm max-h-48"
                />
                <p className="text-muted-foreground">{concept.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Tabs defaultValue="intervalos" className="w-full">
        <div className="flex justify-center mb-8">
          <TabsList className="grid w-full max-w-md grid-cols-4">
            <TabsTrigger value="intervalos">Intervalos</TabsTrigger>
            <TabsTrigger value="acordes">Acordes</TabsTrigger>
            <TabsTrigger value="escalas">Escalas</TabsTrigger>
            <TabsTrigger value="progressoes">Progressões</TabsTrigger>
          </TabsList>
        </div>

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
      </Tabs>
    </div>
  );
};

export default Teoria;
