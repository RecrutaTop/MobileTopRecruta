import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Pencil, PlusCircle, Building2, Users, FileText, CircleDollarSign } from 'lucide-react';
import { orgaosService } from '@/services/orgaos';
import type { OrgaoListItem } from '@/types/orgao.types'
import { fornecedoresService } from '@/services/fornecedores';
import type { FornecedorListItem } from '@/types/fornecedores.types';
import { despesasService } from '@/services/despesas';
import type { DespesaPayload, DespesaFormModalProps } from '@/types/despesa.types';
import { toast } from 'sonner';

export function DespesaFormModal({ isOpen, onClose, onSuccess, initialData }: DespesaFormModalProps) {
  const isEditing = !!initialData
  
  const [orgaos, setOrgaos] = useState<OrgaoListItem[]>([])
  const [fornecedores, setFornecedores] = useState<FornecedorListItem[]>([])
  
  const [orgaoId, setOrgaoId] = useState<string>('')
  const [fornecedorId, setFornecedorId] = useState<string>('')
  const [descricao, setDescricao] = useState('')
  const [valor, setValor] = useState('')
  
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (isOpen) {
      orgaosService.getAll().then(setOrgaos).catch(console.error)
      fornecedoresService.getAll().then(setFornecedores).catch(console.error)

      if (initialData) {
        setOrgaoId(initialData.orgao_id.toString())
        setFornecedorId(initialData.fornecedor_id.toString())
        setDescricao(initialData.descricao)
        setValor(initialData.valor)
      } else {
        setOrgaoId('')
        setFornecedorId('')
        setDescricao('')
        setValor('')
      }
    }
  }, [isOpen, initialData])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!orgaoId || !fornecedorId || !descricao || !valor) {
      toast.error('Preencha todos os campos obrigatórios.')
      return
    }

    setIsSubmitting(true)
    
    try {
      const payload: DespesaPayload = {
        orgao_id: orgaoId,
        fornecedor_id: fornecedorId,
        descricao,
        valor
      }

      if (isEditing && initialData) {
        await despesasService.update(initialData.id, payload)
        toast.success('Despesa atualizada com sucesso!')
      } else {
        await despesasService.create(payload)
        toast.success('Despesa criada com sucesso!')
      }
      
      onSuccess()
      onClose()
    } catch (err: unknown) {
      console.error(err)
      toast.error(isEditing ? 'Erro ao atualizar despesa' : 'Erro ao criar despesa')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[440px] rounded-2xl overflow-hidden p-0 gap-0 border-x-0 border-b-0 sm:border-x sm:border-b sm:rounded-xl">
        <DialogHeader className="px-6 py-5 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800 text-left">
          <DialogTitle className="flex items-center gap-3 text-xl">
            <div className="p-2 rounded-lg">
              {isEditing 
                ? <Pencil className="w-5 h-5 text-blue-600 dark:text-blue-400" /> 
                : <PlusCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
            </div>
            {isEditing ? 'Editar Despesa' : 'Nova Despesa'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="px-6 py-6 space-y-4 bg-white dark:bg-gray-900">
          
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Órgão <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                <Building2 className="h-4 w-4 text-gray-400" />
              </div>
              <Select value={orgaoId} onValueChange={(v) => setOrgaoId(v || '')} required>
                <SelectTrigger className="pl-9 h-11 rounded-xl focus:ring-blue-500">
                  <SelectValue placeholder="Selecione o órgão" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  {orgaos.map(o => (
                    <SelectItem key={o.id} value={o.id.toString()} className="rounded-lg">{o.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Fornecedor <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                <Users className="h-4 w-4 text-gray-400" />
              </div>
              <Select value={fornecedorId} onValueChange={(v) => setFornecedorId(v || '')} required>
                <SelectTrigger className="pl-9 h-11 rounded-xl focus:ring-blue-500">
                  <SelectValue placeholder="Selecione o fornecedor" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  {fornecedores.map(f => (
                    <SelectItem key={f.id} value={f.id.toString()} className="rounded-lg">{f.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Descrição <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FileText className="h-4 w-4 text-gray-400" />
              </div>
              <Input 
                value={descricao} 
                onChange={e => setDescricao(e.target.value)} 
                placeholder="Ex: Compra de materiais" 
                className="pl-9 h-11 rounded-xl focus-visible:ring-blue-500"
                required 
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Valor (R$) <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <CircleDollarSign className="h-4 w-4 text-gray-400" />
              </div>
              <Input 
                type="number" 
                step="0.01" 
                value={valor} 
                onChange={e => setValor(e.target.value)} 
                placeholder="1000.50" 
                className="pl-9 h-11 rounded-xl focus-visible:ring-blue-500 font-mono"
                required 
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
            <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting} className="rounded-xl h-11 px-6 border-gray-200 dark:border-gray-700">
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting || !orgaoId || !fornecedorId || !descricao.trim() || !valor} className="rounded-xl h-11 px-6 shadow-md shadow-blue-500/20">
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isEditing ? 'Salvar Alterações' : 'Cadastrar'}
            </Button>
          </div>
          
        </form>
      </DialogContent>
    </Dialog>
  )
}
