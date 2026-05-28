pipeline {
    agent any

    parameters {
        choice(
            name: 'DEPLOY_ENV',
            choices: ['dev', 'staging', 'prod'],
            description: 'Choose deployment environment'
        )
    }

    environment {
        IMAGE_NAME     = 'thanhdev05/git-lab-app'
        CONTAINER_NAME = "git-lab-app-${params.DEPLOY_ENV}"
    }

    stages {
        stage('Checkout') {
            steps { checkout scm }
        }

        stage('Load Config') {
            steps {
                script {
                    def config = readFile("config/${params.DEPLOY_ENV}.env")
                    echo "Config for ${params.DEPLOY_ENV}:\n${config}"
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    def port = params.DEPLOY_ENV == 'dev' ? '3000' :
                               params.DEPLOY_ENV == 'staging' ? '3001' : '3002'

                    sh "docker stop ${CONTAINER_NAME} || true"
                    sh "docker rm ${CONTAINER_NAME} || true"
                    sh """
                        docker run -d \
                            --name ${CONTAINER_NAME} \
                            -p ${port}:3000 \
                            --env-file config/${params.DEPLOY_ENV}.env \
                            --restart unless-stopped \
                            ${IMAGE_NAME}:latest
                    """
                }
            }
        }

        stage('Verify') {
            steps {
                script {
                    def port = params.DEPLOY_ENV == 'dev' ? '3000' :
                               params.DEPLOY_ENV == 'staging' ? '3001' : '3002'
                    sh 'sleep 3'
                    sh "docker ps | grep ${CONTAINER_NAME}"
                    sh "curl http://localhost:${port}"
                }
            }
        }
    }

    post {
        success { echo "Deployed to ${params.DEPLOY_ENV} successfully!" }
        failure { echo "Deploy to ${params.DEPLOY_ENV} failed." }
    }
}
