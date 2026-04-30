# � InvestiGraph — Knowledge Graph & GraphRAG für Ermittlungen (Demo)

Interaktive 3D-Visualisierung eines polizeilichen Wissensgrafen am Beispiel der **Operation Hydra** (Zerschlagung des weltweit größten Darknet-Marktplatzes). Generischer Demonstrator für **Knowledge Graph** und **GraphRAG** in Ermittlungs-Use-Cases — keine Produktwerbung, fiktiver Beispielfall.

![Entitäten](https://img.shields.io/badge/Entitäten-81-blue) ![Beziehungen](https://img.shields.io/badge/Beziehungen-110-green) ![STIX 2.1](https://img.shields.io/badge/STIX-2.1-orange) ![XPolizei](https://img.shields.io/badge/XPolizei-2.0-red)

---

## Was ist das?

Dieses Demo zeigt, wie ein **Knowledge Graph** komplexe, grenzüberschreitende Ermittlungsfälle strukturiert darstellen kann. Es illustriert eine **Multi-Layered Ontologie-Architektur** mit vier Schichten:

| Schicht | Name | Beschreibung |
|---------|------|-------------|
| 1 | **Normative Schicht** | Hierarchie der Rechtsquellen — EU-Recht, Grundgesetz, StPO, Landespolizeigesetze |
| 2 | **Zeitliche Dimension** | Versionierung und Gültigkeitsprüfung von Gesetzesfassungen, Fristen, Verjährung |
| 3 | **Prozedurale Zustandsmaschine** | Ermittlungsverfahren als formale Prozesse mit Zuständen und Übergängen |
| 4 | **Fallbezogener Overlay** | Konkrete Fakten: Personen, Beweismittel, Transaktionen, Kommunikationsdaten |

## Features

- **Interaktiver 3D-Knowledge-Graph** — 81 Entitäten, 110 Beziehungen, 18 Knotentypen mit Force-Directed Layout
- **Detailpanel** — Klick auf jeden Knoten zeigt Ermittlungsdetails, Verbindungsstatistik, Quellen
- **Relationen-Labels** — Beziehungstypen direkt auf den Kanten sichtbar
- **Polizei-Briefing** — ElevenLabs-generierte Sprachausgabe (deutsche Männerstimme „Otto")
- **Standards-Sektion** — STIX 2.1, ISO 27037/27042, NIST 800-86, DSGVO, NIS2, XPolizei 2.0
- **Best Practices** — Chain of Custody, Blockchain-Forensik, strukturierte Ermittlungsführung
- **Grenzüberschreitende Kooperation** — Europol, JCODE, Eurojust, MLATs, Interpol
- **Responsive Design** — Dark Mode, optimiert für Desktop und Tablet

---

## Tech Stack

| Technologie | Version | Zweck |
|-------------|---------|-------|
| React | 19 | UI-Framework |
| TypeScript | 5.7 | Typsicherheit |
| Vite | 7 | Build-Tool (SWC) |
| Tailwind CSS | 4 | Styling (oklch Farbsystem) |
| shadcn/ui | — | UI-Komponentenbibliothek (Radix UI) |
| react-force-graph-3d | 1.29 | 3D-Graph-Visualisierung |
| three.js | 0.175 | WebGL-Rendering |
| framer-motion | 12.6 | Animationen |
| ElevenLabs API | v1 | Text-to-Speech (Buildzeit) |

---

## Schnellstart

```bash
# Repository klonen
git clone <repo-url>
cd graph-investigation

# Dependencies installieren
npm ci

# Entwicklungsserver starten (Port 5000)
npm run dev

# Produktions-Build erstellen
npm run build

# Linting
npm run lint
```

> **Voraussetzung:** Node.js 22+

---

## Projektstruktur

```
├── src/
│   ├── App.tsx                          # Haupt-SPA (~1273 Zeilen) — alle Sektionen + Narration
│   ├── components/
│   │   ├── PoliceKnowledgeGraph3D.tsx   # 3D-Knowledge-Graph (~1075 Zeilen)
│   │   └── ui/                          # 46 shadcn/ui-Komponenten
│   ├── hooks/use-mobile.ts              # useIsMobile() Hook
│   ├── lib/utils.ts                     # cn() Hilfsfunktion (clsx + tailwind-merge)
│   ├── styles/theme.css                 # Radix-Farbskalen, Spark-Theme-Variablen
│   ├── main.css                         # Tailwind v4 Entry, Design-Tokens
│   └── index.css                        # oklch-Farben, Hero-Pattern, Network-Pattern
├── input/                               # Quelldaten für den Graphen
│   ├── hydra_graph_data (1).json        # Angereicherte Daten (81 Knoten, 110 Relationen)
│   ├── hydra_graph_data.json            # Originaldaten
│   ├── hydra_neo4j_import*.cypher       # Neo4j-Import-Skripte
│   ├── hydra_nodes*.csv                 # Knoten-CSVs
│   └── hydra_relationships*.csv         # Relationen-CSVs
├── public/audio/
│   └── hydra_briefing.mp3              # ElevenLabs-Narration (Otto-Stimme, deutsch)
├── scripts/                            # Python-Hilfsskripte
│   ├── find_voices.py                  # ElevenLabs-Stimmensuche
│   ├── generate_narration.py           # Audio-Generierung (Otto, eleven_multilingual_v2)
│   ├── generate_hydra_voice.py         # Erweiterte TTS-Generierung
│   └── generate_graph_code.py          # JSON → TypeScript buildCaseData()-Konvertierung
├── .github/
│   ├── copilot-instructions.md         # Projekt-Richtlinien für GitHub Copilot
│   ├── dependabot.yml                  # Dependabot-Konfiguration
│   └── workflows/deploy.yml           # GitHub Pages Deployment (Node 22)
├── check-console.mjs                  # Playwright: Konsolen-Fehler-Logger
├── test-graph.mjs                     # Playwright: Headless-Screenshot + Pixelanalyse
├── vite.config.ts                     # Vite: base '/graph-investigation/', Plugins, Path-Alias
└── tsconfig.json                      # TypeScript: ES2020, strictNullChecks, bundler
```

---

## Wichtige Dateien und Funktionen

### `src/App.tsx` — Haupt-Applikation

Die Single-Page-App enthält alle scroll-basierten Sektionen:

| Sektion | Beschreibung |
|---------|-------------|
| **Hero** | Landing mit animiertem Hintergrund und Intro-Guide |
| **Challenges** | Herausforderungen der Strafverfolgung mit Statistiken |
| **Features** | 6 Feature-Cards mit Animationen |
| **Architektur** | 4-Schichten-Ontologie-Modell + eingebetteter 3D Knowledge Graph |
| **Praxisszenarien** | 4 Ermittlungsszenarien als Tabs |
| **Standards & Compliance** | 15 Standards in 3 Kategorien (International, EU, National) |
| **Best Practices** | 4 Kategorien mit 20 Ermittlungs-Best-Practices |
| **Grenzüberschreitende Kooperation** | 3 Säulen + Lessons Learned |
| **CTA** | Call-to-Action mit Sprung zur Architektur-Sektion |
| **Footer** | Generischer Demo-Hinweis |

**Schlüsselfunktionen:**
- `toggleNarration()` — Startet/stoppt die ElevenLabs-Audio-Narration
- `scrollToSection(id)` — Smooth-Scroll zur jeweiligen Sektion
- State: `selectedLayer`, `activeScenario`, `showIntroGuide`, `isPlayingNarration`

### `src/components/PoliceKnowledgeGraph3D.tsx` — 3D-Knowledge-Graph

Die Kernkomponente des Projekts mit self-contained Daten und Rendering:

**18 Knotentypen:**
```
suspect · victim · witness · case · evidence · location · communication
law · organization · account · vehicle · weapon · drug · digital
regulation · process · sop · anzeige
```

**Schlüsselfunktionen:**
- `buildCaseData()` — Erzeugt alle 81 Knoten und 110 Relationen mit deutschen Ermittlungsdetails
- `nodeThreeObject()` — Custom 3D-Rendering jedes Knotens (Sphäre + Label)
- `linkThreeObject()` — Relationstyp-Labels auf allen Kanten
- `onNodeClick()` / `onNodeHover()` — Interaktion: Selektion und Highlighting
- `navigateToNode()` — Kamera-Animation zu einem Knoten
- `renderGroup()` — Kategorisierte Beziehungsdarstellung im Detailpanel

**Datenstruktur:**
```typescript
interface GraphNode {
  id: string; label: string; type: NodeType; description: string
  details?: Record<string, string>  // z.B. { 'Nationalität': 'Russisch', 'Urteil': 'Lebenslänglich' }
  timestamp?: string; score?: number
}
interface GraphLink {
  source: string; target: string; type: string; description?: string
}
```

**Konfigurationsobjekte:**
- `NODE_COLORS` — oklch-Farben pro Knotentyp
- `NODE_LABELS` — Emoji + deutscher Label pro Typ (z.B. `🔴 Verdächtiger`)
- `SOURCE_REGISTRY` — Quellen-URLs pro Knoten-ID

### `input/hydra_graph_data (1).json` — Angereicherte Quelldaten

81 Knoten und 110 Relationen mit:
- `sources[]` — Quellenreferenzen (OFAC, BKA, DOJ, Chainalysis, Elliptic, TRM Labs, Gwern)
- `stix_type` — STIX 2.1 SDO-Mapping (z.B. `threat-actor`, `infrastructure`)
- `xpolizei_type` — XPolizei 2.0 Typ-Mapping
- `applicable_standards[]` — ISO 27037, ISO 27042, NIST 800-86, EO 13694

### `scripts/generate_narration.py` — Audio-Generierung

Generiert das Polizei-Briefing per ElevenLabs REST API:
- **Stimme:** Otto (native German male, warm narrator)
- **Modell:** `eleven_multilingual_v2`
- **Output:** `public/audio/hydra_briefing.mp3`
- **Benötigt:** `ELEVENLABS_API_KEY` in `.env`

### `scripts/generate_graph_code.py` — JSON→TypeScript-Konvertierung

Liest die angereicherte JSON-Datei und generiert TypeScript-Code für `buildCaseData()`.

---

## Datenmodell

### 81 Entitäten (Knoten)

| Typ | Anzahl | Beispiele |
|-----|--------|----------|
| Organisationen | 19 | BKA, OFAC, FBI, JCODE, OMG Market, Sinaloa-Kartell |
| Prozesse/Events | 12 | Hydra-Gründung, Seizure, OFAC-Sanktionen |
| Verdächtige | 11 | Stanislav Moiseyev, Dmitry Pavlov, DarkSide, Conti |
| Standorte | 10 | Russland, Deutschland, USA, Federation Tower |
| Digitale Assets | 7 | Bitcoin-Mixer, Tor-Netzwerk, Ransomware-as-a-Service |
| Konten/Börsen | 7 | Garantex, SUEX, CHATEX, Bitpapa, Cash-Out |
| Gesetze | 3 | Moskauer Regionalgericht, EO 13694 |
| Beweismittel | 3 | Beschlagnahmte BTC, gefälschte Dokumente, Falschgeld |
| Opfer | 2 | Colonial Pipeline, Bitfinex |
| Drogen | 2 | Drogenverkauf, Dead-Drop Lieferung |
| Fälle | 2 | Hydra Market, AlphaBay |
| Weitere | 3 | Zeuge, Regulierung, Kommunikation |

### 110 Beziehungen (Kanten)

Beziehungstypen u.a.: `betrieb`, `ermittelt_gegen`, `sanktionierte`, `nutzt_für_geldwäsche`, `operiert_von`, `beschlagnahmte`, `verurteilte`, `nachfolger_von`

---

## Graphen erstellen und erweitern

Der Knowledge Graph hat **zwei unabhängige Repräsentationen**, die manuell synchron gehalten werden müssen:

| Datei | Format | Zweck |
|-------|--------|-------|
| `input/hydra_graph_data (1).json` | JSON | Kanonische Quelldaten (81 Knoten, 110 Relationen) mit STIX/XPolizei-Anreicherung |
| `src/components/PoliceKnowledgeGraph3D.tsx` | TypeScript | Hardcodierte `buildCaseData()`-Funktion, direkt vom Browser gerendet |
| `input/hydra_neo4j_import (1).cypher` | Cypher | Neo4j-Import-Script (für externe Graph-DB-Nutzung) |

### Datenfluss

```
input/hydra_graph_data (1).json
        │
        ▼
python3 scripts/generate_graph_code.py   ← TYPE_MAP + DESC_MAP definieren
        │  (gibt TypeScript-Code auf stdout aus)
        ▼
  Manuelles Einfügen in buildCaseData()
  in PoliceKnowledgeGraph3D.tsx
        │
        ▼
  Browser rendert 3D-Graph via react-force-graph-3d
```

### JSON-Datenstruktur

#### Knoten-Objekt

```json
{
  "id": "moiseyev",
  "label": "Stanislav Moiseyev",
  "type": "Person",
  "nationality": "Russian",
  "sentence": "life imprisonment",
  "sentence_date": "2024-12-02",
  "convicted_of": "criminal organization, drug production/trafficking",
  "sources": ["RUSSIAN_COURT_2024", "BKA", "DOJ"],
  "stix_type": "threat-actor",
  "xpolizei_type": "NatuerlichePerson",
  "applicable_standards": ["ISO_27037", "NIST_800-86"]
}
```

Pflichtfelder: `id` (eindeutig), `label` (Anzeigename).  
Optionale Anreicherungsfelder: `sources[]`, `stix_type`, `xpolizei_type`, `applicable_standards[]`.  
Alle anderen Felder werden als Details-Properties ins Detailpanel übernommen.

#### Beziehungs-Objekt

```json
{
  "source_id": "moiseyev",
  "target_id": "hydra_market",
  "relationship_type": "FOUNDED_AND_OPERATED",
  "date": "2015",
  "details": "Gründer und Hauptbetreiber",
  "stix_relationship_type": "attributed-to",
  "applicable_standards": ["ISO_27042"],
  "sources": ["BKA", "DOJ"]
}
```

#### Quellen-Referenz (metadata.sources)

```json
{
  "BKA": {
    "title": "BKA Pressemitteilung: Hydra Market — Weltweit größter illegaler Darknet-Marktplatz abgeschaltet",
    "date": "2022-04-05",
    "url": "https://www.bka.de/...",
    "type": "Government Press Release"
  }
}
```

---

### Neuen Knoten hinzufügen

#### Option A: Direkt in TypeScript (kleine Änderungen)

1. Neuen Eintrag in das `nodes`-Array in `buildCaseData()` einfügen:

```typescript
{ id: 'new_entity', label: 'Neuer Akteur', type: 'organization',
  description: 'Kurzbeschreibung für Detailpanel',
  details: { 'Land': 'Deutschland', 'Rolle': 'Behörde' } },
```

2. Neue Beziehung(en) in das `links`-Array einfügen:

```typescript
{ source: 'new_entity', target: 'hydra_market', type: 'ermittelte', description: 'Seit 2022' },
```

3. Falls Quellenreferenzen benötigt werden, `SOURCE_REGISTRY` ergänzen:

```typescript
'new-entity-key': [{ title: 'Quelle', url: 'https://...' }],
```

#### Option B: Via JSON-Quelldaten + Code-Generator (empfohlen bei größeren Änderungen)

**Schritt 1 — JSON erweitern**

Neuen Knoten in `input/hydra_graph_data (1).json` unter `"nodes"` einfügen und `metadata.node_count` hochzählen. Neue Beziehungen unter `"relationships"` einfügen und `metadata.relationship_count` hochzählen.

**Schritt 2 — TYPE_MAP ergänzen** (`scripts/generate_graph_code.py`, Zeile ~16)

```python
TYPE_MAP = {
    ...
    "new_entity": "organization",    # NodeType-Mapping für PoliceKnowledgeGraph3D
}
```

**Schritt 3 — DESC_MAP ergänzen** (`scripts/generate_graph_code.py`, Zeile ~175)

```python
DESC_MAP = {
    ...
    "new_entity": "Kurzbeschreibung als deutsche Zeichenkette",
}
```

**Schritt 4 — Code generieren**

```bash
python3 scripts/generate_graph_code.py > /tmp/graph_code.txt
```

Der Output enthält zwei Blöcke:

```
// === GENERATED NODES ===
{ id: 'hydra_market', label: '...', type: 'case', description: '...', details: {...} },
...

// === GENERATED RELATIONSHIPS ===
{ source: 'moiseyev', target: 'hydra_market', type: '...', description: '...' },
...
```

**Schritt 5 — In TypeScript einfügen**

In `src/components/PoliceKnowledgeGraph3D.tsx`:
- Den generierten `GENERATED NODES`-Block ersetzen den Inhalt von `const nodes: GraphNode[] = [...]`
- Den generierten `GENERATED RELATIONSHIPS`-Block ersetzen den Inhalt von `const links: GraphLink[] = [...]`

---

### Neuen Knotentyp hinzufügen

Neue `NodeType`-Werte erfordern Änderungen an drei Stellen in `PoliceKnowledgeGraph3D.tsx`:

**1. Type-Union** (Zeile 10):
```typescript
type NodeType = 'suspect' | 'victim' | ... | 'neuer_typ'
```

**2. `NODE_COLORS`** — Farbe im oklch-Format:
```typescript
const NODE_COLORS: Record<NodeType, string> = {
  ...
  neuer_typ: '#8b5cf6',
}
```

**3. `NODE_LABELS`** — Emoji + deutscher Label:
```typescript
const NODE_LABELS: Record<NodeType, string> = {
  ...
  neuer_typ: '🏷️ Neuer Typ',
}
```

---

### Neo4j-Export

Die Datei `input/hydra_neo4j_import (1).cypher` enthält alle Knoten und Beziehungen als Cypher-Statements für den direkten Import in eine Neo4j-Instanz:

```bash
# Neo4j-Import (lokal):
cypher-shell -u neo4j -p password < "input/hydra_neo4j_import (1).cypher"

# Oder via Neo4j Browser: Datei kopieren und im Query-Editor ausführen
```

---

### Schnellreferenz: Alle Dateipfade

| Aufgabe | Datei |
|---------|-------|
| Knoten/Relationen hinzufügen (Quelle) | `input/hydra_graph_data (1).json` |
| TypeScript-Code neu generieren | `python3 scripts/generate_graph_code.py` |
| Graph-Komponente direkt bearbeiten | `src/components/PoliceKnowledgeGraph3D.tsx` |
| Farben/Labels neuer Typen | `NODE_COLORS` / `NODE_LABELS` in obiger Datei |
| Quellenreferenzen pflegen | `SOURCE_REGISTRY` in obiger Datei |
| Neo4j-Import | `input/hydra_neo4j_import (1).cypher` |

---

## Deployment

Das Projekt wird automatisch über **GitHub Actions** auf **GitHub Pages** deployt:

1. Push auf `main` → `.github/workflows/deploy.yml` triggert
2. `npm ci` → `npm run build` → `dist/` wird deployt
3. Erreichbar unter dem konfigurierten GitHub-Pages-Pfad (siehe `vite.config.ts` `base`).

---

## Umgebungsvariablen

| Variable | Datei | Zweck |
|----------|-------|-------|
| `ELEVENLABS_API_KEY` | `.env` | ElevenLabs TTS API-Key (nur für `scripts/*.py`) |

> `.env` ist in `.gitignore` — niemals API-Keys committen.

---

## Standards & Normen

Das Projekt integriert folgende Standards für polizeiliche Ermittlungsarbeit:

- **STIX 2.1** (OASIS) — Structured Threat Intelligence eXpression
- **XPolizei 2.0** — Deutscher Polizei-Interoperabilitätsstandard
- **ISO 27037** — Digitale Beweissicherung
- **ISO 27042** — Analyse digitaler Beweismittel
- **NIST SP 800-86** — Forensische Techniken
- **EO 13694** — US-Sanktionsgrundlage für Cyber-Aktivitäten
- **DSGVO** — Datenschutz-Grundverordnung
- **NIS2** — EU-Cybersicherheitsrichtlinie
- **StPO** — Deutsche Strafprozessordnung

---

## Sicherheit

- Alle Falldaten sind **fiktiv** — Adressen mit `XXX` geschwärzt, Aktenzeichen erfunden
- Sicherheitslücken bitte über `opensource-security@github.com` melden
- DSGVO/NIS2-Referenzen sind rechtlich korrekt
- API-Keys werden nur zur Buildzeit verwendet, nicht zur Laufzeit

## Lizenz

MIT License — siehe [LICENSE](LICENSE)
