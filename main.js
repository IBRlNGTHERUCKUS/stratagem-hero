import data from "./stratagem-bank.js";
console.log(data);
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
    new Stratagem("Orbital Airburst4", ["ArrowRight", "ArrowRight", "ArrowRight"], "./images/Orbital Airburst Strike.svg"),
    new Stratagem("Orbital Strike3", ["ArrowDown", "ArrowRight", "ArrowRight"], "./images/Orbital Airburst Strike.svg"),
    new Stratagem("Orbital Strike2", ["ArrowDown", "ArrowRight", "ArrowRight"], "./images/Orbital Airburst Strike.svg"),
    new Stratagem("Orbital Strike1", ["ArrowRight", "ArrowRight", "ArrowRight"], "./images/Orbital Airburst Strike.svg")
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
        const currentObj = activeGame.currentStratagem
        const currentStratagemEl = document.querySelector('.current-stratagem');
        // Generate the stratagem Icon
        const currentIconEl = document.createElement("img");
        currentIconEl.src = currentObj.iconAddress;
        currentIconEl.classList.add("stratagem-icon");
        // Generate the stratagem name
        const currentNameEl = document.createElement("div");
        currentNameEl.classList.add("stratagem-name");
        currentNameEl.textContent = currentObj.name;
        // Generate the sequence
        const sequenceEl = document.createElement("div");
        sequenceEl.classList.add("sequence");
        // Generate the inputs
        for (let input of currentObj.sequence) {
            sequenceEl.append(this.getClonedArrow(input))   //???
        }
        // Piece it all together
        currentStratagemEl.append(currentIconEl, currentNameEl, sequenceEl);
    },
    markInputCorrect: function(index) {
        const sequenceEl = document.querySelector('.sequence');
        const targetInput = sequenceEl.children.item(index);
        targetInput.querySelector('path').classList.add('correct');
    },
     markSequenceNeutral: function() {
        const sequenceEl = document.querySelector('.sequence');
        for (let input of sequenceEl.children) {
            input.classList.remove("correct");
            input.classList.add("neutral");
            }
     },
     getClonedArrow: function(direction) {
        let temp = document.querySelector(`#${direction}`)
        return temp.content.cloneNode(true);
     },
     clearStratagemQueue: function() {
        const stratagemQueueEl = document.querySelector(".stratagem-queue"); 
        while(stratagemQueueEl.firstChild) {
            stratagemQueueEl.removeChild(stratagemQueueEl.firstChild);
            }
     },
     clearCurrentStratagem: function() {
        const currentStratagemEl = document.querySelector(".current-stratagem");
        while(currentStratagemEl.firstChild) {
            currentStratagemEl.removeChild(currentStratagemEl.firstChild);
       }
     },
     update: function() {
         this.clearStratagemQueue();
         this.clearCurrentStratagem();
         this.generateStratagemQueue();
         this.generateCurrentStratagem();
     }
}

DOMstuff.update();

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
            DOMstuff.update()
            }
        }
    else {
        // When the wrong key is pressed
        activeGame.index = 0;
        console.log("Incorrect input");
        DOMstuff.markSequenceNeutral;
        }     
    
}

document.addEventListener("keydown", handleKeydown)
document.querySelector("button").addEventListener("click",
()=>{activeGame.nextStratagem(); 
DOMstuff.update()}) 