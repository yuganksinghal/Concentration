const symbols= [0, 1, 2, 3, 4, 5, 6, 7]

class GameBoard extends HTMLElement {
    constructor () {
        super();
        this.flipped = [];
        this.completed = [];
        this.addEventListener('revealCard', e => this.handleCardReveal(e));
    }

    initGame() {
        for (let i=0; i<16; i++) {
            let newCard = document.createElement("game-card");
            newCard.setAttribute("value", i%8)
            this.appendChild(newCard);
        }
    }

    handleCardReveal(e) {
        if (this.completed.indexOf(e.detail.value) > -1) return;
        this.flipped.push(e.detail.card);
        if (this.flipped.length > 1) {
            if (this.flipped[0].value === this.flipped[1].value) {
                this.completed.push(this.flipped[0].value);
                this.flipped.pop();
                this.flipped.pop();
            } else {
                setTimeout(() => {
                    this.flipped[0].flipClose();
                    this.flipped[1].flipClose();
                    this.flipped.pop();
                    this.flipped.pop();
                }, 1500);
            }
        } 
    }

    connectedCallback() {
        this.initGame()
    }
    
}

window.customElements.define('game-board', GameBoard)