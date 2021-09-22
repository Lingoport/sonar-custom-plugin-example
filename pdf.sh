
#!/bin/bash

export JENKINS_USERNAME=`cat ${JENKINS_HOME}/lingoport/bin/jenkins_cli_config.sh | grep "JENKINS_USER=" | sed "s/export JENKINS_USER=\*\///" | sed "s/export JENKINS_USER=//" | tr -d '[:space:]'`

export JENKINS_TOKEN=`cat ${JENKINS_HOME}/lingoport/bin/jenkins_cli_config.sh | grep "JENKINS_TOKEN=" | sed "s/export JENKINS_TOKEN=\*\///" | sed "s/export JENKINS_TOKEN=//" | tr -d '[:space:]'`

export ORIGIN_CONFIG_PATH=`cat ${JENKINS_HOME}/jobs/${JOB_NAME}/config.xml | grep "projectFilename" | sed "s/<projectFilename>//" | sed "s/<\/projectFilename>//"`

echo "$ORIGIN_CONFIG_PATH"






#copy pdf to
#${JENKINS_HOME}/Lingoport_Data/Dashboard/Projects/${JOB_NAME}/LiteProjectDefinition.xml




java -jar ${JENKINS_HOME}/jenkins-cli.jar -http -auth ${JENKINS_USERNAME}:${JENKINS_TOKEN} -s http://localhost:8080/jenkins reload-job ${JOB_NAME}
