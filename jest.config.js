module.exports = {
  preset: "ts-jest",
  bail: true,
  testEnvironment: "node",
  testMatch: ["<rootDir>/tests/**/*.spec.ts"],
  collectCoverage: true,
  collectCoverageFrom: ["<rootDir>/src/**/*.ts"],
  coverageThreshold: {
    global: {
      branches: 100,
      lines: 100,
      functions: 100,
      statements: 100,
    },
  },
};
