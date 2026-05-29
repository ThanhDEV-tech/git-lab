pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps { checkout scm }
        }

        stage('Build') {
            steps {
                sh '/usr/local/bin/docker-compose build'
            }
        }

        stage('Deploy Compose') {
            steps {
                sh '/usr/local/bin/docker-compose down || true'
                sh '/usr/local/bin/docker-compose up -d'
                sh 'sleep 5'
            }
        }

        stage('Test') {
            steps {
                sh 'node test.js'
            }
        }

        stage('Verify Services') {
            steps {
                sh '/usr/local/bin/docker-compose ps'
                sh 'curl http://localhost:3000'
                sh 'curl http://localhost:3000'
                sh 'curl http://localhost:3000'
            }
        }
    }

    post {
        success { echo 'Multi-container deployment successful!' }
        failure {
            sh '/usr/local/bin/docker-compose logs'
            sh '/usr/local/bin/docker-compose down || true'
        }
    }
}
