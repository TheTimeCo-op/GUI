let JobCardComponent = require('./jobCardComponent.js')


class JobsComponent {

  constructor(http, util, $, moment) {
    this.http = http;
    this.util = util;
    this.$ = $;
    this.moment = moment;
  }

  /**
   * Render
   * 
   * @description Render is a simple way to keep html pertaining to the component within the class. 
   *              It calls renderHtml, passing in the html to be rendered
   */
  render() {
    this.renderHtml(
        `<div class='row center-align'></div>
         <div class="row">
            <div id="jobs"></div>
         </div>`
    )
  }

  /**
   * Render Html
   * 
   * @description Sets the html in the #main div
   * @param html 
   */
  renderHtml(html) {
    this.$.grabById('main').innerHTML = html
  }

  /**
   * Get Jobs
   * 
   * @description utilizes the http serverCalls file to make a request that returns all jobs.
   *              It then renders the Job Card component and adds it to the #jobs element
   */
  getJobs() {
    this.http.get('http://localhost:9001/', (data) => {
      let response = this.util.parse(data.response)
      // currentWeekTime = response.total_time
      let card = new JobCardComponent(response.jobs)
      let renderedHtml = card.render()
      this.$.grabById('jobs').innerHTML = renderedHtml
    })
  }

  /**
   * Listen
   * 
   * @description All event logic / DOM manipulation goes here
   */
  listen() {
    let baseUrl = 'http://localhost:9001'

    this.$.on("click", ".clock-in-btn", (event) => {
      let targetElm = event.target
      let id = this.$.grabAttr('jobid')
      let time = this.moment().format()
      

      let params = {
        jobId: id,
        time: time
      }

      this.http.post(`${baseUrl}/time/clockIn`, params, (data) => {
        let response = this.util.parse(data.response)

        if(response.success) {
          let sibling = this.$.grabNextSibling('clock-out-btn', event)

          this.$.setAttr(sibling, 'timeId', response.timeId)
          targetElm.style.display = 'none'
          sibling.style.display = 'inline-block'
        }
      })
    });
  
    this.$.on("click", ".clock-out-btn", (event) => {
      let targetElm = event.target
      let id = this.$.grabAttr('timeId')
      let time = this.moment().format()

      let params = {
        timeId: id,
        time: time
      }

      this.http.put(`${baseUrl}/time/clockOut`, params, (data) => {
        let response = this.util.parse(data.response)

        if(response.success) {
          targetElm.style.display = 'none'
          this.$.grabPreviousSibling('clock-in-btn', event).style.display = 'inline-block'
        }
      })
    })
  }

}

module.exports = JobsComponent