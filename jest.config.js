module.exports = {
  preset: "ts-jest",
  bail: true,
  testEnvironment: "node",
  testMatch: ["<rootDir>/tests/**/*.spec.ts"],
  collectCoverage: true,
  collectCoverageFrom: ["<rootDir>/src/**/*.ts"]
};
