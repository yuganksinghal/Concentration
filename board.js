class GameBoard extends HTMLElement {
    constructor () {
        super();
        this.flipped = [];
        this.completed = [];
        this.lock = false;
        this.addEventListener('revealCard', e => this.handleCardReveal(e));
    }

    initGame() {
        let takenValues = [];
        let proposedValues = [];
        for (let i=0; i<16; i++) {
            let newCard = document.createElement("game-card");
            let cardValue = this.createValue(takenValues, proposedValues);
            let proposedCardIndex = proposedValues.indexOf(cardValue);
            if (proposedCardIndex > -1) {
                proposedValues.splice(proposedCardIndex, 1);
                takenValues.push(cardValue);
            } else {
                proposedValues.push(cardValue);
            }
            newCard.setAttribute("value", cardValue)
            this.appendChild(newCard);
        }
    }

    createValue(takenValues, proposedValues) {
        let pv = Math.floor(Math.random() * 8);
        if (takenValues.indexOf(pv) > -1) {
            return this.createValue(takenValues, proposedValues)
        } else if (proposedValues.length == 8) {
            return proposedValues[pv];
        }
        return pv;
    }

    handleCardReveal(e) {
        if (this.completed.indexOf(e.detail.value) > -1) return;
        this.flipped.push(e.detail.card);
        if (this.flipped.length % 2 == 0) {
            this.checkCards()
        } 
        
    }

    checkCards() {
        if (!this.lock){
            this.lock = true;
            if (this.flipped[0].value === this.flipped[1].value) {
                this.match();
            } else {
                setTimeout(() => this.reject(), 1500);
            }
        } else {
            setTimeout(() => this.checkCards(), 100);   
        }
    }

    match() {
        this.completed.push(this.flipped[0].value);
        this.flipped.splice(0,2);
        this.lock = false;
    }

    reject() {
        this.flipped[0].flipClose();
        this.flipped[1].flipClose();
        this.flipped.splice(0,2);
        this.lock = false;
    }

    connectedCallback() {
        this.initGame()
    }
    
}

window.customElements.define('game-board', GameBoard)