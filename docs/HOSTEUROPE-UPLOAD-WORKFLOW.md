# HostEurope Upload Workflow - Schritt für Schritt

## 🎯 Übersicht

Dieser Workflow zeigt dir, wie du:
1. ✅ Die alte Website sicherst
2. ✅ Die alte Website entfernst
3. ✅ Die neue WYKILLA-Website hochlädst

---

## 📋 Schritt 1: Alte Website sichern (Backup)

### Via cPanel File Manager:

1. **HostEurope Kundenportal öffnen**
   - Login → cPanel Login

2. **File Manager öffnen**
   - cPanel → File Manager

3. **In `public_html` navigieren**
   - Das ist dein Web-Root-Verzeichnis

4. **Alte Website als ZIP sichern:**
   - Alle Dateien in `public_html` markieren (Strg+A / Cmd+A)
   - Rechtsklick → "Compress"
   - Format: ZIP
   - Name: `backup-alte-website-YYYY-MM-DD.zip`
   - Klicke "Compress Files"

5. **ZIP herunterladen:**
   - Rechtsklick auf die ZIP-Datei → "Download"
   - Speichere sie lokal als Backup

### Alternative: Via FTP (FileZilla)

1. **FileZilla öffnen**
2. **Mit HostEurope verbinden**
3. **In `public_html` navigieren**
4. **Alle Dateien lokal herunterladen:**
   - Alle Dateien markieren
   - Rechtsklick → "Download"
   - Speichere in einem Backup-Ordner

---

## 📋 Schritt 2: Alte Website entfernen

### Via cPanel File Manager:

1. **In `public_html` navigieren**
2. **Alle Dateien markieren** (Strg+A / Cmd+A)
3. **Löschen:**
   - Rechtsklick → "Delete"
   - Oder: Markieren → "Delete" Button oben
4. **Bestätigen:** "Delete Files"

**⚠️ WICHTIG:** 
- Prüfe vorher, ob das Backup erfolgreich war!
- Falls `.htaccess` vorhanden ist, merke dir die Einstellungen (falls wichtig)

### Alternative: Via FTP

1. **FileZilla → `public_html`**
2. **Alle Dateien markieren**
3. **Rechtsklick → "Delete"**

---

## 📋 Schritt 3: Neue WYKILLA-Website hochladen

### Methode A: cPanel File Manager (EMPFOHLEN) ⭐

**Vorteile:**
- ✅ Keine zusätzliche Software nötig
- ✅ Einfach und schnell
- ✅ ZIP kann direkt entpackt werden

**Schritte:**

1. **In `public_html` navigieren** (sollte jetzt leer sein)

2. **ZIP hochladen:**
   - Klicke "Upload" Button oben
   - Wähle `wykilla-website-upload.zip`
   - Warte bis Upload fertig ist

3. **ZIP entpacken:**
   - Rechtsklick auf `wykilla-website-upload.zip`
   - "Extract" oder "Extract Files"
   - Wähle `public_html` als Ziel
   - Klicke "Extract Files"

4. **Struktur prüfen:**
   - Du solltest sehen:
     ```
     public_html/
       ├── .htaccess
       ├── index.html
       ├── _next/
       ├── images/
       └── ...
     ```

5. **ZIP-Datei löschen** (optional):
   - Rechtsklick auf `wykilla-website-upload.zip` → Delete

6. **`.htaccess` prüfen:**
   - Falls nicht sichtbar: "Show Hidden Files" aktivieren
   - Prüfe ob `.htaccess` vorhanden ist

### Methode B: Via FTP (FileZilla)

**Vorteile:**
- ✅ Schneller bei vielen Dateien
- ✅ Mehr Kontrolle

**Schritte:**

1. **FileZilla öffnen**
2. **Mit HostEurope verbinden**
3. **In `public_html` navigieren**

4. **Lokal ZIP entpacken:**
   ```bash
   cd /Users/rainerwetenkamp/Desktop/Cursor/Webseite
   unzip wykilla-website-upload.zip -d upload-ready/
   ```

5. **Alle Dateien hochladen:**
   - In FileZilla: Lokal → `upload-ready/out/` Ordner
   - Remote: `public_html`
   - Alle Dateien markieren → Drag & Drop

6. **`.htaccess` hochladen:**
   - Lokal: `.htaccess` aus Projekt-Root
   - Remote: `public_html`
   - Hochladen

---

## 📋 Schritt 4: Website testen

1. **Domain im Browser öffnen:**
   - z.B. `https://deine-domain.de`
   - Oder Test-Domain von HostEurope

2. **Prüfe:**
   - ✅ Website lädt
   - ✅ Navigation funktioniert
   - ✅ Alle Sections sind sichtbar
   - ✅ Keine 404-Fehler

3. **Mobile Test:**
   - Auf echtem Handy öffnen
   - Prüfe alle Sections
   - Teste Navigation

---

## 🔧 Troubleshooting

### Website zeigt 404 oder "Index of"

**Problem:** `.htaccess` fehlt oder funktioniert nicht

**Lösung:**
1. Prüfe ob `.htaccess` in `public_html` ist
2. Falls nicht sichtbar: "Show Hidden Files" aktivieren
3. Prüfe ob `.htaccess` korrekt ist

### Alte Website noch sichtbar

**Problem:** Browser Cache oder Dateien nicht gelöscht

**Lösung:**
1. Hard Refresh: Cmd+Shift+R (Mac) / Ctrl+Shift+R (Windows)
2. Prüfe ob wirklich alle Dateien gelöscht wurden
3. Prüfe ob neue Dateien hochgeladen wurden

### Bilder laden nicht

**Problem:** Pfade sind falsch

**Lösung:**
1. Prüfe Browser Console (F12) auf 404-Fehler
2. Stelle sicher, dass `_next/static/` Ordner vollständig hochgeladen wurde
3. Prüfe ob `images/` Ordner vorhanden ist

---

## ✅ Checkliste

### Vor dem Upload:
- [ ] Backup der alten Website erstellt
- [ ] Backup lokal gespeichert
- [ ] Alte Website aus `public_html` entfernt
- [ ] `wykilla-website-upload.zip` bereit

### Upload:
- [ ] ZIP zu HostEurope hochgeladen
- [ ] ZIP entpackt
- [ ] `.htaccess` vorhanden und sichtbar
- [ ] `index.html` in `public_html`
- [ ] Alle Ordner (`_next/`, `images/`) vorhanden

### Nach dem Upload:
- [ ] Website im Browser getestet
- [ ] Navigation funktioniert
- [ ] Mobile getestet
- [ ] Keine Fehler in Browser Console

---

## 🎯 Empfehlung

**Ich empfehle: cPanel File Manager** ⭐

**Warum?**
- ✅ Keine zusätzliche Software
- ✅ Alles im Browser
- ✅ ZIP kann direkt entpackt werden
- ✅ Einfach und schnell

**Falls du viele Dateien hast oder es schneller gehen soll:**
- Nutze FileZilla (Methode B)

---

## 📞 Nächste Schritte

1. **Jetzt:** Alte Website sichern
2. **Dann:** Alte Website löschen
3. **Dann:** Neue Website hochladen
4. **Dann:** Testen!

Viel Erfolg! 🚀

