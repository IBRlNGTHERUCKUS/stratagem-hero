class Stratagem {
    constructor(name, sequence) {
    this.sequence = sequence;
    this.name = name;
    }
    getSequenceInput(index) {
    return sequence[index];
     }
}
const demoList = [new Stratagem("Orbital Airburst", ["right", "right", "right"] )]

const GameStuff = {
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
        currentStratagem = stratagems.pop(); ppl
        
        
    },
}

GameStuff.currentStratagem = GameStuff.stratagems[0];


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