# DevTrailer Landing Page - Setup & Development Guide

## Quick Start

This project is a modern, animated landing page for DevTrailer built with Next.js 16, React 19, TypeScript, and Tailwind CSS v4.

### Installation

The project uses **Bun** as the package manager. Dependencies are automatically installed, but you can manually install with:

```bash
bun install
```

### Running the Development Server

```bash
bun run dev
```

The app will be available at `http://localhost:3000`

---

## Project Structure

```
devtrailer/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with metadata
│   │   ├── page.tsx            # Main landing page
│   │   ├── globals.css         # Design tokens & base styles
│   │   └── favicon.ico
│   ├── components/
│   │   ├── FloatingNav.tsx     # Navigation bar
│   │   ├── Hero.tsx            # Hero section
│   │   ├── BentoGrid.tsx       # Features grid
│   │   └── CTASection.tsx      # Call-to-action
│   └── [next.js auto routes]
├── public/                      # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.ts          # Not present (Tailwind v4 uses globals.css)
├── postcss.config.mjs
├── next.config.ts
├── eslint.config.mjs
├── DESIGN.md                   # Design system documentation
├── COMPONENTS.md               # Component API & usage guide
└── SETUP.md                    # This file
```

---

## Key Technologies

### Core Framework
- **Next.js 16** - App Router, Server Components, Streaming
- **React 19** - Latest features, Server Components support
- **TypeScript** - Type safety across the project

### Styling & Animation
- **Tailwind CSS v4** - Utility-first styling with @import
- **Framer Motion** - Smooth animations and interactions
- **CSS Variables** - Design token system in `globals.css`

### Icons
- **Phosphor Icons** - Beautiful, customizable icon set

---

## Design System

### Colors
The app uses a strict dark mode with these primary colors:

```css
Background: #0a0a0a (Pure black)
Foreground: #f5f5f5 (Off-white)
Accent (Primary): #10b981 (Emerald)
Accent (Secondary): #06b6d4 (Cyan)
Accent (Tertiary): #8b5cf6 (Purple)
```

All colors are defined as CSS variables in `src/app/globals.css`

### Typography
- **Font**: Geist (from Next.js Google Fonts)
- **Weights Used**: 400 (normal), 500 (medium), 700 (bold), 900 (black)
- **Line Height**: 1.4-1.6 for optimal readability

### Animation Library
- **Framer Motion** for all animations
- Staggered animations for entrance effects
- Viewport-triggered animations with `whileInView`
- Smooth hover states with `whileHover`

---

## Component Overview

### 1. **FloatingNav** (`src/components/FloatingNav.tsx`)
- Glassmorphic pill-shaped navigation
- Fixed position with entrance animation
- Responsive link visibility
- Gradient CTA button

### 2. **Hero** (`src/components/Hero.tsx`)
- Large, animated hero section
- Gradient text effects
- Dual CTA buttons
- Floating animated background shapes
- Badge with pulsing indicator

### 3. **BentoGrid** (`src/components/BentoGrid.tsx`)
- Responsive grid with mixed card sizes
- Hover lift animations
- Icon components with glow effects
- Viewport-triggered animations

### 4. **CTASection** (`src/components/CTASection.tsx`)
- Large conversion-focused card
- Multi-button CTA with animations
- Feature checklist with icons
- Trust indicators

### 5. **Footer** (in `page.tsx`)
- Multi-column footer layout
- Link sections and social icons
- Minimal, clean design

---

## Customization Guide

### Changing Colors
Edit `src/app/globals.css`:

```css
:root {
  --accent-emerald: #your-color;
  --accent-cyan: #your-color;
  /* ... */
}
```

Then use in components:
```tsx
className="text-cyan-400 border-cyan-500/30 bg-cyan-500/10"
```

### Modifying Typography
Update `src/app/layout.tsx` to use different fonts from Google Fonts:

```tsx
const newFont = NewFont({ subsets: ["latin"] });
```

Then update `globals.css`:
```css
--font-sans: 'NewFont', 'NewFont Fallback';
```

### Adding New Sections
1. Create a new component in `src/components/`
2. Import it in `src/app/page.tsx`
3. Add it to the main layout between Hero and Footer
4. Use the same animation patterns from existing components

### Adjusting Animations
Modify `framer-motion` props in any component:

```tsx
// Change stagger timing
staggerChildren: 0.1  // Smaller = faster

// Change animation duration
transition: { duration: 0.6 }

// Add delay
delayChildren: 0.3
```

---

## Performance Tips

1. **Images**: Use Next.js `<Image>` component for optimization
2. **Fonts**: Already optimized with `next/font/google`
3. **Animations**: Kept to CSS transforms and opacity for smooth 60fps
4. **Code Splitting**: Each component can be lazy-loaded
5. **Caching**: Static pages can be cached with ISR

---

## Deployment

### Deploy to Vercel (Recommended)

1. Push to GitHub
2. Connect repository to Vercel
3. Vercel auto-detects Next.js
4. Deploy! (takes ~2 minutes)

```bash
# From GitHub
git push origin main
# Vercel auto-deploys
```

### Build for Production

```bash
bun run build
bun start
```

---

## Environment Variables

Currently, no environment variables are needed for the landing page. If you add:
- Analytics (Google Analytics, Vercel Analytics)
- Email service (Mailchimp, SendGrid)
- API integrations

You'll need to add them to `.env.local`:

```bash
NEXT_PUBLIC_GA_ID=your-ga-id
API_SECRET_KEY=your-secret-key
```

---

## SEO & Metadata

Metadata is configured in `src/app/layout.tsx`:

```tsx
export const metadata: Metadata = {
  title: "DevTrailer - AI-Powered Video Trailers for Developers",
  description: "Turn your project documentation and live website into cinematic promo videos in seconds with AI.",
  // ... more metadata
};
```

Update these values to match your project branding.

---

## Common Tasks

### Add a New Component
```bash
# Create file
touch src/components/MyComponent.tsx

# Import in page.tsx
import MyComponent from "@/components/MyComponent";

# Use in page.tsx
<MyComponent />
```

### Update Global Styles
Edit `src/app/globals.css` - all changes apply instantly in dev mode

### Change Hero Heading
Edit `src/components/Hero.tsx` - Find the `<h1>` tag and modify

### Modify CTA Button
Edit the button in `src/components/Hero.tsx` or `src/components/CTASection.tsx`

---

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
# Try again
bun run dev
```

### Tailwind Classes Not Applying
- Ensure file is in `src/` directory
- Check class names are spelled correctly
- Restart dev server: `Ctrl+C` then `bun run dev`

### Animations Not Working
- Verify Framer Motion is installed: `bun add framer-motion`
- Check component has `"use client"` directive
- Ensure `motion.*` components are imported correctly

### Build Fails
```bash
# Clean and rebuild
bun run build
# If still failing, check TypeScript:
bunx tsc --noEmit
```

---

## Documentation

- **Design System**: See `DESIGN.md`
- **Component API**: See `COMPONENTS.md`
- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind Docs**: https://tailwindcss.com
- **Framer Motion**: https://www.framer.com/motion
- **Phosphor Icons**: https://phosphoricons.com

---

## Next Steps

1. **Customize branding**: Update colors, fonts, and copy
2. **Add analytics**: Integrate with Vercel Analytics or Google Analytics
3. **Setup email**: Add newsletter signup form and email service
4. **Connect API**: Link to backend for video generation
5. **Deploy**: Push to GitHub and deploy to Vercel

---

## Support

For issues or questions:
- Check `DESIGN.md` and `COMPONENTS.md` first
- Review component comments in source files
- Test in browser DevTools
- Check Next.js and Framer Motion documentation

---

## License

This project is part of the DevTrailer hackathon entry. All code follows best practices and is production-ready.

**Happy building! 🚀**
