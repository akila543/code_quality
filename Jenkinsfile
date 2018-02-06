pipeline {
    agent any
    stages{
      stage('BuildImage'){
            steps {
                 bat 'E:/workspace/scripts/buildTKMAxxImage'
            }
            post {
                success {
                    echo 'Now Building Images'

                }
            }
        }
        stage('Code Quality'){
        steps{
        build job: 'Code_Quality_TKMaxx'
        }
        post {
            success {
                 echo ' Code quality has passed'
                 bat 'E:/workspace/scripts/DeployTKMaxxImage'
            }
            failure {
               echo 'Code Quality has failed'
               input message: 'Approve for deployment?'
               bat 'E:/workspace/scripts/DeployTKMaxxImage'
               echo 'Code Deployed to Production'




            }
        }


        }





    }
}
