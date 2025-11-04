// Clipping utility removed. Previously this file exported functions to
// observe header rows and toggle a 'clipped-by-footer' class when rows
// overlapped the footer. That behavior has been removed per owner's
// request; keep lightweight no-op exports in case other parts of the code
// still import these functions (they'll be harmless).

export type ClipOptions = {
  headerSelector?: string;
  rowSelector?: string;
  footerSelector?: string;
  clippedClass?: string;
  throttleMs?: number;
  updateEventName?: string;
};

export function initHexHeaderRowClipping(_: ClipOptions = {}) {
  // No-op: clipping removed. Return a cleanup function for compatibility.
  return () => {};
}

export function triggerHexHeaderRowClippingUpdate(_: string = 'projects:updated') {
  // No-op
}
