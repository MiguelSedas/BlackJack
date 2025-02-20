class Blackjack {
    constructor() {
        this.dealerSum = 0;
        this.playerSum = 0;
        this.dealerAceCount = 0;
        this.playerAceCount = 0;
        this.hidden;
        this.deck = [];
        this.canHit = true;
        this.dealerCards = [];
        this.playerCards = [];
    }

    newDeck() {
        const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
        const types = ["♣", "♥", "♦", "♠"];
        this.deck = [];

        for (let i = 0; i < types.length; i++) {
            for (let j = 0; j < values.length; j++) {
                this.deck.push(values[j] + "-" + types[i]);
            }
        }
        console.log(this.deck);
    }

    shuffle() {
        for (let i = 0; i < this.deck.length; i++) {
            let j = Math.floor(Math.random() * this.deck.length);
            let temp = this.deck[i];
            this.deck[i] = this.deck[j];
            this.deck[j] = temp;
        }
        console.log(this.deck);
    }

    getCardsValue(card) {
        let data = card.split("-");
        let value = data[0];

        if (isNaN(value)) {
            if (value == "A") {
                return 11;
            }
            return 10;
        } else {
            return parseInt(value);
        }
    }

    checkAce(card) {
        if (card[0] == "A") {
            return 1;
        }
        return 0;
    }

    player_Move() {
        if (this.canHit) {
            const card = this.deck.pop();
            this.playerCards.push(card);
            const cardValue = this.getCardsValue(card);

            this.playerSum += cardValue;
            this.playerAceCount += this.checkAce(card);

            if (this.playerSum > 25 && this.playerAceCount > 0) {
                this.playerSum -= 10;
                this.playerAceCount--;
            }
        }
        return this.get_game_state();
    }

    dealer_Move() {
        while (this.dealerSum <= 21) {
            const card = this.deck.pop();
            this.dealerCards.push(card);
            const cardValue = this.getCardsValue(card);

            this.dealerSum += cardValue;
            this.dealerAceCount += this.checkAce(card);

            if (this.dealerSum > 25 && this.dealerAceCount > 0) {
                this.dealerSum -= 10;
                this.dealerAceCount--;
            }
        }
        return this.get_game_state();
    }

    get_game_state() {
        if (this.playerSum > 25) {
            return "Dealer wins";
        }

        if (this.dealerSum > 25) {
            return "You win";
        }

        if (this.playerSum === 25) {
            return "Blackjack! You win";
        }

        if (this.dealerSum === this.playerSum) {
            return "Tie";
        }

        if (this.dealerSum >= 21) {
            if (this.dealerSum > this.playerSum) {
                return "Dealer wins";
            }
            return "You win";
        }

        return "Playing";
    }
}
