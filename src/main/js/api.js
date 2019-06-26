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

export function findScans(project) {

return getJSON('/api/project_analyses/search', {
  project: project.key,
  p: 1,
  ps: 500,
}).then(function (responseAnalyses) {
  const numberOfAnalyses = responseAnalyses.analyses.length;
  if (numberOfAnalyses > 0) {
    return getJSON('/api/measures/search_history', {
      component: project.key,
      metrics: "lngprt-gyzr-scan-line-count,lngprt-gyzr-scan-rule-set-name,lngprt-gyzr-scan-local-ruleset,lngprt-gyzr-scan-violation-count,lngprt-gyzr-scan-file-count,lngprt-gyzr-scan-scan-name,lngprt-gyzr-scan-machine-learning",
      ps: 1000
    }).then(function (responseMetrics) {
      var data = [];
      var numberOfVersions=0;

      for (let i = 0; i < numberOfAnalyses; i++) {
        let analysis = responseAnalyses.analyses[i];
        for (let j = 0; j < analysis.events.length; j++) {
          if (analysis.events[j].category === "VERSION") {
            let result = {version: analysis.events[j].name,
                          Scan:"",
                          RuleSet:"",
                           Issues:"0", Lines:"0",Files:"0"

                         };
            const numberOfMeasuresRetrieved = 7;

            for (let k = 0; k < numberOfMeasuresRetrieved; k++) {
              for(let d = 0; d < responseMetrics.measures[k].history.length; d++) {
                if ( responseMetrics.measures[k].history[d].date === responseAnalyses.analyses[i].date ) {
                  //console.log(responseMetrics.measures[k].metric);
                  if (responseMetrics.measures[k].metric === "lngprt-gyzr-scan-line-count") {
                    result.Lines = responseMetrics.measures[k].history[d].value;
                  } else if (responseMetrics.measures[k].metric === "lngprt-gyzr-scan-rule-set-name") {
                    result.RuleSet = responseMetrics.measures[k].history[d].value;
                  } else if (responseMetrics.measures[k].metric === "lngprt-gyzr-scan-local-ruleset") {
                    if(responseMetrics.measures[k].history[d].value === "0")
                        result.RuleSet = result.RuleSet + "(Remote)";
                    else {
                      result.RuleSet = result.RuleSet + "(Local)";
                    }
                  } else if (responseMetrics.measures[k].metric === "lngprt-gyzr-scan-violation-count") {
                    result.Issues = responseMetrics.measures[k].history[d].value;
                  } else if (responseMetrics.measures[k].metric === "lngprt-gyzr-scan-file-count") {
                    result.Files = responseMetrics.measures[k].history[d].value;
                  } else if (responseMetrics.measures[k].metric === "lngprt-gyzr-scan-scan-name") {
                    result.Scan = responseMetrics.measures[k].history[d].value;
                  } else if(responseMetrics.measures[k].metric === "lngprt-gyzr-scan-machine-learning"){
                  //  result.bugs = responseMetrics.measures[k].history[d].value;
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


export function findgyzrEndDate(project) {

return getJSON('/api/project_analyses/search', {
  project: project.key,
  p: 1,
  ps: 500,
}).then(function (responseAnalyses) {
  const numberOfAnalyses = responseAnalyses.analyses.length;
  if (numberOfAnalyses > 0) {
    return getJSON('/api/measures/search_history', {
      component: project.key,
      metrics: "lngprt-globalyzer-license-enddate",
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
                  if (responseMetrics.measures[k].metric === "lngprt-globalyzer-license-enddate") {
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



export function findgyzrViolations(project) {

return getJSON('/api/project_analyses/search', {
  project: project.key,
  p: 1,
  ps: 500,
}).then(function (responseAnalyses) {
  const numberOfAnalyses = responseAnalyses.analyses.length;
  if (numberOfAnalyses > 0) {
    return getJSON('/api/measures/search_history', {
      component: project.key,
      metrics: "lngprt-gyzr-violations,lngprt-gyzr-violations-count-ratio,lngprt-gyzr-violations-rci,lngprt-gyzr-violations-distribution",
      ps: 1000
    }).then(function (responseMetrics) {
      var data = [];
      var numberOfVersions=0;

      for (let i = 0; i < numberOfAnalyses; i++) {
        let analysis = responseAnalyses.analyses[i];
        for (let j = 0; j < analysis.events.length; j++) {
          if (analysis.events[j].category === "VERSION") {
            let result = {version: analysis.events[j].name,
                          violation: "0", ratio: "", rci: "0", distribution: "",project: project.key
                         };
            const numberOfMeasuresRetrieved = 4;

            for (let k = 0; k < numberOfMeasuresRetrieved; k++) {
              for(let d = 0; d < responseMetrics.measures[k].history.length; d++) {
                if ( responseMetrics.measures[k].history[d].date === responseAnalyses.analyses[i].date ) {
                  //console.log(responseMetrics.measures[k].metric);
                  if (responseMetrics.measures[k].metric === "lngprt-gyzr-violations") {
                    result.violation = responseMetrics.measures[k].history[d].value;
                  }else if (responseMetrics.measures[k].metric === "lngprt-gyzr-violations-count-ratio") {
                    result.ratio = responseMetrics.measures[k].history[d].value;
                  }else if (responseMetrics.measures[k].metric === "lngprt-gyzr-violations-rci") {
                    result.rci = responseMetrics.measures[k].history[d].value;
                  }else if (responseMetrics.measures[k].metric === "lngprt-gyzr-violations-distribution") {
                    result.distribution = responseMetrics.measures[k].history[d].value;
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
      metrics: "lngprt-globalyzer-license-enddate",
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
                  if (responseMetrics.measures[k].metric === "lngprt-globalyzer-license-enddate") {
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


export function findgyzrSummary(project) {

return getJSON('/api/project_analyses/search', {
  project: project.key,
  p: 1,
  ps: 500,
}).then(function (responseAnalyses) {
  const numberOfAnalyses = responseAnalyses.analyses.length;
  if (numberOfAnalyses > 0) {
    return getJSON('/api/measures/search_history', {
      component: project.key,
      metrics: "lngprt-gyzr-rules-concatenations,lngprt-gyzr-rules-static-files,lngprt-gyzr-rules-embedded-strings,lngprt-gyzr-rules-locale-sensitive-methods,lngprt-gyzr-rules-general-patterns",
      ps: 1000
    }).then(function (responseMetrics) {
      var data = [];
      var numberOfVersions=0;

      for (let i = 0; i < numberOfAnalyses; i++) {
        let analysis = responseAnalyses.analyses[i];
        for (let j = 0; j < analysis.events.length; j++) {
          if (analysis.events[j].category === "VERSION") {
            let result = {version: analysis.events[j].name,
                          concatenations:"",
                          static:"",
                           embedded:"0", sensitive:"0",general:"0"
                         };
            const numberOfMeasuresRetrieved = 5;

            for (let k = 0; k < numberOfMeasuresRetrieved; k++) {
              for(let d = 0; d < responseMetrics.measures[k].history.length; d++) {
                if ( responseMetrics.measures[k].history[d].date === responseAnalyses.analyses[i].date ) {
                  //console.log(responseMetrics.measures[k].metric);
                  if (responseMetrics.measures[k].metric === "lngprt-gyzr-rules-concatenations") {
                    result.concatenations = responseMetrics.measures[k].history[d].value;
                  } else if (responseMetrics.measures[k].metric === "lngprt-gyzr-rules-static-files") {
                    result.static = responseMetrics.measures[k].history[d].value;
                  } else if (responseMetrics.measures[k].metric === "lngprt-gyzr-rules-embedded-strings") {
                    result.embedded = responseMetrics.measures[k].history[d].value;
                  } else if (responseMetrics.measures[k].metric === "lngprt-gyzr-rules-locale-sensitive-methods") {
                    result.sensitive = responseMetrics.measures[k].history[d].value;
                  } else if (responseMetrics.measures[k].metric === "lngprt-gyzr-rules-general-patterns") {
                    result.general = responseMetrics.measures[k].history[d].value;
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
