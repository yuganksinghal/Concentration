class GameBoard extends HTMLElement {
    constructor () {
        super();
        this.flipped = [];
        this.cards = []
    }

    initGame() {
        for (let i=0; i<16; i++) {
            let newCard = document.createElement("game-card");
            this.appendChild(newCard);
        }
    }

    connectedCallback() {
        this.initGame()
    }
    
}

window.customElements.define('game-board', GameBoard)