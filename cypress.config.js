pipeline {
    agent any

    tools {
        nodejs "node25" // Nombre de tu NodeJS en Jenkins
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Preparar carpetas') {
            steps {
                bat """
                mkdir cypress\\reports\\json || echo Carpeta JSON ya existe
                mkdir cypress\\reports\\html || echo Carpeta HTML ya existe
                """
            }
        }

        stage('Instalar Dependencias') {
            steps {
                bat "npm install"
            }
        }

        stage('Ejecutar Pruebas Cypress') {
            steps {
                bat """
                npx cypress run --reporter mochawesome --reporter-options reportDir=cypress/reports/json,overwrite=false,html=false,json=true
                """
            }
        }

        stage('Merge JSON y Generar HTML') {
            steps {
                bat """
                npx mochawesome-merge "cypress/reports/json/*.json" > "cypress/reports/json/report.json"
                npx mochawesome-report-generator "cypress/reports/json/report.json" -o "cypress/reports/html"
                """
            }
        }
    }

    post {
        always {
            // Archivar HTML como artefacto
            archiveArtifacts artifacts: 'cypress/reports/html/**', fingerprint: true

            // Publicar HTML usando plugin HTML Publisher
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
