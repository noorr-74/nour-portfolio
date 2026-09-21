# Nour Hany — Portfolio

A responsive, dark-first developer portfolio built with plain HTML, CSS and JavaScript (no framework, no build step).
All content lives in **one file**: `js/data/portfolio.js`.

## Folder structure

```
nour-portfolio/
├── index.html                 Page skeleton + SEO / social meta tags
├── favicon.svg, favicon.ico, apple-touch-icon.png
├── robots.txt, .gitignore, README.md
├── css/
│   ├── base.css               Fonts, colour tokens (dark + light), reset
│   ├── layout.css             Header, hero, section layouts, responsive rules
│   └── components.css         Buttons, cards, modal, timeline, toast, animations
├── js/
│   ├── main.js                Entry point (renders sections, starts features)
│   ├── data/portfolio.js      ★ ALL your content (edit this)
│   ├── core/                  dom helpers, inline icons, toast
│   ├── sections/              hero, about, skills, projects, timeline, contact, footer
│   └── features/              theme, nav, scroll, typing, reveal, background, copy, glow, cv
└── assets/
    ├── cv/Nour_Hany_CV.pdf    Your CV (used by the View / Download buttons)
    ├── img/                   profile.jpg/.webp and og-image.png (social preview)
    ├── fonts/                 Self-hosted Manrope + JetBrains Mono
    └── icons/tech/            Skill logos
```

## Run locally

The site uses JavaScript modules, which browsers block on `file://`, so serve the folder:

```bash
cd nour-portfolio
python -m http.server 5500      # then open http://localhost:5500
# or:  npx serve .
```

There is nothing to install or build.

## Update your information

Open `js/data/portfolio.js`. Each block is labelled (`person`, `about`, `skills`, `projects`, `timeline`, `socials`, `cv`, `contact`). Edit the text between the quotes, save, refresh.

Also update `index.html` if you change your name/title/description (search engines and social networks read the `<title>` and `<meta>` tags there, not the JS).

## Add or remove a project

In `projects: [ ... ]`, copy a whole `{ ... },` block and edit it. Delete a block to remove it.
`demo` and `image` are optional: leave `""` and the button/picture is not shown. `categories` controls the filter buttons.
To add a screenshot, put the file in `assets/img/` and set `image: "assets/img/my-shot.webp"`.

## CV and images

- CV: replace `assets/cv/Nour_Hany_CV.pdf` (same name), or change `cv.file` / `cv.downloadName` in the data file.
  Set `showView` / `showDownload` to `false` to hide either button.
- Photo: replace `assets/img/profile.jpg` and `profile.webp` (4:5 portrait works best) and update `width`/`height`.
- Skill logos: drop an SVG in `assets/icons/tech/` and reference it with `icon: "file-name"`.

## Push to GitHub

Create an empty repo named `nour-portfolio` on github.com (no README), then:

```bash
git init
git add .
git commit -m "Initial commit: portfolio website"
git branch -M main
git remote add origin https://github.com/noorr-74/nour-portfolio.git
git push -u origin main
```

## Deploy to Vercel

1. Go to vercel.com, sign in with GitHub, click **Add New → Project**, import `nour-portfolio`.
2. Framework Preset: **Other**. Leave Build Command and Output Directory empty. Click **Deploy**.
3. Every `git push` to `main` redeploys automatically.

After the first deploy, open `index.html` and replace `YOUR-SITE.vercel.app` (2 places) with your real domain so the social preview image works, then commit and push.
