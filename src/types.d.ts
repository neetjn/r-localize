export interface Options {
  default: string
  locales: string[]
  fallback?: string
  webStore?: boolean
  debugging?: boolean
}

export interface Log {
  type: string
  message: string
  timestamp: number
}
