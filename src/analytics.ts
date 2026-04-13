export const trackEvent = (eventName: string, params?: object) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, params);
  }
};

// Eventos principais a rastrear:
// trackEvent('sign_up', { method: 'email' })
// trackEvent('begin_checkout', { plan: 'mensal', value: 7.90 })
// trackEvent('purchase', { plan: 'anual', value: 99.90 })
// trackEvent('generate_lead', { source: 'embaixador_form' })
// trackEvent('view_item', { item_name: 'clube_vip' })
