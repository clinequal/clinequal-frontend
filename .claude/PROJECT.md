# Clinequal Frontend

## Current State
- MVP stage: Company website + embedded demo
- Deployment: Not yet deployed (target: Vercel)
- Version: Pre-v1.0

## Tech Stack
- **Framework**: Next.js 14.2+ (App Router, TypeScript 5.3+)
- **Styling**: Tailwind CSS 3.4+
- **Charts**: Recharts 2.x (demo visualizations only)
- **HTTP**: Native fetch API
- **Node**: 20.x LTS

## Architecture Decisions

### Why Next.js App Router
- Server components for static content (marketing pages)
- Client components only for interactive demo
- File-based routing matches page structure naturally
- Built-in optimization (images, fonts, code splitting)

### Why No Component Library
- Tailwind primitives sufficient for MVP
- Avoid dependency bloat
- Full design control needed for healthcare brand
- Component library adds 200KB+ for minimal benefit at this stage

### Why Recharts
- Lightweight for simple bar/line charts
- Declarative API matches React patterns
- No D3.js learning curve for team
- Sufficient for demo (not production analytics dashboard)
## Deployment Model
- **Host**: Vercel (target)
- **Build**: Static where possible, dynamic for demo
- **Environment**: Separate prod/staging via Vercel branches
- **Backend separation**: Frontend deployed independently from backend
- **API URL**: Environment variable (`NEXT_PUBLIC_API_URL`)

## Performance Targets
- Lighthouse Performance: >90
- First Contentful Paint: <1.5s
- Time to Interactive: <3s
- Bundle size: <500KB (before compression)
 
## Browser Support
- Chrome/Edge: Last 2 versions
- Firefox: Last 2 versions
- Safari: Last 2 versions
- Mobile Safari: iOS 15+
- No IE11 support

## Key Constraints

- Desktop First

### Accessibility
- WCAG 2.1 AA minimum
- Semantic HTML throughout
- Focus visible on all interactive elements
- Alt text for all images
- Form labels for all inputs

### Demo Limitations
- File upload: Max 10MB, CSV only
- No user accounts/sessions
- Results ephemeral (not persisted)
- Single analysis per upload (no comparison)

## Dependencies Philosophy
- Minimal dependencies for MVP
- Avoid premature optimization libraries
- UI: Build with Tailwind, not import component library
- State: React useState sufficient for MVP (no Redux/Zustand yet)
- Forms: Native HTML + validation, no react-hook-form yet

## What NOT to Do
- Don't add Ant Design, Material-UI, or similar
- Don't implement authentication (not needed for demo)
- Don't use localStorage for sensitive data
- Don't fetch on server components if data changes frequently
- Don't add analytics/tracking yet (GDPR complexity)


## Dependencies Philosophy
- Minimal dependencies for MVP
- Avoid premature optimization libraries
- UI: Build with Tailwind, not import component library
- State: React useState sufficient for MVP (no Redux/Zustand yet)
- Forms: Native HTML + validation, no react-hook-form yet
