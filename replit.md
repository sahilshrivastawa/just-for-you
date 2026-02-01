# Infinite Love Simulator

## Overview

A romantic interactive React website called "Infinite Love Simulator" that creates a cinematic emotional journey. The application guides users through a multi-step experience: an intro screen with a playful acceptance prompt, a universe intro with animated starry background, a vertical scroll love story with three scenes, a love calculator that saves names to a database, and a final romantic message.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript, using Vite as the build tool
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with custom romantic color theme (pink primary, purple accents)
- **UI Components**: shadcn/ui component library (new-york style) with Radix UI primitives
- **Animations**: Framer Motion for page transitions and smooth animations
- **Background Effects**: tsparticles for animated starry/heart particle backgrounds
- **State Management**: React Query (TanStack Query) for server state, React useState for local UI state

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ESM modules
- **API Pattern**: REST endpoints defined in shared route definitions with Zod validation
- **Build**: esbuild for production server bundling, Vite for client

### Data Storage
- **Database**: PostgreSQL via Drizzle ORM
- **Schema**: Single `love_logs` table storing name pairs (name1, name2) with timestamps
- **Migrations**: Drizzle Kit for database schema management (`db:push` command)

### Project Structure
```
client/           # React frontend
  src/
    components/   # UI components including shadcn/ui
    pages/        # Route pages (Home, not-found)
    hooks/        # Custom React hooks
    lib/          # Utilities and query client
server/           # Express backend
  index.ts        # Server entry point
  routes.ts       # API route handlers
  storage.ts      # Database operations
  db.ts           # Drizzle database connection
shared/           # Shared code between client/server
  schema.ts       # Drizzle schema definitions
  routes.ts       # API route contracts with Zod
```

### Multi-Step Flow Design
The Home page manages a step-based state machine:
- Step -1: Intro screen with acceptance prompt (playful "Will you be mine?" with moving button)
- Step 0: Universe intro with starry background
- Step 1: Scrollable love story with animated scenes
- Step 2: Love calculator (saves to database)
- Step 3: Final romantic message

## External Dependencies

### Database
- **PostgreSQL**: Required via `DATABASE_URL` environment variable
- **Drizzle ORM**: Schema definition and query building
- **connect-pg-simple**: Session storage (available but may not be actively used)

### Frontend Libraries
- **@tanstack/react-query**: Data fetching and caching
- **framer-motion**: Animation library
- **@tsparticles/react** + **@tsparticles/slim**: Particle effects engine
- **@tsparticles/shape-heart**: Heart-shaped particles
- **lucide-react**: Icon library
- **wouter**: Routing
- **zod**: Schema validation (shared with backend)

### UI Framework
- **Radix UI**: Comprehensive set of accessible primitives (dialog, dropdown, tabs, etc.)
- **class-variance-authority**: Component variant styling
- **tailwind-merge** + **clsx**: Class name utilities

### Build Tools
- **Vite**: Frontend dev server and bundler
- **esbuild**: Production server bundling
- **tsx**: TypeScript execution for development