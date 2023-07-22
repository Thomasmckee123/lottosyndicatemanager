export default {
    clearMocks: true,
    collectCoverage: true,
    testPathIgnorePatterns: [
      "/dist/",
      "/node_modules/",
      "/prisma/",
      "/migrations/",
      "/coverage/*",
    ],
    coverageDirectory: "coverage",
    transform: {
      ".(ts)": "ts-jest",
    },
    testRegex: "(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$",
    moduleFileExtensions: ["ts", "js"],
    testTimeout: 10000,
  };