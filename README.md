# 🚀 Ankit Meena - Senior Analyst · Python Full Stack Developer Portfolio

[![Portfolio Views](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fankitm10039.github.io%2Fportfolio-website&count_bg=%2300F2FE&title_bg=%231A1A24&icon=&icon_color=%23E7E7E7&title=Portfolio+Views&edge_flat=true)](https://ankitm10039.github.io/portfolio-website/)

Welcome to the source code of my personal portfolio website. This project is a highly interactive, responsive, and beautifully animated React application built to showcase my professional journey, full-stack projects, and technical skills.

## 🌐 Live URL
**[View Live Portfolio Here](https://ankitm10039.github.io/portfolio-website/)**

## 🛠️ Tech Stack
- **Frontend:** React 19 + TypeScript + Vite
- **Styling:** Material UI (MUI v7) with a sharp-corner design, light/dark themes
- **Fonts:** Satoshi for the UI, Tangerine Bold for the name, designation and logo
- **Animations:** Framer Motion + tsParticles (all respect "reduce motion")
- **Deployment:** GitHub Pages (static site, no backend needed)

## ✨ Key Features
- **Loaders:** Full-screen loader on first load, then a loader the first time each section scrolls into view.
- **Project Showcase Carousel:** Auto-plays with a colourful progress border around the card; also arrows (on hover), swipe/drag and keyboard.
- **Contact:** Email with one-click copy and a "Send an Email" button for development and deployment enquiries.
- **Back to top:** Square button whose outline fills up as you scroll.
- **Custom Resume Download:** Recruiters can choose the downloaded file name.

## 📁 Project Structure
```
src/                 React frontend
  components/        Page sections, loaders and modals
  data/resumeData.ts All profile content (edit this to update the site)
  components/projects/ Project carousel and its shared pieces
  theme/             MUI theme, colour tokens and theme context
```

## 🧑‍💻 Running Locally
```bash
npm install
npm run dev
```

## 🚢 Deployment
`npm run deploy` builds and publishes `dist/` to GitHub Pages.

---
*If you like this repository or find the code helpful, feel free to leave a ⭐!*
