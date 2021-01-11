pipeline {
    
    agent any
    
    environment {        
        registry = "gcr.io/quantum-talent-301321/hello-world"
        dockerImage = ''
    }
    
    stages {
        
        stage("Checkout") {
            steps {
                git url:'https://github.com/claudiomartinbianco/hello-world.git'
                // git credentialsId: 'bitbucket_server', url: 'https://bitbucket.whirlpoolcorp.com/scm/~biancc6/hello-world.git'
            }
        }
        
        stage('Build') {
            steps {
                script {
                    dockerImage = docker.build( registry )
                    // dockerImage = docker.build registry + ":$BUILD_NUMBER"
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
        
        stage("Deploy") {
            steps {                                              
                withCredentials([[$class: 'FileBinding', credentialsId: 'gke-credential', variable: 'JSON_KEY']]) {
    
                    sh '/root/google-cloud-sdk/bin/gcloud auth activate-service-account --key-file $JSON_KEY'

                    sh '/root/google-cloud-sdk/bin/gcloud container clusters get-credentials cluster-1 --zone us-central1-c --project quantum-talent-301321'                    

                    // sh '/root/google-cloud-sdk/bin/kubectl create deployment cmb --image=gcr.io/quantum-talent-301321/hello-world:latest'

                    sh '/root/google-cloud-sdk/bin/kubectl create -f deployment.yaml'
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
