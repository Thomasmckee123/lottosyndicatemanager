const config = {
    globalSetup: "./src/test-utils/global-setup.js",
    globalTeardown: "./src/test-utils/global-teardown.js",
    clearMocks: true,
    testTimeout: 1500,
    testEnvironment: 'node',
    preset: 'ts-jest', reporters: [
      'default',
      [
        './node_modules/jest-html-reporter',
        {
          pageTitle: 'API Tests: Integration',
          outputPath: './api-test-integration-report.html',
        },
      ],
    ],
  };
  
export default config;