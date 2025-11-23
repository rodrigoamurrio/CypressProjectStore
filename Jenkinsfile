pipeline {
    agent any

    tools {
        nodejs "node25" // Asegúrate de tener NodeJS configurado en Jenkins con este nombre
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Instalar Dependencias') {
            steps {
                bat "npm install"
            }
        }

        stage('Ejecutar Pruebas Cypress') {
            steps {
                // Ejecuta Cypress usando Mochawesome reporter
                bat "npx cypress run --reporter mochawesome --reporter-options reportDir=cypress/reports/json,overwrite=false,html=false,json=true"
            }
        }

        stage('Merge JSON y Generar HTML') {
            steps {
                // Une todos los JSON en uno solo
                bat "npx mochawesome-merge cypress/reports/json/*.json > cypress/reports/json/report.json"
                // Genera el reporte HTML
                bat "npx mochawesome-report-generator cypress/reports/json/report.json -o cypress/reports/html"
            }
        }
    }

    post {
        always {
            // Archiva el reporte HTML como artefacto
            archiveArtifacts artifacts: 'cypress/reports/html/**', fingerprint: true

            // Publica el HTML usando HTML Publisher
            publishHTML([
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'cypress/reports/html',
                reportFiles: 'report.html',
                reportName: 'Reporte Cypress Mochawesome'
            ])
        }
    }
}
