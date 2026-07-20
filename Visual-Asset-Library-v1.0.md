# Visual Asset Library v1.0
*Phase 3.5 deliverable — pairs with `Presentation-Design-Standard-v1.0.md`.*
**For:** every deck produced in Phase 4 (and every future course at this academy).
**Status:** ✅ APPROVED (owner-endorsed, 2026-07-18). Companion to the Presentation Design Standard.
**Rule:** *Draw something once. Reuse it everywhere.* If a visual appears on more than one deck, it lives here and is embedded — never recreated per slide.

---

## 0. Purpose
The Presentation Design Standard defines *how* slides look. This library defines *what visuals* exist and *where the canonical copy lives*, so 20-30 decks reuse the same building blocks instead of redrawing them. This is what makes every deck look like it came from one academy.

Every asset below is a **single source of truth**. A deck references/embeds the asset; it does not reinvent it. When an asset improves, it improves everywhere at once.

---

## 1. Signature Diagrams (course-level — recur across days)
These are the "hero" diagrams. Introduced once, reused from different lenses. **Keep the layout, colors, and labels identical in every appearance** — only the annotation/lens changes. Canonical copies live in `diagrams/` and are the files of record.

### 1.1 — "How a Web Page Loads" (7 steps) · Module 1 signature
- **File of record:** `diagrams/page-load-signature.md`
- **Introduced:** Day 4 (concept / happy path).
- **Recurs on:** Day 4 · Week 1 Assignment · Day 13 (packets on wire) · Day 16 (where it breaks) · Day 19 (where it's anomalous).
- **Canonical visual (do not alter between days):**
```
 [1] You type example.com + Enter        (ethics: you're authorized)
          │
 [2] DNS resolves name → IP               (directory lookup)
          │
 [3] TCP three-way handshake → :443       (SYN / SYN-ACK / ACK)
          │
 [4] HTTP GET sent INSIDE TLS (encrypted)
          │
 [5] Server returns HTML (encrypted in transit)
          │
 [6] Browser fetches assets (images/CSS/JS) — more requests
          │
 [7] Page rendered & usable
```
- **Reuse rule:** same 7-step layout/colors/numbers everywhere; only the day's lens is annotated (see the file's perspective-overlay table).

### 1.2 — "The OS Stack" (User → Shell → OS → Hardware) · Module 2 signature
- **File of record:** `diagrams/os-signature.md`
- **Introduced:** Day 6. **Recurs on:** Day 6–10 (each with its own lens).
- **Canonical visual (do not alter between days):**
```
        User   (identity on the staff roster)
          │    "who am I?"  →  whoami / id
          ▼
        Shell   (the walkie-talkie — text commands)
          │     Bash (Linux) | PowerShell (Windows)
          ▼
   Operating System   (the Manager — enforces the rules)
          │     checks the Key Cabinet (permissions) on every action
     ┌────┴────────┬──────────┐
     ▼             ▼          ▼
   CPU            RAM        Disk
  (Chef)     (Kitchen    (Pantry /
               counter)   Storage)
```
- **Metaphor (keep consistent):** Restaurant = computer · Manager = OS · Chef = CPU · counter = RAM · pantry = Disk · employees = processes · walkie-talkie = shell · key cabinet = permissions.

### 1.3 — Reserved signature slots (to be drawn as Phase 4 builds those decks)
These diagrams recur in Module 3/4 and should become canonical assets the same way:
- **IR Lifecycle loop** (Prepare → Detect → Contain → Eradicate → Recover → Lessons) — Day 19 + Week 4 capstone.
- **CIA Triad** (Confidentiality / Integrity / Availability) — Day 11, recurs across Days 14/16/17/18.
- **Risk = Likelihood × Impact** — Day 11.
- **Untrusted-Input Lens** (input → boundary → trust decision → effect) — Day 11, recurs in Days 13/14/16.
- **Attack + Defend duality** (red arrow in / green control out) — every attack day (16/17/18/19).
When first drawn in Phase 4, capture the canonical copy here and in `diagrams/`.

---

## 2. Icon Set
- **Style:** flat, single-color line icons (Lucide / Feather family). One consistent set academy-wide.
- **Color:** `--primary` (blue) default; `--muted` for decorative; `--warning`/`--success` only when the icon denotes risk/safety.
- **Size:** 24–48px on-slide; never pixelated (use SVG/PNG at 2x).
- **Core icon vocabulary (reuse these, don't invent new ones per deck):**
  | Meaning | Icon |
  |---------|------|
  | Concept / idea | lightbulb |
  | Definition | book |
  | Warning / danger | triangle |
  | Remember | star/bell |
  | Pro Tip | lightbulb (accent) |
  | Lock / security | lock |
  | Network | globe / router |
  | Code | `</>` |
  | Cloud | cloud |
  | Monitor / detect | radar/eye |
  | Process / fix | wrench |
  | Career | briefcase |

---

## 3. Symbol Libraries (for diagrams)
Consistent shapes for recurring subjects — a student recognizes the symbol instantly across days.

### 3.1 Network symbols
- **Host/PC:** rectangle with monitor glyph.
- **Server:** taller rectangle, stacked lines.
- **Router/firewall:** rounded rectangle labeled `R` / `FW`; firewall drawn with a brick/lock hatch.
- **Cloud boundary:** dashed ellipse labeled "Internet"/"Cloud".
- **Attacker:** red figure/diamond; **Defender:** green shield.

### 3.2 Cloud symbols (Day 18)
- **Provider boundary:** large dashed rounded rectangle (the "building" / shared responsibility).
- **Your unit:** solid rounded rectangle inside (the "apartment").
- **IAM:** key glyph. **Storage bucket/volume:** cylinder. **Security group:** shield-with-ports.
- **Misconfig cue:** red "open" marker on a port/bucket.

### 3.3 OS symbols (Day 6-10)
- Reuse the OS-stack boxes (§1.2). Process = small square "P"; User = person glyph; Permission = key cabinet.

### 3.4 Attack/Defense arrows
- **Attack arrow:** solid `--warning` (red), arrowhead filled, slight jagged if denoting an exploit path.
- **Defend arrow / control:** solid `--success` (green), arrowhead filled.
- **Flow arrow (neutral):** 2px `--muted`, straight/elbow.
- **This mapping is fixed academy-wide** (per Presentation Design Standard §2).

---

## 4. Color-Coded Legends (reusable footer/sidebar)
Standard legend blocks to drop on any diagram slide:
- **Attack vs Defend:** ⬛ red = attack · 🟩 green = defense.
- **CIA:** 🔵 Confidentiality · 🟠 Integrity · 🟢 Availability (map to token colors).
- **Lens key (for signature diagrams):** "same diagram — <Day>'s lens" caption.

---

## 5. Reusable Comparison Tables
Template tables (styled per Standard §1/§3) reused across decks:
- **Attack vs Defense** (two columns, red/green header).
- **Before / After fix** (vulnerable → hardened).
- **Tool → What it makes visible** (ties to the "concept first, tool second" pedagogy; e.g., Nmap→open ports, Wireshark→packets, Nuclei→web vulns).
- **Week progression** (Guided → Less guided → Scenario → Mini-capstone).

---

## 6. Asset Governance
- **Add an asset here the first time it's needed on >1 deck.** Give it a canonical file (`diagrams/` for diagrams; `assets/` for icons/symbols if binaries are used).
- **Never** redraw a library asset inline in a deck — reference/embed the canonical copy.
- **Version:** when an asset changes, bump its version here and note the change; all decks inherit it on next regenerate (decks are Markdown-sourced, so regeneration is cheap).
- **Scope:** this library starts with the two real signature diagrams + the symbol/legend system; it grows as Phase 4 produces decks. That growth *is* the asset library maturing.

---

## Version History
- **v1.0** — Created as Phase 3.5 deliverable (owner-endorsed 2026-07-18), companion to `Presentation-Design-Standard-v1.0.md`. Catalogs the two existing signature diagrams (page-load pipeline, OS stack) with their files of record and reuse rules; defines the icon set, network/cloud/OS symbol libraries, the fixed attack=red/defend=green arrow convention, color-coded legends, and reusable comparison-table templates. Establishes the "draw once, reuse everywhere" rule and asset governance. Reserved slots noted for the Module 3/4 signature diagrams (IR loop, CIA triad, risk, untrusted-input) to be captured canonically as Phase 4 builds those decks.
