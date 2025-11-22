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
                    archiveArtifacts artifacts: 'cypress/videos/**, cypress/screenshots/**', allowEmptyArchive: true
                }
            }
        }

        stage('Fusionar reports Mochawesome') {
            steps {
                bat 'npx mochawesome-merge cypress\\reports\\*.json > cypress\\reports\\report.json'
            }
        }

        stage('Generar HTML Mochawesome') {
            steps {
                bat 'npx marge cypress\\reports\\report.json --reportDir cypress\\reports'
            }
        }

        stage('Publicar reporte en Jenkins') {
            steps {
                publishHTML(target: [
                    reportDir: 'cypress/reports',
                    reportFiles: 'index.html',
                    reportName: 'Reporte Cypress Mochawesome',
                    keepAll: true,
                    alwaysLinkToLastBuild: true,
                    allowMissing: false
                ])
            }
        }
    }

    post {
        always {
            echo "Pipeline finalizado"
        }
    }
}
