import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://tool.huzi.pk';

  const toolUrls: MetadataRoute.Sitemap = [
    '/text-tools',
    '/unit-converter',
    '/currency-converter',
    '/calculator',
    '/qr-code-generator',
    '/password-generator',
    '/password-strength-checker',
    '/bmi-calculator',
    '/age-calculator',
    '/date-difference-calculator',
    '/aspect-ratio-calculator',
    '/px-to-rem-converter',
    '/stopwatch-timer',
    '/keyboard-event-tester',
    '/image-converter',
    '/image-to-pdf-converter',
    '/notepad',
    '/rich-text-editor',
    '/word-counter',
    '/lorem-ipsum-generator',
    '/random-emoji-generator',
    '/time-zone-converter',
    '/color-picker',
    '/youtube-thumbnail-downloader',
    '/vimeo-thumbnail-downloader',
    '/dailymotion-thumbnail-downloader',
    '/meta-tag-generator',
    '/open-graph-generator',
    '/markdown-editor',
    '/css-box-shadow-generator',
    '/css-gradient-generator',
    '/csv-viewer',
    '/table-to-csv-converter',
    '/html-table-generator',
    '/html-minifier',
    '/html-entity-decoder',
    '/text-encryption',
    '/local-storage-editor',
    '/base-converter',
    '/ip-address-finder',
    '/text-diff-highlighter',
    '/random-username-generator',
    '/morse-code-translator',
    '/anagram-finder',
    '/roman-numeral-converter',
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
