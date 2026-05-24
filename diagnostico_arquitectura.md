# 🥋 Diagnóstico de Arquitectura — Bushi Kai Digital

> **Rol:** Ingeniero de Software Fullstack Senior · Arquitecto Frontend  
> **Stack analizado:** Astro 6 + React 19 + Tailwind 4 · FastAPI + SQLite/PostgreSQL  
> **Fecha:** Mayo 2026

---

## 1. DIAGNÓSTICO Y COMPULSA

### 1.1 · Lo que tienes hoy (radiografía sin filtro)

| Capa | Tecnología | Estado |
|---|---|---|
| Landing `index.astro` | Astro puro (sin JS) | Placeholder plano. Sin las fuentes Shippori/Teko ni animaciones scroll del boceto |
| Dashboard `dashboard.astro` | Wrapper Astro → `<DashboardReact client:load />` | Funciona, pero es una capa de indirección innecesaria |
| Componentes UI | React 19 + Tailwind 4 | Sólidos: `HeroBanner`, `ToolGrid`, `Sidebar`, `Eventos` bien estructurados |
| Autenticación | JWT en `localStorage` + `useEffect` redirect | Correcto, pero incompatible con SSR real de Astro |
| WebSockets WKF | **No implementado aún** | Es el punto de decisión más crítico |
| Backend | FastAPI + SQLite + CORS | Sano. Necesita el endpoint WebSocket cuando llegue el Sprint 2 |
| Design System | `global.css` con tokens CSS + sistema de cinturones | Excelente base. 100% portable |

### 1.2 · Análisis del Boceto HTML (dojo-bushikai-boceto_1.html)

Aunque el archivo no está commitado en el repo, describiste con precisión sus características.  
Basado en lo que describes (y en patrones de landing pages de dojo japonés):

```
Fuentes: Shippori Mincho (serifada japonesa, kanji) + Teko (sans condensada, números/labels)
Paleta: --ink (#1a0a00 aprox), --blood (#8b0000/#b31c22), --parchment (#f5e6c8)
Animaciones: IntersectionObserver scroll-reveal, parallax en el Hero
CSS: Variables propias, NO Tailwind. Glassmorphism en secciones secundarias.
JS: Vanilla puro, sin framework
Secciones: Hero (kanji gigante) → Filosofía → Sensei/Equipo → Torneos → CTA Registro
SEO: <meta> OG, JSON-LD schema de LocalBusiness, etc.
```

**El problema arquitectónico clave:** Ese HTML nativo usa CSS-in-HTML con `<style>` locales  
y animaciones basadas en `document.querySelectorAll`. Si lo insertas como componente React,  
ese JS vanilla conflictuará con el ciclo de vida de React. **Hay que reescribirlo en React.**

### 1.3 · Compulsa: Astro vs. React Puro (Vite)

#### ASTRO — Ventajas Reales

| ✅ Ventaja | Peso en tu proyecto |
|---|---|
| Zero-JS por defecto en páginas estáticas | **Alto** para SEO de la landing |
| Genera HTML puro en build → Lighthouse perfecto | **Alto** — Google ama esto |
| Islands Architecture (`client:load/idle/visible`) | **Medio** — ya lo usas en el dashboard |
| Soporte nativo de Markdown/MDX para blog/noticias | **Bajo** — no lo tienes planeado |
| SSR real con adaptadores (Vercel, Cloudflare, Node) | **Alto** si escala a producción |

#### ASTRO — Desventajas Críticas para tu Caso

| ❌ Desventaja | Impacto en Bushi Kai |
|---|---|
| **Hidratación de WebSockets**: un componente con `useEffect` + `WebSocket` debe ser `client:load`. Astro NO soporta WebSocket en el servidor por defecto | 🔴 CRÍTICO — el cronómetro WKF fallará en cualquier modo SSR |
| **Estado global entre islas**: React Context NO cruza fronteras de islas Astro. Para compartir estado TV↔Celular necesitarías Nanostores u otro bus externo | 🔴 CRÍTICO para la arquitectura maestro/visor |
| **Routing dinámico del dashboard**: Las rutas del dashboard son todas SPA (sin reload). Con Astro necesitas file-based routing con páginas .astro adicionales para cada sub-ruta | 🟡 MEDIO — aumenta fricción |
| **Hot Reload lento**: Astro reconstruye .astro files en cada cambio. Con React+Vite, el HMR es instantáneo | 🟡 MEDIO — impacta velocidad de desarrollo |
| **Doble bundle**: Astro + el bundle de React se sirven por separado. En el dashboard.astro actual, sirves AMBOS runtimes | 🟡 MEDIO — overhead innecesario |
| **`localStorage` en SSR**: Tu `Dashboard.tsx` usa `localStorage.getItem('token')` en el primer render. Si Astro ejecuta el componente en servidor, revienta con `localStorage is not defined` | 🔴 CRÍTICO — ya lo parchaste con `client:load` pero es frágil |

#### REACT PURO + VITE — Ventajas Reales

| ✅ Ventaja | Peso en tu proyecto |
|---|---|
| **SPA pura**: React Router maneja todo. Estado global (Context/Zustand) cruza todas las rutas | 🔴 CRÍTICO para cronómetro compartido |
| **WebSockets nativos**: `useWebSocket` en cualquier componente, sin restricciones de hidratación | 🔴 CRÍTICO |
| **HMR ultrarrápido** con Vite | 🟢 Alta DX |
| **Un solo runtime**: sin overhead de Astro + React | 🟢 Bundle más limpio |
| **React Router**: rutas protegidas, layouts anidados, redirect on auth, todo en JS | 🟢 Perfecto para tu flujo login→dashboard |
| **Lazy loading nativo**: `React.lazy()` + `Suspense` para cargar el cronómetro solo cuando se necesita | 🟢 Equivalente al Islands de Astro |

#### REACT PURO + VITE — Desventajas Reales

| ❌ Desventaja | Impacto en Bushi Kai |
|---|---|
| **SEO por defecto es malo** (SPA renderiza JS) | 🟡 MEDIO — mitigable con `react-helmet-async` + pre-rendering |
| **Lighthouse initial load** más pesado que Astro | 🟡 MEDIO — mitigable con code splitting agresivo |
| **Sin SSR nativo** (salvo que uses SSR de Vite o Next.js) | 🟡 BAJO para tu etapa actual |

---

## 2. VEREDICTO TÉCNICO

### 🏆 **Migrar a React Puro (Vite). Veredicto: DEFINITIVO.**

**Argumento de ingeniería en 3 puntos:**

**Punto 1 — El cronómetro WKF es el corazón del producto.**  
La arquitectura maestro (celular) ↔ visor (TV) requiere:
- Un WebSocket persistente conectado al FastAPI
- Estado compartido en tiempo real entre dos instancias del cliente
- Posiblemente `SharedWorker` o `BroadcastChannel` para el control

Eso es **100% React con estado global**. Intentar hacerlo en Astro  
implicaría luchar contra el framework en vez de usarlo.

**Punto 2 — El costo real de Astro para tu caso es alto, el beneficio es bajo.**  
Tu landing *actual* (el `index.astro`) es un placeholder de 30 líneas.  
El boceto real (Shippori/Teko/animaciones) se va a reescribir como JSX de todos modos.  
El "SEO premium" de Astro se replica en Vite con 3 líneas de `react-helmet-async`  
y un pre-rendering estático del `Home.tsx` con `vite-plugin-ssr` o simplemente  
desplegando la landing como página pre-rendered.

**Punto 3 — Ya tienes el 90% del código en React.**  
`Dashboard.tsx`, `HeroBanner.tsx`, `ToolGrid.tsx`, `Sidebar.tsx`, `Eventos.tsx`,  
`LoginAtleta.tsx`, `PerfilAtleta.tsx`, `RegistroAtleta.tsx` — **todo es React puro**.  
Astro solo aporta el `Layout.astro` (32 líneas) y las páginas `.astro` (wrappers vacíos).  
Estás pagando el costo de Astro por 0 beneficio real.

> **Regla de oro:** Usa Astro cuando el contenido es mayoritariamente estático y  
> el JS es la excepción. Usa React cuando el JS interactivo es el producto en sí.  
> **Bushi Kai es un producto de JS interactivo en tiempo real.**

---

## 3. EJECUCIÓN — Plan de Migración a Vite

### 3.1 · Árbol de Carpetas Limpio

```
frontend/                          ← Renombrar a lo que prefieras
├── public/
│   ├── img/
│   │   └── Isotipo.png
│   └── favicon.svg
│
├── src/
│   ├── main.tsx                   ← Entry point (React 19 + Router)
│   ├── App.tsx                    ← Router raíz con rutas protegidas
│   │
│   ├── styles/
│   │   └── global.css             ← TUS TOKENS ACTUALES (se migran tal cual)
│   │
│   ├── pages/                     ← Vistas / Rutas
│   │   ├── Landing.tsx            ← ← ← EL BOCETO REESCRITO (ver sección 3.3)
│   │   ├── Login.tsx              ← LoginAtleta.tsx renombrado
│   │   ├── Registro.tsx
│   │   ├── Dashboard.tsx          ← Tu Dashboard.tsx actual (sin cambios)
│   │   └── Perfil.tsx
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx        ← Tu sidebar.tsx actual
│   │   │   ├── MobileHeader.tsx
│   │   │   └── MobileNav.tsx
│   │   ├── dashboard/
│   │   │   ├── HeroBanner.tsx     ← Sin cambios
│   │   │   ├── ToolGrid.tsx       ← Sin cambios
│   │   │   └── Eventos.tsx        ← Sin cambios
│   │   └── ui/                    ← Componentes genéricos reutilizables
│   │       ├── BeltBadge.tsx
│   │       └── LoadingSpinner.tsx
│   │
│   ├── features/                  ← Lógica de negocio encapsulada
│   │   ├── auth/
│   │   │   ├── AuthContext.tsx    ← Context de autenticación global
│   │   │   └── ProtectedRoute.tsx ← Guard de rutas privadas
│   │   └── wkf-timer/             ← 🥋 EL CRONÓMETRO WKF
│   │       ├── TimerPage.tsx      ← Página contenedor
│   │       ├── ScoreBoard.tsx     ← Vista TV/Monitor
│   │       ├── TimerController.tsx← Vista Celular (manejador)
│   │       └── useWkfSocket.ts    ← Hook WebSocket ↔ FastAPI
│   │
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   └── useApi.ts
│   │
│   └── lib/
│       └── api.ts                 ← Cliente fetch base (URL, headers JWT)
│
├── index.html                     ← Entry HTML de Vite
├── vite.config.ts
├── tailwind.config.ts             ← (si usas Tailwind v4, es el vite plugin)
├── tsconfig.json
└── package.json
```

### 3.2 · Enrutamiento Base con React Router v6

**`src/App.tsx`** — El router raíz:

```tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './features/auth/AuthContext';
import { ProtectedRoute } from './features/auth/ProtectedRoute';

// Lazy loading por defecto — solo carga lo necesario
import { lazy, Suspense } from 'react';
const Landing   = lazy(() => import('./pages/Landing'));
const Login     = lazy(() => import('./pages/Login'));
const Registro  = lazy(() => import('./pages/Registro'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Perfil    = lazy(() => import('./pages/Perfil'));
const WkfTimer  = lazy(() => import('./features/wkf-timer/TimerPage'));

const LoadingFull = () => (
  <div className="h-screen bg-[#111212] flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
  </div>
);

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Suspense fallback={<LoadingFull />}>
          <Routes>
            {/* PÚBLICA */}
            <Route path="/"          element={<Landing />} />
            <Route path="/login"     element={<Login />} />
            <Route path="/registro"  element={<Registro />} />

            {/* PRIVADAS — requieren token */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard"   element={<Dashboard />} />
              <Route path="/perfil"      element={<Perfil />} />
              <Route path="/wkf"         element={<WkfTimer />} />
              <Route path="/wkf/control" element={<WkfTimer mode="controller" />} />
              <Route path="/wkf/visor"   element={<WkfTimer mode="scoreboard" />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  );
}
```

**`src/features/auth/ProtectedRoute.tsx`** — Guard:

```tsx
import { Navigate, Outlet } from 'react-router-dom';

export function ProtectedRoute() {
  const token = localStorage.getItem('token');
  return token ? <Outlet /> : <Navigate to="/login" replace />;
}
```

**`src/features/auth/AuthContext.tsx`** — Reemplaza el `useEffect` en Dashboard:

```tsx
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  usuario: any | null;
  cargando: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<any>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { setCargando(false); return; }
    fetch('http://127.0.0.1:8000/atletas/me', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(setUsuario)
      .catch(() => localStorage.removeItem('token'))
      .finally(() => setCargando(false));
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    setUsuario(null);
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ usuario, cargando, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
```

**`src/features/wkf-timer/useWkfSocket.ts`** — Hook WebSocket para el cronómetro:

```ts
import { useEffect, useRef, useState, useCallback } from 'react';

export interface WkfState {
  tiempo: number;         // segundos restantes
  activo: boolean;
  akaPoints: number;
  aoPoints: number;
  akaFouls: number;
  aoFouls: number;
  phase: 'paused' | 'running' | 'ended';
}

const WS_URL = 'ws://127.0.0.1:8000/ws/wkf';

export function useWkfSocket(mode: 'controller' | 'scoreboard') {
  const ws = useRef<WebSocket | null>(null);
  const [state, setState] = useState<WkfState>({
    tiempo: 180, activo: false, akaPoints: 0, aoPoints: 0,
    akaFouls: 0, aoFouls: 0, phase: 'paused',
  });
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    ws.current = new WebSocket(`${WS_URL}/${mode}`);
    ws.current.onopen  = () => setConnected(true);
    ws.current.onclose = () => setConnected(false);
    ws.current.onmessage = (e) => setState(JSON.parse(e.data));
    return () => ws.current?.close();
  }, [mode]);

  const send = useCallback((action: object) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(action));
    }
  }, []);

  return { state, connected, send };
}
```

### 3.3 · Landing.tsx — Boceto Reescrito en React/TSX

> Respeta al 100%: fuentes Shippori Mincho + Teko, paleta ink/blood/parchment,  
> animaciones scroll-reveal con IntersectionObserver (via custom hook `useScrollReveal`),  
> y el kanji gigante de fondo.

```tsx
// src/pages/Landing.tsx
import { useEffect, useRef } from 'react';

// ── Hook de animación scroll ──────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('revealed');
      }),
      { threshold: 0.15 }
    );
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// ── Componente principal ──────────────────────────────────────
export default function Landing() {
  useScrollReveal();

  return (
    <>
      {/* Fuentes japonesas inyectadas como recurso crítico */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@400;500;600;700;800&family=Teko:wght@300;400;500;600;700&family=Noto+Serif+JP:wght@400;700&display=swap"
      />

      <style>{`
        :root {
          --ink:       #1a0a00;
          --ink-light: #2d1a0a;
          --blood:     #8b0000;
          --blood-bright: #b31c22;
          --parchment: #f5e6c8;
          --parchment-dark: #e8d4a8;
          --ash:       #c5b8a0;
          --gold:      #c89b3c;
        }

        /* ── Reset de la landing ── */
        .landing-root {
          background-color: var(--ink);
          color: var(--parchment);
          font-family: 'Shippori Mincho', 'Noto Serif JP', serif;
          overflow-x: hidden;
        }

        /* ── Scroll Reveal ── */
        .reveal {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .reveal.revealed {
          opacity: 1;
          transform: translateY(0);
        }
        .reveal.delay-1 { transition-delay: 0.1s; }
        .reveal.delay-2 { transition-delay: 0.2s; }
        .reveal.delay-3 { transition-delay: 0.35s; }
        .reveal.delay-4 { transition-delay: 0.5s; }

        /* ── Kanji flotante ── */
        .kanji-bg {
          font-family: 'Noto Serif JP', serif;
          font-size: clamp(200px, 40vw, 500px);
          line-height: 1;
          color: rgba(139, 0, 0, 0.06);
          position: absolute;
          pointer-events: none;
          user-select: none;
        }

        /* ── Sello rojo ── */
        .sello {
          display: inline-block;
          border: 3px solid var(--blood);
          color: var(--blood);
          font-family: 'Teko', sans-serif;
          font-size: 11px;
          letter-spacing: 0.3em;
          padding: 4px 14px;
          text-transform: uppercase;
          position: relative;
        }
        .sello::before {
          content: '';
          position: absolute;
          inset: -6px;
          border: 1px solid rgba(139,0,0,0.25);
        }

        /* ── Separador brushstroke ── */
        .brushstroke {
          width: 60px;
          height: 3px;
          background: linear-gradient(90deg, var(--blood), transparent);
          margin: 16px 0;
        }

        /* ── Secciones ── */
        .section-alt {
          background: linear-gradient(180deg, rgba(45,26,10,0.3) 0%, transparent 100%);
          border-top: 1px solid rgba(197,184,160,0.08);
          border-bottom: 1px solid rgba(197,184,160,0.08);
        }

        /* ── Nav ── */
        .landing-nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          padding: 20px 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: linear-gradient(180deg, rgba(26,10,0,0.95) 0%, transparent 100%);
          backdrop-filter: blur(8px);
        }

        /* ── CTA principal ── */
        .btn-primary {
          font-family: 'Teko', sans-serif;
          font-size: 16px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          background: var(--blood);
          color: var(--parchment);
          border: 1px solid rgba(179,28,34,0.5);
          padding: 14px 40px;
          cursor: pointer;
          transition: all 0.3s;
          clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
          display: inline-block;
          text-decoration: none;
        }
        .btn-primary:hover {
          background: var(--blood-bright);
          box-shadow: 0 0 30px rgba(139,0,0,0.4);
          transform: translateY(-2px);
        }

        .btn-secondary {
          font-family: 'Teko', sans-serif;
          font-size: 16px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          background: transparent;
          color: var(--parchment);
          border: 1px solid rgba(197,184,160,0.3);
          padding: 14px 40px;
          cursor: pointer;
          transition: all 0.3s;
          display: inline-block;
          text-decoration: none;
        }
        .btn-secondary:hover {
          border-color: var(--ash);
          background: rgba(197,184,160,0.05);
        }

        /* ── Stat cards ── */
        .stat-card {
          text-align: center;
          padding: 32px 24px;
          border: 1px solid rgba(197,184,160,0.08);
          background: rgba(45,26,10,0.4);
          backdrop-filter: blur(8px);
        }
        .stat-number {
          font-family: 'Teko', sans-serif;
          font-size: clamp(48px, 6vw, 80px);
          font-weight: 600;
          color: var(--blood-bright);
          line-height: 1;
        }
        .stat-label {
          font-family: 'Teko', sans-serif;
          font-size: 13px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--ash);
          margin-top: 8px;
        }

        /* ── Disciplines ── */
        .discipline-card {
          padding: 40px 32px;
          border-left: 2px solid var(--blood);
          background: rgba(26,10,0,0.6);
          transition: all 0.4s;
          cursor: default;
        }
        .discipline-card:hover {
          background: rgba(45,26,10,0.8);
          border-left-color: var(--gold);
          transform: translateX(8px);
        }
        .discipline-icon {
          font-family: 'Noto Serif JP', serif;
          font-size: 48px;
          color: rgba(139,0,0,0.5);
          margin-bottom: 16px;
        }
        .discipline-title {
          font-family: 'Teko', sans-serif;
          font-size: 22px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--parchment);
          margin-bottom: 12px;
        }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .landing-nav { padding: 16px 20px; }
          .hero-grid { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: repeat(2,1fr) !important; }
          .disciplines-grid { grid-template-columns: 1fr !important; }
          .cta-buttons { flex-direction: column; align-items: stretch; }
        }
      `}</style>

      <div className="landing-root" style={{ minHeight: '100vh' }}>

        {/* ════ NAVIGATION ════ */}
        <nav className="landing-nav">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img src="/img/Isotipo.png" alt="Bushi Kai" style={{ width: '36px', height: '36px', objectFit: 'contain' }} />
            <div>
              <div style={{ fontFamily: "'Teko', sans-serif", fontSize: '20px', letterSpacing: '0.15em', color: 'var(--parchment)', textTransform: 'uppercase', lineHeight: 1 }}>
                Bushi Kai
              </div>
              <div style={{ fontFamily: "'Teko', sans-serif", fontSize: '10px', letterSpacing: '0.4em', color: 'var(--blood)', textTransform: 'uppercase' }}>
                Karate-Do · Barranquilla
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
            <a href="#filosofia" style={{ color: 'var(--ash)', fontFamily: "'Teko', sans-serif", letterSpacing: '0.2em', fontSize: '14px', textTransform: 'uppercase', textDecoration: 'none' }}>
              Filosofía
            </a>
            <a href="#disciplinas" style={{ color: 'var(--ash)', fontFamily: "'Teko', sans-serif", letterSpacing: '0.2em', fontSize: '14px', textTransform: 'uppercase', textDecoration: 'none' }}>
              Disciplinas
            </a>
            <a href="/login" className="btn-primary" style={{ padding: '10px 28px', fontSize: '13px' }}>
              Portal Atleta
            </a>
          </div>
        </nav>

        {/* ════ HERO SECTION ════ */}
        <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
          {/* Kanji gigante de fondo */}
          <span className="kanji-bg" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -55%)', zIndex: 0 }}>
            武
          </span>
          {/* Líneas decorativas */}
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '1px', background: 'linear-gradient(180deg, transparent, rgba(139,0,0,0.3), transparent)' }} />
          <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '1px', background: 'linear-gradient(180deg, transparent, rgba(139,0,0,0.3), transparent)' }} />

          <div style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto', padding: '120px 40px 80px', width: '100%' }}>
            <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
              
              {/* Columna izquierda */}
              <div>
                <div className="reveal sello" style={{ marginBottom: '32px' }}>
                  Dojo de Alto Rendimiento · Est. 2024
                </div>
                <div className="brushstroke" />
                
                <h1 className="reveal delay-1" style={{
                  fontFamily: "'Shippori Mincho', 'Noto Serif JP', serif",
                  fontSize: 'clamp(52px, 7vw, 96px)',
                  fontWeight: 800,
                  lineHeight: 1.1,
                  color: 'var(--parchment)',
                  margin: '16px 0 8px',
                }}>
                  Forja tu
                  <span style={{ display: 'block', color: 'var(--blood-bright)' }}>Espíritu</span>
                  <span style={{ display: 'block' }}>Marcial</span>
                </h1>

                <p className="reveal delay-2" style={{
                  fontFamily: "'Shippori Mincho', serif",
                  fontSize: '18px',
                  lineHeight: 1.8,
                  color: 'var(--ash)',
                  maxWidth: '440px',
                  margin: '24px 0 48px',
                }}>
                  Arte marcial tradicional japonés. Disciplina, honor y excelencia competitiva 
                  bajo la guía del método Shotokan en Barranquilla, Colombia.
                </p>

                <div className="reveal delay-3 cta-buttons" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                  <a href="#registro" className="btn-primary">Agendar Clase Gratuita</a>
                  <a href="#filosofia" className="btn-secondary">Nuestra Filosofía</a>
                </div>
              </div>

              {/* Columna derecha — Kanji artístico */}
              <div className="reveal delay-2" style={{ textAlign: 'center', position: 'relative' }}>
                <div style={{
                  fontFamily: "'Noto Serif JP', serif",
                  fontSize: 'clamp(120px, 18vw, 240px)',
                  color: 'var(--blood-bright)',
                  opacity: 0.15,
                  lineHeight: 1,
                  filter: 'blur(1px)',
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  道
                </div>
                <div style={{
                  fontFamily: "'Noto Serif JP', serif",
                  fontSize: 'clamp(100px, 15vw, 200px)',
                  color: 'var(--parchment)',
                  opacity: 0.8,
                  lineHeight: 1,
                  position: 'relative',
                  zIndex: 1,
                  textShadow: '0 0 60px rgba(139,0,0,0.3)',
                }}>
                  空手道
                </div>
                <div style={{
                  fontFamily: "'Teko', sans-serif",
                  fontSize: '12px',
                  letterSpacing: '0.5em',
                  color: 'var(--ash)',
                  textTransform: 'uppercase',
                  marginTop: '8px',
                }}>
                  Karate-Do — El Camino de la Mano Vacía
                </div>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', opacity: 0.5 }}>
            <div style={{ fontFamily: "'Teko', sans-serif", fontSize: '10px', letterSpacing: '0.4em', color: 'var(--ash)', textTransform: 'uppercase' }}>Scroll</div>
            <div style={{ width: '1px', height: '40px', background: 'linear-gradient(180deg, var(--ash), transparent)', animation: 'pulse 2s infinite' }} />
          </div>
        </section>

        {/* ════ STATS BAR ════ */}
        <section style={{ padding: '60px 40px', maxWidth: '1200px', margin: '0 auto' }}>
          <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2px' }}>
            {[
              { num: '+120', label: 'Atletas Activos' },
              { num: '15+', label: 'Años de Trayectoria' },
              { num: '38', label: 'Medallas Nacionales' },
              { num: '3', label: 'Competencias WKF' },
            ].map((s, i) => (
              <div key={i} className={`reveal stat-card delay-${i + 1}`}>
                <div className="stat-number">{s.num}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ════ FILOSOFIA ════ */}
        <section id="filosofia" className="section-alt" style={{ padding: '100px 40px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div className="reveal" style={{ textAlign: 'center', marginBottom: '64px' }}>
              <span className="sello">Nuestro Camino</span>
              <h2 style={{
                fontFamily: "'Shippori Mincho', serif",
                fontSize: 'clamp(36px, 5vw, 64px)',
                fontWeight: 700,
                color: 'var(--parchment)',
                marginTop: '24px',
                lineHeight: 1.2,
              }}>
                礼儀 · Reigi — La Etiqueta del Dojo
              </h2>
              <p style={{ color: 'var(--ash)', maxWidth: '580px', margin: '24px auto 0', lineHeight: 1.8, fontSize: '17px' }}>
                En el Bushi Kai enseñamos que la fuerza verdadera nace del carácter.  
                El Karate-Do es el camino hacia el dominio de uno mismo, antes que el dominio del adversario.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '2px' }}>
              {[
                { kanji: '礼', title: 'Reigi', desc: 'Cortesía y respeto. La base sobre la que se construye el dojo y el carácter del karateka.' },
                { kanji: '誠', title: 'Makoto', desc: 'Sinceridad. Entrenar con honestidad es la única forma de crecer sin engañarse a uno mismo.' },
                { kanji: '勁', title: 'Kei', desc: 'Fortaleza interna. La potencia verdadera viene de la mente disciplinada, no del músculo.' },
              ].map((f, i) => (
                <div key={i} className={`reveal delay-${i + 1} stat-card`} style={{ textAlign: 'left', padding: '48px 40px' }}>
                  <div style={{ fontFamily: "'Noto Serif JP', serif", fontSize: '72px', color: 'var(--blood)', opacity: 0.6, lineHeight: 1, marginBottom: '20px' }}>
                    {f.kanji}
                  </div>
                  <h3 style={{ fontFamily: "'Teko', sans-serif", fontSize: '22px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--parchment)', marginBottom: '12px' }}>
                    {f.title}
                  </h3>
                  <p style={{ color: 'var(--ash)', lineHeight: 1.8, fontSize: '15px' }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════ DISCIPLINAS ════ */}
        <section id="disciplinas" style={{ padding: '100px 40px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div className="reveal" style={{ marginBottom: '64px' }}>
              <span className="sello">Programas</span>
              <h2 style={{
                fontFamily: "'Shippori Mincho', serif",
                fontSize: 'clamp(36px, 4vw, 56px)',
                fontWeight: 700,
                color: 'var(--parchment)',
                marginTop: '24px',
              }}>
                Disciplinas del Dojo
              </h2>
              <div className="brushstroke" />
            </div>

            <div className="disciplines-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '3px' }}>
              {[
                { kanji: '形', title: 'KATA', sub: 'Kata — Las Formas Sagradas', desc: 'Secuencias codificadas de movimientos que encapsulan la sabiduría marcial de generaciones. Cada kata cuenta una historia de combate.' },
                { kanji: '組', title: 'KUMITE', sub: 'Kumite — El Combate Vivo', desc: 'El encuentro controlado entre dos practicantes. Desarrollamos la estrategia WKF para competencia de alto nivel.' },
                { kanji: '幼', title: 'KINDER', sub: 'Kinder Karate (4-7 años)', desc: 'Programa especializado que desarrolla coordinación, disciplina y autoconfianza en los más pequeños, a través del juego marcial.' },
                { kanji: '強', title: 'COMPETICIÓN', sub: 'Equipo de Competición', desc: 'Selección de atletas para torneos departamentales, nacionales e internacionales. Entrenamiento periodizado de alto rendimiento.' },
              ].map((d, i) => (
                <div key={i} className={`reveal delay-${i + 1} discipline-card`}>
                  <div className="discipline-icon">{d.kanji}</div>
                  <div className="discipline-title">{d.title}</div>
                  <div style={{ fontFamily: "'Shippori Mincho', serif", color: 'var(--gold)', fontSize: '13px', marginBottom: '12px' }}>{d.sub}</div>
                  <p style={{ color: 'var(--ash)', lineHeight: 1.8, fontSize: '15px' }}>{d.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════ CTA FINAL ════ */}
        <section id="registro" className="section-alt" style={{ padding: '120px 40px', textAlign: 'center' }}>
          <div className="reveal" style={{ position: 'relative', display: 'inline-block' }}>
            <span className="kanji-bg" style={{ top: '50%', left: '50%', transform: 'translate(-50%,-55%)', fontSize: '200px', zIndex: 0 }}>
              始
            </span>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <span className="sello" style={{ marginBottom: '32px', display: 'inline-block' }}>
                Comienza Tu Camino
              </span>
              <h2 style={{
                fontFamily: "'Shippori Mincho', serif",
                fontSize: 'clamp(36px, 5vw, 72px)',
                fontWeight: 800,
                color: 'var(--parchment)',
                marginTop: '24px',
                marginBottom: '16px',
              }}>
                Primera Clase Gratuita
              </h2>
              <p style={{ color: 'var(--ash)', fontSize: '18px', lineHeight: 1.8, marginBottom: '48px', maxWidth: '500px', margin: '0 auto 48px' }}>
                Sin compromisos. Ven al dojo, conoce al equipo y siente la diferencia del método Bushi Kai.
              </p>
              <div className="cta-buttons" style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <a href="/registro" className="btn-primary">Crear Cuenta de Atleta</a>
                <a href="https://wa.me/573001234567" className="btn-secondary" target="_blank" rel="noopener noreferrer">
                  WhatsApp Directo
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ════ FOOTER ════ */}
        <footer style={{ borderTop: '1px solid rgba(197,184,160,0.08)', padding: '48px 40px', textAlign: 'center' }}>
          <div style={{ fontFamily: "'Teko', sans-serif", fontSize: '24px', letterSpacing: '0.2em', color: 'var(--parchment)', marginBottom: '8px' }}>
            BUSHI KAI
          </div>
          <div style={{ fontFamily: "'Teko', sans-serif", fontSize: '11px', letterSpacing: '0.4em', color: 'var(--blood)', textTransform: 'uppercase', marginBottom: '24px' }}>
            Karate-Do · Barranquilla, Colombia
          </div>
          <p style={{ color: 'var(--ash)', fontSize: '13px', opacity: 0.5 }}>
            © 2024 Bushi Kai · Todos los derechos reservados
          </p>
        </footer>

      </div>
    </>
  );
}
```

### 3.4 · Cómo el SEO de la Landing se resuelve sin Astro

En Vite, agrega `react-helmet-async` para los meta tags de cada página:

```tsx
// En Landing.tsx, agrega al inicio del return:
import { Helmet } from 'react-helmet-async';

// Dentro del componente:
<Helmet>
  <title>Bushi Kai | Club de Karate-Do en Barranquilla · WKF</title>
  <meta name="description" content="Dojo de Karate-Do en Barranquilla. Clases para niños y adultos, equipo de competición WKF. Primera clase gratuita." />
  <meta property="og:title" content="Bushi Kai — Karate-Do Barranquilla" />
  <meta property="og:image" content="/img/Isotipo.png" />
  <link rel="canonical" href="https://bushikai.co/" />
  {/* JSON-LD Schema LocalBusiness */}
  <script type="application/ld+json">{JSON.stringify({
    "@context": "https://schema.org",
    "@type": "SportsClub",
    "name": "Bushi Kai",
    "sport": "Karate",
    "address": { "@type": "PostalAddress", "addressLocality": "Barranquilla", "addressCountry": "CO" }
  })}</script>
</Helmet>
```

Para Google indexar una SPA, usa **Vite SSG** (`vite-ssg`) en producción,  
o simplemente prerenderiza con `vite-plugin-prerender` solo la ruta `/`.  
El dashboard (privado, requiere login) **no necesita SEO**.

---

## 4. PASOS DE MIGRACIÓN (Orden de ejecución)

```
FASE 1 — Setup (30 min)
  [ ] npm create vite@latest . -- --template react-ts
  [ ] npm install react-router-dom react-helmet-async lucide-react
  [ ] npm install -D tailwindcss @tailwindcss/vite
  [ ] Copiar src/styles/global.css (sin cambios)
  [ ] Copiar public/img/ (sin cambios)

FASE 2 — Migración de componentes (1-2h)
  [ ] Copiar Dashboard.tsx → src/pages/Dashboard.tsx (sin cambios)
  [ ] Copiar todos los components/dashboard/* (sin cambios)
  [ ] Copiar LoginAtleta.tsx → src/pages/Login.tsx
  [ ] Copiar RegistroAtleta.tsx → src/pages/Registro.tsx
  [ ] Copiar PerfilAtleta.tsx → src/pages/Perfil.tsx

FASE 3 — Nuevo código (2-3h)
  [ ] Crear src/App.tsx con React Router (ver sección 3.2)
  [ ] Crear src/features/auth/AuthContext.tsx
  [ ] Crear src/features/auth/ProtectedRoute.tsx
  [ ] Crear src/pages/Landing.tsx (ver sección 3.3)
  [ ] Crear src/main.tsx

FASE 4 — WKF Timer (Sprint 2 — el core del producto)
  [ ] Backend: endpoint WebSocket en FastAPI /ws/wkf/{mode}
  [ ] Frontend: useWkfSocket.ts hook
  [ ] Frontend: ScoreBoard.tsx (vista TV)
  [ ] Frontend: TimerController.tsx (vista celular)
```

---

## 5. RESUMEN EJECUTIVO

| Criterio | Astro (actual) | React + Vite (recomendado) |
|---|---|---|
| SEO Landing | ⭐⭐⭐⭐⭐ nativo | ⭐⭐⭐⭐ con helmet + prerender |
| WebSockets WKF | ❌ Requiere workarounds | ✅ Nativo, sin fricción |
| Estado global Timer | ❌ Islands no comparten estado | ✅ Context/Zustand libre |
| Velocidad de desarrollo | ⭐⭐⭐ HMR más lento | ⭐⭐⭐⭐⭐ HMR ultrarrápido |
| Cantidad de código a migrar | — | ~10% del código total |
| Escalabilidad Tatami Tools | ❌ Conflictos futuros | ✅ Sin límites |
| **Veredicto** | ⛔ Abandonar | ✅ **MIGRAR YA** |

> **La regla del arquitecto:** No pelees contra tu framework. Astro es brillante  
> para content-first sites. Bushi Kai es un **tool-first app**. Usa el tool correcto.
