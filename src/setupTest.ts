/**setupTest.js */
import matchers from '@testing-library/jest-dom/matchers';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'node:test';
import { expect } from 'vitest';

expect.extend(matchers);

afterEach(() => {
    cleanup();
});