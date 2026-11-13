import '@testing-library/jest-dom';

// Mock matchMedia for jsdom
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});

// Mock clipboard
Object.defineProperty(navigator, 'clipboard', {
  value: {
    writeText: async () => {},
    readText: async () => '',
  },
  configurable: true,
});
