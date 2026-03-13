export function createMatchMedia(matches: boolean) {
  return (query: string) => {
    let _matches = matches;
    const listeners: Array<(e: MediaQueryListEvent) => void> = [];

    const mqlObj = {
      matches: _matches,
      media: query,
      onchange: null as ((e: MediaQueryListEvent) => void) | null,
      addListener(fn: (e: MediaQueryListEvent) => void) {
        listeners.push(fn);
      },
      removeListener(fn: (e: MediaQueryListEvent) => void) {
        const idx = listeners.indexOf(fn);
        if (idx >= 0) listeners.splice(idx, 1);
      },
      addEventListener(_type: string, fn: (e: MediaQueryListEvent) => void) {
        listeners.push(fn);
      },
      removeEventListener(_type: string, fn: (e: MediaQueryListEvent) => void) {
        const idx = listeners.indexOf(fn);
        if (idx >= 0) listeners.splice(idx, 1);
      },
      // helper to update
      __setMatches(value: boolean) {
        _matches = value;
        // update public field (MediaQueryList.matches is readonly in lib, but our mock exposes it)
        (mql as unknown as { matches: boolean }).matches = _matches;
        const ev = { matches: _matches } as unknown as MediaQueryListEvent;
        listeners.forEach((l) => l(ev));
        if (typeof mql.onchange === 'function') mql.onchange(ev);
      },
    };

    const mql = mqlObj as unknown as MediaQueryList & { __setMatches(value: boolean): void };

    return mql;
  };
}

export default createMatchMedia;
