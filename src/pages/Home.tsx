
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PlayCircle, Headphones, BarChart, Music, BookOpen, Clock } from "lucide-react";

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero-gradient py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                <span className="gradient-text">Música de Ouvido</span>.IA
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Aprenda a tirar músicas de ouvido com ajuda da Inteligência Artificial. 
                Treine sua percepção auditiva de forma divertida e eficiente.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg">
                <Link to="/treinamento">
                  <PlayCircle className="mr-2 h-5 w-5" />
                  Começar Treinamento
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/analise">
                  <Headphones className="mr-2 h-5 w-5" />
                  Analisar uma Música
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Aperfeiçoe seu ouvido musical
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Nossa plataforma oferece ferramentas avançadas para desenvolver sua percepção auditiva
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="flex flex-col items-center space-y-4 p-6 border rounded-lg card-hover">
              <div className="p-3 rounded-full bg-music-100">
                <Music className="h-8 w-8 text-music-600" />
              </div>
              <h3 className="text-xl font-bold">Treinamento Auditivo</h3>
              <p className="text-center text-muted-foreground">
                Exercícios para reconhecer intervalos, acordes e progressões harmônicas
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 p-6 border rounded-lg card-hover">
              <div className="p-3 rounded-full bg-music-100">
                <BookOpen className="h-8 w-8 text-music-600" />
              </div>
              <h3 className="text-xl font-bold">Análise de Músicas</h3>
              <p className="text-center text-muted-foreground">
                Faça upload de músicas e obtenha análises com acordes e progressões
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 p-6 border rounded-lg card-hover">
              <div className="p-3 rounded-full bg-music-100">
                <BarChart className="h-8 w-8 text-music-600" />
              </div>
              <h3 className="text-xl font-bold">Acompanhe seu Progresso</h3>
              <p className="text-center text-muted-foreground">
                Visualize seu desenvolvimento e evolução nas habilidades musicais
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 md:py-20 bg-secondary">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Como funciona
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Três passos simples para aprimorar suas habilidades auditivas
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="flex flex-col items-center space-y-4 p-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-music-600 text-white font-bold text-xl">
                1
              </div>
              <h3 className="text-xl font-bold">Escolha seu exercício</h3>
              <p className="text-center text-muted-foreground">
                Selecione entre treinar intervalos, acordes ou progressões harmônicas
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 p-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-music-600 text-white font-bold text-xl">
                2
              </div>
              <h3 className="text-xl font-bold">Pratique diariamente</h3>
              <p className="text-center text-muted-foreground">
                Treine por apenas 10 minutos por dia para ver resultados significativos
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 p-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-music-600 text-white font-bold text-xl">
                3
              </div>
              <h3 className="text-xl font-bold">Acompanhe seu progresso</h3>
              <p className="text-center text-muted-foreground">
                Visualize sua evolução e identifique áreas para melhoria
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Comece hoje mesmo
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Faça parte da comunidade de músicos que estão aprimorando seu ouvido musical
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg">
                <Link to="/treinamento">
                  <PlayCircle className="mr-2 h-5 w-5" />
                  Começar Agora
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/planos">
                  <Clock className="mr-2 h-5 w-5" />
                  Ver Planos
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
