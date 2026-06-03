# Personal Site

Personal website of Gert-Willem Van Gompel —
civil engineer-architect turned software engineer.
Technical project write-ups, moto travel stories,
and a build log of physical projects.

Live: https://gert-willem.netlify.app

## Stack

- **Astro 6** — static site generator
- **Netlify** — hosting and automatic deployment
- **Cloudinary** — image hosting and CDN
- **DM Sans + Oswald** — typography

## Structure

- `/work` — software and ML engineering projects
- `/build` — physical builds (home renovation, custom furniture)
- `/travel` — moto travel stories with photo galleries
- `/blog` — writing
- `/about` — background and career transition

## Content

Travel post images are hosted on Cloudinary.
Image URLs are centralised in `src/content/travel/*-images.js`
— update the `BASE` constant to change transformation
parameters globally.

## Development

npm install
npm run dev        # localhost:4321
npm run build      # production build
