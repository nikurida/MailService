module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
      '^.+\\.(t|j)sx?$': ['ts-jest', { tsconfig: 'tsconfig.json' }],
  },
  testTimeout: 10000,
};
