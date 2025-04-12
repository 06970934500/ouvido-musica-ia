
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { Award, Music, ScrollText, TrendingUp } from "lucide-react";

const Progresso = () => {
  // Demo data
  const weeklyData = [
    { day: "Dom", acertos: 65, exercicios: 100 },
    { day: "Seg", acertos: 72, exercicios: 100 },
    { day: "Ter", acertos: 80, exercicios: 100 },
    { day: "Qua", acertos: 78, exercicios: 100 },
    { day: "Qui", acertos: 85, exercicios: 100 },
    { day: "Sex", acertos: 90, exercicios: 100 },
    { day: "Sáb", acertos: 93, exercicios: 100 },
  ];

  const progressByCategory = [
    { categoria: "Intervalos", iniciante: 90, intermediario: 70, avancado: 50 },
    { categoria: "Acordes", iniciante: 85, intermediario: 65, avancado: 40 },
    { categoria: "Progressões", iniciante: 75, intermediario: 50, avancado: 25 },
    { categoria: "Melodias", iniciante: 65, intermediario: 45, avancado: 20 },
  ];

  const recentSongs = [
    { id: 1, title: "Imagine", artist: "John Lennon", date: "12/04/2025", rating: 4 },
    { id: 2, title: "Hotel California", artist: "Eagles", date: "10/04/2025", rating: 3 },
    { id: 3, title: "Bohemian Rhapsody", artist: "Queen", date: "05/04/2025", rating: 5 },
    { id: 4, title: "Stairway to Heaven", artist: "Led Zeppelin", date: "01/04/2025", rating: 4 },
  ];

  const achievementLevels = [
    { name: "Iniciante Completo", progress: 100, max: 100 },
    { name: "Intermediário", progress: 45, max: 100 },
    { name: "Avançado", progress: 10, max: 100 },
    { name: "Mestre do Ouvido", progress: 0, max: 100 },
  ];

  const formatPercent = (value: number) => `${value}%`;

  return (
    <div className="container py-12">
      <div className="flex flex-col items-center space-y-4 text-center mb-8">
        <h1 className="text-3xl font-bold">Seu Progresso</h1>
        <p className="text-muted-foreground max-w-2xl">
          Acompanhe sua evolução e visualize seus resultados de treinamento
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="p-3 rounded-full bg-music-100 mb-4">
              <ScrollText className="h-6 w-6 text-music-600" />
            </div>
            <div className="text-3xl font-bold">84%</div>
            <p className="text-muted-foreground">Taxa de Acerto</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="p-3 rounded-full bg-music-100 mb-4">
              <Music className="h-6 w-6 text-music-600" />
            </div>
            <div className="text-3xl font-bold">7</div>
            <p className="text-muted-foreground">Músicas Analisadas</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="p-3 rounded-full bg-music-100 mb-4">
              <TrendingUp className="h-6 w-6 text-music-600" />
            </div>
            <div className="text-3xl font-bold">23</div>
            <p className="text-muted-foreground">Dias Consecutivos</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="p-3 rounded-full bg-music-100 mb-4">
              <Award className="h-6 w-6 text-music-600" />
            </div>
            <div className="text-3xl font-bold">Nível 3</div>
            <p className="text-muted-foreground">Ranking Atual</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="desempenho" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3 mx-auto mb-8">
          <TabsTrigger value="desempenho">Desempenho</TabsTrigger>
          <TabsTrigger value="musicas">Músicas</TabsTrigger>
          <TabsTrigger value="nivel">Níveis</TabsTrigger>
        </TabsList>
        
        <TabsContent value="desempenho" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Progresso Semanal</CardTitle>
              <CardDescription>Taxa de acerto nos exercícios dos últimos 7 dias</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={weeklyData}
                    margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis tickFormatter={formatPercent} />
                    <Tooltip formatter={(value) => [`${value}%`, 'Taxa de Acerto']} />
                    <Area 
                      type="monotone" 
                      dataKey="acertos" 
                      stroke="#8b5cf6" 
                      fill="#c4b5fd" 
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Progresso por Categoria</CardTitle>
              <CardDescription>Seu desempenho em cada tipo de exercício</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={progressByCategory}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="categoria" />
                    <YAxis tickFormatter={formatPercent} />
                    <Tooltip formatter={(value) => [`${value}%`, 'Taxa de Acerto']} />
                    <Legend />
                    <Bar dataKey="iniciante" name="Iniciante" fill="#8b5cf6" />
                    <Bar dataKey="intermediario" name="Intermediário" fill="#6d28d9" />
                    <Bar dataKey="avancado" name="Avançado" fill="#4c1d95" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="musicas" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Músicas Recentes</CardTitle>
              <CardDescription>Últimas músicas analisadas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Música</th>
                      <th className="text-left p-2">Artista</th>
                      <th className="text-left p-2">Data</th>
                      <th className="text-left p-2">Avaliação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentSongs.map((song) => (
                      <tr key={song.id} className="border-b">
                        <td className="p-2 font-medium">{song.title}</td>
                        <td className="p-2 text-muted-foreground">{song.artist}</td>
                        <td className="p-2 text-muted-foreground">{song.date}</td>
                        <td className="p-2">
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <span 
                                key={i} 
                                className={`h-4 w-4 rounded-full mr-0.5 ${
                                  i < song.rating ? "bg-music-500" : "bg-muted"
                                }`}
                              />
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <Button variant="outline">Ver Todas as Músicas</Button>
          </div>
        </TabsContent>
        
        <TabsContent value="nivel" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Níveis de Habilidade</CardTitle>
              <CardDescription>Seu progresso em cada nível de dificuldade</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {achievementLevels.map((level) => (
                  <div key={level.name} className="space-y-2">
                    <div className="flex justify-between">
                      <div className="font-medium">{level.name}</div>
                      <div className="text-muted-foreground">{level.progress}%</div>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-music-500 rounded-full"
                        style={{ width: `${level.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Próximos Passos</CardTitle>
              <CardDescription>Recomendações para melhorar suas habilidades</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-music-100 flex items-center justify-center">
                    <span className="text-music-600 text-sm font-bold">1</span>
                  </div>
                  <div>
                    <p className="font-medium">Complete o treinamento de acordes intermediários</p>
                    <p className="text-sm text-muted-foreground">Melhore sua habilidade de reconhecer acordes mais complexos</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-music-100 flex items-center justify-center">
                    <span className="text-music-600 text-sm font-bold">2</span>
                  </div>
                  <div>
                    <p className="font-medium">Analise mais 3 músicas</p>
                    <p className="text-sm text-muted-foreground">Pratique a identificação de acordes em músicas reais</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-music-100 flex items-center justify-center">
                    <span className="text-music-600 text-sm font-bold">3</span>
                  </div>
                  <div>
                    <p className="font-medium">Comece o treinamento de progressões avançadas</p>
                    <p className="text-sm text-muted-foreground">Desafie-se com sequências de acordes mais complexas</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Progresso;
