
// Configuração global para testes
import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Simulando matchMedia para testes
global.matchMedia = global.matchMedia || function(query: string) {
  return {
    matches: false,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  };
};

// Simulando localStorage para testes
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    }
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});
