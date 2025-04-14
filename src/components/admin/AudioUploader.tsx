
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, Check, X, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AudioUploaderProps {
  exerciseId: string;
  onUploadComplete?: (audioPath: string) => void;
  audioType: 'interval' | 'chord' | 'progression' | 'melody';
  label: string;
}

export default function AudioUploader({ 
  exerciseId, 
  onUploadComplete, 
  audioType, 
  label 
}: AudioUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      
      // Verificar se é um arquivo de áudio
      if (!selectedFile.type.startsWith('audio/')) {
        setUploadError('Por favor, selecione um arquivo de áudio válido');
        setFile(null);
        return;
      }
      
      // Verificar tamanho (máximo 5MB)
      if (selectedFile.size > 5 * 1024 * 1024) {
        setUploadError('O arquivo deve ter no máximo 5MB');
        setFile(null);
        return;
      }
      
      setFile(selectedFile);
      setUploadError(null);
    }
  };

  const uploadAudio = async () => {
    if (!file) return;
    
    try {
      setUploading(true);
      setProgress(0);
      setUploadSuccess(false);
      
      // Construir o caminho do arquivo no formato: tipo_audio/exercise_id/nome_arquivo
      const filePath = `${audioType}/${exerciseId}/${Date.now()}_${file.name.replace(/\s+/g, '_')}`;
      
      // Upload do arquivo para o Supabase Storage
      const { data, error } = await supabase.storage
        .from('audio_exercises')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true,
        });
      
      if (error) {
        throw error;
      }
      
      // Atualizar o progresso após o upload
      setProgress(100);
      
      // Obter a URL pública do arquivo
      const { data: urlData } = await supabase.storage
        .from('audio_exercises')
        .getPublicUrl(filePath);
      
      // Caminho para uso no componente de áudio
      const audioPath = `/audio/${filePath}`;
      
      setUploadSuccess(true);
      toast({
        title: "Upload concluído",
        description: "O arquivo de áudio foi carregado com sucesso",
      });
      
      // Callback para o componente pai
      if (onUploadComplete) {
        onUploadComplete(audioPath);
      }
    } catch (error) {
      console.error('Erro no upload:', error);
      setUploadError('Falha ao fazer upload do arquivo');
      toast({
        title: "Erro no upload",
        description: "Não foi possível fazer o upload do áudio",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor={`audio-upload-${exerciseId}`}>{label}</Label>
        <div className="mt-1 flex items-center gap-4">
          <Input
            id={`audio-upload-${exerciseId}`}
            type="file"
            accept="audio/*"
            onChange={handleFileChange}
            disabled={uploading}
            className="flex-1"
          />
          <Button 
            onClick={uploadAudio} 
            disabled={!file || uploading}
            variant={uploadSuccess ? "outline" : "default"}
          >
            {uploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {progress}%
              </>
            ) : uploadSuccess ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Enviado
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Enviar
              </>
            )}
          </Button>
        </div>
      </div>
      
      {uploadError && (
        <div className="text-sm text-red-500 flex items-center">
          <X className="h-4 w-4 mr-1" />
          {uploadError}
        </div>
      )}
      
      {file && !uploadError && !uploadSuccess && (
        <div className="text-sm text-muted-foreground">
          Arquivo selecionado: {file.name} ({(file.size / 1024).toFixed(2)} KB)
        </div>
      )}
    </div>
  );
}
