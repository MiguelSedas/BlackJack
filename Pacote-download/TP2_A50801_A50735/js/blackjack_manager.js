let game;

const cardImages = {
    "2-♣":"img/png/2_of_clubs.png",
    "2-♦":"img/png/2_of_diamonds.png",
    "2-♥":"img/png/2_of_hearts.png",
    "2-♠":"img/png/2_of_spades.png",
    "3-♣":"img/png/3_of_clubs.png",
    "3-♦":"img/png/3_of_diamonds.png",
    "3-♥":"img/png/3_of_hearts.png",
    "3-♠":"img/png/3_of_spades.png",
    "4-♣":"img/png/4_of_clubs.png",
    "4-♦":"img/png/4_of_diamonds.png",
    "4-♥":"img/png/4_of_hearts.png",
    "4-♠":"img/png/4_of_spades.png",
    "5-♣":"img/png/5_of_clubs.png",
    "5-♦":"img/png/5_of_diamonds.png",
    "5-♥":"img/png/5_of_hearts.png",
    "5-♠":"img/png/5_of_spades.png",
    "6-♣":"img/png/6_of_clubs.png",
    "6-♦":"img/png/6_of_diamonds.png",
    "6-♥":"img/png/6_of_hearts.png",
    "6-♠":"img/png/6_of_spades.png",
    "7-♣":"img/png/7_of_clubs.png",
    "7-♦":"img/png/7_of_diamonds.png",
    "7-♥":"img/png/7_of_hearts.png",
    "7-♠":"img/png/7_of_spades.png",
    "8-♣":"img/png/8_of_clubs.png",
    "8-♦":"img/png/8_of_diamonds.png",
    "8-♥":"img/png/8_of_hearts.png",
    "8-♠":"img/png/8_of_spades.png",
    "9-♣":"img/png/9_of_clubs.png",
    "9-♦":"img/png/9_of_diamonds.png",
    "9-♥":"img/png/9_of_hearts.png",
    "9-♠":"img/png/9_of_spades.png",
    "10-♣":"img/png/10_of_clubs.png",
    "10-♦":"img/png/10_of_diamonds.png",
    "10-♥":"img/png/10_of_hearts.png",
    "10-♠":"img/png/10_of_spades.png",
    "A-♣":"img/png/ace_of_clubs.png",
    "A-♦":"img/png/ace_of_diamonds.png",
    "A-♥":"img/png/ace_of_hearts.png",
    "A-♠":"img/png/ace_of_spades.png",
    "J-♣":"img/png/jack_of_clubs.png",
    "J-♦":"img/png/jack_of_diamonds.png",
    "J-♥":"img/png/jack_of_hearts.png",
    "J-♠":"img/png/jack_of_spades.png",
    "K-♣":"img/png/king_of_clubs.png",
    "K-♦":"img/png/king_of_diamonds.png",
    "K-♥":"img/png/king_of_hearts.png",
    "K-♠":"img/png/king_of_spades.png",
    "Q-♣":"img/png/queen_of_clubs.png",
    "Q-♦":"img/png/queen_of_diamonds.png",
    "Q-♥":"img/png/queen_of_hearts.png",
    "Q-♠":"img/png/queen_of_spades.png",
    "X":"img/png/card_back.png"
};

const getElement = (id) => document.getElementById(id);

const updateElementText = (elementId, text) => {
    const element = getElement(elementId);
    element.textContent = text;
};

const createCardElement = (card) => {
    const cardElement = document.createElement("img");
    cardElement.src = cardImages[card];
    return cardElement;
};

const updateUI = (cards, sum, cardsElementId, sumElementId) => {
    const cardsElement = getElement(cardsElementId);
    const sumElement = getElement(sumElementId);

    sumElement.textContent = sum !== "" ? sum : "";

    cardsElement.innerHTML = "";
    cards.forEach(card => {
        const cardElement = createCardElement(card);
        cardsElement.appendChild(cardElement);
    });
};

function new_game() {
    const resultsElement = getElement("results");
    resultsElement.textContent = "";

    game = new Blackjack();
    console.log("Game has been initialized");

    game.newDeck();
    game.shuffle();

    game.dealerCards.push(game.deck.pop());
    game.dealerCards.push("X");
    game.playerCards.push(game.deck.pop());
    game.playerCards.push(game.deck.pop());
    console.log("Arrays filled");

    update_dealer();
    console.log("Dealer hand updated!");
    console.log(game.dealerCards);
    update_player();
    console.log("Player hand updated!");
    console.log(game.playerCards);

    const playerInitialSum = game.getCardsValue(game.playerCards[0]) + game.getCardsValue(game.playerCards[1]);
    game.playerSum = playerInitialSum;
    updateElementText("player-sum", playerInitialSum);

    const dealerInitialSum = game.getCardsValue(game.dealerCards[0]);
    game.dealerSum = dealerInitialSum;
    updateElementText("dealer-sum", dealerInitialSum);

    
    ableGameButtons();
}

function update_dealer() {
    updateUI(game.dealerCards, game.dealerSum, "dealer-cards", "dealer-sum");

    if (game.dealerCards[1] === "X") {
        const hiddenCardElement = createCardElement("X");
        const dealerCardsElement = getElement("dealer-cards");
        dealerCardsElement.replaceChild(hiddenCardElement, dealerCardsElement.childNodes[1]);
    }
}

function update_player() {
    updateUI(game.playerCards, game.playerSum, "player-cards", "player-sum");
}

function dealer_new_card() {
    const gameState = game.dealer_Move();
    update_dealer();
}

function player_new_card() {
    if (game.playerSum <= 25) {
        const gameState = game.player_Move();
        update_player();

        // Verifica imediatamente o estado do jogo após o movimento do jogador
        if (game.playerSum > 25) { // Se o jogador ultrapassar 21
            updateElementText("results", "Dealer wins");
            disableGameButtons();
        } else if (gameState !== "Playing") {
            // Caso o jogo termine por outro motivo
            updateElementText("results", gameState);
            disableGameButtons();
        }
    }
}

function disableGameButtons() {
    const card = document.getElementById("Card");
    if (card) {
        card.disabled = true;
    }

    // Desativa o botão "stand" diretamente
    const stand = document.getElementById("stand");
    if (stand) {
        stand.disabled = true;
    }
}

function ableGameButtons() {
    const card = document.getElementById("Card");
    if (card) {
        card.disabled = false;
    }

    // Desativa o botão "stand" diretamente
    const stand = document.getElementById("stand");
    if (stand) {
        stand.disabled = false;
    }
}





function dealer_finish() {
    if (game.dealerCards[1] === "X") {
        game.dealerCards.splice(1, 1);
    }

    while (game.dealerSum < 21) {
        game.dealer_Move();
    }

    const gameState = game.get_game_state();
    updateElementText("results", gameState);
    update_dealer();
    disableGameButtons();

    return gameState;

}

document.getElementById('infoButton').onclick = function() {
    const infoText = document.getElementById('infoText');
    if (infoText.classList.contains('hidden')) {
        infoText.classList.remove('hidden');
    } else {
        infoText.classList.add('hidden');
    }
};
