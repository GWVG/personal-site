# Personal website – Gert-Willem

## Project overview
Personal website that serves multiple purposes:
- Showcase technical projects (ML/data engineering work)
- Blog: technical write-ups + personal posts (travel, photography)
- Photo section: moto trips and travel photography
- About: coherent narrative of career transition
- Long-term foundation for independent consultant branding

## Stack
- **Astro** — static site generator, markdown-native
- **Keystatic** — git-based CMS, no external database, visual editor
- **Netlify** — hosting + automatic deployment via GitHub

## About the owner
Gert-Willem, burgerlijk ingenieur-architect (KU Leuven, 2016), current
student at 42 Belgium (Antwerp). Transitioning from residential
architecture (design, permits, site management) into software/ML
engineering. Not a junior developer — an engineer with domain expertise
building a technical profile.

Technical projects to feature:
- RAG pipeline (BM25 + local LLM)
- Constrained decoding via logit manipulation (Qwen 0.6B)
- Agent Smith — autonomous code agent, benchmarked on MBPP/SWE-bench
- 42 projects in C and Python

Target roles: data engineering → ML engineering
Region: Antwerp/Ghent
Machine: Apple M1 Pro, 10 cores, 16GB unified memory

## Design direction
- Clean and minimal — no corporate look, no generic AI-portfolio aesthetic
- Photography should feel like a genuine part of the site, not decorative filler
- Technical and personal content coexist under one roof — that's intentional
- The site itself is a signal about how Gert-Willem builds things

## Content structure (planned)
- **Home** — short intro, who this is, what you'll find
- **Projects** — one page per significant technical project, with write-ups
- **Blog** — technical posts + personal (moto trips, travel, thoughts)
- **Photos** — moto travel and travel photography
- **About** — the full story: architect → engineer transition, coherent narrative

## Tone for all copy
Direct, technically precise, no corporate lingo. Confident without
arrogant. Same standard applies to commit messages, comments, and any
generated placeholder text — no filler, no buzzwords.

## Priorities for this build
1. Get the Astro + Keystatic base running locally
2. Define content collections (blog, projects, photos)
3. Basic layout and navigation
4. Design pass — typography, spacing, color
5. Deploy to Netlify via GitHub
6. Populate with real content

## What to avoid
- Generic hero sections with "I'm passionate about technology"
- Excessive animations or visual noise
- Over-engineered solutions for what is essentially a content site
- Any dependency that adds recurring cost or external lock-in
