// src/routes.tsx
import type { RouteRecord } from 'vite-react-ssg'
import Layout from './Layout'
import Home from './pages/home'
import TermsOfService from './pages/terms'
import PrivacyPolicy from './pages/privacy'
import NotFound from './pages/not-found'
import Solutions from './pages/solutions'
import Pricing from './pages/pricing'
import About from './pages/about'
import RequestDemo from './pages/request-demo'
import Blog from './pages/blog'
import KoraFeild from './pages/kora-field'

export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <Layout />,
    entry: 'src/Layout.tsx',
    children: [
      { index: true, element: <Home />, entry: 'src/pages/home.tsx' },
      // { path: "platform", element: <Platform />, entry: 'src/pages/platform.tsx' },
      { path: "kora-field", element: <KoraFeild />, entry: 'src/pages/kora-field.tsx' },
      { path: "solutions", element: <Solutions /> },
      { path: "pricing", element: <Pricing /> },
      { path: "about-us", element: <About /> },
      { path: "request-demo", element: <RequestDemo /> },
      { path: "blog", element: <Blog /> },

      { path: 'terms', element: <TermsOfService />, entry: 'src/pages/terms.tsx' },
      { path: 'privacy', element: <PrivacyPolicy />, entry: 'src/pages/privacy.tsx' },
      { path: '*', element: <NotFound />, entry: 'src/pages/not-found.tsx' },
    ],
  },
]