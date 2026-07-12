// src/main.tsx
import { ViteReactSSG } from 'vite-react-ssg'
import ReactGA from 'react-ga4'
import { routes } from './routes'
import './index.css'

if (typeof window !== 'undefined') {
  ReactGA.initialize('G-L5DS0KW5N9')
}

export const createRoot = ViteReactSSG(
  { routes, basename: import.meta.env.BASE_URL }
)