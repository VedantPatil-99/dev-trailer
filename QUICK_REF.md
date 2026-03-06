# ⚡ Quick Reference Guide

## Start Dev Server
```bash
bun run dev
# → http://localhost:3000
```

## Project Structure
```
src/app/
  ├── layout.tsx      (Fonts, metadata)
  ├── page.tsx        (Main page)
  └── globals.css     (Tokens, styles)

src/components/
  ├── FloatingNav.tsx
  ├── Hero.tsx
  ├── BentoGrid.tsx
  └── CTASection.tsx
```

---

## Core Colors
```
Primary:    #10b981 (Emerald)
Secondary:  #06b6d4 (Cyan)
Tertiary:   #8b5cf6 (Purple)
Background: #0a0a0a (Black)
Text:       #f5f5f5 (White)
```

## Tailwind Classes
```
Text opacity:   text-white/60 text-white/70
Border opacity: border-white/10 border-cyan-500/30
Background:     bg-black/40 bg-cyan-500/10
Gradient:       from-emerald-500/20 to-cyan-500/10
```

---

## Common Components

### Button
```tsx
<button className="rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 px-8 py-4 font-semibold text-black hover:shadow-lg hover:shadow-cyan-500/40">
  Click Me
</button>
```

### Card
```tsx
<div className="rounded-2xl border border-white/10 bg-gradient-to-br from-emerald-500/20 to-cyan-500/10 p-6 backdrop-blur-sm">
  Card content
</div>
```

### Text Gradient
```tsx
<span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
  Gradient text
</span>
```

---

## Animation Snippets

### Fade In
```tsx
import { motion } from "framer-motion";

<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.6 }}
>
  Content
</motion.div>
```

### Slide + Fade
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  Content
</motion.div>
```

### Hover Lift
```tsx
<motion.div
  whileHover={{ y: -8 }}
  transition={{ duration: 0.3 }}
>
  Content
</motion.div>
```

### Viewport Trigger
```tsx
<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true, margin: "-100px" }}
>
  Content
</motion.div>
```

### Staggered Children
```tsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

<motion.div variants={containerVariants} initial="hidden" animate="visible">
  <motion.div variants={itemVariants}>Item 1</motion.div>
  <motion.div variants={itemVariants}>Item 2</motion.div>
</motion.div>
```

---

## Icons

### Import
```tsx
import { Play, Sparkles, Github, ArrowRight } from "@phosphor-icons/react";
```

### Usage
```tsx
<Play size={20} weight="fill" />
<Sparkles size={24} weight="duotone" />
<Github size={16} weight="duotone" />
<ArrowRight size={18} weight="bold" />
```

### Colors
```tsx
<Play color="#06b6d4" />
<Github color="#10b981" />
```

---

## Typography

### Sizes
```
Mobile:  text-3xl
Tablet:  text-5xl
Desktop: text-7xl
```

### Weights
```
Normal:    font-normal (400)
Medium:    font-medium (500)
Bold:      font-bold (700)
Black:     font-black (900)
```

### Tailwind Classes
```tsx
className="text-balance"        // Balanced line breaks
className="text-pretty"         // Pretty line breaks
className="tracking-tight"      // Tight letter spacing
className="leading-relaxed"     // Relaxed line height
```

---

## Responsive
```
Mobile first:    base classes
Tablet up:       md:class-name
Desktop up:      lg:class-name
Large desktop:   xl:class-name

Example:
className="text-3xl md:text-5xl lg:text-7xl"
```

---

## Hover Effects

### Text
```tsx
className="text-white/60 hover:text-white transition"
```

### Border
```tsx
className="border-white/10 hover:border-cyan-500/30 transition"
```

### Background
```tsx
className="bg-white/5 hover:bg-white/10 transition"
```

### Glow
```tsx
className="hover:shadow-lg hover:shadow-cyan-500/40 transition"
```

---

## Grid Layouts

### Hero/CTA (Centered)
```tsx
className="relative z-10 mx-auto max-w-4xl"
```

### Feature Grid (6 cols)
```tsx
className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6"
```

### Footer (4 cols)
```tsx
className="grid grid-cols-1 md:grid-cols-4 gap-8"
```

---

## Common Patterns

### Section Container
```tsx
<section className="relative w-full px-4 py-20 sm:px-6 lg:px-8">
  <div className="mx-auto max-w-6xl">
    {/* Content */}
  </div>
</section>
```

### Badge
```tsx
<div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2">
  <div className="h-2 w-2 rounded-full bg-emerald-400" />
  <span className="text-sm font-medium text-emerald-300">Label</span>
</div>
```

### Glow Background
```tsx
<div className="pointer-events-none absolute inset-0">
  <div className="absolute top-20 left-1/3 h-96 w-96 rounded-full bg-gradient-to-r from-emerald-500/20 to-transparent blur-3xl" />
</div>
```

---

## Deployment

### Deploy to Vercel
```bash
git push origin main
# Vercel auto-deploys
```

### Build Locally
```bash
bun run build
bun start
```

---

## File Operations

### Add new component
```bash
touch src/components/MyComponent.tsx
```

### Format code
```bash
bun run format
```

### Lint check
```bash
bun run lint
```

---

## TypeScript Tips

### Component with Props
```tsx
interface MyComponentProps {
  title: string;
  className?: string;
}

export default function MyComponent({
  title,
  className,
}: MyComponentProps) {
  return <div className={className}>{title}</div>;
}
```

### React Client Component
```tsx
"use client";

import { useState } from "react";

export default function Component() {
  const [state, setState] = useState(false);
  return <div>{state ? "True" : "False"}</div>;
}
```

---

## Import Paths

```
Absolute imports:
import Hero from "@/components/Hero";

Relative imports:
import Hero from "./Hero";
```

---

## Version Info

```
Next.js: 16.1.6
React: 19.2.3
Tailwind: 4
TypeScript: 5
Framer Motion: 11.0.8
Phosphor Icons: 2.1.6
```

---

## Useful Links

- [Next.js 16 Docs](https://nextjs.org/docs)
- [Tailwind Docs](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion)
- [Phosphor Icons](https://phosphoricons.com)
- [React 19](https://react.dev)

---

## Keyboard Shortcuts

```
Dev Server:    Ctrl+C (stop) then `bun run dev`
Format Code:   bun run format
Lint Check:    bun run lint
Build:         bun run build
```

---

## Common Issues

| Problem | Solution |
|---------|----------|
| Tailwind not working | Restart dev server |
| Icons not showing | Check import path, verify package installed |
| Animations janky | Use transforms/opacity only, avoid layout changes |
| TypeScript errors | Run `bunx tsc --noEmit` to check |
| Port 3000 in use | `lsof -ti:3000 \| xargs kill -9` |

---

## Debug Tips

```tsx
// Console log in motion
console.log("[v0] Debug:", value)

// Inspect element
Right-click → Inspect

// Check TypeScript
bunx tsc --noEmit

// Preview build
bun run build && bun start
```

---

**Remember: Refer to DESIGN.md and COMPONENTS.md for detailed info!**
