class GameBoard extends HTMLElement {
    constructor () {
        super();
        this.flipped = [];
        this.cards = []
    }

    initGame() {}

    connectedCallback() {
    }
    
}

window.customElements.define('game-board', GameCard)