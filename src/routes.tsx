// src/routes.tsx
import type { RouteRecord } from 'vite-react-ssg'
import Layout from './Layout'
import Home from './pages/home'
import TermsOfService from './pages/terms'
import PrivacyPolicy from './pages/privacy'
import NotFound from './pages/not-found'

export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <Layout />,
    entry: 'src/Layout.tsx',
    children: [
      { index: true, element: <Home />, entry: 'src/pages/home.tsx' },
      { path: 'terms', element: <TermsOfService />, entry: 'src/pages/terms.tsx' },
      { path: 'privacy', element: <PrivacyPolicy />, entry: 'src/pages/privacy.tsx' },
      { path: '*', element: <NotFound />, entry: 'src/pages/not-found.tsx' },
    ],
  },
]