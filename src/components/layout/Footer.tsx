
import { Music } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container py-8 md:py-12">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Music className="h-6 w-6 text-music-600" />
              <span className="text-xl font-bold">
                <span className="gradient-text">Música de Ouvido</span>
                <span className="text-accent">.IA</span>
              </span>
            </div>
            <p className="text-muted-foreground text-sm">
              Treine seus ouvidos e aprenda a tirar músicas com ajuda da IA.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Plataforma</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/treinamento"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Treinamento
                  </Link>
                </li>
                <li>
                  <Link
                    to="/analise"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Análise
                  </Link>
                </li>
                <li>
                  <Link
                    to="/progresso"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Progresso
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Assinatura</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/planos"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Planos
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Benefícios Premium
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Teste Grátis
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Termos de Uso
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Política de Privacidade
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t">
          <p className="text-sm text-muted-foreground text-center">
            © {new Date().getFullYear()} Música de Ouvido.IA - Todos os direitos reservados
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
