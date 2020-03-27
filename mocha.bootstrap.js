const config = require("./tsconfig.json");

config.compilerOptions.module = "commonjs";
config.transpileOnly = true

require("ts-node").register(config);
