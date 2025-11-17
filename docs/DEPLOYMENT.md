# WYKILLA - Deployment Guide

## 🚀 Vercel Deployment

### 1. Vercel Projekt erstellen

**Option A: Über Vercel Dashboard**
1. Gehe zu [vercel.com](https://vercel.com)
2. Klicke auf "New Project"
3. Importiere das GitHub Repository
4. Framework Preset: **Next.js**
5. Root Directory: `./`
6. Build Command: `npm run build`
7. Output Directory: `.next`

**Option B: Über Vercel CLI**
```bash
npm i -g vercel
vercel
```

---

### 2. Environment Variables konfigurieren

Im Vercel Dashboard unter **Settings > Environment Variables**:

#### Required (Alle Environments: Production, Preview, Development)

```bash
# Next.js
NEXT_PUBLIC_SITE_URL=https://wykilla.com

# NextAuth.js
NEXTAUTH_URL=https://wykilla.com
NEXTAUTH_SECRET=<generiere-random-string>

# Supabase
NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=<your-publishable-key>
STRIPE_SECRET_KEY=<your-secret-key>
STRIPE_WEBHOOK_SECRET=<your-webhook-secret>

# OpenAI (für AI Tools)
OPENAI_API_KEY=<your-openai-key>

# Resend (Email)
RESEND_API_KEY=<your-resend-key>
```

#### Optional (nur wenn verwendet)

```bash
# Google OAuth
GOOGLE_CLIENT_ID=<your-client-id>
GOOGLE_CLIENT_SECRET=<your-client-secret>

# Analytics (optional)
NEXT_PUBLIC_GA_MEASUREMENT_ID=<google-analytics-id>
```

---

### 3. Branch Protection

**Production Branch:** `main` oder `master`
- Auto-Deploy bei Push
- Production Environment Variables

**Preview Branches:**
- Alle Feature-Branches (inkl. `claude/...`)
- Preview Environment Variables

---

### 4. Build Settings

**In Vercel Dashboard:**

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install",
  "devCommand": "npm run dev"
}
```

**Framework:** Next.js 15
**Node Version:** 20.x (automatisch erkannt)

---

### 5. Domain Setup

**Primäre Domain:** `wykilla.com`

1. Vercel Dashboard > Domains
2. Domain hinzufügen: `wykilla.com`
3. DNS konfigurieren (A-Record oder CNAME)
4. SSL automatisch via Vercel

**Subdomains (optional):**
- `beta.wykilla.com` → Preview-Branch
- `staging.wykilla.com` → Staging-Branch

---

### 6. Performance-Optimierung

**Vercel Analytics** (optional):
```bash
npm install @vercel/analytics
```

In `src/app/layout.tsx`:
```typescript
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

**Vercel Speed Insights** (optional):
```bash
npm install @vercel/speed-insights
```

---

### 7. Webhook-Setup für Stripe

Nach Deployment:

1. Kopiere die Deployment-URL (z.B. `https://wykilla.vercel.app`)
2. Gehe zu Stripe Dashboard > Webhooks
3. Erstelle neuen Webhook-Endpoint:
   - URL: `https://wykilla.com/api/subscription/webhook`
   - Events:
     - `checkout.session.completed`
     - `customer.subscription.updated`
     - `customer.subscription.deleted`
4. Kopiere Webhook-Secret und füge zu Environment Variables hinzu

---

### 8. Post-Deployment Checks

Nach erstem Deployment:

- [ ] Website erreichbar unter Production-URL
- [ ] SSL-Zertifikat aktiv (HTTPS)
- [ ] Environment Variables gesetzt
- [ ] Dev-Server läuft lokal
- [ ] TypeScript kompiliert
- [ ] Build erfolgreich
- [ ] Alle Assets laden korrekt
- [ ] Navigation funktioniert
- [ ] Smooth Scrolling aktiv
- [ ] Responsive auf Mobile/Tablet

---

### 9. Monitoring & Logs

**Vercel Dashboard:**
- Deployment Logs: Fehler bei Build/Deploy
- Runtime Logs: Fehler in Production
- Analytics: Traffic, Performance

**Externe Tools (optional):**
- Sentry für Error Tracking
- LogRocket für Session Replay
- Mixpanel/Plausible für Analytics

---

### 10. Rollback-Strategie

**Bei Problemen:**

1. Vercel Dashboard > Deployments
2. Finde letztes funktionierendes Deployment
3. Klicke auf "..." > "Promote to Production"

**Oder via CLI:**
```bash
vercel rollback
```

---

## 🔧 Troubleshooting

### Build Failed
```
Error: Module not found
```
→ Prüfe `package.json` dependencies, `npm install` lokal

### Environment Variables nicht gesetzt
```
Error: NEXT_PUBLIC_SUPABASE_URL is not defined
```
→ Vercel Dashboard > Settings > Environment Variables

### Stripe Webhook funktioniert nicht
→ Prüfe Webhook-URL in Stripe Dashboard
→ Prüfe `STRIPE_WEBHOOK_SECRET` in Environment Variables

### Fonts laden nicht
→ Normale Vercel-Deployments haben Internetzugang (im Gegensatz zur Sandbox)

---

## 📊 Performance-Ziele

**Lighthouse Score (Production):**
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100

**Core Web Vitals:**
- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1

---

## 🎯 Next Steps nach Deployment

1. **Custom Domain verbinden** (wykilla.com)
2. **Supabase Database migrieren** (SQL-Schema ausführen)
3. **Stripe Products erstellen** (Starter, Pro, Studio Plans)
4. **Content ersetzen** (Placeholder → echte Inhalte)
5. **Testing durchführen** (E2E, Unit, Visual)
6. **Performance optimieren** (Lighthouse)
7. **SEO optimieren** (Sitemap, Robots.txt, Meta-Tags)
8. **Launch!** 🚀
