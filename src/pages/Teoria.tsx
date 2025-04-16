
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Images } from 'lucide-react';
import MusicConceptCard from "@/components/teoria/MusicConceptCard";
import IntervalosSection from "@/components/teoria/IntervalosSection";
import AcordesSection from "@/components/teoria/AcordesSection";
import EscalasSection from "@/components/teoria/EscalasSection";
import ProgressoesSection from "@/components/teoria/ProgressoesSection";

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
            <MusicConceptCard 
              key={concept.name}
              name={concept.name}
              placeholderImage={concept.placeholderImage}
              description={concept.description}
            />
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

        <IntervalosSection />
        <AcordesSection />
        <EscalasSection />
        <ProgressoesSection />
      </Tabs>
    </div>
  );
};

export default Teoria;
