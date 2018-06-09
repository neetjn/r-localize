export interface Options {
  default: string
  available: string[]
  fallbackContent?: boolean
  fallback?: string
  webStore?: boolean
  debug?: boolean
}

export interface Log {
  type: string
  message: string
  timestamp: number
}
