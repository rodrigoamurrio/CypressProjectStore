pipeline {
    agent any

    tools {
        nodejs "node25"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Crear carpeta reportes') {
            steps {
                 // Opción con barra normal
               bat "mkdir cypress/reports/html /p"
            }
        }

        stage('Permisos carpeta reportes') {
            steps {
                bat "icacls cypress\\reports\\html /grant Everyone:F"
            }
        }

        stage('Instalar Dependencias') {
            steps {
                bat "npm install"
            }
        }

        stage('Ejecutar Pruebas Cypress') {
            steps {
                bat "npx cypress run"
            }
            post {
                always {
                    archiveArtifacts artifacts: 'cypress/screenshots/**', allowEmptyArchive: true
                    archiveArtifacts artifacts: 'cypress/videos/**', allowEmptyArchive: true
                    archiveArtifacts artifacts: 'cypress/reports/html/*.json', allowEmptyArchive: true
                }
            }
        }

        stage('Generar Reporte Mochawesome') {
            steps {
                bat """
                npx mochawesome-merge cypress/reports/html/*.json > cypress/reports/html/merged-report.json
                npx marge cypress/reports/html/merged-report.json --reportDir cypress/reports/html --inline
                """
            }
        }

        stage('Publicar Reporte HTML') {
            steps {
                publishHTML([
                    allowMissing: false,
                    keepAll: true,
                    alwaysLinkToLastBuild: true,
                    reportDir: 'cypress/reports/html',
                    reportFiles: 'merged-report.html',
                    reportName: 'Reporte Cypress HTML'
                ])
            }
        }
    }
}
