class GameCard extends HTMLElement {
    constructor () {
        super();
        this.flip = false;
        this.root = null;
    }

    connectedCallback() {
        this.root = document.createElement('div');
        let front = document.createElement('div');
        front.classList.add('front');
        let back = document.createElement('div')
        back.classList.add('back');
        this.root.classList.add('card');
        this.root.appendChild(front);
        this.root.appendChild(back);
        this.appendChild(this.root);
    }

    flipOpen() {
        this.flip = true;
        this.root.classList.add("flipped")
    }
    
    flipClose() {
        this.flip = false;
        this.root.classList.remove("flipped")
    }

    flip() {
        this.flip = !this.flip;
        this.getRootNode.classList.toggle("flipped")
    }
    
}

window.customElements.define('game-card', GameCard)