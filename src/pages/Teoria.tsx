
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Images, BookOpen, Headphones } from 'lucide-react';
import { Button } from "@/components/ui/button";
import MusicConceptCard from "@/components/teoria/MusicConceptCard";
import IntervalosSection from "@/components/teoria/IntervalosSection";
import AcordesSection from "@/components/teoria/AcordesSection";
import EscalasSection from "@/components/teoria/EscalasSection";
import ProgressoesSection from "@/components/teoria/ProgressoesSection";

const Teoria = () => {
  const [activeTab, setActiveTab] = useState("intervalos");

  const musicConcepts = [
    { 
      name: 'Intervalos', 
      placeholderImage: '/placeholder.svg',
      description: 'Distância entre duas notas musicais e seu reconhecimento auditivo'
    },
    { 
      name: 'Escalas', 
      placeholderImage: '/placeholder.svg', 
      description: 'Sequências de notas que formam a base da melodia e harmonia'
    },
    { 
      name: 'Acordes', 
      placeholderImage: '/placeholder.svg',
      description: 'Combinação de três ou mais notas tocadas simultaneamente'
    }
  ];

  // Handle card click to change tab
  const handleConceptCardClick = (tabValue: string) => {
    setActiveTab(tabValue.toLowerCase());
  };

  return (
    <div className="container py-12">
      <div className="flex flex-col items-center space-y-4 text-center mb-8">
        <h1 className="text-3xl font-bold">Teoria Musical Aplicada</h1>
        <p className="text-muted-foreground max-w-2xl">
          Fundamentos teóricos essenciais para desenvolver seu ouvido musical
        </p>
        <div className="flex items-center gap-2 mt-2">
          <BookOpen className="h-5 w-5 text-music-600" />
          <span className="text-sm">Clique nos cards para explorar os conceitos em detalhes</span>
        </div>
      </div>

      <section className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {musicConcepts.map((concept) => (
            <div 
              key={concept.name}
              onClick={() => handleConceptCardClick(concept.name)}
              className="cursor-pointer transform transition-transform hover:scale-105"
            >
              <MusicConceptCard 
                name={concept.name}
                placeholderImage={concept.placeholderImage}
                description={concept.description}
              />
            </div>
          ))}
        </div>
      </section>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex justify-center mb-8">
          <TabsList className="grid w-full max-w-md grid-cols-4">
            <TabsTrigger value="intervalos">Intervalos</TabsTrigger>
            <TabsTrigger value="acordes">Acordes</TabsTrigger>
            <TabsTrigger value="escalas">Escalas</TabsTrigger>
            <TabsTrigger value="progressoes">Progressões</TabsTrigger>
          </TabsList>
        </div>

        <IntervalosSection />
        <AcordesSection />
        <EscalasSection />
        <ProgressoesSection />

        <div className="flex justify-center mt-10">
          <Button 
            onClick={() => window.location.href = '/treinamento'} 
            className="flex items-center gap-2"
          >
            <Headphones className="h-5 w-5" />
            Praticar treinamento auditivo
          </Button>
        </div>
      </Tabs>
    </div>
  );
};

export default Teoria;
