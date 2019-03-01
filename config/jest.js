const { is_windows } = require("./os");

let testRegex = "/__tests__/.*spec.coffee$";
if (is_windows) {
  testRegex = "\\\\__tests__\\\\.*spec.coffee$";
}

module.exports = {
  testRegex,
  moduleFileExtensions: ["coffee", "js", "json", "vue", "pug", "yml"],
  moduleNameMapper: {
    "^~/(.*)$": "<rootDir>/$1",
    "^@/(.*)$": "<rootDir>/$1"
  },
  moduleDirectories: ["node_modules", "."],
  transform: {
    "^.+\\.coffee$": "<rootDir>/config/coffee-jest.js",
    "^.+\\.js$": "babel-jest",
    "^.+\\.yml$": "yaml-jest",
    "^.+\\.pug$": "pug-jest",
    "^.+\\.vue$": "vue-jest"
  }
};
