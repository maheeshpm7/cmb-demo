pipeline {
    
    agent any
    
    environment {        
        registry = "gcr.io/quantum-talent-301321/cmb-demo"
        dockerImage = ''
    }
    
    stages {
        
        stage("Checkout") {
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
        
        stage('Test') {
            steps {
                script {
                    dockerImage.inside {
                        sh "npm test"
                    }
                }
            }
        }        
        
        stage("Deploy") {
            steps {
                withCredentials([[$class: 'FileBinding', credentialsId: 'gke-credential', variable: 'JSON_KEY']]) {
    
                    sh '/root/google-cloud-sdk/bin/gcloud auth activate-service-account --key-file $JSON_KEY'

                    sh '/root/google-cloud-sdk/bin/gcloud container clusters get-credentials cluster-1 --zone us-central1-c --project quantum-talent-301321'                    

                    sh '/root/google-cloud-sdk/bin/kubectl create -f deployment.yaml'                    

                    // sh '/root/google-cloud-sdk/bin/kubectl rollout restart deployment/node-app-deployment'
                                        
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
