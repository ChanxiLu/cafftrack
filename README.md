# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Flow Map made using ChatGPT

# ☕ CaffTrack

CaffTrack is a React + Vite web app for tracking your coffee consumption.  
It helps you log coffees, track caffeine levels in your body, see your costs, and visualize habits over time.

---

## ✨ Features

- 📊 **Stats Dashboard**: daily caffeine, daily cost, average coffees/day, and top coffees.
- 🕑 **History Timeline**: view each coffee entry with remaining caffeine calculated via half-life.
- ☁️ **Firebase Auth**: sign up, log in, reset password, log out.
- 💾 **Firestore Persistence**: all entries are saved per user in the cloud.
- 🔒 **Authentication Modal**: login/signup handled with a modal, closing only on success.
- 🎨 **Responsive UI**: styled with custom CSS and Font Awesome icons.

---

## 🛠️ Tech Stack

- **Frontend**: React + Vite
- **State Management**: React Context (`AuthContext`)
- **Backend**: Firebase Authentication + Firestore
- **Styling**: CSS, Font Awesome
- **Build Tool**: Vite

---

## 🚀 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/YOUR_USERNAME/cafftrack.git
cd cafftrack
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Firebase
Create a `.env` file in the root with your Firebase keys:

```env
VITE_FIREBASE_APIKEY=your_api_key
VITE_FIREBASE_AUTHDOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECTID=your_project_id
VITE_FIREBASE_STORAGEBUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGINGSENDERID=your_sender_id
VITE_FIREBASE_APPID=your_app_id
VITE_FIREBASE_MEASUREMENTID=your_measurement_id
```

### 4. Start development server
```bash
npm run dev
```

---

## 🗂️ Project Structure

```
cafftrack/
├── index.html
├── src/
│   ├── main.jsx          # Entry point
│   ├── App.jsx           # Main app
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── components/
│   │   ├── Layout.jsx
│   │   ├── Modal.jsx
│   │   ├── Authentication.jsx
│   │   ├── CoffeeForm.jsx
│   │   ├── History.jsx
│   │   ├── Stats.jsx
│   │   └── Hero.jsx
│   ├── utils/
│   │   └── index.js
│   └── firebase.js
└── README.md
```

---

## 🔄 Architecture Flow

```
index.html (#root + #portal)
        │
    main.jsx
        │
   AuthProvider (AuthContext)
        │
       App.jsx
        │
 ┌──────┴───────────┐
 │                  │
Layout           Firebase.js
 │
 ├─ Header (login/logout)
 ├─ Hero
 ├─ CoffeeForm ──▶ utils (stats, caffeine math) ──▶ Firestore
 ├─ History ─────▶ utils
 ├─ Stats ───────▶ utils
 └─ Modal ───────▶ Authentication
```

---

## 📌 Notes

- Data is user-specific and stored in Firestore under `users/{uid}`.
- Caffeine half-life is assumed to be **5 hours** for calculations.
- Use responsibly 😉.