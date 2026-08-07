# ROBONEXUS

Prompt City. Urban Vision Wolfsburg 2026 — Design studio SoSe 2026
Bauhaus-Universität Weimar, InfAU

**Team:** Chin Yu Phyllis Yick, Mathan Kumar Mangaleshwaran, Pragathi Bhat Prakash

## Abstract

<!-- TODO: still a draft -- please check this reads true to your actual
     project reasoning, and tell me more precisely what role AI played
     (beyond the digital-twin/robotic framing I've assumed here). -->

Wolfsburg's economy and identity are built around a single industry — car
manufacturing — and daily life follows the structured rhythm that comes
with it. Residents describe a real leisure gap: little variety, few reasons
to stay rather than travel to Braunschweig, Hannover or Berlin for culture
and activity. Robonexus responds by turning the city's own strength back on
this problem: the same robotic systems that build cars — gantry structures,
robotic arms, autonomous ground units — are repurposed to physically
reconfigure a public plaza on demand, turning one static marketplace into
market, event, and play space in turn. The project is presented as a
digital twin: visitors experience a narrated aerial site scan of the
plaza, then step into an interactive floor plan where each location plays
a short video of that scenario's robotic reconfiguration in action.

## The urban issue

<!-- TODO: same caveat as above -- please correct anything off-base. -->

Wolfsburg is a city defined by one industry, with structured routines and a
recognised shortage of recreation and shared public life — enough that many
residents look to neighbouring cities for it instead of staying local.
Robonexus asks whether the robotic infrastructure that defines the city's
economy could also address this gap: a plaza that reconfigures itself
between market, event, and play, rather than one fixed to a single use.

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
