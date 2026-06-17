# SOS Expert — Complete Project Specification
> **Adapted from:** SOS Helper Spec v1.1  
> **Version:** 2.0 — Full Coverage  
> **Date:** June 2026  
> **Project:** PFE — FST Tanger, Université Abdelmalek Essaadi  
> **Authors:** Mehdi Abdenebi & Hamit Abakar Moussa  
> **Supervisor:** M. Ilias  
> **Company:** SMART AUTOMATION TECHNOLOGIES  

---

## PART 1: Overview & Functional Requirements

### 1.1 Project Vision

SOS Expert is an intelligent multi-domain platform connecting clients who need professional expertise with certified experts. Unlike traditional directories or simple booking platforms, SOS Expert introduces two core innovations:

1. **Neuro-Symbolic AI Matching:** A hybrid AI engine combining an LLM for semantic understanding with a symbolic rule engine for constraint verification, producing explainable, reliable expert recommendations.

2. **Structured Crowdsourcing:** For complex missions, an AI agent automatically decomposes the work into independent sub-tasks (Lots), distributes them in parallel to a swarm of experts (Essaim), then consolidates all contributions into a unified final deliverable — drastically reducing delivery time.

**Two consultation modes:**
- **Simple Mission → Immediate Consultation:** Real-time chat, video, or audio session with a single expert.
- **Simple Mission → Scheduled Appointment:** Pre-booked consultation at a chosen date/time.
- **Complex Mission → Crowdsourcing Session:** AI-orchestrated parallel work across multiple experts.

**Project Context:** PFE demonstration. The platform is not commercially launched. Architecture prioritizes demonstrating AI-powered matching, WebRTC consultations, and crowdsourcing orchestration.

**Domains covered:** All professional domains — legal, medical/health, financial, IT & cybersecurity, coaching, education, architecture & engineering, HR, marketing, and others.

---

### 1.2 User Roles & Account Management

#### 1.2.1 Three-Role Architecture

| Role | Access | Registration |
|------|--------|-------------|
| **Client** | Posts missions, receives AI recommendations, books consultations, pays, reviews experts | Public self-registration |
| **Expert** | Submits certification dossier, accepts consultations, delivers Lot work, manages availability | Public self-registration → admin validation required |
| **Admin** | Validates experts, manages accounts, handles disputes, monitors analytics | Created directly in database — no public registration |

#### 1.2.2 Authentication System

- Email + password registration with unique email constraint.
- Password recovery via email reset link (Supabase Auth).
- JWT sessions, auto-refresh.
- Role stored in `profiles.role` enum: `client` | `expert` | `admin`.
- At signup: user selects role (client or expert). Admin role is not selectable.
- After registration:
  - **Client:** Redirected to preference onboarding (budget, personality, confidentiality).
  - **Expert:** Redirected to professional profile + certification document upload.
- **Profile Visibility:** 
  - Expert profiles are public to all authenticated users only if `validation_status = validated`.
  - Client profiles are visible only to experts they have an active or past consultation with.
  - Admin profiles are never publicly visible.
- **Account Deletion:** Soft delete (`is_deleted = true`). Identifying fields nullified (`first_name`, `last_name`, `profile_photo_url`). All past reviews and consultation records remain but attributed to "Utilisateur supprimé" or "Expert supprimé". Email is freed for reuse.

#### 1.2.3 Client Profile Fields

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| first_name | text | Yes | |
| last_name | text | Yes | |
| email | text | Yes | Unique |
| profile_photo_url | text | No | Supabase Storage |
| budget_preference | enum | Yes | `low` / `medium` / `high` — used by AI engine |
| personality_tags | text[] | Yes | Multi-select from predefined list (analytical, pragmatic, empathetic, methodical, creative) |
| confidentiality_preference | enum | Yes | `standard` / `strict` |
| preferred_language | text | Yes | fr / ar / en |
| city | text | No | Used for local expert preference |
| is_deleted | boolean | — | Soft delete flag |

#### 1.2.4 Expert Profile Fields

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| first_name | text | Yes | |
| last_name | text | Yes | |
| email | text | Yes | Unique |
| profile_photo_url | text | No | |
| bio | text | Yes | Min 100 chars |
| domains | text[] | Yes | Multi-select from domain taxonomy |
| certifications | jsonb | Yes | [{name, file_url, issued_by, year}] |
| hourly_rate | decimal | Yes | In MAD |
| flat_rate | decimal | No | Optional flat rate offer |
| availability | jsonb | Yes | Weekly schedule {mon: [{start, end}], tue: [...], ...} |
| is_available_immediately | boolean | Yes | Online/offline toggle |
| languages | text[] | Yes | |
| city | text | Yes | |
| validation_status | enum | — | `pending` / `validated` / `suspended` / `rejected` |
| validation_notes | text | — | Admin notes (reason for rejection/suspension) |
| average_rating | decimal | — | Calculated field |
| total_reviews | integer | — | Calculated field |
| total_consultations | integer | — | Calculated field |
| is_deleted | boolean | — | Soft delete flag |

**Experts are invisible on the platform until `validation_status = validated`.**

#### 1.2.5 Dashboards

**Client Dashboard (`/dashboard`):**
- Summary cards: Active consultations, Pending missions, Completed this month
- Active consultations list (with quick-join button for ongoing sessions)
- Pending missions awaiting recommendations
- Active crowdsourcing sessions with progress bars per Lot
- Recent notifications (last 5)
- Quick action: "Nouvelle mission" button

**Expert Dashboard (`/dashboard`):**
- Summary cards: Pending requests, Upcoming appointments, Monthly earnings
- Incoming immediate consultation requests (with 5-min countdown)
- Upcoming scheduled appointments (next 7 days, calendar view)
- Assigned Lots in crowdsourcing sessions with deadline countdown
- Earnings chart (last 30 days)
- Availability toggle (Online / Offline) — prominent, top of dashboard
- Validation status banner (if pending or rejected)

**Admin Dashboard (`/admin`):**
- Summary cards: Pending expert dossiers, Active consultations today, Total users, Platform revenue
- Expert validation queue (count badge)
- Recent disputes
- Platform health metrics (satisfaction score, active sessions)
- Quick links: validation queue, user search, analytics

---

### 1.3 Mission Publication (Client Flow)

#### 1.3.1 Mission Types

Clients declare at mission creation whether they expect:
- **Simple mission:** Single expert, immediate or scheduled.
- **Complex mission:** Multiple experts via crowdsourcing (client can also let the AI decide after analysis).

#### 1.3.2 Mission Form Fields

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| title | text | Yes | Max 100 chars |
| description | text | Yes | Min 50 chars. Used for AI semantic analysis. |
| domain_id | uuid | Yes | From domain taxonomy (Level 1) |
| subdomain_id | uuid | No | Level 2 |
| specialty_id | uuid | No | Level 3. If "Other" selected: stores deepest actual level |
| consultation_mode | enum | Yes | `immediate` / `scheduled` / `crowdsourcing` |
| budget_amount | decimal | No | Exact amount in MAD |
| budget_range | enum | No | `low` / `medium` / `high` (alternative to exact amount) |
| preferred_language | text | Yes | Default from client profile |
| urgency | enum | Yes | `immediate` / `within_24h` / `within_week` / `flexible` |
| confidentiality | enum | Yes | `standard` / `strict` |
| attachments | file[] | No | Up to 5 files, max 5MB each (PDF/JPG/PNG) |
| scheduled_at | timestamp | Conditional | Required if mode = `scheduled` |
| global_deadline | timestamp | Conditional | Required if mode = `crowdsourcing` |
| total_budget | decimal | Conditional | Required if mode = `crowdsourcing` |

#### 1.3.3 Domain Taxonomy (3 Levels)

- **Level 1 — Domain:** Legal, Medical & Health, Finance, IT & Technology, Coaching, Education, Architecture & Engineering, HR & Recruitment, Marketing, Other.
- **Level 2 — Subdomain:** e.g., Legal → Droit des affaires / Droit de la famille / Droit immobilier / Droit pénal / Autre.
- **Level 3 — Specialty:** e.g., Droit des affaires → Création d'entreprise / Contrats commerciaux / Propriété intellectuelle / Autre.
- **"Other" at any level:** Category drill-down stops immediately. `specialty_id` stores the deepest actual category selected before "Other". No predefined questions presented.

#### 1.3.4 Mission Status Lifecycle

```
draft → pending_ai → recommended → consultation_requested
→ in_consultation → completed | cancelled

(Crowdsourcing path)
draft → pending_ai → crowdsourcing_proposed → crowdsourcing_confirmed
→ swarm_constituted → in_progress → consolidating
→ pending_validation → completed | revision_requested → completed
```

---

### 1.4 AI-Powered Matching Engine (Neuro-Symbolic)

#### 1.4.1 Trigger

AI matching is triggered automatically when:
- A mission is submitted with `consultation_mode = immediate` or `scheduled`.
- A complex mission is submitted for crowdsourcing eligibility evaluation.

#### 1.4.2 Neuro Stage (LLM — Claude API)

```
Input: mission.description + mission.domain + mission.urgency + client.budget_preference + client.personality_tags

Processing:
1. Extract key entities: domain keywords, urgency signals, required certifications, complexity indicators
2. Generate semantic embedding of mission
3. Compare against expert profile embeddings (bio + domains + certifications)
4. Return: ranked list of K=10 candidate experts with raw similarity scores

Output: [{expert_id, raw_score, extracted_keywords[]}]
```

#### 1.4.3 Symbolic Stage (Rule Engine — TypeScript)

Applied to the K candidates from the Neuro stage:

| Rule ID | Condition | Action |
|---------|-----------|--------|
| R1 | client.budget_amount >= expert.hourly_rate (if budget known) | Filter out if fails |
| R2 | client.budget_preference matches expert price tier | Filter out if fails |
| R3 | mission.domain ∈ expert.domains | Filter out if fails |
| R4 | expert.validation_status = 'validated' | Filter out if fails |
| R5 | expert.is_deleted = false | Filter out if fails |
| R6 | For urgency='immediate': expert.is_available_immediately = true | Filter out if fails |
| R7 | For urgency='within_24h': expert has availability slot in next 24h | Filter out if fails |
| R8 | client.confidentiality='strict' AND expert.confidentiality_policy='strict_ok' | Filter out if fails |
| R9 | mission.complexity_score > 7 AND budget_type = 'flat' | Keep but ADD ALERT |
| R10 | mission.complexity_score > 8 AND mode = 'immediate' | Keep but ADD ALERT: "Mission complexe — rendez-vous planifié recommandé" |

#### 1.4.4 Crowdsourcing Eligibility (Additional AI Analysis)

For complex missions, the AI also evaluates:

| Criterion | Description | Score Weight |
|-----------|-------------|-------------|
| Divisibility | Can the mission be cut into N independent logical units? | 40% |
| Low coupling | Does each unit not depend on others to complete? | 35% |
| Consolidability | Can AI combine outputs into a coherent final deliverable? | 25% |

If eligibility score > 0.7: AI proposes crowdsourcing decomposition.
If 0.4–0.7: AI presents both options (simple or crowdsourcing) to client.
If < 0.4: Treated as simple mission only.

#### 1.4.5 Recommendation Output (stored in `recommendations` table)

Per recommended expert:
- `compatibility_score`: 0–100 (weighted: 50% semantic similarity + 30% rule compliance + 20% past rating)
- `match_reasons`: array of positive match signals (e.g., ["Domaine correspondant ✅", "Budget compatible ✅", "Disponible immédiatement ✅"])
- `alerts`: array of warnings (e.g., ["Mission complexe au forfait — taux horaire recommandé ⚠️"])
- `rank`: 1 = best match

Maximum 5 recommendations displayed to client. "Voir plus d'experts" button opens advanced search.

#### 1.4.6 AI API Call Format

```typescript
// /app/api/ai/match/route.ts (Server-side only)
const response = await fetch("https://api.anthropic.com/v1/messages", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    model: "claude-sonnet-4-6",
    max_tokens: 1000,
    system: `Tu es le moteur de matching de SOS Expert.
    Analyse la mission et les profils experts fournis.
    Retourne UNIQUEMENT un JSON valide sans texte supplémentaire.
    Format: [{expert_id, semantic_score, keywords[], complexity_score, is_crowdsourcing_eligible}]`,
    messages: [{
      role: "user",
      content: `Mission: ${JSON.stringify(mission)}\n\nExperts candidats: ${JSON.stringify(expertProfiles)}`
    }]
  })
});
```

---

### 1.5 Consultation Flow — Simple Mission

#### 1.5.1 Immediate Consultation

**Client side:**
1. Client views recommendation cards on `/missions/[id]`.
2. Clicks "Consulter maintenant" on preferred expert card.
3. Selects modality: Chat / Vidéo / Audio.
4. Consultation request sent. Status: `pending`.
5. Client sees waiting screen with 5-minute countdown.
6. If expert accepts: client joins session automatically.
7. If expert declines or timer expires: client sees "Expert non disponible" + next recommended expert suggestion.

**Expert side:**
1. Expert receives real-time notification (Supabase Realtime).
2. Dashboard shows incoming request with: client name (or "Anonyme" if strict confidentiality), mission domain, urgency, modality, budget.
3. Expert has **5 minutes** to Accept or Decline.
4. If no action in 5 min: auto-declined, cancellation NOT logged (considered technical unavailability).

**Session:**
- **Chat:** Real-time via Supabase Realtime. Both parties see typing indicators and read receipts.
- **Video/Audio:** WebRTC peer-to-peer via simple-peer library. Signaling via Supabase Realtime channel specific to this consultation.
- **File sharing:** Either party can upload files during session (stored in `session-files/{consultation_id}/`).
- **Session timer:** Visible elapsed time counter.
- **End session:** Either party can end session. Both see "Session terminée" confirmation with duration and estimated amount.

#### 1.5.2 Scheduled Appointment

**Client side:**
1. Client clicks "Prendre rendez-vous" on an expert recommendation card.
2. Client views expert availability calendar (fetched from `expert_profiles.availability`, filtered for already-booked slots).
3. Client selects date + time slot.
4. Client selects modality: Chat / Vidéo / Audio.
5. Booking request sent. Status: `pending`.
6. Client sees confirmation page: "Demande de rendez-vous envoyée à [Expert]".

**Expert side:**
1. Expert receives notification: new appointment request.
2. Expert sees request in dashboard with client info, domain, time slot, modality.
3. Expert has **24 hours** to Confirm or Decline.
4. If expert declines: client notified, can book with another expert. No penalty logged.
5. If no response in 24h: auto-declined. No penalty (considered scheduling conflict).

**Reminders:**
- 24h before: notification to both parties.
- 1h before: notification to both parties.
- 15 min before: notification to both parties with "Rejoindre la session" link.

**At appointment time:**
- Client and expert each click "Rejoindre" from their dashboard/notification.
- Session starts when both join. If one party doesn't join within 15 min of appointment time: other party is notified.

#### 1.5.3 Consultation Session Interface (`/consultations/[id]`)

**Left panel (always visible):**
- Mission summary (title, domain, client's description)
- Expert info card (name, photo, rating)
- Session timer (elapsed)
- Estimated amount (rate × duration)
- Shared files list

**Center panel:**
- **Chat mode:** Message bubbles, input box, typing indicator, file upload button.
- **Video mode:** Large video feed (remote), small video feed (local, draggable), mute/unmute, camera toggle, end call button. Chat panel available as overlay.
- **Audio mode:** Audio waveform visualization, mute button, end call button. Chat available as full panel.

**Right panel (collapsible):**
- Document viewer for shared files
- Quick notes (local, not saved to server)

**End session flow:**
1. Either party clicks "Terminer la session".
2. Confirmation modal: "Êtes-vous sûr de vouloir terminer ? Durée: X min. Montant estimé: Y MAD."
3. Both parties see session summary page.
4. Client redirected to payment flow.

---

### 1.6 Payment Flow

#### 1.6.1 Payment Trigger

Payment is triggered after:
- An immediate or scheduled consultation ends.
- A crowdsourcing Lot is validated.
- The final consolidated deliverable is approved by the client.

#### 1.6.2 Payment Steps (Client)

1. Session ends → client sees payment summary:
   - Expert name
   - Session duration
   - Rate applied (hourly or flat)
   - Subtotal
   - Platform commission (15%)
   - **Total à payer**
2. Client selects payment method: Carte bancaire (Stripe).
3. Stripe Checkout or Stripe Elements embedded form.
4. Payment processed (test mode for PFE).
5. Success screen: "Paiement confirmé ✅"
6. PDF invoice automatically generated and downloadable.
7. Expert notified of payment confirmation.

#### 1.6.3 Payment Distribution

- **Expert payout:** 85% of total (after 15% platform commission).
- **Crowdsourcing:** Each expert receives their Lot's budget share × 85%.
- Payout recorded in `expert_earnings` table.
- Experts view their earnings in `/dashboard/earnings`.

#### 1.6.4 Refund Rules

- **Cancelled before expert accepts:** Full refund if pre-authorization was captured.
- **Expert cancels confirmed appointment:** Full refund.
- **Client cancels < 24h before appointment:** 50% of session fee may be charged (configurable).
- **Disputed consultation:** Refund at admin's discretion.
- **Lot rejected after revision:** That Lot's budget fully refunded.

#### 1.6.5 CMI (Centre Monétique Interbancaire)

CMI integration referenced in UI as "Bientôt disponible" badge on payment screen. Not implemented in PFE demo.

---

### 1.7 Crowdsourcing Flow

#### 1.7.1 Eligibility Evaluation

After client submits complex mission:
1. AI evaluates 3 criteria (Section 1.4.4).
2. If eligible: AI generates proposed Lot decomposition preview.
3. Client sees: "Mission complexe détectée. Notre IA propose de la décomposer en [N] tâches parallèles. Délai estimé: X jours (vs Y jours en mode simple)."
4. Client confirms or declines crowdsourcing.
5. If declines: mission treated as simple (single expert matching).

#### 1.7.2 Lot Decomposition

AI generates N Lots, each with:
- Lot number and title
- Detailed description of the sub-task
- Specific deliverable criteria (what "done" looks like)
- Individual deadline (computed from global deadline ÷ expected parallelism)
- Estimated budget (portion of total, weighted by complexity)
- Required domain/specialty for that Lot

Client reviews proposed decomposition on `/missions/[id]/crowdsource/review`:
- Can edit Lot titles and descriptions (not AI-assigned budgets unless manually overriding)
- Can merge or split Lots (triggers AI re-analysis)
- Confirms decomposition → status: `swarm_constituted`

#### 1.7.3 Swarm Constitution

For each Lot, the Neuro-Symbolic engine runs independently:
- Each Lot treated as a mini-mission with its own domain and requirements.
- AI recommends 1 expert per Lot.
- Admin can manually override expert assignment from back-office if needed.
- Each expert is notified of their Lot assignment with: Lot description, deliverable criteria, deadline, their Lot budget.
- **Privacy:** Each expert sees only their Lot. They cannot see other Lots or other experts' assignments.

#### 1.7.4 Parallel Execution

- Experts work independently.
- Expert submits Lot deliverable via `/lots/[id]/deliver` (text report + optional file attachment).
- Client dashboard shows real-time Lot progress:
  ```
  Lot 1 · Analyse juridique      ✅ Livré
  Lot 2 · Analyse financière     🔄 En cours
  Lot 3 · Analyse technique      ⏳ Assigné (Deadline: 2j)
  ```
- If a Lot passes its deadline without delivery:
  - Expert receives urgent notification.
  - Client receives alert: "Lot [N] en retard. Action requise."
  - Admin receives alert.
  - System can auto-assign replacement expert (if admin confirms).

#### 1.7.5 AI Consolidation

Once all Lots are marked `delivered`:
1. AI agent (Claude API) receives all Lot deliverables.
2. Consolidation prompt:
   ```
   Tu es un expert en rédaction de rapports professionnels.
   Voici [N] contributions d'experts sur différentes parties d'une mission.
   Fusionne ces contributions en un document final homogène et cohérent.
   Harmonise le style, élimine les redondances, assure la cohérence.
   Mission originale: [description]
   Contributions: [lot1_content, lot2_content, ..., lotN_content]
   ```
3. Consolidated deliverable stored in `crowdsourcing_sessions.consolidated_deliverable`.
4. Client notified: "Votre livrable final est prêt."

#### 1.7.6 Validation & Revision Round

**Client validation page (`/missions/[id]/crowdsource/validate`):**
- Full consolidated deliverable displayed (with download option).
- Client actions:
  - **Valider:** Triggers payment distribution. Session → `completed`.
  - **Demander une révision:** Client must specify which Lot(s) need revision and provide written feedback. Session → `revision_requested`.

**Revision round:**
- Each Lot flagged for revision: assigned expert is notified with client's specific feedback.
- Expert has the same deadline as original.
- Only ONE revision round per Lot is permitted.
- After revision: AI re-consolidates only the revised Lots into the final document.
- Client validates or accepts as-is (no second rejection allowed).

---

### 1.8 Expert Certification & Validation

#### 1.8.1 Expert Onboarding Flow

1. Expert registers → redirected to `/onboarding/expert`.
2. Step 1: Professional info (bio, domains, rates, languages, city).
3. Step 2: Availability calendar setup.
4. Step 3: Certification documents upload (up to 5 PDF/image files).
5. Step 4: Review & submit for validation.
6. Status set to `pending`. Expert sees: "Dossier soumis. En attente de validation par notre équipe (délai: 48-72h)."

#### 1.8.2 Admin Validation Flow (`/admin/experts/[id]`)

Admin sees:
- Expert's full profile preview (as it will appear to clients)
- Uploaded certification documents (inline viewer for PDF/images)
- Submission date and any previous validation history

Admin actions:
- **Valider:** Sets `validation_status = validated`. Expert receives notification: "Votre profil a été validé ✅. Vous pouvez maintenant recevoir des demandes de consultation." Expert profile becomes visible on platform.
- **Rejeter:** Admin must provide written reason (stored in `validation_notes`). Expert notified with reason + "Vous pouvez corriger votre dossier et resoumettre." Expert can resubmit.
- **Suspendre:** Sets `validation_status = suspended`. Expert profile hidden immediately. Expert notified with reason. Expert cannot resubmit until admin lifts suspension.

#### 1.8.3 Profile Updates After Validation

- Expert can update bio, rates, availability, languages, city at any time → changes visible immediately, no re-validation required.
- If expert uploads new/updated certification documents → `validation_status` resets to `pending`. Expert notified: "Mise à jour de vos certifications soumise pour validation."

---

### 1.9 Expert Search & Discovery (Client)

#### 1.9.1 Expert Discovery Page (`/experts`)

- Full searchable directory of validated experts.
- **Search bar:** Text search across expert bio, domains, city.
- **Filters (sidebar):**
  - Domain / Subdomain / Specialty (multi-select)
  - City (text)
  - Language (multi-select)
  - Available now (toggle)
  - Rating (min stars: 3 / 4 / 4.5+)
  - Budget range (slider in MAD)
  - Consultation mode available (immediate / scheduled / both)
- **Sort options:** Most relevant / Highest rated / Lowest price / Available now first
- **Expert cards in grid:** Avatar, name, domain tags, city, rating + review count, hourly rate, availability badge (🟢 En ligne / 🕐 Disponible sur RDV), "Voir le profil" button.
- **Pagination:** 12 experts per page.

#### 1.9.2 Expert Public Profile Page (`/experts/[id]`)

**Header:**
- Avatar, full name, city, languages
- Rating: ⭐ X.X (N avis)
- Domain tags
- Hourly rate (MAD/h) and flat rate (if applicable)
- Availability: 🟢 Disponible maintenant / 🕐 Prochain créneau: [date]
- Two CTA buttons: "Consulter maintenant" (if available) / "Prendre rendez-vous"
- Certified badge (✅ Certifié SOS Expert)

**Bio section:** Full professional description.

**Certifications section:** List of certifications (name, issuing body, year). Documents not displayed publicly (privacy).

**Availability calendar:** Read-only weekly view showing available slots.

**Reviews section:**
- Overall rating bar chart (5★ to 1★ distribution)
- Individual reviews: reviewer name (or "Client anonyme"), rating, comment, date, expert's reply (if any)
- Sorted: Most recent first. Paginated (5 per page).

**Stats sidebar:**
- Total consultations completed
- Member since date
- Response rate (% of requests accepted)
- Average response time

---

### 1.10 Reviews & Ratings

#### 1.10.1 Review Mechanics

- Review window opens after consultation reaches `completed` status.
- **Who reviews:** Only the client reviews the expert (unilateral — expert does not rate client in this version).
- **Timing:** Client can submit review at any time within **7 days** of `completed_at`.
- **Fields:** 1–5 star rating + written comment (optional, max 500 chars).
- **One review per consultation** (cannot edit after submission).
- **Expert reply:** Expert may post a one-time reply to any review they receive. Reply cannot be edited after posting.
- **Publication:** Review published immediately upon client submission.
- **No blind submission** (unlike SOS Helper): reviews are visible immediately.

#### 1.10.2 Rating Calculations

- **Global Average:** Arithmetic mean of all ratings received.
- **Weighted Recent Score:** Reviews from last 90 days weighted ×1.5. Used for ranking in recommendations.
- Score displayed on profile and recommendation cards.
- Recalculation triggered on each new review submission (database trigger).

#### 1.10.3 Review Moderation (Admin)

- Admin can hide a review that violates terms (hate speech, personal attacks, false information).
- Hiding is soft (review remains in DB with `is_visible = false`). Audit trail preserved.
- Expert can flag a review for admin review via "Signaler cet avis" button.
- Client who left the review is not notified of moderation actions.

---

### 1.11 Notification System

All notifications stored in `notifications` table and surfaced in-app via notification bell (header).

| Type | Trigger | Recipient | Message example |
|------|---------|-----------|-----------------|
| `consultation_request` | Client requests immediate consultation | Expert | "Nouvelle demande de consultation immédiate en [Domaine]" |
| `consultation_accepted` | Expert accepts request | Client | "Expert [Nom] a accepté votre demande. Rejoignez la session." |
| `consultation_declined` | Expert declines / timer expires | Client | "Expert non disponible. Consultez nos autres recommandations." |
| `appointment_request` | Client books appointment | Expert | "Nouvelle demande de rendez-vous pour le [Date] à [Heure]" |
| `appointment_confirmed` | Expert confirms appointment | Client | "Rendez-vous confirmé avec [Expert] le [Date] à [Heure]" |
| `appointment_declined` | Expert declines appointment | Client | "Rendez-vous refusé par [Expert]. Réservez avec un autre expert." |
| `appointment_reminder_24h` | 24h before appointment | Client + Expert | "Rappel: Rendez-vous demain à [Heure] avec [Name]" |
| `appointment_reminder_1h` | 1h before appointment | Client + Expert | "Votre session commence dans 1 heure. Préparez-vous !" |
| `lot_assigned` | AI assigns Lot to expert | Expert | "Nouvelle tâche assignée: [Lot title]. Deadline: [Date]" |
| `lot_delivered` | Expert delivers Lot | Client | "La partie [N] de votre mission a été livrée." |
| `lot_overdue` | Lot deadline passed | Client + Admin | "⚠️ La partie [N] est en retard. Action requise." |
| `mission_consolidated` | AI finalizes consolidation | Client | "Votre livrable final est prêt pour validation ✅" |
| `payment_required` | Session ends | Client | "Session terminée. Procédez au paiement: [Amount] MAD" |
| `payment_confirmed` | Payment succeeds | Expert | "Paiement reçu: [Amount] MAD pour votre consultation." |
| `validation_approved` | Admin validates expert | Expert | "🎉 Votre profil a été validé ! Vous pouvez recevoir des consultations." |
| `validation_rejected` | Admin rejects dossier | Expert | "Dossier refusé: [Reason]. Corrigez et resoumettez." |
| `new_review` | Client submits review | Expert | "Nouvel avis reçu: ⭐⭐⭐⭐ (4/5)" |
| `review_flagged` | Expert flags review | Admin | "Avis signalé par Expert [Nom] pour vérification." |
| `system_ai_alert` | AI generates alert on mission | Client | "⚠️ Mission complexe au forfait — taux horaire recommandé." |
| `expert_pending_validation` | New expert submits dossier | Admin | "Nouveau dossier expert à valider: [Name]" |

**Notification Center (`/notifications`):**
- Full list of all notifications, paginated.
- Filter by: All / Unread / Type.
- Mark all as read button.
- Each notification links to relevant page.
- Bell icon in header shows unread count badge (max "99+").

---

## PART 2: Business Rules & Logic

### 2.1 Consultation Lifecycle States

```
pending → confirmed → in_progress → completed
pending → declined
pending → expired (5-min timer, immediate only)
confirmed → cancelled_by_client
confirmed → cancelled_by_expert
in_progress → completed (after payment)
```

### 2.2 Crowdsourcing Session Lifecycle

```
eligibility_check
  → crowdsourcing_proposed (eligible: client must confirm)
  → simple_mission_redirect (not eligible)

crowdsourcing_proposed
  → crowdsourcing_confirmed (client confirms)
  → cancelled (client declines)

crowdsourcing_confirmed
  → swarm_constituted (AI assigns experts to all Lots)

swarm_constituted
  → in_progress (at least one expert has accepted their Lot)

in_progress
  → consolidating (all Lots delivered)

consolidating
  → pending_validation (AI consolidation complete)

pending_validation
  → completed (client validates)
  → revision_requested (client requests revision)

revision_requested
  → pending_validation (revised Lots re-consolidated)
  → completed (final acceptance — no second rejection)
```

### 2.3 Lot Lifecycle States

```
created → assigned (AI selects expert)
assigned → accepted (expert confirms Lot)
accepted → in_progress (expert starts work)
in_progress → delivered (expert submits deliverable)
delivered → validated (AI integrates into consolidation)
assigned/accepted/in_progress → overdue (deadline passed without delivery)
overdue → reassigned (admin assigns replacement expert)
```

### 2.4 Anti-Fraud & Integrity Rules

- **Self-booking prevention:** Client cannot book a consultation with themselves (if an expert account exists on same email — blocked at DB level).
- **Unique review per consultation:** DB unique constraint on (reviewer_id, consultation_id) in `reviews` table.
- **Expert cannot rate clients:** `reviews` table only allows `reviewer_id = consultation.client_id`.
- **AI score freshness:** Compatibility scores are computed fresh per mission. Never cached per client-expert pair.
- **Lot isolation:** RLS ensures each expert can only read their own assigned Lot. Lot content from other experts is never accessible.
- **Certification privacy:** Certification documents in Supabase private bucket. Only the expert and admin role can access. Never exposed via public URL.
- **Payment before session data:** Session transcript and shared files remain accessible to both parties after completion. Access revoked if payment fails (client) or account suspended (expert).

### 2.5 Concurrency Rules

- A client can have multiple active consultations simultaneously (different experts, different missions).
- An expert can accept multiple scheduled appointments as long as they don't overlap in time.
- An expert can be assigned to multiple crowdsourcing Lots simultaneously (different sessions).
- An expert cannot accept an immediate consultation request if they already have one `in_progress`.

### 2.6 Ghosting Prevention (Immediate Consultations)

- Expert does not respond to immediate request within 5 min → auto-declined. No cancellation logged (technical unavailability assumed).
- Expert accepts but client has left the waiting room → session auto-cancelled. No penalty.
- After 3 consecutive auto-declines within 24h → expert's `is_available_immediately` toggled OFF automatically. Expert notified to review their availability settings.

### 2.7 Edit Lock Rules

- Mission details editable by client only while status = `draft` or `pending_ai`.
- Once recommendations are generated and client has selected an expert: mission details locked.
- Crowdsourcing Lot descriptions: editable by client before confirming decomposition. After confirmation: locked.
- Expert profile: always editable. Certification updates trigger re-validation.

---

## PART 3: Technical & Data Considerations

### 3.1 Technology Stack

| Layer | Technology | Notes |
|-------|-----------|-------|
| Frontend | Next.js 14 (App Router) + TypeScript | Server components by default |
| Styling | Tailwind CSS + shadcn/ui | Pre-built accessible components |
| Backend-as-a-Service | Supabase | Auth, DB, Realtime, Storage |
| Database | PostgreSQL (via Supabase) | RLS for all tables |
| Auth | Supabase Auth | JWT + email/password |
| Real-time | Supabase Realtime | Chat messages, notifications, WebRTC signaling |
| Storage | Supabase Storage | Certifications (private) + session files + avatars |
| Video/Audio | WebRTC via simple-peer | Signaling via Supabase Realtime |
| AI Engine | Anthropic Claude API (`claude-sonnet-4-6`) | Server-side API routes only |
| Payment | Stripe (test mode) | `stripe` npm package |
| PDF | jspdf or @react-pdf/renderer | Invoice generation |
| Deployment | Vercel | Auto-deploy from GitHub |
| Type Safety | Supabase CLI type generation | `supabase gen types typescript` |

### 3.2 Complete Database Schema

```sql
-- =====================
-- USERS & PROFILES
-- =====================

CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('client', 'expert', 'admin')),
  first_name TEXT,
  last_name TEXT,
  email TEXT UNIQUE NOT NULL,
  profile_photo_url TEXT,
  is_deleted BOOLEAN DEFAULT FALSE,
  deleted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE client_profiles (
  id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
  budget_preference TEXT CHECK (budget_preference IN ('low', 'medium', 'high')),
  personality_tags TEXT[] DEFAULT '{}',
  confidentiality_preference TEXT DEFAULT 'standard' 
    CHECK (confidentiality_preference IN ('standard', 'strict')),
  preferred_language TEXT DEFAULT 'fr',
  city TEXT,
  favorite_experts UUID[] DEFAULT '{}'
);

CREATE TABLE expert_profiles (
  id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
  bio TEXT,
  domains TEXT[] DEFAULT '{}',
  certifications JSONB DEFAULT '[]',
  hourly_rate DECIMAL(10,2),
  flat_rate DECIMAL(10,2),
  availability JSONB DEFAULT '{}',
  is_available_immediately BOOLEAN DEFAULT FALSE,
  languages TEXT[] DEFAULT '{}',
  city TEXT,
  validation_status TEXT DEFAULT 'pending'
    CHECK (validation_status IN ('pending', 'validated', 'suspended', 'rejected')),
  validation_notes TEXT,
  validated_at TIMESTAMPTZ,
  average_rating DECIMAL(3,2) DEFAULT 0,
  total_reviews INTEGER DEFAULT 0,
  total_consultations INTEGER DEFAULT 0,
  response_rate DECIMAL(5,2) DEFAULT 0,
  auto_declined_count INTEGER DEFAULT 0
);

-- =====================
-- DOMAIN TAXONOMY
-- =====================

CREATE TABLE domains (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  name_ar TEXT,
  parent_id UUID REFERENCES domains(id),
  level INTEGER NOT NULL CHECK (level IN (1, 2, 3)),
  is_other BOOLEAN DEFAULT FALSE,
  sort_order INTEGER DEFAULT 0
);

-- =====================
-- MISSIONS
-- =====================

CREATE TABLE missions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES profiles(id),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  domain_id UUID REFERENCES domains(id),
  subdomain_id UUID REFERENCES domains(id),
  specialty_id UUID REFERENCES domains(id),
  consultation_mode TEXT NOT NULL 
    CHECK (consultation_mode IN ('immediate', 'scheduled', 'crowdsourcing')),
  budget_amount DECIMAL(10,2),
  budget_range TEXT CHECK (budget_range IN ('low', 'medium', 'high')),
  urgency TEXT NOT NULL DEFAULT 'flexible'
    CHECK (urgency IN ('immediate', 'within_24h', 'within_week', 'flexible')),
  confidentiality TEXT DEFAULT 'standard'
    CHECK (confidentiality IN ('standard', 'strict')),
  preferred_language TEXT DEFAULT 'fr',
  scheduled_at TIMESTAMPTZ,
  global_deadline TIMESTAMPTZ,
  total_budget DECIMAL(10,2),
  attachments JSONB DEFAULT '[]',
  status TEXT DEFAULT 'draft'
    CHECK (status IN (
      'draft', 'pending_ai', 'recommended',
      'consultation_requested', 'in_consultation', 'completed', 'cancelled',
      'crowdsourcing_proposed', 'crowdsourcing_confirmed',
      'swarm_constituted', 'in_progress', 'consolidating',
      'pending_validation', 'revision_requested'
    )),
  complexity_score DECIMAL(4,2),
  is_crowdsourcing_eligible BOOLEAN,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- AI RECOMMENDATIONS
-- =====================

CREATE TABLE recommendations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mission_id UUID NOT NULL REFERENCES missions(id) ON DELETE CASCADE,
  expert_id UUID NOT NULL REFERENCES expert_profiles(id),
  compatibility_score DECIMAL(5,2) NOT NULL,
  semantic_score DECIMAL(5,2),
  match_reasons JSONB DEFAULT '[]',
  alerts JSONB DEFAULT '[]',
  rank INTEGER NOT NULL,
  was_selected BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- CONSULTATIONS
-- =====================

CREATE TABLE consultations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mission_id UUID REFERENCES missions(id),
  client_id UUID NOT NULL REFERENCES profiles(id),
  expert_id UUID NOT NULL REFERENCES profiles(id),
  modality TEXT NOT NULL CHECK (modality IN ('chat', 'video', 'audio')),
  status TEXT DEFAULT 'pending'
    CHECK (status IN (
      'pending', 'confirmed', 'in_progress',
      'completed', 'cancelled_by_client',
      'cancelled_by_expert', 'expired'
    )),
  scheduled_at TIMESTAMPTZ,
  accepted_at TIMESTAMPTZ,
  started_at TIMESTAMPTZ,
  ended_at TIMESTAMPTZ,
  duration_minutes INTEGER,
  amount_charged DECIMAL(10,2),
  platform_commission DECIMAL(10,2),
  expert_payout DECIMAL(10,2),
  webrtc_room_id TEXT UNIQUE DEFAULT gen_random_uuid()::text,
  request_expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- MESSAGES (CHAT)
-- =====================

CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  consultation_id UUID NOT NULL REFERENCES consultations(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES profiles(id),
  content TEXT,
  file_url TEXT,
  file_name TEXT,
  file_type TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- CROWDSOURCING
-- =====================

CREATE TABLE crowdsourcing_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mission_id UUID NOT NULL REFERENCES missions(id) ON DELETE CASCADE,
  total_budget DECIMAL(10,2),
  global_deadline TIMESTAMPTZ,
  status TEXT DEFAULT 'eligibility_check'
    CHECK (status IN (
      'eligibility_check', 'crowdsourcing_proposed', 'crowdsourcing_confirmed',
      'swarm_constituted', 'in_progress', 'consolidating',
      'pending_validation', 'completed', 'revision_requested', 'cancelled'
    )),
  eligibility_score DECIMAL(4,2),
  eligibility_reasons JSONB,
  consolidated_deliverable TEXT,
  consolidation_prompt TEXT,
  lots_count INTEGER DEFAULT 0,
  lots_delivered INTEGER DEFAULT 0,
  revision_round INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

CREATE TABLE lots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES crowdsourcing_sessions(id) ON DELETE CASCADE,
  lot_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  deliverable_criteria TEXT NOT NULL,
  required_domain TEXT,
  deadline TIMESTAMPTZ NOT NULL,
  budget_allocated DECIMAL(10,2),
  assigned_expert_id UUID REFERENCES profiles(id),
  status TEXT DEFAULT 'created'
    CHECK (status IN (
      'created', 'assigned', 'accepted',
      'in_progress', 'delivered', 'validated', 'overdue', 'reassigned'
    )),
  deliverable_content TEXT,
  deliverable_file_url TEXT,
  client_feedback TEXT,
  needs_revision BOOLEAN DEFAULT FALSE,
  assigned_at TIMESTAMPTZ,
  accepted_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,
  validated_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- REVIEWS
-- =====================

CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  consultation_id UUID REFERENCES consultations(id),
  session_id UUID REFERENCES crowdsourcing_sessions(id),
  reviewer_id UUID NOT NULL REFERENCES profiles(id),
  expert_id UUID NOT NULL REFERENCES expert_profiles(id),
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  expert_reply TEXT,
  expert_reply_at TIMESTAMPTZ,
  is_visible BOOLEAN DEFAULT TRUE,
  hidden_reason TEXT,
  hidden_by UUID REFERENCES profiles(id),
  hidden_at TIMESTAMPTZ,
  is_flagged BOOLEAN DEFAULT FALSE,
  flagged_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT unique_review_per_consultation UNIQUE (reviewer_id, consultation_id)
);

-- =====================
-- PAYMENTS
-- =====================

CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  consultation_id UUID REFERENCES consultations(id),
  lot_id UUID REFERENCES lots(id),
  session_id UUID REFERENCES crowdsourcing_sessions(id),
  client_id UUID NOT NULL REFERENCES profiles(id),
  expert_id UUID NOT NULL REFERENCES profiles(id),
  amount DECIMAL(10,2) NOT NULL,
  platform_commission DECIMAL(10,2),
  expert_payout DECIMAL(10,2),
  stripe_payment_intent_id TEXT UNIQUE,
  stripe_charge_id TEXT,
  status TEXT DEFAULT 'pending'
    CHECK (status IN ('pending', 'processing', 'succeeded', 'refunded', 'failed')),
  refund_reason TEXT,
  invoice_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  succeeded_at TIMESTAMPTZ
);

-- =====================
-- NOTIFICATIONS
-- =====================

CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  body TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  related_id UUID,
  related_type TEXT,
  action_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- INDEXES
-- =====================

CREATE INDEX idx_missions_client_id ON missions(client_id);
CREATE INDEX idx_missions_status ON missions(status);
CREATE INDEX idx_consultations_client_id ON consultations(client_id);
CREATE INDEX idx_consultations_expert_id ON consultations(expert_id);
CREATE INDEX idx_consultations_status ON consultations(status);
CREATE INDEX idx_messages_consultation_id ON messages(consultation_id);
CREATE INDEX idx_messages_created_at ON messages(created_at);
CREATE INDEX idx_lots_session_id ON lots(session_id);
CREATE INDEX idx_lots_expert_id ON lots(assigned_expert_id);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);
CREATE INDEX idx_expert_profiles_validation ON expert_profiles(validation_status);
CREATE INDEX idx_expert_profiles_available ON expert_profiles(is_available_immediately);
CREATE INDEX idx_reviews_expert_id ON reviews(expert_id);

-- =====================
-- TRIGGERS
-- =====================

-- Auto-update expert average_rating after new review
CREATE OR REPLACE FUNCTION update_expert_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE expert_profiles
  SET 
    average_rating = (
      SELECT ROUND(AVG(rating)::numeric, 2)
      FROM reviews
      WHERE expert_id = NEW.expert_id AND is_visible = TRUE
    ),
    total_reviews = (
      SELECT COUNT(*) FROM reviews
      WHERE expert_id = NEW.expert_id AND is_visible = TRUE
    )
  WHERE id = NEW.expert_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_expert_rating
AFTER INSERT OR UPDATE ON reviews
FOR EACH ROW EXECUTE FUNCTION update_expert_rating();

-- Auto-expire immediate consultation requests after 5 minutes
-- (handled via Supabase Edge Function scheduled job)
```

### 3.3 Row Level Security (RLS) Policies

```sql
-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE expert_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE missions ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE lots ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Profiles: own profile + validated experts visible to all auth users
CREATE POLICY "Own profile" ON profiles
  FOR ALL USING (auth.uid() = id);

CREATE POLICY "Validated experts visible" ON expert_profiles
  FOR SELECT USING (validation_status = 'validated' AND 
    EXISTS (SELECT 1 FROM profiles WHERE id = expert_profiles.id AND is_deleted = FALSE));

-- Missions: client owns their missions
CREATE POLICY "Client owns missions" ON missions
  FOR ALL USING (client_id = auth.uid());

-- Consultations: only parties involved
CREATE POLICY "Consultation parties only" ON consultations
  FOR ALL USING (client_id = auth.uid() OR expert_id = auth.uid());

-- Messages: only parties of that consultation
CREATE POLICY "Message parties only" ON messages
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM consultations
      WHERE id = messages.consultation_id
      AND (client_id = auth.uid() OR expert_id = auth.uid())
    )
  );

-- Lots: expert sees only their lot; client sees all lots of their sessions
CREATE POLICY "Lot access" ON lots
  FOR SELECT USING (
    assigned_expert_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM crowdsourcing_sessions cs
      JOIN missions m ON cs.mission_id = m.id
      WHERE cs.id = lots.session_id AND m.client_id = auth.uid()
    )
  );

-- Expert can only update their own lot
CREATE POLICY "Expert updates own lot" ON lots
  FOR UPDATE USING (assigned_expert_id = auth.uid());

-- Reviews: public for validated experts; reviewer can create
CREATE POLICY "Reviews public" ON reviews
  FOR SELECT USING (is_visible = TRUE);

CREATE POLICY "Reviewer creates review" ON reviews
  FOR INSERT WITH CHECK (reviewer_id = auth.uid());

-- Notifications: own notifications only
CREATE POLICY "Own notifications" ON notifications
  FOR ALL USING (user_id = auth.uid());

-- Admin bypasses all RLS (use service role key in admin routes)
```

### 3.4 WebRTC Implementation

```typescript
// /lib/webrtc.ts
import SimplePeer from 'simple-peer';
import { createClient } from '@/lib/supabase/client';

export const ICE_SERVERS = [
  { urls: 'stun:stun.l.google.com:19302' },
  { urls: 'stun:stun1.l.google.com:19302' },
];

export async function initWebRTCSession(
  consultationId: string,
  isInitiator: boolean,
  localStream: MediaStream,
  onRemoteStream: (stream: MediaStream) => void,
  onError: (err: Error) => void
) {
  const supabase = createClient();
  const channel = supabase.channel(`webrtc:${consultationId}`);

  const peer = new SimplePeer({
    initiator: isInitiator,
    trickle: false,
    stream: localStream,
    config: { iceServers: ICE_SERVERS }
  });

  peer.on('signal', (data) => {
    channel.send({
      type: 'broadcast',
      event: 'signal',
      payload: { signal: data, from: isInitiator ? 'initiator' : 'receiver' }
    });
  });

  peer.on('stream', onRemoteStream);
  peer.on('error', onError);

  channel.on('broadcast', { event: 'signal' }, ({ payload }) => {
    if (
      (isInitiator && payload.from === 'receiver') ||
      (!isInitiator && payload.from === 'initiator')
    ) {
      peer.signal(payload.signal);
    }
  });

  await channel.subscribe();
  return { peer, channel };
}
```

### 3.5 File Storage Structure

```
supabase-storage/
├── avatars/                    (public bucket)
│   └── {user_id}/profile.jpg
├── certifications/             (private bucket — admin + expert only)
│   └── {expert_id}/{filename}.pdf
├── mission-attachments/        (private bucket — client + matched expert)
│   └── {mission_id}/{filename}
├── session-files/              (private bucket — consultation parties only)
│   └── {consultation_id}/{filename}
└── lot-deliverables/           (private bucket — lot expert + client)
    └── {lot_id}/{filename}
```

### 3.6 Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=       # Server-side only (admin operations)

# Anthropic
ANTHROPIC_API_KEY=               # Server-side only — NEVER expose to client

# Stripe
STRIPE_SECRET_KEY=               # Server-side only
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## PART 4: UI/UX & Page Specifications

### 4.1 Design System

| Token | Value |
|-------|-------|
| Primary | `#0A1628` (deep navy) |
| Accent | `#2563EB` (electric blue) |
| Accent light | `#DBEAFE` |
| Success | `#16A34A` |
| Warning | `#D97706` |
| Error | `#DC2626` |
| Background | `#F8FAFC` |
| Surface | `#FFFFFF` |
| Border | `#E2E8F0` |
| Text primary | `#0F172A` |
| Text secondary | `#64748B` |
| Font heading | Space Grotesk |
| Font body | Inter |
| Radius card | 12px |
| Radius input | 8px |
| Radius button | 24px |
| Shadow card | `0 1px 3px rgba(0,0,0,0.1)` |
| Component library | shadcn/ui |

### 4.2 Complete Route Map

```
PUBLIC ROUTES (unauthenticated)
/                              → Landing page
/auth/login                    → Login
/auth/register                 → Register (select role)
/auth/register/client          → Client onboarding step 1
/auth/register/expert          → Expert onboarding step 1
/auth/forgot-password          → Password reset request
/auth/reset-password           → Password reset form (from email link)

CLIENT ROUTES
/dashboard                     → Client dashboard
/missions/new                  → New mission form
/missions/[id]                 → Mission detail + AI recommendations
/missions/[id]/crowdsource     → Crowdsourcing session overview
/missions/[id]/crowdsource/review     → Review & confirm Lot decomposition
/missions/[id]/crowdsource/validate   → Validate consolidated deliverable
/experts                       → Expert discovery / search
/experts/[id]                  → Expert public profile
/consultations/[id]            → Active consultation (chat/video/audio)
/consultations/[id]/review     → Post-consultation review form
/consultations/[id]/payment    → Payment flow
/history                       → Full consultation history
/notifications                 → Notification center
/settings                      → Account settings
/settings/profile              → Edit profile
/settings/preferences          → Edit AI preferences (budget, personality, confidentiality)
/settings/security             → Change password, delete account

EXPERT ROUTES
/dashboard                     → Expert dashboard (role-based)
/onboarding/expert             → Expert onboarding (profile + certifications)
/onboarding/expert/availability → Availability setup
/lots/[id]                     → Lot detail + delivery form
/earnings                      → Earnings history + payout summary
/consultations/[id]            → Shared with client (same page, role-based content)
/settings/expert-profile       → Edit expert-specific fields
/settings/certifications       → Manage certification documents
/settings/availability         → Edit availability calendar

ADMIN ROUTES
/admin                         → Admin dashboard
/admin/experts                 → All experts (filter by status)
/admin/experts/pending         → Validation queue
/admin/experts/[id]            → Expert dossier review + actions
/admin/users                   → All users (clients + experts)
/admin/users/[id]              → User detail + actions (suspend, delete)
/admin/consultations           → All consultations
/admin/consultations/[id]      → Consultation detail
/admin/crowdsourcing           → All crowdsourcing sessions
/admin/disputes                → Disputed/cancelled consultations
/admin/reviews                 → All reviews (moderation)
/admin/analytics               → Platform analytics dashboard
/admin/notifications           → Send system-wide notification
```

### 4.3 Page-by-Page UI Specifications

#### Landing Page (`/`)
- **Hero section:** Headline "Trouvez l'expert qu'il vous faut, en quelques secondes." Subheadline mentioning AI + crowdsourcing. Two CTAs: "Trouver un expert" (→ /auth/register) + "Devenir expert" (→ /auth/register?role=expert).
- **How it works section:** 3 steps for client (Décrivez → IA recommande → Consultez), 3 steps for expert (Inscrivez → Validez → Consultez).
- **Crowdsourcing feature section:** Animated diagram showing mission → Lots → experts → consolidation.
- **AI Neuro-Symbolique section:** Simple visual explaining Neuro part (LLM) + Symbolic part (rules).
- **Domain showcase:** Grid of domain icons (Legal, Medical, Finance, IT, Coaching...).
- **Stats section:** "X experts certifiés | Y consultations réalisées | Z domaines couverts".
- **Testimonials section:** 3 client testimonials (hardcoded for PFE demo).
- **Footer:** Logo, links (About, Legal, Contact), social links.

#### Expert Search Page (`/experts`)
- **Search bar** (full width, top): Placeholder "Recherchez un expert en droit, médecine, IT..."
- **Filter sidebar** (left, collapsible on mobile):
  - Domain (accordion multi-select)
  - City (text input)
  - Language (checkbox list)
  - Available now (toggle)
  - Min rating (star selector)
  - Budget range (dual-handle slider, 100–5000 MAD)
  - Mode (immediate / scheduled / both)
- **Results grid** (right): 3 columns desktop, 2 tablet, 1 mobile.
- **Sort bar** (above results): "X experts trouvés" + sort dropdown.
- **Expert card:** Avatar (60px), name, city, domain tags (max 3 + "+N more"), rating ⭐X.X (N), hourly rate, availability badge, "Voir le profil" button.
- **Pagination:** 12 per page, numbered pagination.
- **Empty state:** "Aucun expert trouvé pour ces critères. Essayez d'élargir votre recherche."

#### Mission Form (`/missions/new`)
- **Step indicator:** 3 steps (1: Détails → 2: Mode & Budget → 3: Confirmation)
- **Step 1:** Title, domain drill-down (3 levels), description (textarea with char counter), file attachments.
- **Step 2:** Consultation mode selector (3 cards: Immédiat / Rendez-vous / Mission complexe), urgency selector, budget input or range, preferred language.
- **Step 3:** Summary preview + "Soumettre et trouver un expert" button.
- **AI loading state:** After submission → animated spinner with "Notre IA analyse votre demande..." (2-5s). Then redirect to `/missions/[id]`.

#### Mission + Recommendations Page (`/missions/[id]`)
- **Left column (40%):** Mission summary card (title, domain, description, budget, urgency, attachments). Edit button (if still editable).
- **Right column (60%):**
  - Heading: "Experts recommandés pour vous"
  - AI Recommendation cards (max 5):
    - Expert avatar + name + rating + city
    - Domain tags
    - Rate (MAD/h)
    - Availability badge
    - Compatibility score bar (colored: green > 80, yellow 60-80, orange < 60)
    - Match reasons list (✅ icons)
    - Alert banners (⚠️ if any)
    - Two buttons: "Consulter maintenant" / "Prendre rendez-vous"
  - "Voir plus d'experts" link → `/experts` with pre-filled filters
- **For crowdsourcing eligible missions:** Banner at top: "🤖 Mission complexe détectée. [Décomposer en tâches parallèles] → /missions/[id]/crowdsource/review"

#### Consultation Page (`/consultations/[id]`)
- **Chat mode layout:**
  - Top bar: Expert/client name + avatar, session timer, connection status dot.
  - Messages area: scrollable, bubble style (own: right blue, other: left gray), timestamp, read receipt.
  - File preview inline if file shared.
  - Bottom: input box (multiline), emoji button, file attach button, send button.
  - "Terminer la session" button (top right, red).
- **Video mode layout:**
  - Full-screen remote video.
  - Local video PiP (bottom right, draggable).
  - Control bar (bottom center): mute mic, toggle camera, toggle chat sidebar, end call.
  - Chat sidebar (collapsible, right side): same as chat mode.
- **Audio mode layout:**
  - Large waveform visualization (center).
  - Participant names and avatars.
  - Control bar: mute, end call.
  - Full chat panel below audio.

#### Post-Consultation Review (`/consultations/[id]/review`)
- Star rating selector (interactive, large stars).
- Comment textarea (optional, max 500 chars, char counter).
- "Publier mon avis" button.
- "Ignorer" link (skip review — no penalty).
- After submission: success animation + "Votre avis a été publié ✅" + redirect to dashboard.

#### Crowdsourcing Session (`/missions/[id]/crowdsource`)
- **Header:** Mission title, total budget, global deadline, session status badge.
- **Lots progress tracker:** Table or card list:
  - Lot number, title, assigned expert (avatar + name), deadline, status badge, budget, actions.
  - Status badges: Créé 🔵 / Assigné 🟡 / Accepté 🟠 / En cours 🔄 / Livré ✅ / Validé ✅✅ / En retard 🔴.
- **Overall progress bar:** X/N Lots livrés.
- **AI Consolidation status:** "En attente (X/N)" / "En cours..." / "Terminé ✅".
- **Actions (client):** "Voir le livrable final" (when available), "Valider" / "Demander une révision".

#### Lot Delivery Page (`/lots/[id]`) — Expert only
- **Lot summary:** Title, description, deliverable criteria, deadline countdown.
- **Delivery form:** Rich text editor (for written deliverable) OR file upload OR both.
- **Submit button:** "Livrer ma contribution".
- **Status display:** Current lot status + any client feedback (if revision round).

#### Admin Expert Dossier (`/admin/experts/[id]`)
- **Left panel:** Expert profile preview (as clients will see it).
- **Right panel:**
  - Validation status badge + history.
  - Uploaded documents (inline PDF/image viewer, fullscreen option).
  - Validation notes (admin textarea).
  - Action buttons: "Valider ✅" / "Rejeter ❌" (requires note) / "Suspendre ⏸".
  - Previous validation history log.

#### Admin Analytics (`/admin/analytics`)
- **KPI cards (top row):** Total users, Total experts (validated), Total consultations (this month), Platform revenue (this month), Average satisfaction score.
- **Charts:**
  - Consultations over time (line chart, last 30 days).
  - Revenue by domain (bar chart).
  - Expert validation queue trend (area chart).
  - Satisfaction score distribution (horizontal bar).
- **Tables:**
  - Top 10 experts by consultations.
  - Top 10 clients by missions.
  - Most requested domains.

#### Settings Pages
- `/settings/profile`: Edit first/last name, avatar upload, city, bio (if expert).
- `/settings/preferences` (client): Budget preference, personality tags, confidentiality preference, preferred language.
- `/settings/expert-profile`: Bio, domains, hourly/flat rate, languages, city.
- `/settings/availability`: Interactive weekly calendar to set/edit availability slots + immediate toggle.
- `/settings/certifications`: Manage certification documents (add, remove, resubmit for validation).
- `/settings/security`: Change password form, delete account (with confirmation modal: "Cette action est irréversible. Toutes vos données personnelles seront supprimées.").

#### Notification Center (`/notifications`)
- **Tabs:** Toutes / Non lues / Consultations / Paiements / Système.
- **List:** Each notification: icon (type-specific emoji), title, body, time ago, unread dot.
- Click → navigate to `action_url`. Marks as read.
- "Tout marquer comme lu" button.
- Infinite scroll or pagination (20 per page).

#### Earnings Page (`/earnings`) — Expert only
- **Summary cards:** This month's earnings, Last month, Total all-time, Pending payments.
- **Chart:** Monthly earnings bar chart (last 12 months).
- **Transactions table:** Date, client (anonymized), type (consultation/lot), duration/lot title, amount, commission, net payout, status.
- **Export:** "Télécharger CSV" button for accounting purposes.

---

## PART 5: Out of Scope (PFE Demo)

| Feature | Rationale | Future |
|---------|-----------|--------|
| CMI Payment Integration | Technical complexity | Commercial launch |
| Push notifications (mobile) | In-app only | React Native app |
| Email notifications | In-app only | Resend / SendGrid |
| GPS / map integration | Manual text input sufficient | Google Maps API |
| Full Arabic i18n | French only | Full RTL support |
| Advanced MLOps pipeline | Static AI calls | Continuous model retraining |
| CNDP/RGPD compliance workflow | UI reference only | Full legal compliance suite |
| Automated KYC | Manual document review | KYC API integration |
| Video session recording | Not implemented | S3 storage |
| Expert earnings bank payout | Recorded in DB only | Stripe Connect |
| Mobile native app | Web responsive only | React Native |
| Multi-language admin | French only | Full i18n |
| Automated TURN server | Google STUN only | Coturn self-hosted |

---

## APPENDIX A: Cursor Setup Instructions

### `.cursorrules` file (place at project root)

```
You are building SOS Expert, an AI-powered expert consultation platform.

TECH STACK:
- Next.js 14 (App Router) + TypeScript (strict mode)
- Tailwind CSS + shadcn/ui
- Supabase (Auth, PostgreSQL, Realtime, Storage)
- WebRTC via simple-peer
- Anthropic Claude API (claude-sonnet-4-6)
- Stripe (test mode)

ARCHITECTURE RULES:
- Use server components by default
- Use client components ONLY for: interactivity, hooks, WebRTC, Supabase Realtime subscriptions
- Mark client components with "use client" directive
- All Anthropic API calls: server-side only (/app/api/ routes). Never expose ANTHROPIC_API_KEY to client.
- All Stripe secret calls: server-side only.
- Use Supabase service role key ONLY in admin routes.

FILE STRUCTURE:
/app                    → Next.js App Router pages
/app/api               → API routes (server-side)
/app/api/ai/match      → AI matching engine
/app/api/ai/crowdsource → Crowdsourcing orchestration
/app/api/ai/consolidate → Lot consolidation
/components/ui         → shadcn/ui components
/components/           → Custom components
/lib/supabase          → Supabase client (server + client)
/lib/webrtc.ts         → WebRTC utilities
/lib/stripe.ts         → Stripe utilities
/hooks/                → Custom React hooks
/types/                → TypeScript interfaces (generated from Supabase + custom)
/utils/                → Helper functions

CODING STANDARDS:
- Always handle loading states (skeleton loaders)
- Always handle error states (toast notifications via sonner)
- Use React Query or SWR for data fetching + caching
- Generate Supabase types: supabase gen types typescript --project-id YOUR_ID > types/supabase.ts
- Apply RLS policies: every table has RLS enabled
- Use Supabase Realtime for: chat messages, notification updates, WebRTC signaling, consultation request countdown
- Use optimistic updates for: message sending, like/unlike, status toggles

DESIGN:
- Mobile-first responsive design
- Primary color: #0A1628, Accent: #2563EB
- Font: Inter (body), Space Grotesk (headings)
- Use shadcn/ui components as base, customize with Tailwind
- All forms use react-hook-form + zod validation
- All data tables use TanStack Table

KEY BUSINESS RULES TO ENFORCE:
- Experts invisible until validation_status = 'validated'
- Anthropic API called per mission, never cached per client-expert pair
- Each expert in crowdsourcing sees only their own Lot (RLS enforced)
- Certification files in private Supabase bucket (never public URL)
- Immediate consultation requests expire after 5 minutes (Edge Function)
- Payment processed before session files become permanently accessible
```

### Recommended Build Order for Cursor

1. Database schema + RLS policies (paste SQL from spec)
2. Supabase type generation
3. Auth flow (login, register, onboarding)
4. Client dashboard + mission creation form
5. AI matching API route + recommendation display
6. Expert profile pages + search
7. Consultation flow (chat first, then video)
8. Payment integration (Stripe)
9. Crowdsourcing flow (decomposition + Lot delivery + consolidation)
10. Admin panel (validation queue + analytics)
11. Notifications system
12. Settings pages + earnings page
13. Landing page
14. Polish: loading states, error handling, mobile responsiveness

---

## APPENDIX B: Glossary

| Term | Definition |
|------|-----------|
| **Client** | User who posts missions and purchases expert consultations |
| **Expert** | Certified professional offering consultation services |
| **Mission** | Client's request for expert assistance (simple or complex) |
| **Recommendation** | AI-generated expert suggestion for a mission |
| **Compatibility Score** | 0–100 AI score representing expert–mission match quality |
| **Consultation** | A live session between client and expert (chat/video/audio) |
| **Crowdsourcing Session** | AI-orchestrated parallel work by multiple experts |
| **Lot** | An independent sub-task within a crowdsourcing session |
| **Essaim** | The group of experts assigned to one crowdsourcing session |
| **Consolidation** | AI process of merging all Lot deliverables into one output |
| **Neuro Stage** | LLM-based semantic analysis and candidate generation |
| **Symbolic Stage** | Rule-based filtering and constraint verification |
| **Validation Status** | Admin-controlled expert account status |
| **Immediate consultation** | Real-time on-demand session |
| **Scheduled appointment** | Pre-booked session at chosen date/time |
| **Platform commission** | 15% fee deducted from each transaction |
| **Expert payout** | 85% of transaction amount paid to expert |

---

*Document Version: 2.0 — Full Coverage*
*Status: Ready for PFE Implementation*
*Platform: SOS Expert — FST Tanger, Université Abdelmalek Essaadi — 2025/2026*
