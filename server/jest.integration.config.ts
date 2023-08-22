const config = {
    globalSetup: "./src/test-utils/global-setup.js",
    globalTeardown: "./src/test-utils/global-teardown.js",
    clearMocks: true,
    testTimeout: 1500,
    testEnvironment: 'node',
    preset: 'ts-jest',
  };
  
export default config;