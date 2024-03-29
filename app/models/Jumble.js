
import { generateId } from "../utils/GenerateId.js"

export class Jumble {
    constructor(data) {
        this.id = generateId()
        this.name = data.name
        this.body = data.body
        // to best keep track of the fastest times you might want these properties too! They would start null cause no one has completed these yet.
        this.fastestTime = Infinity
        this.startTime = null
        this.endTime = null
    }

    get ListTemplate() { // a basic list template to get drawing
        return `<button class="p-2 fs-4 mb-2" onclick="app.JumblesController.setActiveJumble('${this.id}')">${this.name} ${this.FastestTimeTemplate}</button>`
    }

    get ActiveJumbleTemplate() {
        return `
<div class="card my-2 p-4">
  <h4>${this.name}</h4>
  <h5>${this.FastestTimeTemplate}</h5>
  <p class="fs-5 my-2">${this.body}</p>
  <form onsubmit="app.JumblesController.submitJumble()">
    <textarea id="jumble-area" name="body" class="form-control" rows="10"></textarea>
    <button class="w-100 p-4"> Submit </button>
  </form>
</div>
`
    }

    get FastestTimeTemplate() {
        if (this.fastestTime == Infinity) {
            return '⏱️ N/A'
        }
        return `⏱️ ${(this.fastestTime / 1000).toFixed(4)}`
    }
}
