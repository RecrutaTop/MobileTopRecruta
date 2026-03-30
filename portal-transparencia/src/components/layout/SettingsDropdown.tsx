import { Settings } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { AppearanceSettings } from './AppearanceSettings'

export function SettingsDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-10 w-10 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          title="Configurações"
        >
          <Settings className="h-5 w-5 text-gray-500 dark:text-gray-400" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px] rounded-2xl p-2 shadow-xl border-gray-200 dark:border-gray-800">
        <AppearanceSettings />
        {/* Futuras seções como Idioma ou Conta podem entrar aqui */}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
