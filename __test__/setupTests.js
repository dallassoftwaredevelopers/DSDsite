import '@testing-library/jest-dom';
import { randomUUID } from 'node:crypto';

// jsdom supplies Web Crypto without randomUUID.
Object.defineProperty(window.crypto, 'randomUUID', { value: randomUUID, configurable: true });
