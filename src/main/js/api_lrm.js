/*
 * Copyright (C) 2017-2017 SonarSource SA
 * All rights reserved
 * mailto:info AT sonarsource DOT com
 */
import {getJSON} from 'sonar-request'; // see https://github.com/SonarSource/sonarqube/blob/master/server/sonar-web/src/main/js/app/utils/exposeLibraries.js

export function findQualityProfilesStatistics(project) {
  return getJSON('/api/qualityprofiles/search').then(function (response) {
     return response.profiles.length;
  });
}

export function findQualityQatesStatistics(project) {
  return getJSON('/api/qualitygates/list').then(function (response) {
     return response.qualitygates.length;
  });
}

export function findIssuesStatistics(project) {
  return getJSON('/api/issues/search').then(function (response) {
     return response.total;
  });
}

export function findProjects(project) {
  return getJSON('/api/projects/search').then(function (response) {
     return response.components.length;
  });
}
//

export function findlrmEndDate(project) {

return getJSON('/api/project_analyses/search', {
  project: project.key,
  p: 1,
  ps: 500,
}).then(function (responseAnalyses) {
  const numberOfAnalyses = responseAnalyses.analyses.length;
  if (numberOfAnalyses > 0) {
    return getJSON('/api/measures/search_history', {
      component: project.key,
      metrics: "lngprt-lrm-license-enddate",
      ps: 1000
    }).then(function (responseMetrics) {
      var data = [];
      var numberOfVersions=0;

      for (let i = 0; i < numberOfAnalyses; i++) {
        let analysis = responseAnalyses.analyses[i];
        for (let j = 0; j < analysis.events.length; j++) {
          if (analysis.events[j].category === "VERSION") {
            let result = {version: analysis.events[j].name,
                          endDate: ""
                         };
            const numberOfMeasuresRetrieved = 1;

            for (let k = 0; k < numberOfMeasuresRetrieved; k++) {
              for(let d = 0; d < responseMetrics.measures[k].history.length; d++) {
                if ( responseMetrics.measures[k].history[d].date === responseAnalyses.analyses[i].date ) {
                  //console.log(responseMetrics.measures[k].metric);
                  if (responseMetrics.measures[k].metric === "lngprt-lrm-license-enddate") {
                    result.endDate = responseMetrics.measures[k].history[d].value;
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
