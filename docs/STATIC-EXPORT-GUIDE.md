# WYKILLA Website - Static Export für HostEurope

## 🎯 Ziel

Diese Anleitung zeigt dir, wie du die WYKILLA-Website als statischen Export bei HostEurope hostest.

**Was funktioniert:**
- ✅ Alle Seiten und Navigation
- ✅ Animationen und Interaktivität
- ✅ Responsive Design (Mobile, Tablet, Desktop)
- ✅ Alle visuellen Effekte

**Was funktioniert NICHT (noch nicht implementiert):**
- ❌ Login/Signup (braucht Backend)
- ❌ AI Tools (brauchen Backend)
- ❌ Newsletter (braucht Backend)
- ❌ Stripe Payments (braucht Backend)

---

## 📋 Schritt 1: Environment Variable setzen

Erstelle oder bearbeite `.env.local`:

```bash
# Static Export aktivieren
NEXT_PUBLIC_STATIC_EXPORT=true

# Site URL (später deine Domain)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

## 📋 Schritt 2: Build erstellen

```bash
# Im Projektverzeichnis
cd /Users/rainerwetenkamp/Desktop/Cursor/Webseite

# Dependencies installieren (falls noch nicht geschehen)
npm install

# Build erstellen
NEXT_PUBLIC_STATIC_EXPORT=true npm run build
```

**Ergebnis:** Ein `out/` Ordner wird erstellt mit allen statischen Dateien.

---

## 📋 Schritt 3: Build testen (lokal)

```bash
# Statischen Server starten
npx serve out

# Oder mit Python
cd out
python3 -m http.server 8000
```

Öffne im Browser: `http://localhost:3000` (oder `http://localhost:8000`)

**Prüfe:**
- ✅ Navigation funktioniert
- ✅ Alle Sections sind sichtbar
- ✅ Responsive auf Mobile (Browser DevTools → Mobile View)
- ✅ Animationen laufen

---

## 📋 Schritt 4: Zu HostEurope hochladen

### Option A: Via FTP (FileZilla)

1. **FTP-Zugangsdaten finden:**
   - HostEurope Kundenportal → cPanel Login
   - cPanel → FTP Accounts
   - Notiere: Host, Benutzername, Passwort

2. **FileZilla öffnen:**
   - Download: [filezilla-project.org](https://filezilla-project.org)
   - Verbinden mit FTP-Daten
   - Navigiere zu `public_html` (oder `www`)

3. **Dateien hochladen:**
   - Alle Dateien aus dem `out/` Ordner
   - WICHTIG: Auch die `.htaccess` Datei hochladen
   - Struktur sollte so aussehen:
     ```
     public_html/
       ├── .htaccess
       ├── index.html
       ├── _next/
       ├── images/
       └── ...
     ```

### Option B: Via cPanel File Manager

1. **cPanel öffnen:**
   - HostEurope Kundenportal → cPanel Login

2. **File Manager öffnen:**
   - cPanel → File Manager
   - Navigiere zu `public_html`

3. **Upload:**
   - Klicke "Upload"
   - Lade alle Dateien aus `out/` hoch
   - **WICHTIG:** `.htaccess` muss auch hochgeladen werden
   - Falls `.htaccess` nicht sichtbar ist: "Show Hidden Files" aktivieren

---

## 📋 Schritt 5: Domain konfigurieren

1. **Im HostEurope Kundenportal:**
   - Produktverwaltung → cPanel Webhosting
   - Vertragsdetails → Domain verwalten

2. **Domain zuweisen:**
   - Falls noch keine Domain zugewiesen: Domain hinzufügen
   - Oder bestehende Domain nutzen

3. **DNS prüfen (falls externe Domain):**
   - A-Record auf HostEurope Server-IP zeigen lassen
   - Oder Nameserver auf HostEurope setzen

---

## 📋 Schritt 6: Website testen

1. **Öffne deine Domain im Browser:**
   - z.B. `https://wykilla.com` oder deine Test-Domain

2. **Prüfe:**
   - ✅ Website lädt
   - ✅ Navigation funktioniert
   - ✅ Alle Sections sind sichtbar
   - ✅ Mobile Ansicht (auf echtem Handy testen!)

3. **Mobile Test:**
   - Öffne auf deinem Handy
   - Prüfe alle Sections
   - Teste Navigation
   - Prüfe ob Animationen laufen

---

## 🔧 Troubleshooting

### Website zeigt 404 oder "Index of"

**Problem:** `.htaccess` fehlt oder funktioniert nicht

**Lösung:**
1. Prüfe ob `.htaccess` in `public_html` ist
2. Prüfe ob `.htaccess` korrekt ist (siehe Datei im Projekt)
3. In cPanel: File Manager → `.htaccess` → Edit prüfen

### Bilder laden nicht

**Problem:** Pfade sind falsch

**Lösung:**
- Prüfe ob alle Dateien aus `out/` hochgeladen wurden
- Prüfe Browser Console auf 404-Fehler
- Stelle sicher, dass `_next/static/` Ordner vollständig hochgeladen wurde

### Navigation funktioniert nicht

**Problem:** Routing funktioniert nicht

**Lösung:**
- Prüfe `.htaccess` (muss Rewrite Rules enthalten)
- Prüfe ob `index.html` in `public_html` ist
- Prüfe Browser Console auf Fehler

### Mobile sieht komisch aus

**Problem:** Viewport Meta Tag fehlt

**Lösung:**
- Prüfe ob `index.html` das Viewport Meta Tag hat:
  ```html
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  ```
- Sollte automatisch von Next.js generiert werden

---

## ✅ Checkliste

- [ ] `.env.local` mit `NEXT_PUBLIC_STATIC_EXPORT=true` erstellt
- [ ] Build erfolgreich erstellt (`npm run build`)
- [ ] `out/` Ordner existiert
- [ ] Lokal getestet (`npx serve out`)
- [ ] FTP-Zugangsdaten von HostEurope
- [ ] Alle Dateien aus `out/` hochgeladen
- [ ] `.htaccess` hochgeladen
- [ ] Domain konfiguriert
- [ ] Website online erreichbar
- [ ] Mobile getestet

---

## 🎨 Nächste Schritte (später)

Wenn du später Backend-Features hinzufügen willst:

1. **Backend auf Vercel/Railway deployen**
2. **`NEXT_PUBLIC_API_URL` setzen**
3. **Static Export deaktivieren** (`NEXT_PUBLIC_STATIC_EXPORT=false`)
4. **Oder Hybrid-Lösung** (siehe `HYBRID-DEPLOYMENT.md`)

---

## 📞 Hilfe

Bei Problemen:
1. Prüfe Browser Console (F12) auf Fehler
2. Prüfe HostEurope Logs (cPanel → Error Logs)
3. Prüfe ob alle Dateien hochgeladen wurden

Viel Erfolg! 🚀

