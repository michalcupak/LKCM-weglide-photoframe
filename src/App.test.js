import { cleanup, render } from '@testing-library/react';
import App from './App';

jest.mock('@michal.cupak/react-idle-cursor-hide', () => ({
  IdleCursorBoundary: ({ children }) => children,
}));
jest.mock('@michal.cupak/react-idle-cursor-hide/styles.css', () => ({}), { virtual: true });

const originalFetch = global.fetch;

beforeEach(() => {
  jest.useFakeTimers();
  jest.spyOn(global, 'setInterval');
  global.fetch = jest.fn(() => new Promise(() => {}));
});

afterEach(() => {
  cleanup();
  jest.clearAllTimers();
  jest.restoreAllMocks();
  jest.useRealTimers();
  window.history.replaceState({}, '', '/');

  if (originalFetch) {
    global.fetch = originalFetch;
  } else {
    delete global.fetch;
  }
});

test('uses a 30 second interval by default', () => {
  render(<App />);

  expect(setInterval).toHaveBeenCalledWith(expect.any(Function), 30000);
});

test('uses the interval URL parameter in seconds', () => {
  window.history.replaceState({}, '', '/?interval=5');

  render(<App />);

  expect(setInterval).toHaveBeenCalledWith(expect.any(Function), 5000);
});

test.each(['invalid', '0', '-5'])('uses the default interval for invalid value %s', (interval) => {
  window.history.replaceState({}, '', `/?interval=${interval}`);

  render(<App />);

  expect(setInterval).toHaveBeenCalledWith(expect.any(Function), 30000);
});
