import type { NextConfig } from 'next';
const config: NextConfig = {
  async redirects() {
    return [
      { source: '/', destination: '/es', permanent: false },
      { source: '/Home', destination: '/es', permanent: true },
      { source: '/Proyectos', destination: '/es/proyectos', permanent: true },
      { source: '/:locale/proyectos/ecopulse', destination: '/:locale/proyectos', permanent: true },
      { source: '/Proyectos/ecopulse', destination: '/es/proyectos', permanent: true },
      { source: '/:locale/proyectos/akaladrom', destination: '/:locale/proyectos', permanent: true },
      { source: '/Proyectos/akaladrom', destination: '/es/proyectos', permanent: true },
      { source: '/Proyectos/:slug', destination: '/es/proyectos/:slug', permanent: true },
      { source: '/Nosotros', destination: '/es/nosotros', permanent: true },
      { source: '/Contacto', destination: '/es/contacto', permanent: true },
    ];
  },
};
export default config;
