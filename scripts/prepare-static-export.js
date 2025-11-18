#!/usr/bin/env node

/**
 * Script zum Vorbereiten des Static Exports
 * Verschiebt API Routes temporär, damit sie nicht exportiert werden
 */

const fs = require('fs')
const path = require('path')

const API_DIR = path.join(__dirname, '../src/app/api')
const API_BACKUP_DIR = path.join(__dirname, '../src/app/_api_backup')

function prepareStaticExport() {
  console.log('📦 Bereite Static Export vor...')
  
  // Prüfe ob API Ordner existiert
  if (!fs.existsSync(API_DIR)) {
    console.log('✅ Keine API Routes gefunden')
    return
  }

  // Erstelle Backup-Ordner
  if (!fs.existsSync(API_BACKUP_DIR)) {
    fs.mkdirSync(API_BACKUP_DIR, { recursive: true })
  }

  // Verschiebe API Routes zu Backup
  if (fs.existsSync(API_DIR)) {
    // Kopiere statt verschieben, damit Git nicht verwirrt wird
    copyRecursiveSync(API_DIR, API_BACKUP_DIR)
    console.log('✅ API Routes gesichert')
    
    // Lösche Original (wird beim Build nicht mehr gefunden)
    fs.rmSync(API_DIR, { recursive: true, force: true })
    console.log('✅ API Routes für Static Export entfernt')
  }

  console.log('✅ Static Export vorbereitet!')
  console.log('   Führe jetzt aus: NEXT_PUBLIC_STATIC_EXPORT=true npm run build')
}

function restoreApiRoutes() {
  console.log('🔄 Stelle API Routes wieder her...')
  
  if (fs.existsSync(API_BACKUP_DIR)) {
    copyRecursiveSync(API_BACKUP_DIR, API_DIR)
    console.log('✅ API Routes wiederhergestellt')
  } else {
    console.log('⚠️  Kein Backup gefunden')
  }
}

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src)
  const stats = exists && fs.statSync(src)
  const isDirectory = exists && stats.isDirectory()

  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true })
    }
    fs.readdirSync(src).forEach(childItemName => {
      copyRecursiveSync(
        path.join(src, childItemName),
        path.join(dest, childItemName)
      )
    })
  } else {
    fs.copyFileSync(src, dest)
  }
}

// Command Line Arguments
const command = process.argv[2]

if (command === 'restore') {
  restoreApiRoutes()
} else {
  prepareStaticExport()
}

