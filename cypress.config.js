const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports',   // Carpeta donde se guardan los reportes
    overwrite: false,               // No sobrescribir reportes anteriores
    html: true,                     // Generar HTML
    json: true,                     // Generar JSON (necesario para merge)
    charts: true
  },
  video: true,                      // Grabar videos de las pruebas
  screenshotOnRunFailure: true,     // Tomar screenshot si falla un test
  videosFolder: 'cypress/videos',   // Carpeta de videos
  screenshotsFolder: 'cypress/screenshots', // Carpeta de screenshots
  env: {
    url: 'https://www.demoblaze.com/index.html'
  },
  e2e: {
    setupNodeEvents(on, config) {
      // Plugin de mochawesome
      require('cypress-mochawesome-reporter/plugin')(on);
    },
    specPattern: 'cypress/e2e/tests/*.js', // Asegúrate que tus tests estén aquí
    baseUrl: 'https://www.demoblaze.com'
  }
});
