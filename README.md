# Tuong Hao Truong — Portfolio 2026

A recruiter-facing portfolio built from three flagship codebases:

1. **AI Milly** — healthcare-focused realtime translation interface.
2. **Aladin** — multi-role e-commerce system for customers, vendors and shippers.
3. **Hoa Vien Phuong Nam / Southern Park Restaurant** — restaurant customer + operations platform.

## Why this portfolio is static

The public portfolio is intentionally a zero-backend showcase. The interactive demos are local simulations that preserve the product feel while avoiding production credentials, private data, external API costs and fragile demo dependencies.

The original project stacks are still described inside their case studies, and their source repositories can be linked after they are cleaned for public viewing.

## Run locally

Option A — easiest: double-click `index.html`.

Option B — recommended:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Personalise before deploying

Edit `config.js`:

```js
window.PORTFOLIO_CONFIG = {
  name: "Tuong Hao Truong",
  shortName: "Hao",
  title: "AI & Software Developer",
  education: "Master of Artificial Intelligence · RMIT University",
  location: "Melbourne, Australia",
  github: "https://github.com/BaldPeekHao",
  linkedin: "YOUR_LINKEDIN_URL",
  email: "YOUR_EMAIL",
  resume: "resume.pdf"
};
```

If `linkedin`, `email`, or `resume` is left empty, its button is hidden automatically.

If you want a Resume button, copy your final PDF into this folder as `resume.pdf` and set `resume: "resume.pdf"`.

## Files

- `index.html` — semantic page structure and all three case studies.
- `styles.css` — responsive visual system, motion, browser/phone mockups.
- `app.js` — interactive demos, scrolling, transitions and configuration binding.
- `config.js` — personal/contact links in one place.
- `assets/` — selected visual assets copied from the original projects.
- `docs/DEPLOY_TO_GITHUB.md` — exact GitHub Pages publishing steps.
- `docs/SECURITY_CHECKLIST.md` — important source-code cleanup before linking public repositories.
- `docs/GITHUB_PROFILE_README.md` — suggested README for `BaldPeekHao/BaldPeekHao`.

## Portfolio interaction map

### AI Milly
`Start → select language → microphone → simulated bilingual live session`

The demo is deliberately simulated. No microphone data is recorded or sent anywhere.

### Aladin
`Customer / Vendor / Shipper` role switching, local cart state and delivery status toggles.

### Hoa Vien Phuong Nam
`Booking / Menu / Admin` views, with regular/VIP reservation selection and operational metrics.

## Deployment

This folder is designed to be placed directly at the root of the `BaldPeekHao.github.io` repository. No npm install or build command is required.

See `docs/DEPLOY_TO_GITHUB.md` before replacing the existing site.
