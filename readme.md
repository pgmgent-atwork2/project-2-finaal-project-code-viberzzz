# Project 2 - Finaal Project (Seapark Filtratie)

Full-stack web application with React frontend and Supabase backend for managing aquatic filtration systems.

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- npm (v9+)

### Installation & Setup

```bash
# Install all dependencies (from root)
npm install

# Start the frontend development server
npm run start:frontend

# Start backend services (if needed)
npm run start:backend

# Run all services at once
npm run dev
```

The frontend will open at **http://localhost:3000**

## 📁 Project Structure

```
project-2-finaal-project-code-viberzzz/
│
├── services/                          # Main monorepo structure
│   │
│   ├── frontend/                      # React web application
│   │   ├── src/
│   │   │   ├── App.js                 # Main app with routing
│   │   │   ├── pages/
│   │   │   │   ├── SignIn.js          # Login page
│   │   │   │   ├── SignUp.js          # Registration page
│   │   │   │   └── Home.js            # Protected dashboard
│   │   │   ├── components/
│   │   │   │   └── ProtectedRoute.js  # Auth guard component
│   │   │   ├── index.js               # React entry point
│   │   │   └── App.css
│   │   ├── public/                    # Static assets
│   │   ├── package.json               # Frontend dependencies
│   │   └── README.md
│   │
│   ├── backend/                       # API layer & services
│   │   ├── auth/
│   │   │   ├── api.auth.ts            # Authentication functions
│   │   │   └── types.auth.ts          # Auth type definitions
│   │   ├── network-supabase/
│   │   │   ├── api.ts                 # Supabase client setup
│   │   │   └── database.types.ts      # Database type definitions
│   │   ├── index.ts                   # Backend exports
│   │   └── package.json
│   │
│   └── shared/                        # Shared code & types
│       ├── auth/
│       │   ├── AuthContext.tsx        # Auth context
│       │   ├── AuthProvider.tsx       # Auth provider
│       │   ├── useAuth.ts             # Auth hook
│       │   ├── useUser.ts             # User hook
│       │   └── index.ts               # Auth exports
│       ├── types/
│       │   └── index.ts               # Shared types
│       └── package.json
│
├── supabase/                          # Supabase configuration
│   └── config.toml
│
├── .env                               # Environment variables (local only)
├── package.json                       # Root workspace config
└── README.md                          # This file

```

## 🔐 Authentication Flow

1. **User visits app** → `ProtectedRoute` checks if logged in
2. **Not logged in** → Redirect to `/sign-in`
3. **Logged in** → Show protected page (e.g., Home)
4. **AuthProvider** manages session automatically

## 🛠️ Key Technologies

- **Frontend:** React 19.2.5, React Router 7.14.2
- **Backend:** Supabase (PostgreSQL, Auth, Real-time)
- **Package Manager:** npm workspaces
- **TypeScript:** Full type safety across backend

## 📝 Available Scripts

### Root Level
```bash
npm run dev              # Start all services (frontend + backend)
npm run build           # Build all packages
npm run start:frontend  # Start React app only
npm run start:backend   # Start backend services only
npm install            # Install all dependencies
```

### Frontend Only
```bash
cd services/frontend
npm start               # Start development server
npm run build          # Create production build
npm test               # Run tests
```

## 🔗 Important Files

### Frontend Entry Points
- `services/frontend/src/index.js` - React entry point
- `services/frontend/src/App.js` - Routing setup
- `services/frontend/public/index.html` - HTML template

### Backend API Layer
- `services/backend/auth/api.auth.ts` - Login, signup, session management
- `services/backend/network-supabase/api.ts` - Supabase client initialization

### Shared Authentication
- `services/shared/auth/AuthProvider.tsx` - Wraps app with auth context
- `services/shared/auth/useAuth.ts` - Hook to access auth state in components

## 🔑 Environment Variables

Create a `.env` file at root with:

```env
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_KEY=your_supabase_anon_key
PUBLIC_SUPABASE_URL=your_supabase_url
PUBLIC_SUPABASE_KEY=your_supabase_anon_key
```

## 📖 Routes

| Route | Access | Description |
|-------|--------|-------------|
| `/` | Protected | Dashboard (requires login) |
| `/sign-in` | Public | Login page |
| `/sign-up` | Public | Registration page |
| `/*` | All | Redirects to home |

## 🚦 Development Workflow

1. **Install dependencies:** `npm install`
2. **Start frontend:** `npm run start:frontend`
3. **Create features in `services/frontend/src/`**
4. **Call APIs from `services/backend/`**
5. **Use shared auth from `services/shared/auth/`**

## 📚 Adding New Routes

1. Create a new page in `services/frontend/src/pages/`
2. Import in `services/frontend/src/App.js`
3. Add route in `<Routes>`
4. Wrap with `<ProtectedRoute>` if authentication required

Example:
```jsx
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
```

## 🐛 Troubleshooting

**Port 3000 already in use?**
```bash
# Kill process on port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**Dependencies not installing?**
```bash
# Clear npm cache
npm cache clean --force
rm -r node_modules package-lock.json
npm install
```

**Auth not working?**
- Check `.env` has correct Supabase credentials
- Verify Supabase project is active
- Check browser console for errors

## 📋 Project Requirements (Seapark)

### Features to Implement

#### Filtration Overview
- Visual display of all filtration units in the park
- Status indicator per unit (active, maintenance needed, failure)
- Click-through for detailed information

#### Logbook & Registration
- Input fields for measurements, failures, maintenance
- Automatic timestamp with employee name
- Support for notes and photo attachments
- Daily, weekly, and monthly tasks

#### Maintenance Planning
- Calendar with scheduled maintenance
- Task assignment to staff members
- Automatic notifications for upcoming maintenance

#### Monitoring Dashboard
- Charts showing water quality trends (chlorine, pH, temperature, salinity)
- Report export functionality

#### Admin Module
- Add/remove filtration units
- Configure maintenance frequency and alarm limits
- User management with access control (technician, supervisor, admin)

## 📞 Support

For issues or questions, check:
- Supabase docs: https://supabase.com/docs
- React Router docs: https://reactrouter.com/
- React docs: https://react.dev/

---

**Last Updated:** May 5, 2026
desktop.
• Backend-structuur die uitbreidbaar is op aanvraag.


Doel van de toepassing
De app moet het overzicht van onze technische dienst vergemakkelijken, zorgen voor
een duidelijke registratie van alles wat met filtratie te maken heeft en de
betrouwbaarheid van het systeem verhogen door efficiënter onderhoud en opvolging.
Hierdoor moeten we niet elke locatie bezoeken maar weten we door deze app in een
oogopslag waar problemen zich voordien en wie verantwoordelijke is.
