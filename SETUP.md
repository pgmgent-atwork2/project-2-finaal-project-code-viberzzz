# Running the Project with Separate Terminals

## 📟 Terminal 1 - Frontend (React)

```bash
cd services/frontend
npm start
```

Or from root:
```bash
npm run start:frontend
```

The frontend will compile and open at **http://localhost:3000**

---

## 📟 Terminal 2 - Backend Services

```bash
cd services/backend
npm start
```

Or from root:
```bash
npm run start:backend
```

---

## 🚀 Quick Setup (Two Terminals)

### Terminal 1 - Frontend
```bash
npm run start:frontend
```
- Runs React development server with hot-reload
- Opens automatically at http://localhost:3000
- Auto-recompiles on file changes

### Terminal 2 - Backend
```bash
npm run start:backend
```
- Starts backend services
- Watch mode enabled for file changes

---

## 💡 Tips

- Keep both terminals open during development
- Frontend will hot-reload when you edit `.js` files
- Backend will restart when you edit `.ts` files
- Check both terminals for errors
- Frontend errors show in browser console AND terminal

## 🔧 Scripts Available

From root directory:

```bash
npm run start:frontend   # Frontend only
npm run start:backend    # Backend only
npm run build           # Build both packages
npm install            # Install all dependencies
```

---

**That's it! You now have isolated frontend and backend with live reloading.** ✅
