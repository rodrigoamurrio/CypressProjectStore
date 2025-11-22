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
                sh "npm install"
            }
        }

        stage('Ejecutar Pruebas Cypress') {
            steps {
                sh "npx cypress run"
            }
            post {
                always {
                    archiveArtifacts artifacts: 'cypress/videos/**, cypress/screenshots/**', allowEmptyArchive: true
                }
            }
        }
    }

    post {
        always {
            echo "Pipeline finalizado"
        }
    }
}
