# VERNOX VISION // TYPE SYSTEM SPECIFICATION

> **DOCUMENT ID**: `VV-TYPE-SPEC-2026-REV3`  
> **CLASSIFICATION**: Hardware Editorial Product Typography System  
> **AESTHETIC REFERENCE**: Teenage Engineering Precision Systems Design  
> **STATUS**: PRODUCTION READY (100% TEST PASS RATE)

---

## 1. THE FOUR VOICES (STRICT SYSTEM ARCHITECTURE)

Vernox Vision operates on an uncompromising four-voice typographic hierarchy. No fifth font is permitted. System fallbacks (Arial, Helvetica Neue, ui-monospace) exist solely as zero-CLS metric-matched overrides and are never rendered as a visible design choice.

| Voice | Family | Weight / Axis Specification | Usage Scope | Forbidden Usages |
| :--- | :--- | :--- | :--- | :--- |
| **1. DISPLAY** | **Archivo** *(Variable)* | `wdth 125`, `wght 800–900`<br>`font-stretch: 125%` | Hero headlines, room headers, stage banners, section markers | Never for body copy, never centered, never with text gradients or shadows |
| **2. BODY / NAV** | **Outfit** | `wght 300` (primary)<br>`wght 400` (body paragraphs) | Editorial copy, narrative paragraphs, column navigation, button secondary text | Never for model codes, never uppercase tracked |
| **3. LABELS / SPECS** | **JetBrains Mono** | `wght 400`, `wght 500`<br>`letter-spacing: 0.06em` | Hardware model codes (`VV—01`), spec tables, ports, counters, timestamps, license notes | Never for long reading passages |
| **4. LCD** | **DSEG7 Classic** | `wght 400` (Regular)<br>7-segment glyph subset | `$9.99` price display, clip count readouts on unit faceplates, HookTimer pacer | **NEVER for words or alphabetical characters** |

---

## 2. LOADING & ZERO-CLS PERFORMANCE STRATEGY

### 2.1 Self-Hosted Origin Assets
All font files are self-hosted in `/public/fonts/` in optimized WOFF2 format. Runtime network requests to `fonts.googleapis.com` or `fonts.gstatic.com` are strictly eliminated and verified via automated Playwright network interception (Test T06).

- `/fonts/archivo-variable.woff2` (90 KB, full Latin + Latin Extended glyph set with variable width and weight axes)
- `/fonts/outfit-300.woff2` (13.9 KB)
- `/fonts/outfit-400.woff2` (14.0 KB)
- `/fonts/jetbrains-mono-400.woff2` (21.0 KB)
- `/fonts/jetbrains-mono-500.woff2` (21.8 KB)
- `/fonts/dseg7-classic-regular.woff2` (5.1 KB, subset to digits `0–9`, `$`, `.`, `:`, `,`, `-`, `+`, `/`)

### 2.2 Critical LCP Preload Strategy
Only **Archivo**—the Largest Contentful Paint (LCP) font—is preloaded in `<head>`:
```html
<link
  rel="preload"
  href="/fonts/archivo-variable.woff2"
  as="font"
  type="font/woff2"
  crossorigin="anonymous"
/>
```
Outfit, JetBrains Mono, and DSEG7 Classic use `font-display: swap` without preload to prevent initial bandwidth contention.

### 2.3 Metric-Matched Fallback Faces (Measured CLS < 0.02)
To guarantee zero visible layout shift prior to web font swap, metric-matched fallback faces are declared using CSS Font Metric Overrides:

```css
/* Archivo Metric Fallback */
@font-face {
  font-family: 'Archivo Fallback';
  src: local('Arial');
  size-adjust: 102%;
  ascent-override: 96%;
  descent-override: 22%;
  line-gap-override: 0%;
}

/* Outfit Metric Fallback */
@font-face {
  font-family: 'Outfit Fallback';
  src: local('Helvetica Neue'), local('Arial');
  size-adjust: 98%;
  ascent-override: 98%;
  descent-override: 24%;
  line-gap-override: 0%;
}

/* JetBrains Mono Metric Fallback */
@font-face {
  font-family: 'Mono Fallback';
  src: local('Courier New'), local('monospace');
  size-adjust: 96%;
  ascent-override: 102%;
  descent-override: 28%;
  line-gap-override: 0%;
}
```

---

## 3. DESIGN TOKENS & FLUID TYPE SCALE

All typographic sizes are driven by fluid `clamp()` tokens defined in `:root` and scaled smoothly across viewports from 360px mobile up to 1680px ultra-wide displays:

```css
:root {
  /* Font Family Stacks */
  --font-display: "Archivo", "Archivo Fallback", "Helvetica Neue", Arial, sans-serif;
  --font-body:    "Outfit", "Outfit Fallback", "Helvetica Neue", Arial, sans-serif;
  --font-mono:    "JetBrains Mono", "Mono Fallback", ui-monospace, monospace;
  --font-lcd:     "DSEG7 Classic", ui-monospace, monospace;

  /* Fluid Scale Tokens */
  --step-display-xl: clamp(3.25rem, 1.2rem + 11.5vw, 12rem);  /* Hero headline */
  --step-display-l:  clamp(2.5rem, 1rem + 8vw, 8rem);          /* Room section titles */
  --step-display-m:  clamp(1.75rem, 1rem + 4vw, 4rem);         /* Unit module names */
  --step-body-l:     clamp(1.125rem, 1rem + 0.5vw, 1.5rem);    /* Editorial lead paragraph */
  --step-body:       1rem;                                     /* Standard body copy */
  --step-label:      0.6875rem;                                /* 11px technical labels */
  --step-micro:      0.5625rem;                                /* 9px faceplate microcopy */
}
```

---

## 4. DISPLAY TYPE RULES (THE TE HARDWARE AESTHETIC)

Display type represents physical sheet metal stamping, inspired by industrial hardware equipment.

```css
.display {
  font-family: var(--font-display);
  font-stretch: 125%;
  font-variation-settings: "wdth" 125, "wght" 900;
  text-transform: uppercase;
  letter-spacing: -0.055em;
  line-height: 0.82;
  font-kerning: normal;
  text-wrap: balance;
  margin: 0;
}
```

### Essential Editorial Guidelines
1. **Colliding Baselines**: Display type uses a ultra-tight `line-height: 0.82`. Stacked lines almost touch, eliminating generous template line spacing.
2. **Optical Manual Kerning**: Large headlines feature manual span tracking adjustments:
   - Numerical pair tightening: `tracking-[-0.07em]` on `15,000`.
   - Hanging punctuation: `-ml-[0.08em]` on terminating full stops (`.`) to remove white space gaps.
3. **Hardware Signature Move (Cap-Height Solid Bar)**: A solid CSS rectangular bar (`h-[0.68em]`, aligned to Archivo's cap-height) replaces spaces or punctuation between words (`ZERO ▬ TIMELINES`).
4. **Solid Ink Rule**: Display headlines are pure solid ink (`--ink`). Gradients, outline strokes, text glows, and dropshadows are forbidden.
5. **No Orange on Display**: Accent orange (`#FF5A1F`) is reserved for LED indicators, labels, and micro details. Display type is strictly monochrome.
6. **Deliberate Breaks**: Line breaks are authored using explicit `<span className="line block">` tags rather than leaving wrapping to browser chance.

---

## 5. HARDWARE LCD NUMERAL SYSTEM

The `$9.99` price point, HookTimer readout, and unit asset counters are presented through authentic 7-segment digital displays (`<Lcd />` primitive):

### 5.1 Dual-Layer Illuminated Construction
Real hardware LCDs have physically etched unlit segments visible beneath active digits:
- **Layer 1 (Ghost Layer)**: `88.88` unlit segments rendered in `text-[#FF5A1F]/[0.08]` at 8% opacity with `aria-hidden="true"`.
- **Layer 2 (Illuminated Layer)**: High-contrast active amber (`#FF5A1F`) or phosphor green (`#34D399`) numerals.
- **Physical Bezel**: Recessed window styled with `border-[#2A231A]`, `bg-[#14120F]`, and `inset 0 2px 4px rgba(0,0,0,0.8)` shadow.

### 5.2 Accessibility Standard
Every `<Lcd />` module provides:
- `role="img"`
- An explicit `aria-label` attribute (e.g. `aria-label="$9.99 one-time payment"`)
- An inner visually hidden screen-reader span (`<span className="sr-only">`) containing the unformatted number.

### 5.3 Strict Segment Rule
**Never render alphabetical words with DSEG7 Classic**. Alphanumeric designations (e.g. `1080P`, `RAW`, `PORT: DRIVE`) strictly use JetBrains Mono (`<Label />`).

---

## 6. DO & DON'T RULES

### DO:
- ✅ Use `<Display as="h1" size="xl">` for hero titles with line breaks controlled via `<MaskLine>`.
- ✅ Enforce real em dashes (`VV—01`) for hardware model codes via `<Code number="01" />`.
- ✅ Use `<Label>` for technical ports, metadata, table headers, and spec descriptions.
- ✅ Rely on fluid clamp tokens (`var(--step-display-l)`) across all responsive breakpoints.
- ✅ Maintain a minimum contrast ratio of 7:1 (WCAG AAA) for all typography against room/stage backgrounds.

### DON'T:
- ❌ Do NOT introduce Inter, Roboto, Arial, or system-ui as visible typography choices.
- ❌ Do NOT apply signal orange to display headlines or large headers.
- ❌ Do NOT use generous line heights (e.g. `1.2` or `1.5`) on Archivo display headings.
- ❌ Do NOT center hero headlines. Display type is left-aligned and engineered to bleed purposefully.
- ❌ Do NOT spell out English words inside LCD segmented components.

---

## 7. PLAYWRIGHT QA TEST SUITE (T01–T12 VERIFICATION)

The automated test suite in `tests/typography.spec.ts` verifies:

| Test ID | Objective | Verified Result |
| :--- | :--- | :--- |
| **T01** | `document.fonts.check()` returns `true` for all 4 families | **PASS** (Archivo, Outfit, JetBrains Mono, DSEG7 Classic active) |
| **T02** | Computed `font-family` on `h1` starts with "Archivo" | **PASS** (`Archivo, "Archivo Fallback", ...`) |
| **T03** | Computed `font-family` on body paragraphs starts with "Outfit" | **PASS** (`Outfit, "Outfit Fallback", ...`) |
| **T04** | Computed `font-family` on `.label` and model codes starts with "JetBrains Mono" | **PASS** (`"JetBrains Mono", "Mono Fallback", ...`) |
| **T05** | Computed `font-family` on price numeral starts with "DSEG7 Classic" | **PASS** (`"DSEG7 Classic", ...`) |
| **T06** | Zero network requests to Google Fonts or third-party CDNs | **PASS** (0 external requests captured) |
| **T07** | Only Archivo variable font is preloaded in `<head>` | **PASS** (1 preload link: `/fonts/archivo-variable.woff2`) |
| **T08** | Cumulative Layout Shift (CLS) via PerformanceObserver is `< 0.02` | **PASS** (CLS: 0.000) |
| **T09** | Hero headline fits 360px viewport with zero horizontal overflow | **PASS** (`scrollWidth === clientWidth`) |
| **T10** | LCD elements have accessible `aria-label` and `aria-hidden` ghost layer | **PASS** (Screen-reader accessible) |
| **T11** | `prefers-reduced-motion` disables entrance animations cleanly | **PASS** (No framer motion transform shifts) |
| **T12** | Contrast ratio of display type against surface is `≥ 7:1` in light & dark modes | **PASS** (Light: 17.79:1, Dark: 18.13:1) |
| **Snapshots** | High-resolution visual captures for Hero (360/768/1440), Faceplates, LCD, Specs | **PASS** (Saved in `tests/screenshots/`) |

---
*Vernox Vision Typography System — Precision Engineered.*
