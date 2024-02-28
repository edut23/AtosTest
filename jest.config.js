module.exports = {
    testEnvironment: 'node',
    preset: 'ts-jest',
    extensionsToTreatAsEsm: ['.ts', '.tsx', '.js', '.jsx', '.mjs'],
    testMatch: ['**/__tests__/**/*.test.ts', '**/__tests__/**/*.test.tsx', '**/__tests__/**/*.test.js', '**/__tests__/**/*.test.jsx', '**/?(*.)+(spec|test).mjs'],
};