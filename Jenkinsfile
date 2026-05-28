pipeline {
    agent any

    environment {
        TELEGRAM_TOKEN   = credentials('telegram-token')
        TELEGRAM_CHAT_ID = credentials('telegram-chat-id')
    }

    stages {
        stage('Checkout') {
            steps { checkout scm }
        }

        stage('Build') {
            steps {
                sh 'echo "Building..."'
                sh 'npm run build'
            }
        }

        stage('Test') {
            steps {
                sh 'node test.js'
            }
        }
    }

    post {
        success {
            sh """
                curl -s -X POST https://api.telegram.org/bot\${TELEGRAM_TOKEN}/sendMessage \
                -d chat_id=\${TELEGRAM_CHAT_ID} \
                -d text="✅ Build SUCCESS: ${JOB_NAME} #${BUILD_NUMBER}"
            """
        }
        failure {
            sh """
                curl -s -X POST https://api.telegram.org/bot\${TELEGRAM_TOKEN}/sendMessage \
                -d chat_id=\${TELEGRAM_CHAT_ID} \
                -d text="❌ Build FAILED: ${JOB_NAME} #${BUILD_NUMBER}"
            """
        }
    }
}
