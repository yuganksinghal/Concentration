class GameCard extends HTMLElement {
    constructor () {
        super();
        this.flip = false;
        this.root = null;
        this.value = null;
        this.addEventListener('click', () => this.revealCard());
    }
    
    connectedCallback() {
        this.value = this.getAttribute('value');
        this.root = document.createElement('div');
        let front = document.createElement('div');
        front.classList.add('front');
        let back = document.createElement('div');
        back.classList.add('back');
        let cardValue= document.createElement('div');
        cardValue.classList.add('value');
        cardValue.innerHTML = this.value;
        back.appendChild(cardValue);
        this.root.classList.add('card');
        this.root.appendChild(front);
        this.root.appendChild(back);
        this.appendChild(this.root);
    }

    revealCard() {
        this.flipOpen();
        console.log('reveal');
        this.dispatchEvent(new CustomEvent('revealCard', {
            bubbles: true, 
            detail: { 
                value: this.value, 
                card: this
            }
        }));
    }

    flipOpen() {
        this.flip = true;
        this.root.classList.add("flipped");
    }
    
    flipClose() {
        this.flip = false;
        this.root.classList.remove("flipped");
    }

    flipCard() {
        this.flip = !this.flip;
        this.root.classList.toggle("flipped")
    }
    
}

window.customElements.define('game-card', GameCard)