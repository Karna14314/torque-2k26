# Torque 2K26 Agent Directive & Final Destination

## 🎯 1. The Ultimate Goal
Transform the legacy "Torque" fest website into a **state-of-the-art, premium "Modern Industrial" web application for Torque 2K26**. 
The current codebase is recognized as unstructured, hardcoded "slop" from previous years. Our primary directive is to **refactor, modularize, and completely elevate** the code standard architecture while achieving a highly polished, robust, and interactive aesthetic. 

## 🛠 2. Structural & Architectural Overhaul (Fixing the Slop)
The legacy repository relies on outdated practices (hardcoded HTML lists, fragmented inline styles, messy jQuery animations, and rigid positioning mathematics). The agent must strictly adhere to the following refactoring protocols for all future changes:
- **Separation of Concerns:** HTML must be purely semantic and lean. All styling goes into cohesive CSS files (`bento.css`, `style.css` integrations). All logic goes into modular, well-named Vanilla JS files.
- **Data Extrication (The Migration):** Moving forward, 2026 fest data (Workshops, Events, Sponsors, People, Gallery Albums) should **NOT** be relentlessly copy-pasted and hardcoded into the DOM. We must refactor sections to be dynamically populated via JavaScript objects or JSON. This ensures the 2026 team can simply update a dataset array rather than hunting through 900+ lines of HTML slop.
- **Code De-duplication & Modernization:** Eradicate obsolete JavaScript logic (like manual `fadeIn`/`fadeOut` loops and `screen.height` window positioning math). Replace them strictly with modern **CSS Grid, CSS Flexbox, and CSS GPU-accelerated Transitions**.

## 🎨 3. The "Modern Industrial" Aesthetic Blueprint
Every component engineered must faithfully abide by the core visual identity:
- **Color Palette:** Deep Matte Charcoal (`#121212`) workspace canvas with "Safety Yellow" (`#FFD700`) accents to emulate mechanical engineering and heavy machinery.
- **Bento Grid Architecture:** Sections must be structured as distinct, standalone interlocking "tiles" with 16px-20px border radii.
- **Tactile UI Elements:** 
  - **Neumorphism:** Action buttons must appear physically raised (convex) from the surface and pressed deeply (concave) when fully interacted with.
  - **The "Etched" Theme:** Content containers must feature subtle inset shadows (`rgba(0,0,0,0.5)`) and 1px low-opacity borders to look laser-cut inside solid metal.
  - **Glassmorphism:** Overlays and floating banners (like the Topbar Navigation) must utilize backdrop blurring (`12px`) against deep translucent backgrounds.
  - **Carbon Fiber & Metallic Accents:** Call-to-actions, timestamps, and success banners should utilize raised metallic textures and repeating carbon-fiber gradients.

## 🚀 4. Final Application Specifications (The 2026 Target Destination)
The finalized application must fully support the following distinct, fully-refactored modules for the 2026 fest:

1. **Dynamic Navigation:** A sticky, glassmorphism top-bar that intelligently reveals itself, bridging users to key components (Home, About, Workshops, Events, Gallery, Contact) without page reloads.
2. **Hero Section (Landing):** Impactful typography (Montserrat), university context, and dynamic Metallic Date Panels.
3. **About Us:** A clean, etched high-level overview of the mechanical engineering department and the fest's legacy.
4. **Events & Workshops Grid:** A modular bento showcase where each 2026 event/workshop has a dedicated etched card. Each must bridge to dynamically generated data modals or subpages (fully replacing the horrific legacy `subpages/` folder slop).
5. **Registration Engine:** Sleek, integrated registration portals replacing old static Google Form buttons, automatically configured to route traffic seamlessly when events go live.
6. **Gallery System:** A sleek, highly performant masonry or carousel layout for the 2025 recap photos that doesn't bloat the main load thread.
7. **Sponsors Tray:** A recessed "tray" container featuring seamless, endless CSS marquee loops for exactly 2026 partners.
8. **Contact Grid:** Modular, data-driven profile cards for the 2026 Core Committee, Web Developers, and Faculty.

## 🤖 5. Agent Instructions for Future Prompts
Whenever the USER asks to modify, integrate, or add a feature:
1. **DO NOT** lazily append code to the existing slop. 
2. **DO** analyze the existing legacy container and aggressively refactor it to meet the Modern Industrial & Data Extrication standards above.
3. Ensure all screen sizes (mobile, tablet, desktop) are natively supported via CSS media queries, completely abandoning legacy JS calculation hacks.
4. Keep the destination in mind: A perfectly architected, high-performance, maintainable standard for Torque 2K26.
