# ROBONEXUS

Prompt City. Urban Vision Wolfsburg 2026 — Design studio SoSe 2026
Bauhaus-Universität Weimar, InfAU

**Team:** Chin Yu Phyllis Yick, Mathan Kumar Mangaleshwaran, Pragathi Bhat Prakash

## Abstract

Wolfsburg is Germany's most productive city per capita — and home to one of
its emptiest public plazas. The city is built entirely around one factory:
Volkswagen employs roughly half its residents, drives a GDP per capita
nearly three times the national average, and runs 5,000 factory robots
working with sub-millimeter precision that has never once left the factory
floor. Meanwhile Marktplatz, the city's civic and symbolic spine on
Porschestrasse, struggles with declining footfall on a fully pedestrianized
site built to hold far more life than it does. Robonexus's response is to
repurpose that same factory precision as an urban tool: an AGV, a gantry,
and a robotic arm — real industrial units (KUKA KMP 1500P, KR210 Gantry,
KR210 R2700-2) — deliver, lift and assemble modular structures across the
plaza, turning one fixed space into three identities on demand: market,
event, and playground. The site presents this as a digital twin: a
narrated aerial site scan leads into an interactive floor plan where each
location plays a video of that scenario's robotic reconfiguration in
action.

## The urban issue

Wolfsburg is a city built entirely around one factory — Volkswagen employs
about half its residents, and the city's productivity (nearly 3x the
national GDP per capita) is generated almost entirely behind factory walls,
with little of that energy visible on the streets outside. Marktplatz, the
city's central and symbolic plaza, shows the imbalance directly: empty
pavements, low footfall, and declining retail on a site that is already
car-free and centrally connects the station, city hall, and the factory
itself. Robonexus asks whether the same robotic precision that built the
city's economy could also animate its public space.

## How to use this site

Open `index.html`. From the homepage, click **"Explore the robot plaza"** —
this plays a narrated site-scan intro (skip it anytime with the button in
the corner), then hands off automatically to the interactive floor plan.
Click any location marker on the plan to play that scenario's video
directly on the page; use **"← Back to plan"** to return and try another
marker. Refreshing the page at any point returns to the homepage.

## What is frozen

The floor plan originally synced marker clicks to a *separate* video-display
device in real time, over a live Firebase Realtime Database connection —
built for a two-device kiosk setup (a controller device and a large-screen
display) at the exhibition. That live sync is removed. Each marker's video
now plays directly in-page on whichever single device is being used, which
is also how the intro's "skip"/volume controls and the floor plan itself
work now — nothing here depends on a second device or a live connection
anymore.

## Contents

- `presentation/` — final presentation
- `materials/` — posters, boards, brochures, plans
- `src/` — the site's source code (React + Vite)
- `public/` — the site's static assets, including the embedded intro and
  floor-plan pages

<!-- TODO: confirm what's actually going in presentation/ and materials/,
     and add anything else worth pointing at. -->

## How to run it

Static — serve the folder with any web server (e.g. `python -m http.server
8000` from inside the built output) and open it in a browser. No backend,
no build step needed to just view it.

To rebuild from source: `npm install && npm run build` from this folder —
the output lands in `dist/`.

## Credits

- **Fonts** — Inter, Poppins, Orbitron, Share Tech Mono, Iceland (Google
  Fonts). SIL Open Font License 1.1. https://fonts.google.com
- **Three.js** — used for the intro's particle-formation scene. MIT
  License. https://threejs.org
- **React, React Router** — MIT License. https://react.dev
- **Lucide** (icons) — ISC License. https://lucide.dev
- **Motion** (animation library) — MIT License. https://motion.dev
- **Narration voice** — AI-generated voiceover via ElevenLabs (voice
  "Jon"). Licence/terms of use not verified against ElevenLabs' commercial
  terms — noting this rather than leaving it out.
- Video footage, the floor-plan/site data, and all visual/3D content are
  original work by the team.

<!-- TODO: this list covers what I can verify from the code. If anything
     else (a base map, a dataset, imagery) came from outside the team,
     add it here with its source and licence. -->

## Permissions

We agree that InfAU may republish this work under a university account or
domain — including on GitHub Pages — host and mirror these files, and show
the work in teaching, exhibitions and documentation, with credit to the
team.
