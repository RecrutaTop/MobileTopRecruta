export const validationsService = {
  isValidLength(text: string, maxLength: number): boolean {
    return text.trim().length <= maxLength
  },

  validateDocument(document: string): string | undefined {
    const docDigits = document.replace(/\D/g, '')
    if (docDigits.length !== 11 && docDigits.length !== 14) {
      return 'O documento deve ser um CPF (11 dígitos) ou CNPJ (14 dígitos).'
    }
    if (/^(\d)\1+$/.test(docDigits)) {
      return 'Formato de documento inválido.'
    }
    return undefined
  },

  formatDocument(value: string): string {
    const digits = value.replace(/\D/g, '')
    if (digits.length <= 11) {
      return digits
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1')
    }
    return digits
      .replace(/(\d{2})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1/$2')
      .replace(/(\d{4})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1')
  },

  validateDocumentPartial(document: string): string | undefined {
    const digits = document.replace(/\D/g, '')
    if (digits.length > 11 && digits.length !== 14) {
      return 'Se possuir mais de 11 dígitos, deve ser um CNPJ (14 dígitos)'
    }
    if (digits.length >= 11 && /^(\d)\1+$/.test(digits)) {
      return 'Documento inválido'
    }
    return undefined
  },

  validateValue(value: string): string | undefined {
    if (value && parseFloat(value) <= 0) {
      return 'O valor deve ser maior que zero.'
    }
    if (value.replace(/[^0-9]/g, '').length > 15) {
      return 'O valor digitado é muito longo.'
    }
    return undefined
  }
};