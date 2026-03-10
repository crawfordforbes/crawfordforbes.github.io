const GA_ID = 'G-6EJ8FEHZ90';

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

export function initialize(): void {
  if (import.meta.env.DEV) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer?.push(arguments);
  };

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);

  window.gtag('js', new Date());
  window.gtag('config', GA_ID, { send_page_view: false });
}

export function trackPageView(path?: string, title?: string): void {
  if (!window.gtag) return;

  window.gtag('config', GA_ID, {
    page_path: path ?? window.location.pathname,
    page_title: title ?? document.title,
  });
}
