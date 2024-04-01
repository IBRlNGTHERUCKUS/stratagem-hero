import data from "./stratagem-bank.js";
console.log(data.stratagems[0]);
class Stratagem {
    constructor(name, sequence, iconAddress) {
        this.sequence = sequence;
        this.name = name;
        this.iconAddress = iconAddress;
    }
    getSequenceInput(index) {
        return this.sequence[index];
     }
    getPointValue() {
        return this.sequence.length * 50;
    }
}

function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

class Timer {
  constructor(limit) {
    this.initial = null; // seconds
    this.limit = limit;
  }
  startTimer() {
    const temp = new Date();
    this.initial = temp.getTime()/1000;
    //console.log(`initial: ${this.initial}`);
  }
  getRemaining() {
    if (this.initial==null) {  //If the timer has not been started
        return this.limit;
    }
    const temp = new Date();
    let elapsed = temp.getTime()/1000 - this.initial; 
    return (elapsed > this.limit) ? 0 : this.limit - elapsed;
   }
   isExpired() {
    return this.getRemaining() == 0 ? true : false;
   
   }
}

class GameController {
    constructor() {
        this.stratagemList = this.getRandomStratagems(4); 
        this.currentStratagem = this.stratagemList.shift();
        this.index = 0; // The index within the stratagem sequence
        this.score = 0; 
        this.called=0;
        this.mistakes=0;
        this.isStarted = false;
        this.timeLimit = 30;  //seconds
        this.timer = new Timer(this.timeLimit);

    }
    getRandomStratagems(amount) {
        let list = [];
        for (let i = 0; i<amount; i++) { 
            let randomNum = getRandomInt(0, data.stratagems.length)
            let randomStrat = data.stratagems[randomNum];
            let temp = new Stratagem(randomStrat.name,
            randomStrat.sequence, randomStrat.iconAddress)
            list.push(temp);
        }
        return list
    }
    incrimentScore(value) {
        this.score += value;
        console.log(this.score);
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
        this.currentStratagem = this.stratagemList.shift(); 
    }
    checkComplete() {
        if (this.index+1 > this.currentStratagem.sequence.length) {
            console.log('Stratagem is complete!');
            return true;
        }
    }
} 
let activeGame = new GameController();

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
    generateSummary: function() {
      const temp = document.querySelector("#summary");
      const clone = temp.content.cloneNode(true);
      document.querySelector('body').append(clone);
      // Populate summary data
      document.querySelector('#stratagems-called').textContent = activeGame.called;
      document.querySelector('#points-earned').textContent = activeGame.score;
      document.querySelector('#mistakes-made').textContent = activeGame.mistakes;
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
     flashPointsPopup: function(pointsEarned) {
        const body = document.querySelector('body')
        const pointsPopupEl = document.createElement('div');
        pointsPopupEl.classList.add('points-popup');
        const pointsEl = document.createElement('h1');
        pointsEl.textContent = `+${pointsEarned}`;
        if (pointsEarned <= 200) {
            pointsEl.classList.add('low')
        }
        else if (pointsEarned < 300) {
            pointsEl.classList.add('medium')
        }
        else if (pointsEarned >= 300) {
            pointsEl.classList.add('high')
        }

        pointsPopupEl.append(pointsEl);
        body.append(pointsPopupEl);
        // Remove the popup after a delay
        setTimeout(()=>{
            pointsPopupEl.remove();
        }, 300)
        
       
     },
     clearCurrentStratagem: function() {
        const currentStratagemEl = document.querySelector(".current-stratagem");
        while(currentStratagemEl.firstChild) {
            currentStratagemEl.removeChild(currentStratagemEl.firstChild);
       }
     },
     updateScore(newScore) {
        const scoreEl =  document.querySelector(".score");
        scoreEl.textContent = newScore;
     },
     updateTimer(newTime) {
      const timeEl = document.querySelector(".time");
      timeEl.textContent = newTime.toFixed(2);
     },
    updateSummary() {
        document.querySelector('#stratagems-called').textContent = activeGame.called;
        document.querySelector('#points-earned').textContent = activeGame.score;
        document.querySelector('#mistakes-made').textContent = activeGame.mistakes;
     },
     update: function() {
         this.clearStratagemQueue();
         this.clearCurrentStratagem();
         this.generateStratagemQueue();
         this.generateCurrentStratagem();
     }
}

//*******    gameloop    ***********//
DOMstuff.update();
function handleKeydown(e) {
    // start the timer on the first loop
    if (!activeGame.isStarted) {
      activeGame.timer.startTimer();
      activeGame.isStarted = true;
    }
    
    if (activeGame.timer.isExpired() ){
      console.log("game over")
      return; //Do nothing if timer is expired
    }   
    
    if ( activeGame.checkMatch(e.key) ) {
        // When the key pressed matches the next sequence input
        DOMstuff.markInputCorrect(activeGame.index);
        activeGame.index++;
        if (activeGame.checkComplete()) {
            // When a stratagem has successfully been inputted
            const pointsEarned = activeGame.currentStratagem.getPointValue();
            activeGame.incrimentScore(pointsEarned);
            activeGame.called++;
            activeGame.index = 0;
            activeGame.nextStratagem();
            activeGame.stratagemList.push(activeGame.getRandomStratagems(1)[0]);
            DOMstuff.flashPointsPopup(pointsEarned)
            DOMstuff.updateScore(activeGame.score);
            DOMstuff.updateSummary();
            DOMstuff.update();
            }
        }
    else {
        // When the wrong key is pressed
        activeGame.index = 0;
        activeGame.mistakes++;
        DOMstuff.markSequenceNeutral;
        DOMstuff.updateSummary();
        DOMstuff.update();
        }     
}
DOMstuff.flashPointsPopup(300);
//***************Monitor game timer*****************//
setInterval(()=>{
    DOMstuff.updateTimer(activeGame.timer.getRemaining())
    if (activeGame.timer.isExpired()) {
        document.querySelector('.container-outer').classList.remove('hidden');
    }
}, 100)


// button support for mobile
const dBox = document.querySelector(".d-box");
for(let btn of dBox.children) {
   btn.addEventListener('dblclick', function(el) {
  el.preventDefault();
});
   btn.addEventListener("mousedown", (e) => { 
   let direction = e.target.dataset.key;
   document.dispatchEvent(new KeyboardEvent('keydown', {'key': `${direction}`}));
   })
}

document.addEventListener("keydown", handleKeydown) 

//******Logic for restarting game **********/
document.querySelector(".try-again").addEventListener("click", ()=> {
  activeGame = new GameController();
  document.querySelector('.container-outer').classList.add('hidden');
  DOMstuff.update();
  DOMstuff.updateScore(0);
} )
