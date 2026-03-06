# DevTrailer Design System

## Overview
DevTrailer features an **Apple Vision Pro meets Cyberpunk** design language—a perfect blend of minimalist elegance and futuristic intensity. The design emphasizes clarity, motion, and luminous depth through carefully curated colors and typography.

---

## Color Palette

### Dark Mode Foundation
- **Background**: `#0a0a0a` (Pure black) with subtle gradient overlay
- **Foreground**: `#f5f5f5` (Off-white text)

### Accent Colors
These create the signature glow effects:
- **Emerald**: `#10b981` (Primary accent, warm glow)
- **Cyan**: `#06b6d4` (Secondary accent, cool glow)
- **Purple**: `#8b5cf6` (Tertiary accent)

### Neutrals
- **Neutral 900**: `#0f0f0f`
- **Neutral 800**: `#1a1a1a`
- **Neutral 700**: `#2d2d2d`
- **Neutral 600**: `#404040`

---

## Typography

### Font Family
- **Primary Font**: Geist (via Next.js Font)
- **Monospace**: Geist Mono
- **Weight Distribution**:
  - Hero headings: `font-black` (900)
  - Section titles: `font-bold` (700)
  - Body text: `font-medium` (500) to `font-normal` (400)
  - Line height: `1.4-1.6` (relaxed spacing)

---

## Components & Patterns

### 1. Floating Navigation Bar
- **Style**: Glassmorphism with backdrop blur
- **Border**: Subtle white border with hover glow
- **Animation**: Fade in from top with delay
- **Features**:
  - Semi-transparent background `bg-black/40`
  - Backdrop blur `backdrop-blur-md`
  - Hover states with cyan glow
  - Gradient CTA button

### 2. Hero Section
- **Typography**: 6xl-8xl headings with gradient text
- **Gradients**: Emerald to cyan for text, deep glowing backgrounds
- **Animations**: Staggered fade-in with smooth transitions
- **Floating Elements**: Subtle animated shapes for depth
- **CTA Buttons**: Primary (gradient solid) + Secondary (outline)

### 3. Bento Grid Features
- **Layout**: CSS Grid (3-6 columns on larger screens)
- **Cards**:
  - Border: white/10 opacity
  - Background: Gradient blur with glassmorphism
  - Hover: Lift animation + glow effect
  - Icon backgrounds: Subtle colored borders with hover states
- **Grid Sizes**: Various card sizes for visual interest

### 4. Call-to-Action Section
- **Layout**: Centered card container
- **Background**: Complex gradient with multiple layers
- **Border**: Cyan glow with animated effects
- **Button States**:
  - Primary: Solid gradient with shine animation
  - Secondary: Border-based with hover glow
- **Trust Elements**: Checkmarks and feature list styling

### 5. Footer
- **Style**: Minimal with subtle border separator
- **Typography**: Smaller text with white/60 for secondary content
- **Layout**: Grid-based columns with responsive behavior

---

## Motion & Animation

### Framer Motion Integration
- **Container variants**: Staggered children animations
- **Item variants**: Fade in + Y-axis slide
- **Hover effects**: Lift animations on cards
- **Scroll triggers**: `whileInView` for section animations
- **Duration**: 0.3s-0.8s for smooth transitions

### Floating Elements
- Continuous Y-axis animations (4-5s duration)
- Opacity transitions on group hover
- Border bottom line animations on hover

---

## Responsive Design

### Breakpoints
- **Mobile**: 320px+ (default)
- **Tablet**: 768px+ (md: prefix)
- **Desktop**: 1024px+ (lg: prefix)
- **Large Desktop**: 1280px+ (xl: prefix)

### Key Responsive Changes
- Hero heading: 2xl → 6xl → 7xl → 8xl
- Padding: px-4 → px-6 → px-8
- Grid columns: 1 → 2 → 3 → 6
- Button layout: Flex column → flex row

---

## Accessibility

- **Semantic HTML**: Using `<section>`, `<main>`, `<footer>`
- **ARIA Labels**: Button roles and link purposes clearly stated
- **Color Contrast**: Emerald/Cyan on black background meets WCAG AA
- **Motion**: Animations respect `prefers-reduced-motion` (can be added)
- **Typography**: Readable line heights and font sizes

---

## Key Design Tokens (CSS Variables)

```css
--background: #0a0a0a
--foreground: #f5f5f5
--accent-emerald: #10b981
--accent-cyan: #06b6d4
--accent-purple: #8b5cf6
--glow-emerald: rgb(16 185 153 / 0.5)
--glow-cyan: rgb(6 182 212 / 0.5)
```

---

## Icon System

### Phosphor Icons
- **Library**: `@phosphor-icons/react`
- **Sizes**: 16px, 20px, 24px (consistent sizing)
- **Weights**: `duotone`, `fill`, `bold` for visual variety
- **Colors**: Applied dynamically with Tailwind classes

### Key Icons Used
- Play, Sparkles, Microphone, FilmSlate, Zap, Rocket, Eye
- FileText, Github, ArrowRight, CheckCircle, HorseIcon, HeartIcon

---

## Best Practices

1. **Color Usage**: Always use the defined palette—no arbitrary colors
2. **Spacing**: Use Tailwind spacing scale (gap-4, p-6, mt-8, etc.)
3. **Animations**: Use Framer Motion for consistency
4. **Gradients**: Keep to 2-3 color stops, use analogous colors
5. **Borders**: Use `border-white/10` to `border-white/30` for subtle depth
6. **Glow Effects**: Layer multiple gradients with `blur-2xl` and opacity

---

## File Structure

```
src/
├── app/
│   ├── layout.tsx (Geist fonts, metadata)
│   ├── page.tsx (Main landing page)
│   └── globals.css (Design tokens, base styles)
├── components/
│   ├── FloatingNav.tsx (Navigation bar)
│   ├── Hero.tsx (Hero section)
│   ├── BentoGrid.tsx (Features grid)
│   └── CTASection.tsx (Call-to-action)
```

---

## Future Enhancements

- Add dark/light mode toggle (currently dark-only)
- Implement `prefers-reduced-motion` media query
- Add loading states and skeleton screens
- Create component library documentation
- Add animation performance optimization

---

## Design Inspiration

This design system draws from:
- **Apple Vision Pro**: Minimalist, premium feel with subtle gradients
- **Cyberpunk Aesthetics**: Glowing neons, dark backgrounds, futuristic typography
- **Modern Web Design**: Glassmorphism, micro-interactions, accessible color contrast

The result is a sophisticated, forward-thinking interface that stands out while remaining professional and user-friendly.
