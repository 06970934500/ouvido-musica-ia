
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TrainingModule from "@/components/training/TrainingModule";
import Exercise from "@/components/training/Exercise";

const Treinamento = () => {
  const [activeTab, setActiveTab] = useState("intervalos");

  // Dados para os exercícios
  const intervalosBasicos = [
    "Uníssono", "2ª Maior", "3ª Maior", "4ª Justa", "5ª Justa", "8ª"
  ];
  
  const intervalosIntermediarios = [
    "2ª Menor", "3ª Menor", "6ª Maior", "7ª Maior", "6ª Menor", "7ª Menor"
  ];
  
  const triadesBasicas = [
    "Maior", "Menor", "Diminuto", "Aumentado"
  ];
  
  const tetrades = [
    "Maior com 7ª", "Dominante (7)", "Menor com 7ª", "Meio-diminuto"
  ];
  
  const progressoesBasicas = [
    "I-IV-V", "I-vi-IV-V", "I-V-vi-IV", "ii-V-I"
  ];
  
  const progressoesJazz = [
    "ii-V-I", "I-vi-ii-V", "iii-vi-ii-V", "I-IV-iii-vi-ii-V-I"
  ];

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
            <TrainingModule
              title="Básico"
              description="Intervalos mais simples e comuns"
              items={intervalosBasicos}
              exerciseType="intervalos"
              difficulty="iniciante"
            />

            <TrainingModule
              title="Intermediário"
              description="Intervalos mais desafiadores"
              items={intervalosIntermediarios}
              exerciseType="intervalos"
              difficulty="intermediario"
            />
          </div>

          <Exercise 
            title="Exemplo de Exercício de Intervalos"
            description="Escute o intervalo e selecione a resposta correta"
            options={["2ª Menor", "2ª Maior", "3ª Menor", "3ª Maior"]}
            exerciseType="intervalos"
            difficulty="iniciante"
          />
        </TabsContent>

        <TabsContent value="acordes" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TrainingModule
              title="Tríades Básicas"
              description="Acordes de três notas"
              items={triadesBasicas}
              exerciseType="acordes"
              difficulty="iniciante"
            />

            <TrainingModule
              title="Tétrades"
              description="Acordes de quatro notas"
              items={tetrades}
              exerciseType="acordes"
              difficulty="intermediario"
            />
          </div>

          <Exercise 
            title="Exemplo de Exercício de Acordes"
            description="Escute o acorde e selecione a resposta correta"
            options={["Maior", "Menor", "Aumentado", "Diminuto"]}
            exerciseType="acordes"
            difficulty="iniciante"
          />
        </TabsContent>

        <TabsContent value="progressoes" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TrainingModule
              title="Progressões Básicas"
              description="Sequências comuns em músicas populares"
              items={progressoesBasicas}
              exerciseType="progressoes"
              difficulty="iniciante"
            />

            <TrainingModule
              title="Progressões Jazz"
              description="Sequências comuns no jazz e música sofisticada"
              items={progressoesJazz}
              exerciseType="progressoes"
              difficulty="avancado"
            />
          </div>

          <Exercise 
            title="Exemplo de Exercício de Progressões"
            description="Escute a progressão e selecione a resposta correta"
            options={["I-IV-V", "I-V-vi-IV", "ii-V-I", "I-vi-IV-V"]}
            exerciseType="progressoes"
            difficulty="iniciante"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Treinamento;
