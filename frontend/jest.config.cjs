module.exports = {
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif)$": "<rootDir>/_mocks_/fileMock.js",
    "\\.svg$": "<rootDir>/__mocks__/svgMock.js",  // Chemin vers le nouveau mock SVG
    "\\.(css|less|scss|sass)$": "<rootDir>/_mocks_/styleMock.js"
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testPathIgnorePatterns: ["/node_modules/", "/build/"],
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest"
  }
};