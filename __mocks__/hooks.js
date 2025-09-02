export const useScrollEffect = () => ({});

export const useVideoPlayer = () => ({
  isPlaying: false,
  togglePlay: jest.fn(),
  setVideoRef: jest.fn(),
});

export const useIntersectionObserver = () => ({
  ref: { current: null },
  isVisible: false,
});

export const useLocalStorage = (key, initialValue) => [initialValue, jest.fn()];

export const useDebounce = (value, delay) => value;
