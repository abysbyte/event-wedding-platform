# Wedding & Events Platform

A polished, interactive wedding and events website built with Next.js. This project showcases a responsive design, smooth navigation, and elegant content sections for couples, event planners, and venue partners.

## live preview - https://vogue-project.vercel.app

## What this project includes

- **Responsive landing experience** with full-screen hero, animated content, and scroll-based navigation
- **About, Services, Gallery, and Contact** pages organized with modern layout patterns
- **Custom UI components** for branding, navigation, image galleries, and transitions
- **Smooth interactive experience** for desktop and mobile visitors
- **Next.js App Router** with optimized routing and server-side rendering ready for deployment

## Local development

```bash
npm install
npm run dev
```


## Key pages and features

- `src/app/page.tsx` — homepage experience and hero section
- `src/app/about/page.tsx` — brand story, mission, and team section
- `src/app/services/page.tsx` — curated event planning services and offerings
- `src/app/gallery/page.tsx` — image-rich portfolio of weddings and events
- `src/app/contact/page.tsx` — contact form and venue inquiry section
- `src/components/Navbar.tsx` — sticky navigation with smooth scrolling support
- `src/components/PageLoader.tsx` — polished page transitions and load states
- `src/components/SmoothScrolling.tsx` — reusable smooth scroll utility

## Design and interaction highlights

- Smooth section navigation and scroll anchoring
- Elegant service cards and event showcases
- Responsive image gallery for weddings, venues, and celebrations
- Clean typography and consistent spacing for high-end event brands

## Build for production

```bash
npm run build
npm start
```

## Customize your platform

- Replace static content in `src/lib/weddingData.ts` with your own event packages and photo collections
- Update layout styling in `src/app/globals.css` and `tailwind.config.js`
- Add new service categories or event types in `src/app/services/page.tsx`
- Extend the gallery with new event imagery in `public/weddingImages` and `public/serviceImages`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Open a pull request with a clear description

## Deployment

This site is ready for deployment on Vercel, Netlify, or any platform that supports Next.js.

> For a live preview, run the development server locally and explore the interactive wedding experience at `http://localhost:3000`.

---

### Project structure

- `src/app/` — application routes and page components
- `src/components/` — shared UI building blocks
- `src/lib/` — content data and utilities
- `public/` — static assets for galleries and service imagery

## License

This project is open for customization and use under your preferred license.
