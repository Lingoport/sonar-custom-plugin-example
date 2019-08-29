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
      metrics: "lngprt-lrm-license-enddate,lngprt-lqa-license-enddate",
      ps: 1000
    }).then(function (responseMetrics) {
      var data = [];
      var numberOfVersions=0;

      for (let i = 0; i < numberOfAnalyses; i++) {
        let analysis = responseAnalyses.analyses[i];
        for (let j = 0; j < analysis.events.length; j++) {
          if (analysis.events[j].category === "VERSION") {
            let result = {version: analysis.events[j].name,
                          endDate: "",
                          lqaendDate:"",
                         };
            const numberOfMeasuresRetrieved = 2;

            for (let k = 0; k < numberOfMeasuresRetrieved; k++) {
              for(let d = 0; d < responseMetrics.measures[k].history.length; d++) {
                if ( responseMetrics.measures[k].history[d].date === responseAnalyses.analyses[i].date ) {
                  //console.log(responseMetrics.measures[k].metric);
                  if (responseMetrics.measures[k].metric === "lngprt-lrm-license-enddate") {
                    result.endDate = responseMetrics.measures[k].history[d].value;
                  }else if (responseMetrics.measures[k].metric === "lngprt-lqa-license-enddate") {
                      result.lqaendDate = responseMetrics.measures[k].history[d].value;
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
      metrics: "lngprt-lrm-files-to-prep-locale_ids,lngprt-lrm-num-files-to-prep-locales,lngprt-lrm-num-keys-to-prep-locales,lngprt-lrm-num-words-to-prep-locales,lngprt-lrm-num-files-to-prep-locale_names,lngprt-lrm-files-to-prep,lngprt-lrm-critical-errors",
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
                          numFilesMSR:"",
                          numKeysMSR:"",
                          numWordsMSR:"",
                          displayNameMSR:"",
                          filesToPrepMSR:"",
                          errorCountMSR:"",
                          project: project.key.substring(0,project.key.length-5)
                         };
            const numberOfMeasuresRetrieved = 7;

            for (let k = 0; k < numberOfMeasuresRetrieved; k++) {
              for(let d = 0; d < responseMetrics.measures[k].history.length; d++) {
                if ( responseMetrics.measures[k].history[d].date === responseAnalyses.analyses[i].date ) {
                  //console.log(responseMetrics.measures[k].metric);
                  if (responseMetrics.measures[k].metric === "lngprt-lrm-files-to-prep-locale_ids") {
                    result.localeMSR = responseMetrics.measures[k].history[d].value;
                  }else if (responseMetrics.measures[k].metric === "lngprt-lrm-num-files-to-prep-locales") {
                      result.numFilesMSR = responseMetrics.measures[k].history[d].value;
                  }else if (responseMetrics.measures[k].metric === "lngprt-lrm-num-keys-to-prep-locales") {
                      result.numKeysMSR = responseMetrics.measures[k].history[d].value;
                  }else if (responseMetrics.measures[k].metric === "lngprt-lrm-num-words-to-prep-locales") {
                      result.numWordsMSR = responseMetrics.measures[k].history[d].value;
                  }else if (responseMetrics.measures[k].metric === "lngprt-lrm-num-files-to-prep-locale_names") {
                      result.displayNameMSR = responseMetrics.measures[k].history[d].value;
                  }else if (responseMetrics.measures[k].metric === "lngprt-lrm-files-to-prep") {
                      result.filesToPrepMSR = responseMetrics.measures[k].history[d].value;
                  }else if (responseMetrics.measures[k].metric === "lngprt-lrm-critical-errors") {
                      result.errorCountMSR = responseMetrics.measures[k].history[d].value;
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


export function findLRMViolations(project) {

return getJSON('/api/project_analyses/search', {
  project: project.key,
  p: 1,
  ps: 500,
}).then(function (responseAnalyses) {
  const numberOfAnalyses = responseAnalyses.analyses.length;
  if (numberOfAnalyses > 0) {
    return getJSON('/api/measures/search_history', {
      component: project.key,
      metrics: "lngprt-lrm-source-violations,lngprt-lrm-src-violations-count-ratio,lngprt-lrm-source-rci,lngprt-lrm-source-violations-distribution",
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
                  if (responseMetrics.measures[k].metric === "lngprt-lrm-source-violations") {
                    result.violation = responseMetrics.measures[k].history[d].value;
                  }else if (responseMetrics.measures[k].metric === "lngprt-lrm-src-violations-count-ratio") {
                    result.ratio = responseMetrics.measures[k].history[d].value;
                  }else if (responseMetrics.measures[k].metric === "lngprt-lrm-source-rci") {
                    result.rci = responseMetrics.measures[k].history[d].value;
                  }else if (responseMetrics.measures[k].metric === "lngprt-lrm-source-violations-distribution") {
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


export function findTraLRMViolations(project) {

return getJSON('/api/project_analyses/search', {
  project: project.key,
  p: 1,
  ps: 500,
}).then(function (responseAnalyses) {
  const numberOfAnalyses = responseAnalyses.analyses.length;
  if (numberOfAnalyses > 0) {
    return getJSON('/api/measures/search_history', {
      component: project.key,
      metrics: "lngprt-lrm-translation-violations,lngprt-lrm-tran-violations-count-ratio,lngprt-lrm-translation-rci,lngprt-lrm-translation-violations-distribution",
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
                  if (responseMetrics.measures[k].metric === "lngprt-lrm-translation-violations") {
                    result.violation = responseMetrics.measures[k].history[d].value;
                  }else if (responseMetrics.measures[k].metric === "lngprt-lrm-tran-violations-count-ratio") {
                    result.ratio = responseMetrics.measures[k].history[d].value;
                  }else if (responseMetrics.measures[k].metric === "lngprt-lrm-translation-rci") {
                    result.rci = responseMetrics.measures[k].history[d].value;
                  }else if (responseMetrics.measures[k].metric === "lngprt-lrm-translation-violations-distribution") {
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


export function findLrmCompletion(project) {

return getJSON('/api/project_analyses/search', {
  project: project.key,
  p: 1,
  ps: 500,
}).then(function (responseAnalyses) {
  const numberOfAnalyses = responseAnalyses.analyses.length;
  if (numberOfAnalyses > 0) {
    return getJSON('/api/measures/search_history', {
      component: project.key,
      metrics: "lngprt-lrm-status-total-source-files,lngprt-lrm-status-total-source-keys,lngprt-lrm-status-total-source-words,lngprt-lrm-status-last-version-num,lngprt-lrm-status-non-base-locales-ids,lngprt-lrm-status-non-base-locales-display,lngprt-lrm-num-files-to-translate-for-locales,lngprt-lrm-num-keys-to-translate-for-locales,lngprt-lrm-num-words-to-translate-for-locales,lngprt-lrm-is-outstanding-prepkits,lngprt-lrm-percent-complete-for-locales,lngprt-lrm-status-avg-completion-percent,lngprt-lrm-status-total-remaining-words,lngprt-lrm-default-locale",
      ps: 1000
    }).then(function (responseMetrics) {
      var data = [];
      var numberOfVersions=0;

      for (let i = 0; i < numberOfAnalyses; i++) {
        let analysis = responseAnalyses.analyses[i];
        for (let j = 0; j < analysis.events.length; j++) {
          if (analysis.events[j].category === "VERSION") {
            let result = {version: analysis.events[j].name,
                          files: "0", keys: "", words: "0", versionnum: "",project: project.key,d_local:"",ids:"",display:"",tfiles:"",tkeys:"",twords:"",percent:"",outstanding:""
                         };
            const numberOfMeasuresRetrieved = 14;

            for (let k = 0; k < numberOfMeasuresRetrieved; k++) {
              for(let d = 0; d < responseMetrics.measures[k].history.length; d++) {
                if ( responseMetrics.measures[k].history[d].date === responseAnalyses.analyses[i].date ) {
                  //console.log(responseMetrics.measures[k].metric);
                  if (responseMetrics.measures[k].metric === "lngprt-lrm-status-total-source-files") {
                    result.files = responseMetrics.measures[k].history[d].value;
                  }else if (responseMetrics.measures[k].metric === "lngprt-lrm-status-total-source-keys") {
                    result.keys = responseMetrics.measures[k].history[d].value;
                  }else if (responseMetrics.measures[k].metric === "lngprt-lrm-status-last-version-num") {
                    result.versionnum = responseMetrics.measures[k].history[d].value;
                  }else if (responseMetrics.measures[k].metric === "lngprt-lrm-status-total-source-words") {
                    result.words = responseMetrics.measures[k].history[d].value;
                  }else if (responseMetrics.measures[k].metric === "lngprt-lrm-default-locale") {
                    result.d_local = responseMetrics.measures[k].history[d].value;
                  }else if (responseMetrics.measures[k].metric === "lngprt-lrm-status-non-base-locales-ids") {
                    result.ids = responseMetrics.measures[k].history[d].value;
                  }else if (responseMetrics.measures[k].metric === "lngprt-lrm-status-non-base-locales-display") {
                    result.display = responseMetrics.measures[k].history[d].value;
                  }else if (responseMetrics.measures[k].metric === "lngprt-lrm-num-files-to-translate-for-locales") {
                    result.tfiles = responseMetrics.measures[k].history[d].value;
                  }else if (responseMetrics.measures[k].metric === "lngprt-lrm-num-keys-to-translate-for-locales") {
                    result.tkeys = responseMetrics.measures[k].history[d].value;
                  }else if (responseMetrics.measures[k].metric === "lngprt-lrm-num-words-to-translate-for-locales") {
                    result.twords = responseMetrics.measures[k].history[d].value;
                  }else if (responseMetrics.measures[k].metric === "lngprt-lrm-percent-complete-for-locales") {
                    result.percent = responseMetrics.measures[k].history[d].value;
                  }else if (responseMetrics.measures[k].metric === "lngprt-lrm-is-outstanding-prepkits") {
                    result.outstanding = responseMetrics.measures[k].history[d].value;
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


export function findLrmProductivity(project) {

return getJSON('/api/project_analyses/search', {
  project: project.key,
  p: 1,
  ps: 500,
}).then(function (responseAnalyses) {
  const numberOfAnalyses = responseAnalyses.analyses.length;
  if (numberOfAnalyses > 0) {
    return getJSON('/api/measures/search_history', {
      component: project.key,
      metrics: "lngprt-lrm-status-total-source-files,lngprt-lrm-status-total-source-keys,lngprt-lrm-status-total-source-words,lngprt-lrm-status-last-version-num,lngprt-lrm-status-non-base-locales-ids,lngprt-lrm-status-non-base-locales-display,lngprt-lrm-default-locale,lngprt-lrm-num-words-per-day-for-locales,lngprt-lrm-num-words-to-translate-for-locales",
      ps: 1000
    }).then(function (responseMetrics) {
      var data = [];
      var numberOfVersions=0;

      for (let i = 0; i < numberOfAnalyses; i++) {
        let analysis = responseAnalyses.analyses[i];
        for (let j = 0; j < analysis.events.length; j++) {
          if (analysis.events[j].category === "VERSION") {
            let result = {version: analysis.events[j].name,
                          files: "0", keys: "", words: "0", versionnum: "",d_local:"",ids:"",display:"",numWordsToTranslate:"",twords:"",
                         };
            const numberOfMeasuresRetrieved = 9;

            for (let k = 0; k < numberOfMeasuresRetrieved; k++) {
              for(let d = 0; d < responseMetrics.measures[k].history.length; d++) {
                if ( responseMetrics.measures[k].history[d].date === responseAnalyses.analyses[i].date ) {
                  //console.log(responseMetrics.measures[k].metric);
                  if (responseMetrics.measures[k].metric === "lngprt-lrm-status-total-source-files") {
                    result.files = responseMetrics.measures[k].history[d].value;
                  }else if (responseMetrics.measures[k].metric === "lngprt-lrm-status-total-source-keys") {
                    result.keys = responseMetrics.measures[k].history[d].value;
                  }else if (responseMetrics.measures[k].metric === "lngprt-lrm-status-last-version-num") {
                    result.versionnum = responseMetrics.measures[k].history[d].value;
                  }else if (responseMetrics.measures[k].metric === "lngprt-lrm-status-total-source-words") {
                    result.words = responseMetrics.measures[k].history[d].value;
                  }else if (responseMetrics.measures[k].metric === "lngprt-lrm-default-locale") {
                    result.d_local = responseMetrics.measures[k].history[d].value;
                  }else if (responseMetrics.measures[k].metric === "lngprt-lrm-status-non-base-locales-ids") {
                    result.ids = responseMetrics.measures[k].history[d].value;
                  }else if (responseMetrics.measures[k].metric === "lngprt-lrm-status-non-base-locales-display") {
                    result.display = responseMetrics.measures[k].history[d].value;
                  }else if (responseMetrics.measures[k].metric === "lngprt-lrm-num-words-to-translate-for-locales") {
                    result.numWordsToTranslate = responseMetrics.measures[k].history[d].value;
                  }else if (responseMetrics.measures[k].metric === "lngprt-lrm-num-words-per-day-for-locales") {
                    result.twords = responseMetrics.measures[k].history[d].value;
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

export function findLrmHistory(project) {

return getJSON('/api/project_analyses/search', {
  project: project.key,
  p: 1,
  ps: 500,
}).then(function (responseAnalyses) {
  const numberOfAnalyses = responseAnalyses.analyses.length;
  if (numberOfAnalyses > 0) {
    return getJSON('/api/measures/search_history', {
      component: project.key,
      metrics: "lngprt-lrm-num-words-to-translate-for-locales,lngprt-lrm-num-files-to-translate-for-locales",
      ps: 1000
    }).then(function (responseMetrics) {
      var data = [];
      var numberOfVersions=0;
      let result = {
                    gdate: [],
                    words: [],
                    files: []
                   };
     const numberOfMeasuresRetrieved = 2;
     for (let k = 0; k < numberOfMeasuresRetrieved; k++) {
          for(let d = 0; d < responseMetrics.measures[k].history.length; d++) {
                result.gdate[d] = responseMetrics.measures[k].history[d].date;
                if (responseMetrics.measures[k].metric === "lngprt-lrm-num-words-to-translate-for-locales") {
                  result.words[d] = responseMetrics.measures[k].history[d].value;
                  if(result.words[d]  === undefined){
                    result.words[d] =0;
                  }else{
                    var word = result.words[d].split(";");
                    var tword = 0;
                    for(let d = 0; d < word.length; d++){
                      tword = Number(word[d])+Number(tword);
                    }
                    result.words[d] =tword;
                  }
                }else if (responseMetrics.measures[k].metric === "lngprt-lrm-num-files-to-translate-for-locales") {
                  result.files[d] = responseMetrics.measures[k].history[d].value;
                  if(result.files[d]  === undefined){
                      result.files[d] =0;
                    }else{
                      var file = result.files[d].split(";");
                      var tfile = 0;
                      for(let d = 0; d < file.length; d++){
                        tfile = Number(file[d])+Number(tfile);
                      }
                      result.files[d] =tfile;
                    }
                }

          }
            data[numberOfVersions] = result;
          //  numberOfVersions++;
      }
      //console.table(data);
      return data;
    });
  }
 });
}

export function findJenkinsURL() {
  return getJSON('/api/settings/values', {
  keys: "sonar.lrm.jenkins.url",
}).then(function (response) {
     return response.settings[0].value;
  });
}

export function findLate() {
  return getJSON('/api/settings/values', {
  keys: "sonar.lrm.prepkit.days.late.error",
}).then(function (response) {
     return response.settings[0].value;
  });
}

export function findWarn() {
  return getJSON('/api/settings/values', {
  keys: "sonar.lrm.prepkit.days.late.warning",
}).then(function (response) {
     return response.settings[0].value;
  });
}

export function findlplrmsummary(project) {

return getJSON('/api/project_analyses/search', {
  project: project.key,
  p: 1,
  ps: 500,
}).then(function (responseAnalyses) {
  const numberOfAnalyses = responseAnalyses.analyses.length;
  if (numberOfAnalyses > 0) {
    return getJSON('/api/measures/search_history', {
      component: project.key,
      metrics: "lngprt-lrm-status-total-source-files,lngprt-lrm-status-total-locales,lngprt-lrm-status-total-source-words,lngprt-lrm-status-last-send-date,lngprt-lrm-status-last-prep-date,lngprt-lrm-status-total-remaining-files,lngprt-lrm-status-total-remaining-words,lngprt-lrm-status-last-version-num,lngprt-lrm-status-avg-completion-percent,lngprt-lrm-status-maximum-days-to-complete,lngprt-lrm-status-locale-of-maximum-days,lngprt-lrm-default-locale",
      ps: 1000
    }).then(function (responseMetrics) {
      var data = [];
      var numberOfVersions=0;

      for (let i = 0; i < numberOfAnalyses; i++) {
        let analysis = responseAnalyses.analyses[i];
        for (let j = 0; j < analysis.events.length; j++) {
          if (analysis.events[j].category === "VERSION") {
            let result = {version: analysis.events[j].name,
                          nbfilesMSR: "",
                          nblocalesMSR:"",
                          nbwordsMSR:"",
                          lastSendMSR:"",
                          lastPrepMSR:"",
                          totalRemainingFilesMSR:"",
                          totalRemainingWordsMSR:"",
                          versionNumMSR:"",
                          avgCompleteMSR:"",
                          longestDaysToCompleteMSR:"",
                          longestLocaleToCompleteMSR:"",
                          dfltLocaleMSR:"",
                          project:project.key
                         };
            const numberOfMeasuresRetrieved = 12;

            for (let k = 0; k < numberOfMeasuresRetrieved; k++) {
              for(let d = 0; d < responseMetrics.measures[k].history.length; d++) {
                if ( responseMetrics.measures[k].history[d].date === responseAnalyses.analyses[i].date ) {
                  //console.log(responseMetrics.measures[k].metric);
                  if (responseMetrics.measures[k].metric === "lngprt-lrm-default-locale") {
                    result.dfltLocaleMSR = responseMetrics.measures[k].history[d].value;
                  }else if (responseMetrics.measures[k].metric === "lngprt-lrm-status-total-source-files") {
                      result.nbfilesMSR = responseMetrics.measures[k].history[d].value;
                  }else if (responseMetrics.measures[k].metric === "lngprt-lrm-status-total-source-words") {
                      result.nbwordsMSR = responseMetrics.measures[k].history[d].value;
                  }else if (responseMetrics.measures[k].metric === "lngprt-lrm-status-total-locales") {
                      result.nblocalesMSR = responseMetrics.measures[k].history[d].value;
                  }else if (responseMetrics.measures[k].metric === "lngprt-lrm-status-avg-completion-percent") {
                      result.avgCompleteMSR = responseMetrics.measures[k].history[d].value;
                  }else if (responseMetrics.measures[k].metric === "lngprt-lrm-status-last-version-num") {
                      result.versionNumMSR = responseMetrics.measures[k].history[d].value;
                  }else if (responseMetrics.measures[k].metric === "lngprt-lrm-status-last-send-date") {
                      result.lastSendMSR = responseMetrics.measures[k].history[d].value;
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

export function findlrmDueDate(project) {

return getJSON('/api/project_analyses/search', {
  project: project.key,
  p: 1,
  ps: 500,
}).then(function (responseAnalyses) {
  const numberOfAnalyses = responseAnalyses.analyses.length;
  if (numberOfAnalyses > 0) {
    return getJSON('/api/measures/search_history', {
      component: project.key,
      metrics: "lngprt-lrm-kit-status-locale-ids,lngprt-lrm-kit-status-version-numbers,lngprt-lrm-kit-status-sent-dates,lngprt-lrm-kit-status-due-dates,lngprt-lrm-num-of-files-in-prep-kit,lngprt-lrm-num-of-words-in-prep-kit,lngprt-lrm-kit-status-days-late,lngprt-lrm-kit-status-locale-names",
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
                          versionMSR:"",
                          sentDatesMSR:"",
                          dueDatesMSR:"",
                          numFilesMSR:"",
                          numWordsMSR:"",
                          daysLateMSR:"",
                          displayNameMSR:"",
                          project:project.key
                         };
            const numberOfMeasuresRetrieved = 8;

            for (let k = 0; k < numberOfMeasuresRetrieved; k++) {
              for(let d = 0; d < responseMetrics.measures[k].history.length; d++) {
                if ( responseMetrics.measures[k].history[d].date === responseAnalyses.analyses[i].date ) {
                  //console.log(responseMetrics.measures[k].metric);
                  if (responseMetrics.measures[k].metric === "lngprt-lrm-kit-status-locale-ids") {
                    result.localeMSR = responseMetrics.measures[k].history[d].value;
                  }else if (responseMetrics.measures[k].metric === "lngprt-lrm-kit-status-version-numbers") {
                      result.versionMSR = responseMetrics.measures[k].history[d].value;
                  }else if (responseMetrics.measures[k].metric === "lngprt-lrm-kit-status-sent-dates") {
                      result.sentDatesMSR = responseMetrics.measures[k].history[d].value;
                  }else if (responseMetrics.measures[k].metric === "lngprt-lrm-kit-status-due-dates") {
                      result.dueDatesMSR = responseMetrics.measures[k].history[d].value;
                  }else if (responseMetrics.measures[k].metric === "lngprt-lrm-num-of-files-in-prep-kit") {
                      result.numFilesMSR = responseMetrics.measures[k].history[d].value;
                  }else if (responseMetrics.measures[k].metric === "lngprt-lrm-num-of-words-in-prep-kit") {
                      result.numWordsMSR = responseMetrics.measures[k].history[d].value;
                  }else if (responseMetrics.measures[k].metric === "lngprt-lrm-kit-status-days-late") {
                      result.daysLateMSR = responseMetrics.measures[k].history[d].value;
                  }else if (responseMetrics.measures[k].metric === "lngprt-lrm-kit-status-locale-names") {
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
      return data;
    });
  }
 });
}

export function findgzLrmHistory(project) {

return getJSON('/api/project_analyses/search', {
  project: project.key,
  p: 1,
  ps: 500,
}).then(function (responseAnalyses) {
  const numberOfAnalyses = responseAnalyses.analyses.length;
  if (numberOfAnalyses > 0) {
    return getJSON('/api/measures/search_history', {
      component: project.key,
      metrics: "lngprt-lrm-status-total-remaining-words,lngprt-gyzr-violations",
      ps: 1000
    }).then(function (responseMetrics) {
      var data = [];
      var numberOfVersions=0;
      let result = {
                    gdate: [],
                    lrm: [],
                    gz: []
                   };
     const numberOfMeasuresRetrieved = 2;
     for (let k = 0; k < numberOfMeasuresRetrieved; k++) {
          for(let d = 0; d < responseMetrics.measures[k].history.length; d++) {
                if (responseMetrics.measures[k].metric === "lngprt-lrm-status-total-remaining-words") {
                  result.lrm[d] = Number(responseMetrics.measures[k].history[d].value);
                  if(result.lrm[d]===undefined) result.lrm[d] = 0;
                }else if (responseMetrics.measures[k].metric === "lngprt-gyzr-violations") {
                  result.gz[d] = Number(responseMetrics.measures[k].history[d].value);
                  if(result.gz[d]===undefined) result.gz[d]=0;
                  result.gdate[d] = responseMetrics.measures[k].history[d].date;
                }

          }
            data[numberOfVersions] = result;
      }
      return data;
    });
  }
 });
}
