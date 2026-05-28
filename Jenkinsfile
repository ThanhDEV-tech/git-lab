pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Restore') {
            steps {
                sh 'echo "No dependencies to restore"'
            }
        }

        stage('Build') {
            steps {
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
        success { echo 'All stages passed!' }
        failure { echo 'Pipeline failed — check test output above.' }
    }
}
