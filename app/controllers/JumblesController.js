import { AppState } from "../AppState.js";
import { jumblesService } from "../services/JumblesService.js";
import { Pop } from "../utils/Pop.js";
import { setHTML } from "../utils/Writer.js";


function _focusCursorIntoJumbleTextArea() {
    document.getElementById('jumble-area').focus()
}

export class JumblesController {
    constructor() {
        console.log("🍍🐒");
        this.drawJumblesList()
        // this.drawActiveJumble() don't want to draw on load, when and active is null, unless you have some sort of placeholder
        AppState.on('activeJumble', this.drawActiveJumble)
        AppState.on('jumbles', this.drawJumblesList)
    }

    drawJumblesList() {
        const jumbles = AppState.jumbles
        let jumbleListContent = '' // ? are you drawing many things?
        jumbles.forEach(jumble => jumbleListContent += jumble.ListTemplate)
        setHTML('jumbles-list', jumbleListContent)
    }

    drawActiveJumble() {
        console.log('drawing Active');
        const activeJumble = AppState.activeJumble
        setHTML('active-jumble', activeJumble.ActiveJumbleTemplate)
        _focusCursorIntoJumbleTextArea() // cannot be in the class call because it looses scope inside the listener
    }

    setActiveJumble(jumbleId) {
        console.log('setting active', jumbleId); //🧪 can you invoke this function
        jumblesService.setActiveJumble(jumbleId)
    }

    submitJumble() {
        try {
            event.preventDefault()
            console.log('form submitted');
            const form = event.target
            const newBody = form.body.value
            console.log('✨', form, newBody);
            jumblesService.checkJumbleBody(newBody)
            Pop.toast('You Win!', 'success', 'center')
        } catch (error) {
            Pop.toast(error.message, 'error', 'center')
        }
    }

}