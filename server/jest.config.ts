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
    reporters: [
      'default',
      [
        './node_modules/jest-html-reporter',
        {
          pageTitle: 'API Tests: Unit',
          outputPath: './api-test-unit-report.html',
        },
      ],
    ],
  };