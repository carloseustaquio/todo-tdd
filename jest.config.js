module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFilesAfterEnv: ["./jest.setup.js"],
  setupTestFrameworkScriptFile: "./jest.setup.js",
};
