
module.exports = {
  "extends": "airbnb",
  "parser": "babel-eslint",
  "rules": {
    "react/jsx-filename-extension": 0,
    "react/require-default-props": 0,
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: [
          "mocha.bootstrap.js",
          "**/*.spec.js",
          "webpack*",
          "example/**"
        ]
      }
    ]
  },
  "plugins":[
    "react"
  ],
  "env": {
    "browser": true,
    "mocha": true,
  },
};
