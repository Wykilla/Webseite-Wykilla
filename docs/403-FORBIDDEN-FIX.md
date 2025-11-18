# 403 Forbidden Fehler beheben

## 🔍 Problem

Nach dem Upload zeigt die Website einen "403 Forbidden" Fehler.

## ✅ Lösung

### Problem 1: Dateien sind im falschen Ordner

**Symptom:** Dateien wurden in `out/` Ordner entpackt statt direkt in `public_html`

**Lösung:**
1. Im File Manager zu `public_html` navigieren
2. Prüfe ob du einen `out/` Ordner siehst
3. Falls ja:
   - In `out/` Ordner gehen
   - Alle Dateien markieren
   - "Verschieben" klicken
   - Ziel: `public_html`
   - Verschieben

**Oder:**
- Alle Dateien aus `out/` in `public_html` kopieren
- Dann `out/` Ordner löschen

### Problem 2: index.html fehlt oder ist nicht sichtbar

**Lösung:**
1. Prüfe ob `index.html` direkt in `public_html` liegt
2. Falls nicht: Aus `out/` Ordner nach `public_html` verschieben

### Problem 3: .htaccess fehlt

**Lösung:**
1. Einstellungen → "Versteckte Dateien anzeigen" aktivieren
2. Prüfe ob `.htaccess` vorhanden ist
3. Falls nicht: `.htaccess` aus dem Projekt hochladen

### Problem 4: Dateiberechtigungen

**Lösung:**
1. Alle Dateien markieren
2. "Berechtigungen" klicken
3. Setze:
   - Ordner: `755`
   - Dateien: `644`
   - `index.html`: `644`

## 🎯 Richtige Struktur

Die Struktur sollte so aussehen:

```
public_html/
  ├── .htaccess
  ├── index.html
  ├── 404.html
  ├── dashboard.html
  ├── login.html
  ├── signup.html
  ├── pricing.html
  ├── favicon.svg
  ├── og_image.jpg
  ├── _next/
  │   └── static/
  │       └── ...
  └── images/
      └── ...
```

**WICHTIG:** `index.html` muss direkt in `public_html` liegen, nicht in einem Unterordner!

