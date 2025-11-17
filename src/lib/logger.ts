/**
 * Simple logging utility for the application
 */

type LogLevel = 'info' | 'warn' | 'error' | 'debug'

interface LogEntry {
  level: LogLevel
  message: string
  timestamp: string
  context?: Record<string, any>
  stack?: string
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development'

  private formatMessage(entry: LogEntry): string {
    const { level, message, timestamp, context } = entry
    let formatted = `[${timestamp}] [${level.toUpperCase()}] ${message}`

    if (context && Object.keys(context).length > 0) {
      formatted += `\nContext: ${JSON.stringify(context, null, 2)}`
    }

    if (entry.stack) {
      formatted += `\nStack: ${entry.stack}`
    }

    return formatted
  }

  private log(level: LogLevel, message: string, context?: Record<string, any>, error?: Error) {
    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      context,
      stack: error?.stack,
    }

    const formatted = this.formatMessage(entry)

    // In production, you might want to send this to a logging service
    // For now, we'll use console
    switch (level) {
      case 'error':
        console.error(formatted)
        break
      case 'warn':
        console.warn(formatted)
        break
      case 'debug':
        if (this.isDevelopment) {
          console.debug(formatted)
        }
        break
      default:
        console.log(formatted)
    }

    // TODO: Send to external logging service (e.g., Sentry, LogRocket)
    // if (level === 'error' && !this.isDevelopment) {
    //   sendToLoggingService(entry)
    // }
  }

  info(message: string, context?: Record<string, any>) {
    this.log('info', message, context)
  }

  warn(message: string, context?: Record<string, any>) {
    this.log('warn', message, context)
  }

  error(message: string, error?: Error, context?: Record<string, any>) {
    this.log('error', message, context, error)
  }

  debug(message: string, context?: Record<string, any>) {
    this.log('debug', message, context)
  }
}

export const logger = new Logger()
