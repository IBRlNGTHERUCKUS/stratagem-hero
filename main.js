class Stratagem {
    constructor(name, sequence) {
        this.sequence = sequence;
        this.name = name;
    }
    getSequenceInput(index) {
        return this.sequence[index];
     }
}
const demoList = [new Stratagem("Orbital Airburst", ["right", "right", "right"] )]

/* const GameStuff = {
    index: 0,
    stratagems: demoList,
    checkMatch: function(keyPressed) {
        if (keyPressed ==  currentStratagem.getSequenceInput(index)) {
                return True;
        }
        else {
                return False;
        }
    },
    checkComplete: function() {
        return (index > currentStratagem.length + 1)
    },
    nextStratagem: function() {
        currentStratagem = stratagems.pop(); 
        }
    }
} 
        
      */
    

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
            return false
        } 
    } 
}

const test = new GameController(demoList);
console.log(test.currentStratagem);
console.log(test.checkMatch("right"));
console.log(test.checkMatch("left"));


function handleKeypress(e) {
    if (GameStuff.checkMatch(e) ) {
         GameStuff.index++;
        if (GameStuff.checkComplete()) {
            GameStuff.index = 0;
            GameStuff.nextStratagem();
            }
    else {
         GameStuff.index = 0;
        }     
    }
}
//document.querySelector("body").addEventListener("click", (e)=>{console.log(e) })