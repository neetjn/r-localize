export interface Log {
  type: string
  message: string
  timestamp: number
}

export interface Locale {
  locale: string
  orientation?: string
  fontFamily?: string
}

export interface Options {
  default: string
  available: Locale[]
  fallbackContent?: boolean
  fallback?: string
  webStore?: boolean
  debug?: boolean
}

