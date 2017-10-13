class JobCardComponent {
  
  constructor(dataGroup){
    this.dataGroup = dataGroup
  }

  /**
   * Render
   * 
   * @description Render is a simple way to keep html pertaining to the component within the class. 
   *              It calls renderHtml, passing in the html to be rendered
   */
  render() {
    this.renderHtml()
  }

  /**
   * Render Html
   * 
   * @description Sets the html in the #main div
   * @param html 
   */
  renderHtml() {
    let finalHtml = '<div>';
    for (var i = 0; i < this.dataGroup.length; i++) {
      finalHtml += `<div id="job-${this.dataGroup[i].id}">
                      <h4>${this.dataGroup[i].name}</h4>
                      <button class="btn clock-in-btn" jobId=${this.dataGroup[i].id}>Clock In</button>
                      <button class="btn clock-out-btn" jobId=${this.dataGroup[i].id}>Clock Out</button>
                    </div>`

    }
    finalHtml += '</div>'
    return finalHtml
  }


}

module.exports = JobCardComponent