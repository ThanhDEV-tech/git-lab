pipeline {
    agent any

    environment {
        IMAGE_NAME = 'thanhdev05/git-lab-app'
        BLUE_PORT  = '8081'
        GREEN_PORT = '8082'
        LIVE_PORT  = '8080'
    }

    parameters {
        choice(
            name: 'DEPLOY_COLOR',
            choices: ['green', 'blue'],
            description: 'Deploy to which environment?'
        )
    }

    stages {
        stage('Checkout') {
            steps { checkout scm }
        }

        stage('Deploy to Target') {
            steps {
                script {
                    def port = params.DEPLOY_COLOR == 'blue' ? env.BLUE_PORT : env.GREEN_PORT
                    sh "docker stop git-lab-${params.DEPLOY_COLOR} || true"
                    sh "docker rm git-lab-${params.DEPLOY_COLOR} || true"
                    sh """
                        docker run -d \
                            --name git-lab-${params.DEPLOY_COLOR} \
                            -p ${port}:3000 \
                            --restart unless-stopped \
                            ${IMAGE_NAME}:latest
                    """
                    echo "Deployed to ${params.DEPLOY_COLOR} on port ${port}"
                }
            }
        }

        stage('Verify Target') {
            steps {
                script {
                    def port = params.DEPLOY_COLOR == 'blue' ? env.BLUE_PORT : env.GREEN_PORT
                    sh 'sleep 3'
                    sh "curl http://localhost:${port}"
                }
            }
        }

        stage('Switch Traffic') {
            steps {
                script {
                    def targetPort = params.DEPLOY_COLOR == 'blue' ? env.BLUE_PORT : env.GREEN_PORT
                    sh "docker stop git-lab-live || true"
                    sh "docker rm git-lab-live || true"
                    sh """
                        docker run -d \
                            --name git-lab-live \
                            -p ${env.LIVE_PORT}:3000 \
                            --restart unless-stopped \
                            ${IMAGE_NAME}:latest
                    """
                    echo "Traffic switched to ${params.DEPLOY_COLOR} (port ${env.LIVE_PORT})"
                }
            }
        }
    }

    post {
        success {
            echo "Live traffic now served by ${params.DEPLOY_COLOR} environment"
        }
    }
}
