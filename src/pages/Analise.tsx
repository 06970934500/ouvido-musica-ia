
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, Music, Play, Pause, SkipBack, SkipForward } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WaveformVisualizer from "@/components/analysis/WaveformVisualizer";
import ChordTimeline from "@/components/analysis/ChordTimeline";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";

// Função para obter o número de análises realizadas no mês atual
const getMonthlyAnalysisCount = () => {
  const analysisHistory = JSON.parse(localStorage.getItem("analysisHistory") || "[]");
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  return analysisHistory.filter((analysis: any) => {
    const analysisDate = new Date(analysis.date);
    return analysisDate.getMonth() === currentMonth && 
           analysisDate.getFullYear() === currentYear;
  }).length;
};

// Função para registrar uma nova análise
const recordAnalysis = () => {
  const analysisHistory = JSON.parse(localStorage.getItem("analysisHistory") || "[]");
  analysisHistory.push({
    date: new Date().toISOString(),
    id: Date.now().toString()
  });
  localStorage.setItem("analysisHistory", JSON.stringify(analysisHistory));
};

const Analise = () => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [monthlyAnalysisCount, setMonthlyAnalysisCount] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | undefined>(undefined);
  const MAX_FREE_ANALYSIS = 3;

  const {
    isPlaying,
    duration,
    play,
    pause,
    toggle,
    seek,
    audioRef
  } = useAudioPlayer(audioUrl);

  // Carregar contagem de análises ao iniciar
  useEffect(() => {
    setMonthlyAnalysisCount(getMonthlyAnalysisCount());
  }, []);

  // Demo song data
  const demoSongData = {
    title: "Exemplo - Música Demo",
    artist: "Artista Demo",
    key: "C Maior",
    tempo: "120 BPM",
    chords: [
      { time: 0, chord: "C" },
      { time: 4, chord: "Am" },
      { time: 8, chord: "F" },
      { time: 12, chord: "G" },
      { time: 16, chord: "C" },
      { time: 20, chord: "Am" },
      { time: 24, chord: "F" },
      { time: 28, chord: "G" },
    ],
    duration: 32, // seconds
  };

  const handleFileUpload = (file: File) => {
    // Verificar se o usuário pode fazer mais análises
    const isPremium = user?.id && false; // Aqui você verificaria o plano do usuário (por enquanto, todos são free)
    
    if (!isPremium && monthlyAnalysisCount >= MAX_FREE_ANALYSIS) {
      toast({
        title: "Limite de análises atingido",
        description: `Você já utilizou suas ${MAX_FREE_ANALYSIS} análises gratuitas este mês. Faça upgrade para o plano Premium para análises ilimitadas.`,
        variant: "destructive",
      });
      navigate("/planos");
      return;
    }
    
    // Registrar nova análise e atualizar contagem
    recordAnalysis();
    setMonthlyAnalysisCount(getMonthlyAnalysisCount());
    
    // Criar URL para o arquivo de áudio
    if (file.type.includes('audio')) {
      const url = URL.createObjectURL(file);
      setAudioUrl(url);
    }
    
    setFile(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const togglePlayPause = () => {
    toggle();
  };

  const handleTimeChange = (value: number[]) => {
    const newTime = value[0];
    setCurrentTime(newTime);
    seek(newTime);
  };

  const handleSkipForward = () => {
    const newTime = Math.min(currentTime + 5, demoSongData.duration);
    setCurrentTime(newTime);
    seek(newTime);
  };

  const handleSkipBackward = () => {
    const newTime = Math.max(currentTime - 5, 0);
    setCurrentTime(newTime);
    seek(newTime);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Função para usar uma música de exemplo
  const useDemoSong = () => {
    // Verificar se o usuário pode fazer mais análises
    const isPremium = user?.id && false; // Aqui você verificaria o plano do usuário (por enquanto, todos são free)
    
    if (!isPremium && monthlyAnalysisCount >= MAX_FREE_ANALYSIS) {
      toast({
        title: "Limite de análises atingido",
        description: `Você já utilizou suas ${MAX_FREE_ANALYSIS} análises gratuitas este mês. Faça upgrade para o plano Premium para análises ilimitadas.`,
        variant: "destructive",
      });
      navigate("/planos");
      return;
    }
    
    // Registrar nova análise e atualizar contagem
    recordAnalysis();
    setMonthlyAnalysisCount(getMonthlyAnalysisCount());
    
    // Simular um arquivo de demo
    setFile(new File([], "demo.mp3"));
    setAudioUrl(undefined); // Não temos áudio real para o demo
  };

  return (
    <div className="container py-12">
      <div className="flex flex-col items-center space-y-4 text-center mb-8">
        <h1 className="text-3xl font-bold">Análise de Música</h1>
        <p className="text-muted-foreground max-w-2xl">
          Faça upload de uma música para receber uma análise detalhada dos acordes e estrutura
        </p>
        {!user?.id && (
          <p className="text-sm bg-yellow-100 text-yellow-800 p-2 rounded">
            Faça login para salvar suas análises e acompanhar seu progresso
          </p>
        )}
        {!file && user?.id && (
          <p className="text-sm">
            Você utilizou {monthlyAnalysisCount} de {MAX_FREE_ANALYSIS} análises gratuitas este mês
          </p>
        )}
      </div>

      {!file ? (
        <div 
          className={`border-2 border-dashed rounded-lg p-12 text-center max-w-3xl mx-auto ${
            dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/20"
          }`}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center space-y-4">
            <div className="p-4 rounded-full bg-secondary">
              <Upload className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-medium">Arraste e solte seu arquivo de áudio</h3>
            <p className="text-muted-foreground">
              Suportamos arquivos .mp3, .wav e .ogg até 10MB
            </p>
            <p className="text-sm text-muted-foreground">ou</p>
            <label htmlFor="file-upload" className="cursor-pointer">
              <span className="relative inline-block">
                <Button>Selecionar Arquivo</Button>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  accept="audio/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleInputChange}
                />
              </span>
            </label>
          </div>

          <div className="mt-12 pt-8 border-t border-border">
            <Button 
              variant="outline" 
              className="w-full max-w-xs" 
              onClick={useDemoSong}
            >
              <Music className="mr-2 h-4 w-4" />
              Usar Exemplo de Música
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-8 max-w-5xl mx-auto">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold">{demoSongData.title}</h2>
                    <p className="text-muted-foreground">{demoSongData.artist}</p>
                  </div>
                  <div className="flex gap-3 items-center">
                    <div className="text-sm font-medium px-3 py-1 rounded-full bg-secondary">
                      {demoSongData.key}
                    </div>
                    <div className="text-sm font-medium px-3 py-1 rounded-full bg-secondary">
                      {demoSongData.tempo}
                    </div>
                  </div>
                </div>

                <WaveformVisualizer currentTime={currentTime} totalDuration={demoSongData.duration} />

                <ChordTimeline 
                  chords={demoSongData.chords} 
                  currentTime={currentTime} 
                  totalDuration={demoSongData.duration} 
                />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">{formatTime(currentTime)}</span>
                    <span className="text-sm text-muted-foreground">{formatTime(demoSongData.duration)}</span>
                  </div>
                  <Slider
                    defaultValue={[0]}
                    max={demoSongData.duration}
                    step={0.1}
                    value={[currentTime]}
                    onValueChange={handleTimeChange}
                  />
                </div>

                <div className="flex justify-center gap-2">
                  <Button variant="outline" size="icon" onClick={handleSkipBackward}>
                    <SkipBack className="h-4 w-4" />
                  </Button>
                  <Button size="icon" onClick={togglePlayPause}>
                    {isPlaying ? (
                      <Pause className="h-4 w-4" />
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                  </Button>
                  <Button variant="outline" size="icon" onClick={handleSkipForward}>
                    <SkipForward className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="acordes" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-3 mx-auto">
              <TabsTrigger value="acordes">Acordes</TabsTrigger>
              <TabsTrigger value="estrutura">Estrutura</TabsTrigger>
              <TabsTrigger value="melodia">Melodia</TabsTrigger>
            </TabsList>
            <TabsContent value="acordes" className="mt-4 p-4 border rounded-lg">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Progressão Harmônica</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {demoSongData.chords.map((chord, index) => (
                    <div key={index} className="p-4 border rounded-lg text-center">
                      <div className="text-2xl font-bold">{chord.chord}</div>
                      <div className="text-sm text-muted-foreground">{formatTime(chord.time)}</div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="estrutura" className="mt-4 p-4 border rounded-lg">
              <div className="text-center text-muted-foreground py-12">
                Análise de estrutura disponível na versão Premium
              </div>
            </TabsContent>
            <TabsContent value="melodia" className="mt-4 p-4 border rounded-lg">
              <div className="text-center text-muted-foreground py-12">
                Análise de melodia disponível na versão Premium
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-center">
            <Button variant="outline" onClick={() => setFile(null)}>
              Analisar Outra Música
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Analise;
