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



export function findFiles(project) {

return getJSON('/api/issues/search', {
  componentKeys: project.key,
  rules: 'lrm:LRMSourceTranMissingKeyCheck',
  p: 1,
  ps: 500,
}).then(function (responseAnalyses) {
  const numberOfAnalyses = responseAnalyses.issues.length;
  if (numberOfAnalyses > 0) {
  var data = [];
  let d = 0;
  var filter = [];
  for (let i = 0; i < numberOfAnalyses; i++) {
         let result = {
                  filename: "",
           };
          var temp = responseAnalyses.issues[i].component.split(":");
          result.filename = temp[2];

          if(filter.indexOf(result.filename)==-1){
             data[d] = result;
             d++;
             filter[d] = result.filename;
           }
      }
      //console.table(data);
      return data;
    }
 });
}

export function findPrepLocale(project) {

return getJSON('/api/project_analyses/search', {
  project: project.key,
  p: 1,
  ps: 500,
}).then(function (responseAnalyses) {
  const numberOfAnalyses = responseAnalyses.analyses.length;
  if (numberOfAnalyses > 0) {
    return getJSON('/api/measures/search_history', {
      component: project.key,
      metrics: "lngprt-lrm-files-to-prep-locale_ids,lngprt-lrm-num-files-to-prep-locale_names",
      ps: 1000
    }).then(function (responseMetrics) {
      var data = [];
      var numberOfVersions=0;

      for (let i = 0; i < numberOfAnalyses; i++) {
        let analysis = responseAnalyses.analyses[i];
        for (let j = 0; j < analysis.events.length; j++) {
          if (analysis.events[j].category === "VERSION") {
            let result = {version: analysis.events[j].name,
                          localeMSR: "",
                          displayNameMSR:"",
                          projectKey : project.key
                         };
            const numberOfMeasuresRetrieved = 2;

            for (let k = 0; k < numberOfMeasuresRetrieved; k++) {
              for(let d = 0; d < responseMetrics.measures[k].history.length; d++) {
                if ( responseMetrics.measures[k].history[d].date === responseAnalyses.analyses[i].date ) {
                  //console.log(responseMetrics.measures[k].metric);
                  if (responseMetrics.measures[k].metric === "lngprt-lrm-files-to-prep-locale_ids") {
                    result.localeMSR = responseMetrics.measures[k].history[d].value;
                  }else if (responseMetrics.measures[k].metric === "lngprt-lrm-num-files-to-prep-locale_names") {
                      result.displayNameMSR = responseMetrics.measures[k].history[d].value;
                  }
                }
              }
            }
            data[numberOfVersions] = result;
            numberOfVersions++;
          }
        }
      }
      //console.table(data);
      return data;
    });
  }
 });
}
