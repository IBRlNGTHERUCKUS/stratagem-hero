class Stratagem {
    constructor(name, sequence, iconAddress) {
        this.sequence = sequence;
        this.name = name;
        this.iconAddress = iconAddress;
    }
    getSequenceInput(index) {
        return this.sequence[index];
     }
}
const demoList = [
    new Stratagem("Orbital Airburst", ["ArrowRight", "ArrowRight", "ArrowRight"], "./images/Orbital Airburst Strike.svg"),
    new Stratagem("Orbital Strike", ["ArrowDown", "ArrowRight", "ArrowRight"], "./images/Orbital Airburst Strike.svg"),
    new Stratagem("Orbital Strike", ["ArrowDown", "ArrowRight", "ArrowRight"], "./images/Orbital Airburst Strike.svg")
]

class GameController {
    constructor(stratagemList) {
        this.stratagemList = stratagemList; 
        this.currentStratagem = this.stratagemList.pop();
        this.index = 0;
    }
    checkMatch(key) {
        if (key == this.currentStratagem.getSequenceInput(this.index)) {
            return true;
        }
        else {
            return false;
        }
    }
    nextStratagem() {
        this.currentStratagem = this.stratagemList.pop(); 
    }
    checkComplete() {
        if (this.index+1 > this.currentStratagem.sequence.length) {
            console.log('Stratagem is complete!');
            return true;
        }
    }
} 
const activeGame = new GameController(demoList);

const DOMstuff = {
    generateStratagemQueue: function() {
        const stratagemQueueEl = document.querySelector('.stratagem-queue');
        for (let stratagem of activeGame.stratagemList) {
            const imgEl = document.createElement('img');
            imgEl.classList.add('stratagem-icon');
            imgEl.src = stratagem.iconAddress;
            stratagemQueueEl.append(imgEl);
        }
    },
    generateCurrentStratagem: function() {
        const currentStratagemEl = document.querySelector('.current-stratagem');
    },
    markInputCorrect: function(index) {
        const sequenceEl = document.querySelector('.sequence');
        const targetInput = sequenceEl.children.item(index);
        targetInput.querySelector('path').classList.add('correct');
    }
}
DOMstuff.generateStratagemQueue();

function handleKeydown(e) {
    if (activeGame.checkMatch(e.key) ) {
        // When the key pressed matches the next sequence input
        console.log("Correct input");
        DOMstuff.markInputCorrect(activeGame.index);
        activeGame.index++;
        if (activeGame.checkComplete()) {
            // When a stratagem has successfully been inputted
            activeGame.index = 0;
            activeGame.nextStratagem();
            }
        }
    else {
        // When the wrong key is pressed
        activeGame.index = 0;
        console.log("Incorrect input");
        }     
    
}

document.addEventListener("keydown", handleKeydown)