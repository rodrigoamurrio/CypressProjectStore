const { defineConfig } = require("cypress");

module.exports = defineConfig({
  screenshotOnRunFailure: true,
  video: true,
  retries: 2,
  reporter: 'mochawesome', // <-- cambiamos al mochawesome clásico
  reporterOptions: {
    reportDir: 'cypress/reports/html', // ruta donde se guardarán los reportes
    overwrite: false,                  // no sobreescribe reportes anteriores
    html: true,                        // genera HTML
    json: true,                        // genera JSON (necesario para merge)
    charts: true,
    reportPageTitle: 'Cypress Test Report',
    embeddedScreenshots: true,
    inlineAssets: true,
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
