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
      metrics: "lngprt-gyzr-scan-line-count,lngprt-gyzr-scan-rule-set-name,lngprt-gyzr-scan-local-ruleset,lngprt-gyzr-scan-violation-count,lngprt-gyzr-scan-file-count,lngprt-gyzr-scan-scan-name,lngprt-gyzr-scan-machine-learning,lngprt-gyzr-scan-select-priority,lngprt-gyzr-scan-select-type",
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
                          Type:"",
                          RuleSet:"",
                          Priority:"",
                           Issues:"0", Lines:"0",Files:"0",local:"",project: project.key

                         };
            const numberOfMeasuresRetrieved = 9;

            for (let k = 0; k < numberOfMeasuresRetrieved; k++) {
              for(let d = 0; d < responseMetrics.measures[k].history.length; d++) {
                if ( responseMetrics.measures[k].history[d].date === responseAnalyses.analyses[i].date ) {
                  if (responseMetrics.measures[k].metric === "lngprt-gyzr-scan-line-count") {
                    result.Lines = responseMetrics.measures[k].history[d].value;
                  } else if (responseMetrics.measures[k].metric === "lngprt-gyzr-scan-rule-set-name") {
                    result.RuleSet = responseMetrics.measures[k].history[d].value;
                  } else if (responseMetrics.measures[k].metric === "lngprt-gyzr-scan-local-ruleset") {
                        result.local = responseMetrics.measures[k].history[d].value;
                  } else if (responseMetrics.measures[k].metric === "lngprt-gyzr-scan-violation-count") {
                    result.Issues = responseMetrics.measures[k].history[d].value;
                  } else if (responseMetrics.measures[k].metric === "lngprt-gyzr-scan-file-count") {
                    result.Files = responseMetrics.measures[k].history[d].value;
                  } else if (responseMetrics.measures[k].metric === "lngprt-gyzr-scan-scan-name") {
                    result.Scan = responseMetrics.measures[k].history[d].value;
                  } else if(responseMetrics.measures[k].metric === "lngprt-gyzr-scan-machine-learning"){
                  //  result.bugs = responseMetrics.measures[k].history[d].value;
                  }else if (responseMetrics.measures[k].metric === "lngprt-gyzr-scan-select-type") {
                    result.Type = responseMetrics.measures[k].history[d].value;
                  }else if (responseMetrics.measures[k].metric === "lngprt-gyzr-scan-select-priority") {
                    result.Priority = responseMetrics.measures[k].history[d].value;
                  }
                }
              }
            }

            data[numberOfVersions] = result;
            numberOfVersions++;
          }
        }
      }
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
                           embedded:"", sensitive:"",general:"",project: project.key
                         };
            const numberOfMeasuresRetrieved = 5;

            for (let k = 0; k < numberOfMeasuresRetrieved; k++) {
              for(let d = 0; d < responseMetrics.measures[k].history.length; d++) {
                if ( responseMetrics.measures[k].history[d].date === responseAnalyses.analyses[i].date ) {
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
      return data;
    });
  }
 });
}


export function findgyzrHistory(project) {

return getJSON('/api/project_analyses/search', {
  project: project.key,
  p: 1,
  ps: 500,
}).then(function (responseAnalyses) {
  const numberOfAnalyses = responseAnalyses.analyses.length;
  if (numberOfAnalyses > 0) {
    return getJSON('/api/measures/search_history', {
      component: project.key,
      metrics: "lngprt-gyzr-violations",
      ps: 1000
    }).then(function (responseMetrics) {
      var data = [];
      var numberOfVersions=0;
      let result = {
                    gdate: [],
                    value: []
                   };

          for(let d = 0; d < responseMetrics.measures[0].history.length; d++) {
                result.gdate[d] = responseMetrics.measures[0].history[d].date;
                result.value[d] = Number(responseMetrics.measures[0].history[d].value);
                if(result.value[d]  === undefined)
                    result.value[d] =0;

          }
            data[numberOfVersions] = result;

      return data;
    });
  }
 });
}

export function findlpLicense(project) {

return getJSON('/api/project_analyses/search', {
  project: project.key,
  p: 1,
  ps: 500,
}).then(function (responseAnalyses) {
  const numberOfAnalyses = responseAnalyses.analyses.length;
  if (numberOfAnalyses > 0) {
    return getJSON('/api/measures/search_history', {
      component: project.key,
      metrics: "lngprt-globalyzer-lines,lngprt-globalyzer-client-version,lngprt-globalyzer-license-name,lngprt-globalyzer-license-enddate,lngprt-globalyzer-license-products,lngprt-globalyzer-license-lines,lngprt-globalyzer-license-projects,lngprt-globalyzer-license-repos,lngprt-lrm-ncloc,lngprt-lrm-version,lngprt-lrm-license-enddate,lngprt-lqa-license-enddate,lngprt-lrm-license-projects,lngprt-lrm-company_name",
      ps: 1000
    }).then(function (responseMetrics) {
      var data = [];
      var numberOfVersions=0;

      for (let i = 0; i < numberOfAnalyses; i++) {
        let analysis = responseAnalyses.analyses[i];
        for (let j = 0; j < analysis.events.length; j++) {
          if (analysis.events[j].category === "VERSION") {
            let result = {version: analysis.events[j].name,
                          gyzrClientVersion:"", gyzrExists:"",
                          gyzrCompanyName:"", gyzrEndDate:"", gyzrProducts:"",gyzrLines:"",gyzrProjects:"",gyzrRepo:"",
                          lrmExists:"", lrmVersion:"", lrmEndDate:"", lrmLqaEndDate:"", lrmProjects:"", lrmCompanyName:""
                         };
            const numberOfMeasuresRetrieved = 14;

            for (let k = 0; k < numberOfMeasuresRetrieved; k++) {
              for(let d = 0; d < responseMetrics.measures[k].history.length; d++) {
                if ( responseMetrics.measures[k].history[d].date === responseAnalyses.analyses[i].date ) {
                  if (responseMetrics.measures[k].metric === "lngprt-globalyzer-lines") {
                    result.gyzrExists = responseMetrics.measures[k].history[d].value;
                  } else if (responseMetrics.measures[k].metric === "lngprt-globalyzer-client-version") {
                    result.gyzrClientVersion = responseMetrics.measures[k].history[d].value;
                  } else if (responseMetrics.measures[k].metric === "lngprt-globalyzer-license-name") {
                    result.gyzrCompanyName = responseMetrics.measures[k].history[d].value;
                  } else if (responseMetrics.measures[k].metric === "lngprt-globalyzer-license-enddate") {
                    result.gyzrEndDate = responseMetrics.measures[k].history[d].value;
                  } else if (responseMetrics.measures[k].metric === "lngprt-globalyzer-license-products") {
                    result.gyzrProducts = responseMetrics.measures[k].history[d].value;
                  } else if (responseMetrics.measures[k].metric === "lngprt-globalyzer-license-lines") {
                    result.gyzrLines = responseMetrics.measures[k].history[d].value;
                  } else if (responseMetrics.measures[k].metric === "lngprt-globalyzer-license-projects") {
                    result.gyzrProjects = responseMetrics.measures[k].history[d].value;
                  } else if (responseMetrics.measures[k].metric === "lngprt-globalyzer-license-repos") {
                    result.gyzrRepo = responseMetrics.measures[k].history[d].value;
                  } else if (responseMetrics.measures[k].metric === "lngprt-lrm-ncloc") {
                    result.lrmExists = responseMetrics.measures[k].history[d].value;
                  } else if (responseMetrics.measures[k].metric === "lngprt-lrm-version") {
                    result.lrmVersion = responseMetrics.measures[k].history[d].value;
                  } else if (responseMetrics.measures[k].metric === "lngprt-lrm-license-enddate") {
                    result.lrmEndDate = responseMetrics.measures[k].history[d].value;
                  } else if (responseMetrics.measures[k].metric === "lngprt-lqa-license-enddate") {
                    result.lrmLqaEndDate = responseMetrics.measures[k].history[d].value;
                  } else if (responseMetrics.measures[k].metric === "lngprt-lrm-license-projects") {
                    result.lrmProjects = responseMetrics.measures[k].history[d].value;
                  } else if (responseMetrics.measures[k].metric === "lngprt-lrm-company_name") {
                    result.lrmCompanyName = responseMetrics.measures[k].history[d].value;
                  }
                }
              }
            }

            data[numberOfVersions] = result;
            numberOfVersions++;
          }
        }
      }
      return data;
    });
  }
 });
}
