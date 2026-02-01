# Smooth Motion UI

A romantic interactive React website with smooth animations and beautiful UI components.

## Features

- 🎨 Beautiful UI with Tailwind CSS and shadcn/ui components
- ✨ Smooth animations with Framer Motion
- 🎵 Integrated music player
- ⭐ Interactive starry background with particles
- 💾 PostgreSQL database with Drizzle ORM
- 🔐 Authentication system
- 📱 Responsive design

## Tech Stack

**Frontend:**
- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui components
- Framer Motion
- Wouter (routing)
- TanStack Query

**Backend:**
- Express
- PostgreSQL
- Drizzle ORM
- Session-based authentication

## Getting Started

### Prerequisites

- Node.js (v20 or higher)
- PostgreSQL database

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd Smooth-Motion-UI
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your database credentials:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/smooth_motion_ui
SESSION_SECRET=your-secret-key-here
```

4. Push database schema:
```bash
npm run db:push
```

### Development

Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5000`

### Build

Build for production:
```bash
npm run build
```

Start production server:
```bash
npm start
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run check` - Type-check TypeScript
- `npm run db:push` - Push schema changes to database

## Project Structure

```
smooth-motion-ui/
├── client/              # Frontend React app
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── hooks/       # Custom hooks
│   │   └── lib/         # Utilities
│   └── public/          # Static assets
├── server/              # Backend Express server
│   ├── index.ts         # Server entry point
│   ├── routes.ts        # API routes
│   └── db.ts            # Database connection
├── shared/              # Shared types and schemas
└── migrations/          # Database migrations

```

## License

MIT

## Author

Your Name
