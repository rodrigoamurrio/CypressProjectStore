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
                    archiveArtifacts artifacts: 'cypress/reports/html/**', allowEmptyArchive: true
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

        stage('Publicar reporte HTML') {
            steps {
                publishHTML([
                    reportDir: 'cypress/reports/html',
                    reportFiles: 'merged-report.html',
                    reportName: 'Reporte Cypress HTML',
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
