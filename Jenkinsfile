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
                    // Archivar videos y capturas
                    archiveArtifacts artifacts: 'cypress/videos/**', allowEmptyArchive: true
                    archiveArtifacts artifacts: 'cypress/screenshots/**', allowEmptyArchive: true
                    
                    // Archivar JSONs para el merge
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
            post {
                always {
                    archiveArtifacts artifacts: 'cypress/reports/html/**', allowEmptyArchive: true
                }
            }
        }

        stage('Publicar Reporte HTML') {
            steps {
                publishHTML([
                    allowMissing: false,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: 'cypress/reports/html',
                    reportFiles: 'merged-report.html',
                    reportName: 'Reporte Cypress HTML'
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
