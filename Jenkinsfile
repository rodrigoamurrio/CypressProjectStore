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
                    // Archivar videos y capturas de pantalla
                    archiveArtifacts artifacts: 'cypress/videos/**, cypress/screenshots/**', allowEmptyArchive: true
                    // Archivar reporte HTML
                    archiveArtifacts artifacts: 'cypress/reports/html/index.html', allowEmptyArchive: false
                }
            }
        }

       stage('Publicar reporte HTML') {
        steps {
            publishHTML(target: [
                reportDir: 'cypress/reports/html',
                reportFiles: 'index.html',
                reportName: 'Reporte Cypress HTML',
                keepAll: true,
                alwaysLinkToLastBuild: true
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
