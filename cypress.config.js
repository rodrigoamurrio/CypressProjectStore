const { defineConfig } = require("cypress");

module.exports = defineConfig({
  screenshotOnRunFailure: true,
  video: true,
  retries: 2,
   reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/results',
    overwrite: false,
    html: false,
    json: true,
  },
  env: {
    url: 'https://www.demoblaze.com/index.html'
  },
  e2e: {
    setupNodeEvents(on, config) {
      return config;
    },
    specPattern: 'cypress/e2e/tests/*.js', // Asegúrate que tus tests estén aquí
  }
});
