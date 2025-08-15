
import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://tool.huzi.pk';

  const toolUrls: MetadataRoute.Sitemap = [
    '/text-tools',
    '/unit-converter',
    '/calculator',
    '/qr-code-generator',
    '/password-generator',
    '/bmi-calculator',
    '/age-calculator',
    '/image-converter',
    '/notepad',
    '/rich-text-editor',
    '/word-counter',
  ].map((url) => ({
    url: `${baseUrl}${url}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const staticUrls: MetadataRoute.Sitemap = [
    '/',
    '/about',
    '/contact',
    '/guide',
  ].map((url) => ({
      url: `${baseUrl}${url}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: url === '/' ? 1 : 0.5,
  }));
  
  return [
    ...staticUrls,
    ...toolUrls
  ];
}
