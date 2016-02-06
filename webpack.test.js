const context = require.context('./src', true, /__test__\/(.*)Spec.js$/);
context.keys().forEach(context);
