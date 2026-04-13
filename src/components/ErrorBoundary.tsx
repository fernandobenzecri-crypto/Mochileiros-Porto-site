import React from "react";
import { AlertCircle, RefreshCw, Home } from "lucide-react";

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-brand-gray flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-[40px] p-12 shadow-3xl text-center space-y-8">
            <div className="w-20 h-20 bg-red-100 text-red-600 rounded-3xl flex items-center justify-center mx-auto">
              <AlertCircle size={40} />
            </div>
            
            <div className="space-y-4">
              <h2 className="text-3xl font-display font-black text-brand-dark uppercase tracking-tighter">Ops! Algo deu errado</h2>
              <p className="text-gray-500 font-medium">
                Ocorreu um erro inesperado. Nossa equipe técnica já foi notificada.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <button 
                onClick={() => window.location.reload()}
                className="w-full py-5 bg-brand-navy text-white rounded-full font-display font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-brand-dark transition-all"
              >
                <RefreshCw size={16} /> RECARREGAR PÁGINA
              </button>
              
              <a 
                href="/"
                className="w-full py-5 bg-brand-gray text-brand-dark rounded-full font-display font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-gray-200 transition-all"
              >
                <Home size={16} /> VOLTAR PARA HOME
              </a>
            </div>

            { (import.meta as any).env.DEV && (
              <div className="mt-8 p-4 bg-red-50 rounded-2xl text-left overflow-auto max-h-40">
                <p className="text-[10px] font-mono text-red-800 whitespace-pre-wrap">
                  {this.state.error?.stack}
                </p>
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
