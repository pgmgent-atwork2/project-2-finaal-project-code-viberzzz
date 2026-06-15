# Running the Seapark Filtratie Project

## 📟 Quick Start

```bash
# Navigate to the project directory
cd full-stack

# Install dependencies
npm install

# Start the development server
npm start
```

The application will compile and open at **http://localhost:3000**

---

## 🚀 Development Server

### Starting the Application
```bash
cd full-stack
npm start
```

- Runs React development server with hot-reload
- Opens automatically at http://localhost:3000
- Auto-recompiles on file changes in `src/`
- TypeScript files in `api/` and `types/` are compiled automatically

---

## 💡 Development Tips

- Keep the terminal open during development
- Frontend will hot-reload when you edit `.jsx`, `.js`, `.ts`, or `.css` files
- Check the terminal for compilation errors
- Frontend errors also show in browser console
- Use React DevTools browser extension for debugging

## 🔧 Available Scripts

From the `full-stack/` directory:

```bash
npm start              # Start development server
npm run build         # Build production bundle
npm test              # Run test suite
npm install           # Install/update dependencies
```

## 🔑 Environment Setup

Before running the project, create a `.env` file in the `full-stack/` directory:

```env
REACT_APP_SUPABASE_URL=your_supabase_project_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Get these values from your Supabase project dashboard (Settings → API).

---

## 🗄️ Database Setup

1. Create a Supabase project at https://supabase.com
2. Run the SQL scripts in order:
   - `scripts/sql/init.sql` - Creates tables and relationships
   - `scripts/sql/insert_user.sql` - Adds initial users
   - `scripts/onderhoud.sql` - Sets up maintenance data

3. Enable Row Level Security (RLS) policies in Supabase
4. Configure authentication settings in Supabase dashboard

---

**That's it! You're ready to develop.** ✅
