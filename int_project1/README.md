# 🌟 Syntecxhub_Landing_Page
### Week 1 Task: Project 1 — Landing Page Design & Prototype
**Internship Track:** UI/UX Designing  
**Organization:** [Syntecxhub](https://syntecxhub.com/)

---

## 📌 Project Overview

**Aura Studio** is a modern, high-converting responsive landing page designed for an AI-powered design & prototyping platform. 

This project fulfills all criteria of the **Syntecxhub UI/UX Designing Week 1 Task**:
- Clean, responsive landing page layout (Hero, Features, Testimonials, Pricing, Final CTA).
- Balanced 8pt spatial grid system and mathematically structured typography hierarchy.
- Reusable UI component architecture (Buttons, Navbars, Cards) leveraging Auto-Layout principles.
- Interactive multi-step Call-to-Action (CTA) onboarding prototype with celebration states.
- Interactive slide-out **Design Tokens & Handoff Spec Drawer** for seamless developer handoff.

---

## 🚀 Live Demo & How to View

You can view the project instantly in any web browser without needing any installation:

1. **Option 1: Open Directly**
   - Double click on `index.html` to open it in your default browser (Chrome, Edge, Firefox, Safari).

2. **Option 2: Run via Local Server (e.g., Python / Live Server)**
   ```bash
   # From the project root directory:
   python -m http.server 8000
   ```
   Open your browser and navigate to: `http://localhost:8000`

---

## 🎯 Key Design & Interactive Features

### Product Pages
- **Explore** (`explore.html`): Searchable, filterable workflow library with a responsive card layout.
- **Plans** (`plans.html`): Starter, Pro, and Scale pricing with an interactive monthly/yearly billing switch and plan comparison.
- **About** (`about.html`): A dedicated company story, principles, and product-focused page.
- Each page has a tailored layout, shares the Pulse visual identity, and includes a responsive navigation menu. The Overview navigation links to the existing landing page.

### 1. Hero Section
- Dynamic announcement pill badge with subtle pulse animation.
- High-impact typography hierarchy with dual-tone gradient accents.
- Responsive CTA buttons: **"Start Free Trial"** (triggers interactive onboarding modal) & **"Watch 2-Min Demo"** (triggers demo video modal).
- Interactive Canvas Mockup displaying live auto-layout metrics, 8pt grid guides, and component tokens.

### 2. Bento Grid Features Showcase
- **AI Prompt-to-Component Simulator**: Test real-time UI generation with one-click prompt presets (Pricing Card, Floating Navbar, Auth Form).
- **8pt Grid & Typography Hierarchy**: Explaining the mathematical foundation of modern UI design.
- **Smart Auto-Layout**: Responsive component resizing guidelines.
- **Instant Token Export**: Direct JSON / CSS custom property handoff.

### 3. Interactive Workflow / Persona Tabs
- Tailored views for **UI/UX Designers**, **Frontend Engineers**, and **Product Managers**.

### 4. Interactive Pricing Table
- Dynamic toggle for **Monthly vs. Yearly** billing with an automatic **20% discount calculation**.

### 5. Multi-Step CTA Onboarding Prototype Modal
- **Step 1**: Choose Workspace type (Solo Designer, Product Team, Agency).
- **Step 2**: User details & design tool preference (Figma, React, HTML5).
- **Step 3**: Interactive success celebration with confetti animation and provisioned workspace ID.

### 6. Built-In UI/UX Design System Inspector
- Click the floating **"UI/UX Design Tokens Spec"** button at the bottom-right of the screen to open an inspector drawer:
  - Click-to-copy Hex tokens (`#6366F1`, `#06B6D4`, `#A855F7`, `#090D16`).
  - Typography scale reference (Plus Jakarta Sans: 72px down to 11px).
  - 8pt spacing grid tokens (`8px` to `64px`).
  - Figma auto-layout specs for developer handoff.

---

## 📂 Project Directory Structure

```
Syntecxhub_Landing_Page/
├── index.html            # Main semantic HTML5 responsive landing page
├── explore.html          # Workflow discovery, search, and category filters
├── plans.html            # Pricing tiers and monthly/yearly billing switch
├── about.html            # Pulse AI story, values, and product overview
├── pages.css             # Shared responsive design system for product pages
├── pages.js              # Product-page navigation, filters, and billing controls
├── style.css             # Glassmorphism, animations, custom scrollbars & styling
├── script.js             # Interactive prototype flows, modal controllers, tabs & confetti
├── DESIGN_SYSTEM.md      # Comprehensive UI/UX case study and design token specification
├── README.md             # Complete project documentation & submission guide
└── assets/
    └── images/           # Asset directory for illustrations and mockups
```

---

## 🎨 Design System Summary

| Category | Specification |
| :--- | :--- |
| **Grid System** | 8-point spatial grid (`8px`, `16px`, `24px`, `32px`, `48px`, `64px`) |
| **Typography** | Primary: `Plus Jakarta Sans`, Code: `JetBrains Mono` |
| **Brand Colors** | Indigo (`#6366F1`), Cyan (`#06B6D4`), Deep Obsidian (`#090D16`) |
| **Accessibility** | Contrast ratio 18.2:1 (Exceeds WCAG 2.1 AAA standard) |
| **Responsiveness** | Desktop (1280px+), Tablet (768px), Mobile (375px) |

Detailed case study and Figma auto-layout specifications are available in [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md).

---

## 📤 Submission & GitHub Repository Instructions

As instructed in the Syntecxhub Week 1 Task sheet:

1. **Repository Name:** `Syntecxhub_Landing_Page`
2. **Commands to push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "feat: complete Syntecxhub UI/UX Week 1 Project 1 Landing Page"
   git branch -M main
   git remote add origin https://github.com/<your-username>/Syntecxhub_Landing_Page.git
   git push -u origin main
   ```
3. **LinkedIn Post Template (as requested in Instructions):**
   > *"Excited to share that I have completed the Week 1 Task for the UI/UX Design Internship at @Syntecxhub! 🚀 Designed and prototyped a modern, responsive landing page using an 8pt spatial grid system, auto-layout components, and developer handoff tokens. Check out the project repository on GitHub! #UIUX #DesignSystem #WebDesign #Syntecxhub"*
4. Submit the repository URL via the official **Syntecxhub Submission Form**.

---

## 👨‍💻 Author & Acknowledgements
- **Intern:** UI/UX Design Intern
- **Organization:** [Syntecxhub](https://syntecxhub.com/)
- **Track:** UI/UX Designing (Week 1)
