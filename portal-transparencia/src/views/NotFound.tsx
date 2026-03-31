import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft } from 'lucide-react';

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-gray-950 px-6 text-center">
      <div className="relative z-10 flex flex-col items-center">
        <div className="relative mb-2">
          <h1 className="text-8xl md:text-9xl font-black tracking-tighter text-gray-900 dark:text-white opacity-10 absolute -top-10 left-1/2 -translate-x-1/2 select-none">
            404
          </h1>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white relative">
            Página não encontrada
          </h2>
        </div>

        <p className="mt-4 max-w-lg text-md md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed text-balance">
          O recurso que você procura não está disponível ou foi movido. 
          Certifique-se de que o endereço está correto no <span className="font-semibold text-blue-600 dark:text-blue-400">Portal da Transparência</span>.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row w-full sm:w-auto">
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate(-1)}
            className="h-12 px-8 text-base font-semibold transition-all hover:bg-gray-50 dark:hover:bg-gray-900"
          >
            <ArrowLeft className="mr-2 size-5" />
            Retornar
          </Button>
          <Button
            size="lg"
            onClick={() => navigate('/dashboard')}
            className="h-12 px-8 text-base font-semibold bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:opacity-90 transition-opacity"
          >
            <Home className="mr-2 size-5" />
            Página Inicial
          </Button>
        </div>

        <div className="mt-16 flex items-center gap-4 text-sm font-medium text-gray-400 dark:text-gray-500 uppercase tracking-widest pointer-events-none">
          <div className="h-px w-8 bg-gray-200 dark:bg-gray-800" />
          <span>Portal da Transparência</span>
          <div className="h-px w-8 bg-gray-200 dark:bg-gray-800" />
        </div>
      </div>
    </div>
  );
}
