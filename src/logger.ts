import { Log } from './types'

export class Logger {

  public debugging: boolean
  public logs: Log[]

  /**
   * Logging interface for r-localize.
   * @param {boolean} debugging - Debug to console.
   */
  constructor (debugging: boolean) {
    this.debugging = debugging
    this.logs = []
  }

  /**
   * Fetch current time in seconds.
   * @returns {int}
   */
  get time () : number {
    return new Date().getTime()
  }

  /**
   * Format log for logstore.
   * @param {string} message - message to log.
   * @param {int} timestamp - timestamp for log.
   */
  _format (message: string, timestamp: number) {
    return `[${new Date(timestamp).toString()}]: (r-localize) "${message}"`
  }

  /**
   * Fetch logs, allows for filtering by type.
   * @param {string} type - Log type to filter by.
   * @returns {array}
   */
  $get (type: string) : Log[] {
    return this.logs.filter((log) => type ? log.type === type : true)
  }

  /**
   * Pushes provided message to log store.
   * @param {string} message - Message to log.
   */
  log (message: string) {
    const timestamp = this.time
    if (this.debugging)
      console.log(this._format(message, timestamp))
    this.logs.push({ type: 'general', message, timestamp })
  }

  /**
   * Pushes provided message to log store.
   * @param {string} message - Message to log.
   */
  warn (message: string) {
    const timestamp = this.time
    if (this.debugging)
      console.warn(this._format(message, timestamp))
    this.logs.push({ type: 'warning', message, timestamp })
  }

  /**
   * Pushes provided message to log store.
   * @param {string} message - Message to log.
   */
  error (message: string) {
    const timestamp = this.time
    if (this.debugging)
      console.error(this._format(message, timestamp))
    this.logs.push({ type: 'critical', message, timestamp })
  }

}
