declare module '*.json' {
  const value: { [key: string]: any }
  export default value
}

declare module 'next-intl' {
  export function useTranslations(namespace?: string): (key: string) => string
  export function useLocale(): string
} 