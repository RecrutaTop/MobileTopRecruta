export interface AppError extends Error {
  friendlyMessage?: string;
  response?: {
    status: number;
    data?: {
      message?: string;
      error?: string;
    }
  };
  code?: string;
}

export const ERROR_TRANSLATIONS: Record<string, string> = {
  'validation.unique': 'Registro já está cadastrado no sistema.',
  'validation.required': 'Este campo é obrigatório.',
  'auth.failed': 'Credenciais incorretas.',
};
