pipeline {
    agent any
    environment {
        IMAGE = 'gke_nodeapplication'
        TAG = "${BUILD_NUMBER}"
        PROJECT_ID = 'appdeploymentgke'
        LOCATION = 'us-central1-a'
	CLUSTER_NAME = 'gkecluster-dev'
        HELM_CHART_PATH = 'node-app/'
        HELM_RELEASE_NAME = 'node'
        HELM_NAMESPACE = 'node'
    }
    stages {
        stage('Checkout from Git'){
            steps{
                git branch: 'master', url: 'https://github.com/maheeshpm7/cmb-demo.git'
            }
        }
        stage("Docker Build"){
            steps{
                script{
		    withDockerRegistry(credentialsId: 'dbd9d3c5-0210-4392-b650-aa94ed2c571a', toolName: 'docker'){
                        sh "sudo docker build -t ${IMAGE} ."
                    }
                }
            }
	}

        stage("Docker Push"){
            steps{
                script{
                    withDockerRegistry(credentialsId: 'dbd9d3c5-0210-4392-b650-aa94ed2c571a', toolName: 'docker'){
			sh "sudo docker login -u maheesh7 -p 'Maheeshpm@007' "  
                        sh "sudo docker tag ${IMAGE} maheesh7/${IMAGE}:${TAG} "
                        sh "sudo docker push maheesh7/${IMAGE}:${TAG} "
                    }
                }
            }
        }
        stage("Docker Clean up "){
            steps{
                 sh 'echo " cleaning Docker Images"'
                 sh 'sudo docker rmi -f \$(sudo docker images -q)'
            }
        }
        stage("Helm install "){
            steps{
                 sh "curl -fsSL -o get_helm.sh https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3"
                 sh "chmod 700 get_helm.sh"
                 sh "./get_helm.sh"
            }
        }
        stage('GKE Authentication') {
            steps{
                    sh "gcloud container clusters get-credentials ${CLUSTER_NAME} --zone ${LOCATION} --project ${PROJECT_ID}"
                
            }
        }
        stage('Deploy Helm Chart') {
            steps {
                script {
                    sh 'kubectl create ns ${HELM_NAMESPACE} || echo "namespace already created" '
                    sh "helm upgrade --install ${HELM_RELEASE_NAME} ${HELM_CHART_PATH} --set image.tag=${TAG} --namespace=${HELM_NAMESPACE} --wait"
                }
            }
        }
        
    }
}
