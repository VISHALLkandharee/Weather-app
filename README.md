# React Weather App

This repository is a small, client-side weather application built with React and Vite. It demonstrates fetching weather data, displaying forecasts and charts, and basic authentication using Firebase. The app uses Tailwind for styling, React Query for data fetching, and Chart.js for charts.

**Status:** Ready for local development — production hardening (env secrets) recommended.

**Preview:** Open `http://localhost:5173` after running the dev server.
Online_hosted_url : https://react-app-679ff.web.app/

**Quick Links**
- **Source:** `./src`
- **Dev server:** `npm run dev`
- **Build:** `npm run build`

**Table of contents**
- Project Overview
- Features
- Tech Stack
- Getting Started
- Environment & Firebase
- Project Structure
- Scripts
- Notes & Recommendations
- Contributing
- License

**Project Overview**
- **Purpose:** A lightweight weather UI showing current conditions and forecast with simple authentication flows (signup/login) backed by Firebase.
- **Use case:** Learning example for React + Vite + Firebase + Chart.js integrations.

**Features**
- Search weather by city and view current conditions.
- 5-7 day forecast visualization with charts.
- Authentication (Signup / Login) using Firebase Authentication.
- Client-side caching using React Query for performant data fetching.

**Tech Stack**
- **Framework:** React (18)
- **Build tool:** Vite
- **Styling:** Tailwind CSS (configured via `tailwindcss` and `@tailwindcss/vite`)
- **Data fetching & caching:** `@tanstack/react-query`
- **Charts:** `chart.js` + `react-chartjs-2`
- **Auth / Backend-as-a-Service:** Firebase (`firebase` + `react-firebase-hooks`)
- **Routing:** `react-router-dom`

**Getting Started**
Follow these steps to get a local copy running.

1) Clone the repository (or fork first on GitHub):

```powershell
git clone https://github.com/VISHALLkandharee/Weather-app.git
cd "React Weather App"
```

If you want to work on your own copy, click "Fork" on the GitHub page, then clone your fork.

2) Install dependencies:

```powershell
npm install
```

3) Start the development server:

```powershell
npm run dev
```

The dev server prints the local URL (usually `http://localhost:5173`) — open it in your browser.

4) Build for production:

```powershell
npm run build

# For a local preview of the production build
npm run preview
```

**Environment & Firebase**
- The project currently includes a Firebase configuration file at `src/auth/firebase.jsx`. That file contains a Firebase web app config object. For security and best practices, store credentials in environment variables instead of committing them to source control.

Recommended steps to secure Firebase keys:

1. Create a `.env` file at the project root (gitignored) and add Vite-prefixed variables (example):

```text
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

2. Update `src/auth/firebase.jsx` to read values from `import.meta.env` (example):

```js
const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_FIREBASE_APP_ID,
	measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};
```

3. Add `.env` to `.gitignore` to prevent accidental commits.

Note: Firebase web config values are not secret in the same way server credentials are — but moving them into env vars still avoids accidental exposure in forks and public screenshots.

**Project Structure**
- `index.html` — Vite entry HTML
- `src/main.jsx` — React entry
- `src/App.jsx` — Root app component
- `src/components` — UI components (WeatherCard, Chart, Day, GetWeatherByCity, UseWeatherQuery)
- `src/auth` — Firebase setup and auth-related components (`firebase.jsx`, `Login.jsx`, `Signup.jsx`, `privateRoute.jsx`)
- `src/utils` — Helper utilities (e.g., `weatherImages.js`)
- `public/` — Static assets

You can inspect the code to understand where API calls are made — for example `UseWeatherQuery.jsx` contains the fetch logic wrapped by React Query.

**Available Scripts**
- `npm run dev`: Start Vite dev server
- `npm run build`: Build optimized production bundle
- `npm run preview`: Preview the production build locally
- `npm run lint`: Run ESLint across the project

**API Keys & Weather Provider**
- The app likely uses a public weather API (e.g., OpenWeatherMap). If required, add the API key to your `.env` and update the fetch call in `UseWeatherQuery.jsx` to read from `import.meta.env.VITE_WEATHER_API_KEY`.

Example `.env` entries for weather API:

```text
VITE_WEATHER_API_KEY=your_openweather_api_key
```

**Testing & Linting**
- Lint the codebase with:

```powershell
npm run lint
```

Add unit or integration tests as needed (this repo does not include a test harness by default).

**Deployment**
- The site is a static frontend. You can deploy the build output (from `npm run build`) to any static host such as GitHub Pages, Netlify, Vercel, or Firebase Hosting.

Example Netlify (basic):
- Build command: `npm run build`
- Publish directory: `dist`

Example Firebase Hosting steps (brief):

```powershell
npm run build
# then use Firebase CLI to deploy (install & login first)
npx firebase-tools login; npx firebase-tools deploy --only hosting
```

**Notes & Recommendations**
- Move API keys and Firebase config into environment variables.
- Add a `CONTRIBUTING.md` and a `LICENSE` (MIT recommended) if you plan to accept contributions.
- Add unit tests and CI (GitHub Actions) for code quality checks.

**Contributing**
- Fork the repo, create a feature branch, and submit a pull request. Keep changes focused and include readable commit messages.

**License**
- No license file is included in this repository. Add one (for example, `LICENSE` with MIT text) if you want to make the project open source.

---
If you'd like, I can also:
- move the Firebase config into `.env` and patch `src/auth/firebase.jsx` to read from `import.meta.env` (recommended), or
- add a short `CONTRIBUTING.md` and `LICENSE` (MIT) and commit them for you.

Tell me which of those you'd like next and I will continue.
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
