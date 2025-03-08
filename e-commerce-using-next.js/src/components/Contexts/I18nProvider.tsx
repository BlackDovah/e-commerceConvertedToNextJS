'use client'

import { I18nextProvider } from 'react-i18next'
import initI18next from '@/app/i18n'

export function I18nProvider({ 
  children, 
  lang 
}: { 
  children: React.ReactNode
  lang: string 
}) {
  const i18n = initI18next(lang)
  
  return (
    <I18nextProvider i18n={i18n}>
      {children}
    </I18nextProvider>
  )
}
