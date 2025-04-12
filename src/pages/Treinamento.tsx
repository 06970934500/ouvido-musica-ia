
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Music, VolumeX, Volume2, Check, X } from "lucide-react";
import ExerciseCard from "@/components/training/ExerciseCard";

const Treinamento = () => {
  const [activeTab, setActiveTab] = useState("intervalos");

  return (
    <div className="container py-12">
      <div className="flex flex-col items-center space-y-4 text-center mb-8">
        <h1 className="text-3xl font-bold">Treinamento Auditivo</h1>
        <p className="text-muted-foreground max-w-2xl">
          Desenvolva sua capacidade de reconhecer elementos musicais com exercícios interativos
        </p>
      </div>

      <Tabs defaultValue="intervalos" className="w-full" onValueChange={setActiveTab}>
        <div className="flex justify-center mb-8">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="intervalos">Intervalos</TabsTrigger>
            <TabsTrigger value="acordes">Acordes</TabsTrigger>
            <TabsTrigger value="progressoes">Progressões</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="intervalos" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Básico</CardTitle>
                <CardDescription>Intervalos mais simples e comuns</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    <span>Uníssono, 2ª maior, 3ª maior</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    <span>4ª justa, 5ª justa</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    <span>8ª (oitava)</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Iniciar Treino</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Intermediário</CardTitle>
                <CardDescription>Intervalos mais desafiadores</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    <span>2ª menor, 3ª menor</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    <span>6ª maior, 7ª maior</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    <span>Identificação do intervalo e direção (ascendente/descendente)</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant="outline">Iniciar Treino</Button>
              </CardFooter>
            </Card>
          </div>

          <ExerciseCard 
            title="Exercício de Exemplo" 
            description="Escute o intervalo e selecione a resposta correta"
            options={["2ª Menor", "2ª Maior", "3ª Menor", "3ª Maior"]}
          />
        </TabsContent>

        <TabsContent value="acordes" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Tríades Básicas</CardTitle>
                <CardDescription>Acordes de três notas</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    <span>Maior</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    <span>Menor</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    <span>Diminuto</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Iniciar Treino</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tétrades</CardTitle>
                <CardDescription>Acordes de quatro notas</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    <span>Maior com 7ª</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    <span>Dominante (7)</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    <span>Menor com 7ª</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant="outline">Iniciar Treino</Button>
              </CardFooter>
            </Card>
          </div>

          <ExerciseCard 
            title="Exercício de Exemplo" 
            description="Escute o acorde e selecione a resposta correta"
            options={["Maior", "Menor", "Aumentado", "Diminuto"]}
          />
        </TabsContent>

        <TabsContent value="progressoes" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Progressões Básicas</CardTitle>
                <CardDescription>Sequências comuns em músicas populares</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    <span>I - IV - V</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    <span>I - vi - IV - V</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    <span>I - V - vi - IV</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Iniciar Treino</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Progressões Jazz</CardTitle>
                <CardDescription>Sequências comuns no jazz e música sofisticada</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    <span>ii - V - I</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    <span>I - vi - ii - V</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    <span>iii - vi - ii - V</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant="outline">Iniciar Treino</Button>
              </CardFooter>
            </Card>
          </div>

          <ExerciseCard 
            title="Exercício de Exemplo" 
            description="Escute a progressão e selecione a resposta correta"
            options={["I-IV-V", "I-V-vi-IV", "ii-V-I", "I-vi-IV-V"]}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Treinamento;
