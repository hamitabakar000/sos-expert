# SOS Expert

Plateforme PFE de mise en relation experts-clients avec IA neuro-symbolique, consultations temps reel et crowdsourcing structure.

## Stack cible

- Next.js 14 App Router + TypeScript strict
- Tailwind CSS avec design system SOS Expert
- Supabase Auth, PostgreSQL, Realtime et Storage
- Anthropic pour le matching IA cote serveur
- Stripe en mode test pour le paiement

## Demarrage

```bash
npm install
npm run dev -- -p 3000
```

Copier `.env.example` vers `.env.local` puis renseigner les cles Supabase, Anthropic et Stripe quand les integrations reelles seront branchees.

Les scripts Next separent maintenant les dossiers generes :

- `npm run dev` utilise `.next-dev` et le nettoie au demarrage.
- `npm run build` utilise `.next-build`.
- `npm run start` sert le build de `.next-build`.
- `npm run clean` supprime les anciens dossiers `.next`, `.next-dev` et `.next-build`.

Si une ancienne instance du serveur tourne encore, l'arreter puis relancer `npm run dev -- -p 3000`.

## Routes disponibles

- `/` : landing page
- `/auth/login` : connexion demo client, expert ou admin
- `/auth/register` : inscription demo client ou expert
- `/dashboard` : tableau de bord client de demonstration
- `/missions/new` : formulaire de creation de mission
- `/missions/mis-001` : recommandations IA pour une mission
- `/missions/mis-001/crowdsource` : suivi crowdsourcing par Lots
- `/experts` : recherche experts
- `/experts/exp-002` : profil expert detaille
- `/consultations/con-002` : interface consultation chat/video/audio
- `/consultations/con-002/payment` : paiement demo
- `/consultations/con-002/review` : avis post-consultation
- `/lots/lot-001` : livraison de Lot pour expert
- `/earnings` : revenus expert
- `/notifications` : centre de notifications
- `/settings/profile`, `/settings/preferences`, `/settings/expert-profile`, `/settings/availability`, `/settings/certifications`, `/settings/security`
- `/admin` : back-office demo
- `/admin/experts/pending`, `/admin/users`, `/admin/consultations`, `/admin/crowdsourcing`, `/admin/reviews`, `/admin/notifications`, `/admin/analytics`
- `/api/ai/match` : endpoint local de matching demonstratif

## Comptes demo

- Client : `client@sosexpert.ma`
- Expert : `expert@sosexpert.ma`
- Admin : `admin@sosexpert.ma`

La connexion est simulee par cookie (`sos_demo_user`) pour faciliter la soutenance et les tests locaux.

## Etat actuel

Ce premier increment met en place le socle applicatif et des donnees de demonstration. Le schema Supabase initial est dans `supabase/migrations/0001_initial_schema.sql`; l'interface consomme encore `lib/demo-data.ts` pour avancer rapidement sur les parcours PFE avant de connecter les vraies tables.
