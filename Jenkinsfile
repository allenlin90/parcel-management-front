pipeline {
    agent any

    stages {
        stage('ls') {
            steps {
                sh "ls"
            }
        }
        stage('remove') {
            steps {
                catchError(buildResult: 'SUCCESS', stageResult: 'SUCCESS') {
                    sh "docker-compose down --rmi all"
                }
            }
        }
        stage('Run') {
            steps {
                sh "ls"
                sh "docker-compose up -d"
            }
        }
    }
}
