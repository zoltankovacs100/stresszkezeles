@echo off
echo Creating Stress Test App project structure...

:: Create main directory
mkdir "C:\claudecode\Claude_stresszteszt" 2>nul
cd /d "C:\claudecode\Claude_stresszteszt"

:: Create subdirectories
mkdir src 2>nul
mkdir src\components 2>nul

:: Create package.json
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

:: Create vite.config.ts
(
echo import { defineConfig } from 'vite'
echo import react from '@vitejs/plugin-react'
echo.
echo export default defineConfig({
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

:: Create tailwind.config.js
(
echo /** @type {import('tailwindcss'^).Config} */
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

:: Create tsconfig.json
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
echo     "strict": true
echo   },
echo   "include": ["src"]
echo }
) > tsconfig.json

:: Create index.html
(
echo ^<!doctype html^>
echo ^<html lang="hu"^>
echo   ^<head^>
echo     ^<meta charset="UTF-8" /^>
echo     ^<meta name="viewport" content="width=device-width, initial-scale=1.0" /^>
echo     ^<title^>Stresszkezelés Teszt^</title^>
echo   ^</head^>
echo   ^<body^>
echo     ^<div id="root"^>^</div^>
echo     ^<script type="module" src="/src/main.tsx"^>^</script^>
echo   ^</body^>
echo ^</html^>
) > index.html

:: Create netlify.toml
(
echo [build]
echo   publish = "dist"
echo   command = "npm run build"
echo.
echo [[redirects]]
echo   from = "/*"
echo   to = "/index.html"
echo   status = 200
) > netlify.toml

:: Create README.md
(
echo # Stresszkezelés Teszt Alkalmazás
echo.
echo Professzionális stresszkezelési személyiségteszt React + TypeScript + Vite környezetben.
echo.
echo ## Telepítés
echo ```bash
echo npm install
echo npm run dev
echo ```
) > README.md

echo.
echo ✅ Project structure created successfully!
echo.
echo Next steps:
echo 1. cd C:\claudecode\Claude_stresszteszt
echo 2. Copy the React component files manually
echo 3. npm install
echo 4. npm run dev
echo.
pause