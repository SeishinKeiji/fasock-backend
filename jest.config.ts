module.exports = {
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.json",
    },
  },
  preset: "ts-jest/presets/default-esm",
  extensionsToTreatAsEsm: [".ts"],
  moduleFileExtensions: ["ts", "js"],
  moduleNameMapper: {
    "#(.*)": "<rootDir>/src/$1",
  },
  transform: {
    "^.+\\.(ts)$": [
      "ts-jest",
      {
        useESM: true,
      },
    ],
  },
  testMatch: ["**/test/**/*.test.ts"],
  testEnvironment: "node",
};
