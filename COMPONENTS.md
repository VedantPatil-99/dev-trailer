# Component Documentation

## Overview
All components are built with React 19, TypeScript, Tailwind CSS v4, and Framer Motion. Each component uses the centralized design system defined in `globals.css`.

---

## Components

### FloatingNav (`src/components/FloatingNav.tsx`)

**Purpose**: Fixed navigation bar with glassmorphism design

**Features**:
- Pill-shaped with rounded corners
- Glassmorphic background with `backdrop-blur-md`
- Hover glow effects
- Responsive link layout (hidden on small screens with `hidden sm:inline`)
- Gradient CTA button with arrow icon
- Entry animation from top

**Key Props**: None (static component)

**Animation**: Framer Motion `initial`, `animate`, `transition`

**Usage**:
```tsx
<FloatingNav />
```

**Styling Classes**:
- `border-white/10` - Subtle border
- `bg-black/40` - Semi-transparent background
- `backdrop-blur-md` - Glassmorphism effect
- `hover:border-cyan-500/30` - Hover glow

---

### Hero (`src/components/Hero.tsx`)

**Purpose**: Landing page hero section with animated typography

**Features**:
- Massive hero heading (6xl-8xl text)
- Gradient text effects (emerald→cyan)
- Animated badge with pulse
- Subheading with context
- Dual CTA buttons (primary + secondary)
- Floating background shapes
- Staggered animation for all elements

**Key Elements**:
- Badge: Emerald badge with pulsing dot
- Heading: Split into lines with gradient text wrapper
- Subheading: Clean, readable body text
- Buttons: Gradient primary, outline secondary
- Floaters: Animated geometric shapes with `animate.y`

**Animations**:
- Container: `staggerChildren: 0.2`
- Items: Fade + Y-slide (20px)
- Floaters: Continuous Y-axis animation (4-5s)

**Usage**:
```tsx
<Hero />
```

---

### BentoGrid (`src/components/BentoGrid.tsx`)

**Purpose**: Feature showcase with flexible grid layout

**Features**:
- Responsive grid (1 col → 3 cols → 6 cols)
- Mix of card sizes for visual interest
- Hover lift animation (`whileHover: { y: -8 }`)
- Icon backgrounds with hover states
- Subtle glow effects on borders
- Viewport-triggered animations

**Component Structure**:

#### BentoCard (internal sub-component)
```tsx
interface BentoCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
  gradient?: string;
}
```

**Card Variants**:
- Default: `from-emerald-500/20 to-cyan-500/10`
- AI Copywriter: `from-emerald-500/30 to-cyan-500/15` (large)
- Virtual Cinematographer: `from-cyan-500/30 to-emerald-500/15` (large)
- Analytics: `from-purple-500/20 to-pink-500/10`

**Grid Classes**:
- Full width: `col-span-1 md:col-span-2 lg:col-span-3`
- Medium: `col-span-1 md:col-span-1 lg:col-span-2`
- Responsive sizing

**Usage**:
```tsx
<BentoGrid />
```

---

### CTASection (`src/components/CTASection.tsx`)

**Purpose**: Final call-to-action section to drive conversions

**Features**:
- Large card container with glow border
- Section eyebrow with badge
- Multiple heading levels with gradient text
- Feature list with checkmark icons
- Dual button CTA with animations
- Trust indicator at bottom
- Complex layered background gradients

**Key Sections**:
1. **Eyebrow**: Small badge with emerald styling
2. **Heading**: Split with gradient effect
3. **Description**: Clear value proposition
4. **Feature List**: 4 items with check icons
5. **Buttons**: 
   - Primary: Gradient with shine animation
   - Secondary: Cyan border with glow on hover
6. **Trust Text**: Social proof element

**Animation Triggers**:
- Section: `whileInView` with offset
- Card: Y-axis slide from bottom
- Features: Staggered reveal
- Buttons: Entrance animation with delay

**Usage**:
```tsx
<CTASection />
```

---

## Shared Patterns

### Animation Variants
All components follow consistent animation patterns:

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
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};
```

### Hover Effects
- **Cards**: `whileHover={{ y: -8 }}`
- **Buttons**: `group` classes with `group-hover:` styles
- **Glow**: Border and background gradients with opacity transitions

### Color Classes
- **Text**: `text-white/60`, `text-white/70`, `text-white/80`
- **Borders**: `border-white/10`, `border-white/20`, `border-cyan-500/30`
- **Backgrounds**: `bg-white/5`, `bg-black/40`, `bg-emerald-500/10`
- **Gradients**: `from-emerald-500/20 to-cyan-500/10`

---

## Icons

All components use **Phosphor Icons** (`@phosphor-icons/react`):

```tsx
import { Play, Sparkles, Github, ArrowRight } from "@phosphor-icons/react";

<Play size={20} weight="fill" />
<Sparkles size={24} weight="duotone" />
```

### Icon Sizes
- Navigation: 16px
- Card icons: 24px
- Button icons: 18-20px

### Icon Weights
- `"fill"` - Solid appearance
- `"duotone"` - Two-color effect
- `"bold"` - Heavy stroke weight

---

## Typography Classes

### Headings
```tsx
// Hero heading
<h1 className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tight">
// Section heading
<h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight">
// Card title
<h3 className="text-lg font-semibold">
// Footer heading
<h4 className="font-semibold">
```

### Body Text
```tsx
// Large body
<p className="text-lg text-white/60">
// Regular body
<p className="text-base text-white/70">
// Small text
<span className="text-sm text-white/50">
```

---

## Responsive Utilities

### Grid Columns
```tsx
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
```

### Padding & Margins
```tsx
// Mobile → Tablet → Desktop
className="px-4 sm:px-6 lg:px-8"
className="py-20 sm:py-24 lg:py-32"
className="gap-4 md:gap-6 lg:gap-8"
```

### Display
```tsx
// Hidden on small screens
className="hidden sm:inline"
// Flex direction change
className="flex flex-col sm:flex-row"
```

---

## Accessibility Features

1. **Semantic HTML**: All components use proper HTML5 elements
2. **ARIA**: Links and buttons have clear purposes
3. **Color Contrast**: Cyan/Emerald on black meets WCAG AA
4. **Motion**: Animations use smooth easing (no harsh jarring)
5. **Typography**: Proper line heights (1.4-1.6)
6. **Focus States**: Buttons have hover states for keyboard navigation

---

## Performance Considerations

1. **Code Splitting**: Each component is separate for lazy loading
2. **Framer Motion**: Only use `whileHover` and `whileInView` when needed
3. **Gradients**: Layered with appropriate blur for performance
4. **Animation Delays**: Staggered animations prevent simultaneous renders

---

## Future Component Ideas

- Newsletter signup form
- Video demo player
- Pricing table
- Testimonial carousel
- FAQ accordion
- Blog post preview grid
- Team members showcase
- Integration logos grid

---

## Contributing

When adding new components:

1. Create a new file in `src/components/`
2. Use TypeScript with proper typing
3. Import icons from Phosphor
4. Use Framer Motion for animations
5. Follow the color and typography system
6. Include hover and responsive states
7. Document with comments for complex logic
8. Test on mobile, tablet, and desktop

---

## Useful Resources

- [Framer Motion Docs](https://www.framer.com/motion/)
- [Phosphor Icons](https://phosphoricons.com)
- [Tailwind CSS v4](https://tailwindcss.com)
- [Next.js App Router](https://nextjs.org/docs/app)
- [React 19](https://react.dev)
