const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportDir: "cypress/reports/html",
    overwrite: false,
    html: false,
    json: true,
  },
    env: {
    url: 'https://www.demoblaze.com/index.html'
  },

  e2e: {
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
      return config; // ← Esto es OBLIGATORIO
    },

    specPattern: "cypress/e2e/tests/*.js",
  },
});
