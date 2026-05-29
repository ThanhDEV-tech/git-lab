pipeline {
    agent any

    environment {
        ARTIFACT_NAME = "git-lab-app-${BUILD_NUMBER}.tar.gz"
    }

    stages {
        stage('Checkout') {
            steps { checkout scm }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
                sh 'echo "Build completed at $(date)" > build-info.txt'
                sh 'echo "Version: ${BUILD_NUMBER}" >> build-info.txt'
            }
        }

        stage('Test') {
            steps {
                sh 'node test.js'
            }
        }

        stage('Package Artifact') {
            steps {
                sh 'tar -czf ${ARTIFACT_NAME} app.js package.json build-info.txt'
                sh 'ls -lh ${ARTIFACT_NAME}'
            }
        }

        stage('Verify Artifact') {
            steps {
                sh 'tar -tzf ${ARTIFACT_NAME}'
                sh 'md5sum ${ARTIFACT_NAME}'
            }
        }

        stage('Reuse Artifact') {
            steps {
                sh 'mkdir -p extracted'
                sh 'tar -xzf ${ARTIFACT_NAME} -C extracted/'
                sh 'cat extracted/build-info.txt'
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: '*.tar.gz', fingerprint: true
            echo "Artifact ${ARTIFACT_NAME} archived."
        }
    }
}
