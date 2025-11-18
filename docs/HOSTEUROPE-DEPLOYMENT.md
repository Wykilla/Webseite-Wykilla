# WYKILLA Website - HostEurope Deployment Guide

## 🎯 Übersicht

Dieser Guide hilft dir dabei, die WYKILLA Next.js-Website bei HostEurope zu hosten.

**Wichtig:** Next.js benötigt Node.js. HostEurope bietet verschiedene Hosting-Optionen:

1. **VPS/Cloud Server** (empfohlen) - Volle Node.js-Unterstützung
2. **Shared Hosting** - Meist nur PHP, kein Node.js
3. **Static Export** - Alternative, wenn kein Node.js verfügbar ist

---

## 📋 Option 1: VPS/Cloud Server bei HostEurope (Empfohlen)

### Voraussetzungen

- HostEurope VPS oder Cloud Server mit:
  - Node.js 18+ installiert
  - npm oder yarn
  - SSH-Zugang
  - Mindestens 1GB RAM (2GB+ empfohlen)

### Schritt 1: Server vorbereiten

```bash
# SSH-Verbindung zum Server
ssh dein-benutzer@deine-server-ip

# Node.js Version prüfen
node --version  # Sollte 18+ sein

# Falls nicht installiert, Node.js installieren:
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# PM2 installieren (für Prozess-Management)
sudo npm install -g pm2
```

### Schritt 2: Projekt hochladen

**Option A: Git Clone (empfohlen)**

```bash
# Auf dem Server
cd /var/www  # oder dein gewünschtes Verzeichnis
git clone https://github.com/Wykilla/Webseite-Wykilla.git wykilla-website
cd wykilla-website
```

**Option B: FTP/SFTP Upload**

1. Lokal das Projekt als ZIP packen (ohne `node_modules`)
2. Via FTP/SFTP auf den Server hochladen
3. Auf dem Server entpacken

### Schritt 3: Dependencies installieren

```bash
cd wykilla-website
npm install --production
```

### Schritt 4: Environment Variables setzen

```bash
# .env.local erstellen
nano .env.local
```

Füge alle benötigten Environment Variables ein (siehe `.env.example`):

```env
NEXTAUTH_URL=https://wykilla.com
NEXTAUTH_SECRET=dein-secret-hier
NEXT_PUBLIC_SITE_URL=https://wykilla.com
# ... weitere Variablen
```

### Schritt 5: Build erstellen

```bash
npm run build
```

### Schritt 6: Mit PM2 starten

```bash
# PM2 starten
pm2 start npm --name "wykilla-website" -- start

# PM2 beim Systemstart starten
pm2 startup
pm2 save
```

### Schritt 7: Nginx Reverse Proxy einrichten

```bash
sudo nano /etc/nginx/sites-available/wykilla
```

```nginx
server {
    listen 80;
    server_name wykilla.com www.wykilla.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
# Nginx aktivieren
sudo ln -s /etc/nginx/sites-available/wykilla /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### Schritt 8: SSL-Zertifikat (Let's Encrypt)

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d wykilla.com -d www.wykilla.com
```

---

## 📋 Option 2: Static Export (für Shared Hosting)

Falls HostEurope nur Shared Hosting ohne Node.js anbietet, kannst du einen statischen Export erstellen.

### Schritt 1: next.config.mjs anpassen

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Statischen Export aktivieren
  images: {
    unoptimized: true,  // Wichtig für Static Export
  },
  // ... rest der Konfiguration
}
```

### Schritt 2: Build erstellen

```bash
npm run build
```

Dies erstellt einen `out/` Ordner mit statischen Dateien.

### Schritt 3: Upload via FTP

1. Den gesamten Inhalt des `out/` Ordners via FTP auf HostEurope hochladen
2. In das `public_html` oder `www` Verzeichnis

**Wichtig:** Static Export bedeutet:
- ❌ Keine Server-Side Rendering (SSR)
- ❌ Keine API Routes
- ❌ Keine NextAuth (muss clientseitig gelöst werden)
- ✅ Funktioniert auf jedem Webhosting

---

## 📋 Option 3: HostEurope Managed Hosting

Falls HostEurope Managed Next.js Hosting anbietet:

1. **Kontaktiere HostEurope Support** und frage nach:
   - Node.js-Version
   - Build-Prozess
   - Environment Variables Konfiguration
   - Deployment-Methode (Git, FTP, etc.)

2. **Folge deren Anleitung** für Next.js-Deployments

---

## 🔧 Nützliche Befehle

### PM2 Management

```bash
# Status prüfen
pm2 status

# Logs ansehen
pm2 logs wykilla-website

# Neustart
pm2 restart wykilla-website

# Stoppen
pm2 stop wykilla-website
```

### Updates deployen

```bash
cd /var/www/wykilla-website
git pull origin main
npm install --production
npm run build
pm2 restart wykilla-website
```

---

## ⚠️ Wichtige Hinweise

1. **Environment Variables:** Stelle sicher, dass alle `.env` Variablen auf dem Server gesetzt sind
2. **Port:** Next.js läuft standardmäßig auf Port 3000 - stelle sicher, dass dieser Port nicht blockiert ist
3. **Firewall:** Öffne Port 80 (HTTP) und 443 (HTTPS) in der Firewall
4. **Domain:** Konfiguriere DNS-Einträge bei HostEurope:
   - A-Record: `@` → Server-IP
   - A-Record: `www` → Server-IP

---

## 🆘 Troubleshooting

### Website lädt nicht

```bash
# Prüfe ob Next.js läuft
pm2 status

# Prüfe Logs
pm2 logs wykilla-website

# Prüfe Nginx
sudo nginx -t
sudo systemctl status nginx
```

### Build-Fehler

```bash
# Node.js Version prüfen
node --version

# Dependencies neu installieren
rm -rf node_modules package-lock.json
npm install
```

### Port bereits belegt

```bash
# Prüfe welcher Prozess Port 3000 nutzt
sudo lsof -i :3000

# Oder ändere Port in package.json
# "start": "next start -p 3001"
```

---

## 📞 Support

Bei Problemen:
1. Prüfe die Logs: `pm2 logs wykilla-website`
2. Kontaktiere HostEurope Support
3. Prüfe die [Next.js Deployment Docs](https://nextjs.org/docs/deployment)

---

## ✅ Checkliste

- [ ] Server mit Node.js 18+ eingerichtet
- [ ] Projekt auf Server hochgeladen
- [ ] Dependencies installiert
- [ ] Environment Variables gesetzt
- [ ] Build erfolgreich erstellt
- [ ] PM2 läuft
- [ ] Nginx konfiguriert
- [ ] SSL-Zertifikat installiert
- [ ] DNS-Einträge konfiguriert
- [ ] Website erreichbar unter Domain

