import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard/', '/settings/', '/api/'], // On cache la partie privée
    },
    sitemap: 'https://votre-site.com/sitemap.xml', // À changer lors du déploiement
  };
}