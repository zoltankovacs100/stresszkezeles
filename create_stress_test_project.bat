@echo off
echo =====================================================
echo    STRESS TEST APP - TELJES PROJEKT LETREHOZASA
echo =====================================================
echo.

:: Create main directory
echo 📁 Mappa letrehozasa...
mkdir "C:\claudecode\Claude_stresszteszt" 2>nul
cd /d "C:\claudecode\Claude_stresszteszt"

:: Create subdirectories
mkdir src 2>nul
mkdir src\components 2>nul
mkdir public 2>nul

echo ✅ Mappastruktura kesz!
echo.

:: ============================================================================
:: CREATE PACKAGE.JSON
:: ============================================================================
echo 📦 package.json letrehozasa...
(
echo {
echo   "name": "stress-test-app",
echo   "version": "1.0.0",
echo   "private": true,
echo   "scripts": {
echo     "dev": "vite",
echo     "build": "vite build",
echo     "preview": "vite preview"
echo   },
echo   "dependencies": {
echo     "react": "^18.2.0",
echo     "react-dom": "^18.2.0",
echo     "lucide-react": "^0.263.1"
echo   },
echo   "devDependencies": {
echo     "@types/react": "^18.2.15",
echo     "@types/react-dom": "^18.2.7",
echo     "@vitejs/plugin-react": "^4.0.3",
echo     "autoprefixer": "^10.4.14",
echo     "postcss": "^8.4.27",
echo     "tailwindcss": "^3.3.3",
echo     "typescript": "^5.0.2",
echo     "vite": "^4.4.5"
echo   }
echo }
) > package.json

:: ============================================================================
:: CREATE VITE.CONFIG.TS
:: ============================================================================
echo ⚙️  vite.config.ts letrehozasa...
(
echo import { defineConfig } from 'vite'
echo import react from '@vitejs/plugin-react'
echo.
echo export default defineConfig^({
echo   plugins: [react^(^)],
echo   build: {
echo     outDir: 'dist',
echo     assetsDir: 'assets',
echo     sourcemap: false,
echo     minify: 'terser',
echo   },
echo   base: './',
echo }^)
) > vite.config.ts

:: ============================================================================
:: CREATE TAILWIND.CONFIG.JS
:: ============================================================================
echo 🎨 tailwind.config.js letrehozasa...
(
echo /** @type {import^('tailwindcss'^).Config} */
echo export default {
echo   content: [
echo     "./index.html",
echo     "./src/**/*.{js,ts,jsx,tsx}",
echo   ],
echo   theme: {
echo     extend: {},
echo   },
echo   plugins: [],
echo }
) > tailwind.config.js

:: ============================================================================
:: CREATE POSTCSS.CONFIG.JS
:: ============================================================================
echo 📝 postcss.config.js letrehozasa...
(
echo export default {
echo   plugins: {
echo     tailwindcss: {},
echo     autoprefixer: {},
echo   },
echo }
) > postcss.config.js

:: ============================================================================
:: CREATE TSCONFIG.JSON
:: ============================================================================
echo 📋 tsconfig.json letrehozasa...
(
echo {
echo   "compilerOptions": {
echo     "target": "ES2020",
echo     "useDefineForClassFields": true,
echo     "lib": ["ES2020", "DOM", "DOM.Iterable"],
echo     "module": "ESNext",
echo     "skipLibCheck": true,
echo     "moduleResolution": "bundler",
echo     "allowImportingTsExtensions": true,
echo     "resolveJsonModule": true,
echo     "isolatedModules": true,
echo     "noEmit": true,
echo     "jsx": "react-jsx",
echo     "strict": true,
echo     "noUnusedLocals": true,
echo     "noUnusedParameters": true,
echo     "noFallthroughCasesInSwitch": true
echo   },
echo   "include": ["src"],
echo   "references": [{ "path": "./tsconfig.node.json" }]
echo }
) > tsconfig.json

:: ============================================================================
:: CREATE TSCONFIG.NODE.JSON
:: ============================================================================
echo 🔧 tsconfig.node.json letrehozasa...
(
echo {
echo   "compilerOptions": {
echo     "composite": true,
echo     "skipLibCheck": true,
echo     "module": "ESNext",
echo     "moduleResolution": "bundler",
echo     "allowSyntheticDefaultImports": true
echo   },
echo   "include": ["vite.config.ts"]
echo }
) > tsconfig.node.json

:: ============================================================================
:: CREATE INDEX.HTML
:: ============================================================================
echo 🌐 index.html letrehozasa...
(
echo ^<!doctype html^>
echo ^<html lang="hu"^>
echo   ^<head^>
echo     ^<meta charset="UTF-8" /^>
echo     ^<link rel="icon" type="image/svg+xml" href="/vite.svg" /^>
echo     ^<meta name="viewport" content="width=device-width, initial-scale=1.0" /^>
echo     ^<title^>Stresszkezeles Teszt^</title^>
echo     ^<meta name="description" content="Professzionalis stresszkezelesi szemelyisegteszt" /^>
echo   ^</head^>
echo   ^<body^>
echo     ^<div id="root"^>^</div^>
echo     ^<script type="module" src="/src/main.tsx"^>^</script^>
echo   ^</body^>
echo ^</html^>
) > index.html

:: ============================================================================
:: CREATE NETLIFY.TOML
:: ============================================================================
echo 🚀 netlify.toml letrehozasa...
(
echo [build]
echo   publish = "dist"
echo   command = "npm run build"
echo.
echo [[redirects]]
echo   from = "/*"
echo   to = "/index.html"
echo   status = 200
echo.
echo [build.environment]
echo   NODE_VERSION = "18"
) > netlify.toml

:: ============================================================================
:: CREATE README.MD
:: ============================================================================
echo 📖 README.md letrehozasa...
(
echo # Stresszkezeles Teszt Alkalmazas
echo.
echo Professzionalis stresszkezelesi szemelyisegteszt React + TypeScript + Vite kornyezetben.
echo.
echo ## 🚀 Funkciok
echo.
echo - ✅ 30 kerdeses interaktiv teszt
echo - ✅ 5 szemelyisegtipus kiertekeles ^(A, B, C, D, E^)
echo - ✅ Validacio es vizualis visszajelzes
echo - ✅ HTML/PDF export funkcio
echo - ✅ Responsive design
echo - ✅ Magyar nyelvu felulet
echo.
echo ## 🛠️ Telepites
echo.
echo ```bash
echo npm install
echo npm run dev
echo ```
echo.
echo ## 🌐 Netlify Deploy
echo.
echo ```bash
echo npm run build
echo ```
echo.
echo Publish directory: `dist`
) > README.md

:: ============================================================================
:: CREATE SRC/MAIN.TSX
:: ============================================================================
echo ⚛️  src/main.tsx letrehozasa...
(
echo import React from 'react'
echo import ReactDOM from 'react-dom/client'
echo import App from './App.tsx'
echo import './index.css'
echo.
echo ReactDOM.createRoot^(document.getElementById^('root'^)!^).render^(
echo   ^<React.StrictMode^>
echo     ^<App /^>
echo   ^</React.StrictMode^>,
echo ^)
) > src\main.tsx

:: ============================================================================
:: CREATE SRC/APP.TSX
:: ============================================================================
echo 📱 src/App.tsx letrehozasa...
(
echo import StressTestApp from './components/StressTestApp'
echo.
echo function App^(^) {
echo   return ^(
echo     ^<div className="App"^>
echo       ^<StressTestApp /^>
echo     ^</div^>
echo   ^)
echo }
echo.
echo export default App
) > src\App.tsx

:: ============================================================================
:: CREATE SRC/INDEX.CSS
:: ============================================================================
echo 💅 src/index.css letrehozasa...
(
echo @tailwind base;
echo @tailwind components;
echo @tailwind utilities;
echo.
echo :root {
echo   font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
echo   line-height: 1.5;
echo   font-weight: 400;
echo   color-scheme: light;
echo   color: rgba^(0, 0, 0, 0.87^);
echo   background-color: #ffffff;
echo   font-synthesis: none;
echo   text-rendering: optimizeLegibility;
echo   -webkit-font-smoothing: antialiased;
echo   -moz-osx-font-smoothing: grayscale;
echo   -webkit-text-size-adjust: 100%%;
echo }
echo.
echo body {
echo   margin: 0;
echo   display: flex;
echo   place-items: center;
echo   min-width: 320px;
echo   min-height: 100vh;
echo }
echo.
echo #root {
echo   width: 100%%;
echo   margin: 0;
echo }
) > src\index.css

:: ============================================================================
:: CREATE EMPTY COMPONENT FILE (TO BE FILLED MANUALLY)
:: ============================================================================
echo 🧩 src/components/StressTestApp.tsx ures fajl letrehozasa...
(
echo // ============================================================================
echo // STRESS TEST APP COMPONENT
echo // ============================================================================
echo // 
echo // FIGYELEM: Ide masold be a teljes StressTestApp component kodot!
echo // 
echo // Az alabbi helyre illeszd be a stress_test_component artifact tartalmat:
echo //
echo.
echo import React from 'react';
echo.
echo const StressTestApp = ^(^) =^> {
echo   return ^(
echo     ^<div^>
echo       ^<h1^>Stress Test App - Komponens betoltese szukseges!^</h1^>
echo       ^<p^>Masold be ide a teljes komponens kodot az artifactbol.^</p^>
echo     ^</div^>
echo   ^);
echo };
echo.
echo export default StressTestApp;
) > src\components\StressTestApp.tsx

:: ============================================================================
:: SUMMARY
:: ============================================================================
echo.
echo ================================================================
echo                    ✅ PROJEKT SIKERESEN LETREHOZVA!
echo ================================================================
echo.
echo 📁 Projekt helye: C:\claudecode\Claude_stresszteszt
echo.
echo 📋 Letrehozott fajlok:
echo    ├── package.json
echo    ├── vite.config.ts  
echo    ├── tailwind.config.js
echo    ├── postcss.config.js
echo    ├── tsconfig.json
echo    ├── tsconfig.node.json
echo    ├── index.html
echo    ├── netlify.toml
echo    ├── README.md
echo    ├── src/main.tsx
echo    ├── src/App.tsx
echo    ├── src/index.css
echo    └── src/components/StressTestApp.tsx ^(URES - KITOLTENDO!^)
echo.
echo 🚨 FONTOS: 
echo    A src/components/StressTestApp.tsx fajl meg ures!
echo    Masold bele a teljes komponens kodot az artifactbol.
echo.
echo 🎯 KOVETKEZO LEPESEK:
echo    1. Nyisd meg: C:\claudecode\Claude_stresszteszt
echo    2. Masold be a StressTestApp komponens kodot
echo    3. npm install
echo    4. npm run dev
echo    5. Nezd meg: http://localhost:5173
echo.
echo ================================================================
pause