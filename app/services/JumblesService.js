import { AppState } from "../AppState.js";



class JumblesService {
    setActiveJumble(jumbleId) {
        console.log('set Active Service', jumbleId); // 🧪
        const selectedJumble = AppState.jumbles.find(jumble => jumble.id == jumbleId)
        console.log('🐒', selectedJumble); // 🧪 did it select the correct one?
        selectedJumble.startTime = new Date() // gets the time of RIGHT NOW!
        AppState.activeJumble = selectedJumble
        console.log('appstate active', AppState.activeJumble);
    }

    checkJumbleBody(newBody) {
        const activeJumble = AppState.activeJumble
        if (activeJumble.body != newBody) throw new Error('You got Jumbled Sucka!')

        activeJumble.endTime = new Date() // if we got it right, the set endtime
        // logic for fastest time?
        let elapsedTime = (activeJumble.endTime - activeJumble.startTime)

        if (activeJumble.fastestTime > elapsedTime) {
            activeJumble.fastestTime = elapsedTime
        }
        console.log('⏱️', activeJumble, elapsedTime);
        // NOTE active jumble technically didn't change, it's inner content did so to make it redraw we can use emit
        AppState.emit('activeJumble') //emit forces all listeners on this event to run
        AppState.emit('jumbles')
    }
}

export const jumblesService = new JumblesService()