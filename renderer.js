
//-----------------------{ Library }-----------------------//
let http = require('./assets/js_Library/serverCalls.js')
let util = require('./assets/js_Library/utilities.js')
let $ = require('./assets/js_Library/eventHandlers.js')
let moment = require('./vendor/moment.js')

//-----------------------{ Components }-----------------------//
let JobsComponent = require('./components/jobs/jobsComponent.js');
let jobs = new JobsComponent(http, util, $, moment)

//-----------------------{ Rendering }-----------------------//
// Initial load
jobs.render()
jobs.getJobs()
jobs.listen()

// Load other components on button click
//
// EXAMPLE:
//
// $.on('click', 'addJob', (event) => {
//    addJob.render()
//    addJob.listen()
// })


/**
 * Update Current Time
 * 
 * @description This function will update the html every time it's called to update the time
 */
let updateCurrentTime = () => {
  $.grabById('currentTime').innerHTML = moment().format('h:mm')
  $.grabById('currentSeconds').innerHTML = moment().format(':ss a')
}

setInterval(
  function() {
    updateCurrentTime()
  }, 1000)


