const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    testIsolation: false,
    watchForFileChanges: true,
    viewportHeight: 1024,
    viewportWidth: 1980,
    experimentalStudio: true,

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

});
