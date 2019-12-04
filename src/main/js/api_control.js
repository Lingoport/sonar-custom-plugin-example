/*
 * Copyright (C) 2011-2019 Lingoport Inc
 * All rights reserved
 * info AT lingoport DOT com
 */
import {getJSON} from 'sonar-request'; // see https://github.com/SonarSource/sonarqube/blob/master/server/sonar-web/src/main/js/app/utils/exposeLibraries.js


export function findProjects(project) {
  return getJSON('/api/projects/search').then(function (response) {
     return response.components.length;
  });
}


export function findSegments(project) {

return getJSON('/api/issues/search', {
  componentKeys: project.key,
  rules: 'lrm:LRMSourceTranMissingKeyCheck',
  p: 1,
  ps: 500,
}).then(function (responseAnalyses) {
  const numberOfAnalyses = responseAnalyses.issues.length;
  if (numberOfAnalyses > 0) {
  var data = [];
      for (let i = 0; i < numberOfAnalyses; i++) {
         let result = {
                  messageinfo: "",
                  keyinfo:"",
           };
          result.messageinfo = responseAnalyses.issues[i].message;
          result.keyinfo = responseAnalyses.issues[i].key;
          data[i] = result;
      }
      //console.table(data);
      return data;
    }
 });
}
