pipeline {
    agent any

    environment {
        IMAGE_NAME       = 'thanhdev05/git-lab-app'
        IMAGE_TAG        = "build-${BUILD_NUMBER}"
        CONTAINER_NAME   = 'cicd-app'
        APP_PORT         = '3000'
        TELEGRAM_TOKEN   = credentials('telegram-token')
        TELEGRAM_CHAT_ID = credentials('telegram-chat-id')
    }

    parameters {
        choice(
            name: 'DEPLOY_ENV',
            choices: ['dev', 'staging', 'prod'],
            description: 'Deployment environment'
        )
    }

    stages {
        stage('Checkout') {
            steps { checkout scm }
        }

        stage('Build') {
            steps { sh 'npm run build' }
        }

        stage('Test') {
            steps { sh 'node test.js' }
        }

        stage('Docker Build') {
            steps {
                sh "docker build -t ${IMAGE_NAME}:${IMAGE_TAG} ."
                sh "docker tag ${IMAGE_NAME}:${IMAGE_TAG} ${IMAGE_NAME}:latest"
            }
        }

        stage('Push Registry') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                    sh "docker push ${IMAGE_NAME}:${IMAGE_TAG}"
                    sh "docker push ${IMAGE_NAME}:latest"
                }
            }
        }

        stage('Deploy') {
            steps {
                sh "docker stop ${CONTAINER_NAME}-${params.DEPLOY_ENV} || true"
                sh "docker rm ${CONTAINER_NAME}-${params.DEPLOY_ENV} || true"
                sh """
                    docker run -d \
                        --name ${CONTAINER_NAME}-${params.DEPLOY_ENV} \
                        -p ${APP_PORT}:3000 \
                        --restart unless-stopped \
                        ${IMAGE_NAME}:${IMAGE_TAG}
                """
            }
        }

        stage('Verify') {
            steps {
                sh 'sleep 3'
                sh "docker ps | grep ${CONTAINER_NAME}-${params.DEPLOY_ENV}"
                sh "curl http://localhost:${APP_PORT}"
            }
        }
    }

    post {
        success {
            sh """
                curl -s -X POST https://api.telegram.org/bot\${TELEGRAM_TOKEN}/sendMessage \
                -d chat_id=\${TELEGRAM_CHAT_ID} \
                -d text="✅ [${params.DEPLOY_ENV}] Build SUCCESS: ${JOB_NAME} #${BUILD_NUMBER} — Image: ${IMAGE_NAME}:${IMAGE_TAG}"
            """
        }
        failure {
            sh """
                curl -s -X POST https://api.telegram.org/bot\${TELEGRAM_TOKEN}/sendMessage \
                -d chat_id=\${TELEGRAM_CHAT_ID} \
                -d text="❌ [${params.DEPLOY_ENV}] Build FAILED: ${JOB_NAME} #${BUILD_NUMBER}"
            """
        }
    }
}
