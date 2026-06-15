# Project 2 - Finaal Project (Seapark Filtratie)

Full-stack web application with React frontend and Supabase backend for managing aquatic filtration systems at Seapark.

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- npm (v9+)
- Supabase account and project

### Installation & Setup

```bash
# Navigate to the full-stack directory
cd full-stack

# Install all dependencies
npm install

# Start the development server
npm start
```

The application will open at **http://localhost:3000**

## 📁 Project Structure

```
project-2-finaal-project-code-viberzzz/
│
├── full-stack/                        # React application
│   ├── src/
│   │   ├── App.jsx                    # Main app with routing
│   │   ├── index.jsx                  # React entry point
│   │   │
│   │   ├── pages/                     # Page components
│   │   │   ├── login.jsx              # Login page
│   │   │   ├── ResetPassword.jsx      # Password reset
│   │   │   ├── AquariumDashboard.jsx  # Main dashboard
│   │   │   ├── Units.jsx              # Filtration units overview
│   │   │   ├── Unit.jsx               # Unit detail page
│   │   │   ├── Planning.jsx           # Maintenance planning
│   │   │   ├── Reports.jsx            # Reports & analytics
│   │   │   └── Admin.jsx              # Admin panel
│   │   │
│   │   ├── components/                # Reusable components
│   │   │   ├── Layout.jsx             # Main layout wrapper
│   │   │   ├── SeaparkNav.jsx         # Navigation sidebar
│   │   │   ├── ProtectedRoute.jsx     # Auth guard component
│   │   │   ├── Admin/                 # Admin components
│   │   │   │   ├── CreateFiltratieUnitForm.jsx
│   │   │   │   ├── UserCard.jsx
│   │   │   │   └── RoleBadge.jsx
│   │   │   ├── dashboard/             # Dashboard components
│   │   │   │   ├── UnitCard.jsx
│   │   │   │   ├── UnitDetailModal.jsx
│   │   │   │   ├── LogModal.jsx
│   │   │   │   ├── PhChart.jsx
│   │   │   │   └── StatCard.jsx
│   │   │   └── Planning/              # Planning components
│   │   │       ├── NewPlanningEntry.jsx
│   │   │       ├── MaintenanceCalendar.jsx
│   │   │       └── UpcomingMaintenance.jsx
│   │   │
│   │   ├── context/                   # React contexts
│   │   │   └── auth/                  # Authentication context
│   │   │       ├── AuthContext.jsx
│   │   │       ├── AuthProvider.jsx
│   │   │       └── useAuth.js
│   │   │
│   │   ├── api/                       # API layer (Supabase)
│   │   │   ├── authApi.js             # Authentication API
│   │   │   ├── filtratie_unit/
│   │   │   │   └── api.filtratie_unit.ts
│   │   │   ├── filtratie_waarden/
│   │   │   │   └── api.filtratie_waarden.ts
│   │   │   ├── waarden_range/
│   │   │   │   └── api.waarden_range.ts
│   │   │   ├── gebruiker/
│   │   │   │   └── api.gebruiker.ts
│   │   │   ├── onderhoud/
│   │   │   │   └── api.onderhoud.ts
│   │   │   └── reports/
│   │   │       └── api.onderhoud.ts
│   │   │
│   │   ├── types/                     # TypeScript type definitions
│   │   │   ├── database.types.ts      # Supabase generated types
│   │   │   ├── types.enums.ts
│   │   │   ├── types.filtratie_unit.ts
│   │   │   ├── types.filtratie_waarden.ts
│   │   │   ├── types.waarden_range.ts
│   │   │   ├── types.gebruiker.ts
│   │   │   └── types.onderhoud.ts
│   │   │
│   │   ├── lib/                       # Libraries & utilities
│   │   │   └── supabaseClient.js      # Supabase client setup
│   │   │
│   │   ├── css/                       # Stylesheets
│   │   └── hooks/                     # Custom React hooks
│   │       └── useUnitStatus.js
│   │
│   ├── public/                        # Static assets
│   │   ├── index.html
│   │   ├── manifest.json
│   │   └── robots.txt
│   │
│   ├── build/                         # Production build output
│   ├── package.json                   # Dependencies & scripts
│   └── README.md
│
├── supabase/                          # Supabase configuration
│   └── config.toml
│
├── scripts/                           # SQL scripts
│   ├── onderhoud.sql
│   └── sql/
│       ├── init.sql
│       └── insert_user.sql
│
├── .env                               # Environment variables (local only)
├── readme.md                          # This file
└── SETUP.md                           # Setup instructions

```

## 🔐 Authentication & Authorization

### Authentication Flow
1. **User visits app** → `ProtectedRoute` checks if logged in
2. **Not logged in** → Redirect to `/login`
3. **Logged in** → Show protected page
4. **AuthProvider** manages session automatically with Supabase

### Role-Based Access Control
The system has three user roles:
- **Technieker**: Basic access to view units and logs
- **Supervisor**: Can create planning entries and view reports
- **Admin**: Full access including unit management, user management, and system configuration

Protected routes check user roles:
- `/reports` - Requires supervisor or admin
- `/admin` - Requires admin only
- Planning entry creation - Requires supervisor or admin

## 🛠️ Key Technologies

- **Frontend:** React 19.2.5, React Router 7.14.2, Recharts 3.8.1
- **Backend:** Supabase (PostgreSQL, Auth, Real-time)
- **Database:** PostgreSQL with RLS (Row Level Security)
- **Styling:** Custom CSS with responsive design
- **TypeScript:** Type safety for API layer and database types
- **PDF Generation:** jsPDF with autotable for reports

## 📝 Available Scripts

All scripts run from the `full-stack/` directory:

```bash
cd full-stack

npm start              # Start development server (http://localhost:3000)
npm run build         # Create production build
npm test              # Run tests with coverage
npm install           # Install all dependencies
```

## 🔗 Important Files

### Entry Points
- `full-stack/src/index.jsx` - React entry point
- `full-stack/src/App.jsx` - Main app component with routing
- `full-stack/public/index.html` - HTML template

### API Layer
- `full-stack/src/api/authApi.js` - Authentication functions
- `full-stack/src/api/filtratie_unit/api.filtratie_unit.ts` - Unit CRUD operations
- `full-stack/src/api/filtratie_waarden/api.filtratie_waarden.ts` - Water quality measurements
- `full-stack/src/api/waarden_range/api.waarden_range.ts` - Acceptable value ranges
- `full-stack/src/api/onderhoud/api.onderhoud.ts` - Maintenance operations
- `full-stack/src/api/gebruiker/api.gebruiker.ts` - User management

### Authentication
- `full-stack/src/context/auth/AuthProvider.jsx` - Auth context provider
- `full-stack/src/context/auth/useAuth.js` - Auth hook
- `full-stack/src/lib/supabaseClient.js` - Supabase client initialization

### Database
- `full-stack/src/types/database.types.ts` - Supabase generated types
- `scripts/sql/init.sql` - Database schema initialization

## 🔑 Environment Variables

Create a `.env` file in the `full-stack/` directory:

```env
REACT_APP_SUPABASE_URL=your_supabase_project_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
```

You can find these values in your Supabase project settings:
1. Go to your Supabase project dashboard
2. Navigate to Settings → API
3. Copy the Project URL and anon/public key

## 📖 Routes

| Route | Access | Description |
|-------|--------|-------------|
| `/` | Public | Redirects to `/login` or `/dashboard` |
| `/login` | Public | Login page |
| `/reset-password` | Public | Password reset page |
| `/dashboard` | Protected | Main dashboard with unit overview |
| `/units` | Protected | Filtration units list |
| `/units/:id` | Protected | Unit detail page with logs |
| `/planning` | Protected | Maintenance planning calendar |
| `/reports` | Supervisor/Admin | Analytics and reports |
| `/admin` | Admin only | User and system management |

## 🚦 Development Workflow

1. **Navigate to project:** `cd full-stack`
2. **Install dependencies:** `npm install`
3. **Configure environment:** Create `.env` file with Supabase credentials
4. **Start development server:** `npm start`
5. **Create features in `src/`:**
   - Add pages in `src/pages/`
   - Add components in `src/components/`
   - Add API functions in `src/api/`
   - Use TypeScript types from `src/types/`

## 📚 Adding New Routes

1. Create a new page component in `full-stack/src/pages/`
2. Import in `full-stack/src/App.jsx`
3. Add route in `<Routes>`
4. Wrap with `<ProtectedRoute>` if authentication required
5. Optionally specify `allowedRoles` for role-based access

Example:
```jsx
<Route
  path="/new-page"
  element={
    <ProtectedRoute allowedRoles={["supervisor", "admin"]}>
      <NewPage />
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

## 📋 Implemented Features

### ✅ Filtration Overview
- Visual display of all filtration units in the park
- Status indicator per unit (actief, onderhoud, storing, uitgeschakeld)
- Real-time water quality monitoring (pH, temperature, salinity, water level, microbiology)
- Click-through for detailed unit information
- Admin capabilities: Create, edit, and delete units
- Linked water quality ranges (waarden_range) for each unit

### ✅ Dashboard & Monitoring
- Statistics cards showing total units, active units, units needing attention, and daily logs
- pH trend chart with historical data
- Unit cards with status badges and quick info
- Modal views for detailed unit information
- Water parameter display with min/max ranges

### ✅ Logbook & Registration
- Log entry modal with all water quality parameters
- Unit selection dropdown
- Input fields for pH, temperature, salinity, water level, and microbiology
- Automatic timestamp
- Status tracking (actief, onderhoud, storing, uitgeschakeld)

### ✅ Maintenance Planning
- Interactive calendar view with scheduled maintenance
- New planning entry form (supervisor/admin only)
- Task assignment to technicians
- Frequency configuration (daily, weekly, monthly, yearly)
- Date range selection for maintenance periods
- Upcoming maintenance overview
- Overdue tasks tracking

### ✅ Reports & Analytics
- Water quality charts and trend analysis
- Maintenance activity tracking
- Recent logs table with filtering
- PDF export functionality
- Data visualization with Recharts

### ✅ Admin Module
- User management with role-based access control
- Add/remove filtration units with linked value ranges
- Edit existing units and their acceptable parameter ranges
- Role management (technieker, supervisor, admin)
- User cards with role badges
- System-wide configuration

### ✅ Authentication & Security
- Secure login with Supabase authentication
- Password reset functionality
- Role-based route protection
- Session management
- Automatic redirect based on authentication status

## �️ Database Schema

### Main Tables

**filtratie_unit** - Filtration units
- `id` (UUID, PK)
- `naam` (VARCHAR) - Unit name
- `locatie` (VARCHAR) - Location in park
- `status` (unit_status ENUM) - actief, onderhoud, storing, uitgeschakeld
- `aangemaakt_op` (TIMESTAMPTZ) - Creation timestamp

**waarden_range** - Acceptable parameter ranges
- `id` (UUID, PK)
- `unit_id` (UUID, FK → filtratie_unit.id, UNIQUE)
- `ph_min`, `ph_max` (NUMERIC)
- `water_level_min`, `water_level_max` (NUMERIC)
- `temperatuur_min`, `temperatuur_max` (NUMERIC)
- `zoutgehalte_min`, `zoutgehalte_max` (NUMERIC)
- `microbiologie_max` (NUMERIC)

**filtratie_waarden** - Water quality measurements
- `id` (UUID, PK)
- `unit_id` (UUID, FK → filtratie_unit.id)
- `ph_waarde`, `temperatuur`, `zoutgehalte`, `water_level`, `microbiologie` (NUMERIC)
- `gemeten_op` (TIMESTAMPTZ)
- `gemeten_door` (UUID, FK → gebruiker.id)

**onderhoud** - Maintenance planning
- `id` (UUID, PK)
- `unit_id` (UUID, FK → filtratie_unit.id)
- `technieker_id` (UUID, FK → gebruiker.id)
- `start_datum`, `eind_datum` (DATE)
- `frequentie` (onderhoud_frequentie ENUM) - dagelijks, wekelijks, maandelijks, jaarlijks
- `status` (onderhoud_status ENUM)

**gebruiker** - Users
- `id` (UUID, PK)
- `naam` (VARCHAR)
- `email` (VARCHAR, UNIQUE)
- `rol` (gebruiker_rol ENUM) - technieker, supervisor, admin

### Relationships
- `waarden_range.unit_id` → `filtratie_unit.id` (1-to-1, ON DELETE CASCADE)
- `filtratie_waarden.unit_id` → `filtratie_unit.id` (many-to-1)
- `onderhoud.unit_id` → `filtratie_unit.id` (many-to-1)
- `onderhoud.technieker_id` → `gebruiker.id` (many-to-1)

## 📞 Support

For issues or questions, check:
- Supabase docs: https://supabase.com/docs
- React Router docs: https://reactrouter.com/
- React docs: https://react.dev/
- Recharts docs: https://recharts.org/

## 🎯 Project Goal

The application aims to simplify overview for the technical service at Seapark, ensure clear registration of everything related to filtration, and increase system reliability through more efficient maintenance and tracking. This eliminates the need to visit every location - the app provides at-a-glance visibility of where problems occur and who is responsible.

---

**Last Updated:** June 15, 2026
