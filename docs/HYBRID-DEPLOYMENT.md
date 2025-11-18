# WYKILLA Website - Hybrid Deployment (HostEurope + Backend Service)

## 🎯 Übersicht

Diese Anleitung zeigt, wie du:
- **Frontend** (statisch) bei HostEurope hostest
- **Backend** (API Routes) auf einem externen Service (Vercel/Railway) hostest
- Beide nahtlos zusammenarbeiten lässt

---

## 📋 Architektur

```
┌─────────────────┐         ┌──────────────────┐
│   HostEurope    │         │  Backend Service │
│   (Frontend)    │────────▶│  (Vercel/etc.)  │
│   wykilla.com   │  API    │  api.wykilla.com │
└─────────────────┘  Calls  └──────────────────┘
```

---

## 🚀 Schritt 1: Backend auf Vercel deployen

### 1.1 Vercel Account erstellen

1. Gehe zu [vercel.com](https://vercel.com)
2. Erstelle kostenlosen Account (mit GitHub)
3. Verbinde dein GitHub Repository

### 1.2 Backend-Only Deployment

**Option A: Separate Backend-Routes extrahieren**

Erstelle ein neues Repository nur für die API Routes:

```bash
# Neues Repo für Backend
mkdir wykilla-api
cd wykilla-api
npm init -y
npm install next@latest
```

**Option B: Monorepo mit separaten Deployments**

Nutze Vercel's Monorepo-Feature, um nur die API Routes zu deployen.

### 1.3 Vercel konfigurieren

Erstelle `vercel.json` im Root:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "/api/:path*"
    }
  ]
}
```

### 1.4 Environment Variables in Vercel setzen

Im Vercel Dashboard:
- Settings → Environment Variables
- Alle Backend-Variablen eintragen:
  - `NEXTAUTH_SECRET`
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `STRIPE_SECRET_KEY`
  - `OPENAI_API_KEY`
  - etc.

### 1.5 Deployen

```bash
# Via Vercel CLI
npm i -g vercel
vercel

# Oder via GitHub Integration (automatisch bei Push)
```

**Ergebnis:** Backend läuft auf z.B. `wykilla-api.vercel.app`

---

## 🎨 Schritt 2: Frontend für Static Export vorbereiten

### 2.1 next.config.mjs anpassen

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static Export aktivieren
  output: 'export',
  
  // Backend-URL als Environment Variable
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://wykilla-api.vercel.app',
  },
  
  images: {
    unoptimized: true, // Wichtig für Static Export
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
    ],
  },
  
  // ... rest der Konfiguration
}

export default nextConfig
```

### 2.2 API Calls anpassen

Alle API Calls müssen auf die externe Backend-URL zeigen:

```typescript
// lib/api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://wykilla-api.vercel.app'

export async function fetchAPI(endpoint: string, options?: RequestInit) {
  const response = await fetch(`${API_URL}/api${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  })
  return response.json()
}
```

### 2.3 Build erstellen

```bash
# Lokal testen
npm run build

# Prüfe den 'out/' Ordner
ls -la out/
```

---

## 📤 Schritt 3: Frontend zu HostEurope hochladen

### 3.1 Via FTP/SFTP

1. **FTP-Zugangsdaten finden:**
   - HostEurope Kundenportal → cPanel Login
   - cPanel → FTP Accounts

2. **FTP-Client verwenden:**
   - FileZilla (kostenlos)
   - Cyberduck
   - Oder Terminal: `sftp`

3. **Dateien hochladen:**
   ```bash
   # Via Terminal (SFTP)
   sftp dein-benutzer@ftp.hosteurope.de
   cd public_html  # oder www
   put -r out/* .
   ```

4. **Oder via FileZilla:**
   - Verbinden mit FTP-Daten
   - In `public_html` oder `www` Ordner wechseln
   - Alle Dateien aus `out/` hochladen

### 3.2 Via cPanel File Manager

1. cPanel → File Manager
2. In `public_html` navigieren
3. Alle Dateien aus `out/` hochladen (ZIP entpacken)

---

## 🔗 Schritt 4: Domain & CORS konfigurieren

### 4.1 CORS im Backend erlauben

Im Backend (Vercel), füge CORS-Header hinzu:

```typescript
// middleware.ts oder in API Routes
export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  
  response.headers.set('Access-Control-Allow-Origin', 'https://wykilla.com')
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  
  return response
}
```

### 4.2 Domain bei Vercel konfigurieren (optional)

Falls du eine Subdomain für das Backend willst:

1. Vercel Dashboard → Project → Settings → Domains
2. `api.wykilla.com` hinzufügen
3. DNS-Eintrag bei HostEurope:
   - Typ: CNAME
   - Name: `api`
   - Wert: `cname.vercel-dns.com`

---

## 🔄 Schritt 5: Environment Variables

### Frontend (HostEurope)

Erstelle `.env.local` für den Build:

```env
NEXT_PUBLIC_API_URL=https://wykilla-api.vercel.app
NEXT_PUBLIC_SITE_URL=https://wykilla.com
# Weitere PUBLIC Variablen
```

### Backend (Vercel)

Im Vercel Dashboard alle Backend-Variablen setzen (siehe Schritt 1.4)

---

## ✅ Checkliste

- [ ] Backend auf Vercel deployed
- [ ] Backend-URL bekannt (z.B. `wykilla-api.vercel.app`)
- [ ] `next.config.mjs` für Static Export angepasst
- [ ] API Calls auf externe URL umgestellt
- [ ] CORS im Backend konfiguriert
- [ ] Frontend gebaut (`npm run build`)
- [ ] `out/` Ordner zu HostEurope hochgeladen
- [ ] Domain auf HostEurope konfiguriert
- [ ] Website getestet

---

## 🧪 Testing

### Lokal testen:

```bash
# Frontend bauen
npm run build

# Statischen Server starten (simuliert HostEurope)
npx serve out

# In Browser: http://localhost:3000
# Prüfe ob API Calls funktionieren
```

### Nach Deployment:

1. Öffne `https://wykilla.com`
2. Öffne Browser DevTools → Network Tab
3. Prüfe ob API Calls zu `wykilla-api.vercel.app` gehen
4. Prüfe ob keine CORS-Fehler auftreten

---

## 🔧 Alternative Backend-Services

### Railway (railway.app)
- Ähnlich wie Vercel
- $5/Monat für kleine Projekte
- Einfaches Deployment

### Render (render.com)
- Kostenloser Tier verfügbar
- Automatisches Deployment
- Ähnlich wie Vercel

### Fly.io (fly.io)
- Kostenloser Tier
- Globale Edge-Netzwerke
- Docker-basiert

---

## 💡 Vorteile dieser Lösung

✅ **Frontend bei HostEurope** - Deine Domain bleibt dort  
✅ **Backend skalierbar** - Vercel skaliert automatisch  
✅ **Kostenoptimiert** - Frontend günstig, Backend kostenlos/kleine Kosten  
✅ **Flexibel** - Backend kann später gewechselt werden  
✅ **Schnell** - CDN für Frontend, Edge für Backend  

---

## 🆘 Troubleshooting

### CORS-Fehler

```
Access to fetch at 'https://api...' from origin 'https://wykilla.com' has been blocked by CORS policy
```

**Lösung:** CORS-Header im Backend hinzufügen (siehe Schritt 4.1)

### API Calls funktionieren nicht

**Prüfe:**
1. Ist `NEXT_PUBLIC_API_URL` korrekt gesetzt?
2. Läuft das Backend auf Vercel?
3. Sind Environment Variables im Backend gesetzt?

### 404 bei Navigation

**Lösung:** `.htaccess` für Next.js Routing:

```apache
# .htaccess in public_html
RewriteEngine On
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

---

## 📞 Nächste Schritte

1. **Backend auf Vercel deployen**
2. **Frontend für Static Export anpassen**
3. **Lokal testen**
4. **Zu HostEurope hochladen**
5. **Live testen**

Brauchst du Hilfe bei einem bestimmten Schritt?

