#!/bin/bash

# WYKILLA Website - HostEurope Deployment Script
# Dieses Skript hilft beim Deployment auf einen HostEurope VPS/Server

set -e  # Exit on error

echo "🚀 WYKILLA Website - HostEurope Deployment"
echo "=========================================="

# Farben für Output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Prüfe ob wir auf dem Server sind
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Fehler: package.json nicht gefunden. Bist du im Projektverzeichnis?${NC}"
    exit 1
fi

echo -e "${YELLOW}📦 Installiere Dependencies...${NC}"
npm install --production

echo -e "${YELLOW}🔧 Prüfe Environment Variables...${NC}"
if [ ! -f ".env.local" ]; then
    echo -e "${RED}⚠️  Warnung: .env.local nicht gefunden!${NC}"
    echo -e "${YELLOW}   Bitte erstelle .env.local mit allen benötigten Variablen.${NC}"
    read -p "   Weiter ohne .env.local? (j/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[JjYy]$ ]]; then
        exit 1
    fi
fi

echo -e "${YELLOW}🏗️  Erstelle Production Build...${NC}"
npm run build

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Build erfolgreich!${NC}"
    echo ""
    echo -e "${GREEN}📝 Nächste Schritte:${NC}"
    echo "   1. Starte die Anwendung mit: pm2 start npm --name 'wykilla-website' -- start"
    echo "   2. Oder manuell: npm start"
    echo "   3. Prüfe ob die App läuft: pm2 status"
    echo ""
else
    echo -e "${RED}❌ Build fehlgeschlagen!${NC}"
    exit 1
fi

