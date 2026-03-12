const GA_ID = 'G-6EJ8FEHZ90';

declare global {
  interface Window {
    // Using IArguments or a Record array avoids 'any' while 
    // remaining compatible with the gtag.js internal logic.
    dataLayer: IArguments[];
  }
}

export function initialize(): void {
  window.dataLayer = window.dataLayer || [];
  
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  };

  if (import.meta.env.DEV) {
    console.log(`[Analytics] Dev mode: Stubbed GA4 for ${GA_ID}`);
    return;
  }

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);

  window.gtag('js', new Date());
  window.gtag('config', GA_ID, { send_page_view: false });
}

export function trackPageView(path?: string, title?: string): void {
  // typeof check ensures we don't crash if the script fails to load
  if (typeof window.gtag !== 'function') return;

  window.gtag('config', GA_ID, {
    page_path: path ?? window.location.pathname,
    page_title: title ?? document.title,
  });
}