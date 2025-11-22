const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  screenshotOnRunFailure:true,
    video: true,
    retries: 2,
    reporterOptions: {
        reportDir: 'cypress/reports/html',
        overwrite: false,
        html: true,
        json: true,          // <-- Muy importante
        charts: true,
        inlineAssets: true,
        saveAllAttempts: true 
    },
  env: {
    url: 'https://www.demoblaze.com/index.html'
  },
  e2e: {
    setupNodeEvents(on, config) {
      // Plugin de mochawesome
      require('cypress-mochawesome-reporter/plugin')(on);
    },
    specPattern: 'cypress/e2e/tests/*.js', // Asegúrate que tus tests estén aquí
  }
});
