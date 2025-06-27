import { type MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://santillana-del-mar-demo.com';

  const routes = [
    '/',
    '/amenities',
    '/contact',
    '/favorites',
    '/financing',
    '/gallery',
    '/login',
    '/map',
    '/profile',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '/' ? 1 : 0.8,
  }));
}
