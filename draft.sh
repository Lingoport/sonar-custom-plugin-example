#!/bin/bash

#env

export JOB_NAME=${group_project%:*}

export WORKSPACE=$JENKINS_HOME/jobs/$JOB_NAME/workspace

export BUILD_USER=$dashboard_user

export JENKINS_USERNAME=`cat ${JENKINS_HOME}/lingoport/bin/jenkins_cli_config.sh | grep "JENKINS_USER=" | sed "s/export JENKINS_USER=\*\///" | sed "s/export JENKINS_USER=//" | tr -d '[:space:]'`

export JENKINS_TOKEN=`cat ${JENKINS_HOME}/lingoport/bin/jenkins_cli_config.sh | grep "JENKINS_TOKEN=" | sed "s/export JENKINS_TOKEN=\*\///" | sed "s/export JENKINS_TOKEN=//" | tr -d '[:space:]'`

export ORIGIN_CONFIG_PATH=`cat ${JENKINS_HOME}/jobs/${JOB_NAME}/config.xml | grep "projectFilename" | sed "s/<projectFilename>//" | sed "s/<\/projectFilename>//" | tr -d '[:space:]'`

export CONFIG_PATH=`cat ${JENKINS_HOME}/jobs/${JOB_NAME}/config.xml | grep "projectFilename" | sed "s/<projectFilename>//" | sed "s/<\/projectFilename>//" | tr -d '[:space:]'`


echo "------------------------------------------------------------------------"
echo "JOB_NAME=$JOB_NAME"
echo "BUILD_USER=$BUILD_USER"
echo "WORKSPACE=$WORKSPACE"
echo "ORIGIN_CONFIG_PATH=$ORIGIN_CONFIG_PATH"

echo $param

result=$(echo $ORIGIN_CONFIG_PATH | grep "\$WORKSPACE")
 if [[ "$result" != "" ]]
 then
     cd $WORKSPACE
     ORIGIN_CONFIG_PATH=${ORIGIN_CONFIG_PATH/\$WORKSPACE\//}

 fi


while read -r line
do
  contain=$(echo $line | grep "report-priorities>")$(echo $line | grep "checks>")$(echo $line | grep "<embedded-strings")$(echo $line | grep "<general-patterns")$(echo $line | grep "<locale-sensitive-methods")$(echo $line | grep "<static-file-references")
  if [[ "$contain" == "" ]]
    then
     cat >>pdf.xml<<EOF
     $line
EOF
     echo $line
  fi

done < $ORIGIN_CONFIG_PATH

while read -r line
do
   cat >>newpdf.xml<<EOF
   $line
EOF
  priority=$(echo $line | grep "/report-type>")
  if [[ "$priority" != "" ]]
    then
     cat >>newpdf.xml<<EOF
     <report-priorities>$param</report-priorities>
EOF
  fi
    type=$(echo $line | grep "</scan-name>")
  if [[ "$type" != "" ]]
    then
     cat >>newpdf.xml<<EOF
     <checks>

       <embedded-strings>true</embedded-strings>

       <locale-sensitive-methods>true</locale-sensitive-methods>

       <general-patterns>true</general-patterns>

       <static-file-references>false</static-file-references>

      </checks>
EOF
  fi

done < pdf.xml

rm pdf.xml

cp newpdf.xml ${JENKINS_HOME}/Lingoport_Data/Dashboard/Projects/${JOB_NAME}/

rm newpdf.xml

cd ${JENKINS_HOME}/Lingoport_Data/Dashboard/Projects/${JOB_NAME}/

mv newpdf.xml LiteProjectDefinition.xml

export new_path="${JENKINS_HOME}/Lingoport_Data/Dashboard/Projects/${JOB_NAME}/LiteProjectDefinition.xml"


sed -i s~$CONFIG_PATH~${new_path}~ ${JENKINS_HOME}/jobs/${JOB_NAME}/config.xml

java -jar ${JENKINS_HOME}/jenkins-cli.jar -http -auth ${JENKINS_USERNAME}:${JENKINS_TOKEN} -s http://localhost:8080/jenkins reload-job ${JOB_NAME}
