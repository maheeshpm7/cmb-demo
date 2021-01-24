pipeline {
    
    agent any
    
    environment {        
        registry = "gcr.io/quantum-talent-301321/cmb-demo"
        dockerImage = ''
    }
    
    stages {
        
        stage('Checkout') {
            steps {
                git url:'https://github.com/claudiomartinbianco/cmb-demo.git'                
            }
        }
        
        stage('Build') {
            steps {
                script {
                    dockerImage = docker.build( registry )                    
                }
            }
        }

        stage('Push') {
            steps {
                script {
                    docker.withRegistry('https://gcr.io', 'gcr:gcr-credential') {
                        dockerImage.push("${env.BUILD_NUMBER}")
                        dockerImage.push("latest")
                    }
                }
            }
        }
        
        stage('Unit Tests') {
            steps {
                script {
                    dockerImage.inside() {
                        sh "npm install express --save"
                        sh "npm install -D mocha chai chai-http"
                        sh "npm test"                                               
                    }
                }
            }
        }
        
        stage('Deploy') {
            steps {
                withCredentials([[$class: 'FileBinding', credentialsId: 'gke-credential', variable: 'JSON_KEY']]) {
    
                    sh 'whereis gcloud'
                    
                    sh 'whereis kubectl'
                    
                    // sh '/var/jenkins_home/google-cloud-sdk/bin/gcloud auth activate-service-account --key-file $JSON_KEY'

                    // sh '/var/jenkins_home/google-cloud-sdk/bin/gcloud container clusters get-credentials cluster-1 --zone us-central1-c --project quantum-talent-301321'                    

                    // sh '/var/jenkins_home/google-cloud-sdk/bin/kubectl rollout restart deployment/node-app'
                                        
                }
            }
        }               
        
        stage('Clean') {
            steps {
                sh "docker rmi $registry:$BUILD_NUMBER"
            }
        }
        
    }
}
