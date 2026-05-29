pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps { checkout scm }
        }

        stage('Build') {
            steps {
                sh 'docker-compose build'
            }
        }

        stage('Deploy Compose') {
            steps {
                sh 'docker-compose down || true'
                sh 'docker-compose up -d'
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
                sh 'docker-compose ps'
                sh 'curl http://localhost:3000'
                sh 'curl http://localhost:3000'
                sh 'curl http://localhost:3000'
            }
        }
    }

    post {
        success { echo 'Multi-container deployment successful!' }
        failure {
            sh 'docker-compose logs'
            sh 'docker-compose down || true'
        }
    }
}
