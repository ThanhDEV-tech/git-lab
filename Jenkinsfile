pipeline {
    agent any

    environment {
        APP_ENV    = 'staging'
        BUILD_INFO = "${env.APP_NAME}-${env.APP_VERSION}-${BUILD_NUMBER}"
        SECRET_KEY = credentials('app-secret-key')
    }

    stages {
        stage('Print Variables') {
            steps {
                echo "App name: ${env.APP_NAME}"
                echo "App version: ${env.APP_VERSION}"
                echo "Build info: ${env.BUILD_INFO}"
                echo "Environment: ${env.APP_ENV}"
            }
        }

        stage('Verify Secret') {
            steps {
                sh 'echo "Secret is loaded: [MASKED]"'
                sh 'echo "Secret length: ${#SECRET_KEY}"'
            }
        }

        stage('Use Config') {
            steps {
                sh 'echo "Deploying ${BUILD_INFO} to ${APP_ENV}"'
            }
        }
    }

    post {
        success { echo "Pipeline completed for ${BUILD_INFO}" }
    }
}
