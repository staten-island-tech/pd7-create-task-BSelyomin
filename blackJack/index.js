import "./style.css";
import cardList from "./cardList";

let cards = cardList[0];
let cardAmmount = 0;
let bust = false;
let stand = false;
let ace = false;
let playerTotal = 0;
let hand = [];

let DOM = {
  dealer1: document.querySelector("#dealer1"),
  dealer2: document.querySelector("#dealer2"),
  dealerValue: document.querySelector("#dealer-value"),
  dealerCards: document.querySelector("#dealerCards"),
  player1: document.querySelector("#player1"),
  player2: document.querySelector("#player2"),
  playerValue: document.querySelector("#player-value"),
  playerCards: document.querySelector("#playerCards"),
  hit: document.querySelector("#hit-button"),
  stand: document.querySelector("#stand-button"),
  bust: document.querySelector(".bust"),
  newGame: document.querySelector("#newGame"),
  img: document.querySelector("#bust"),
};

window.onload = () => startGame();

function startGame() {
  cards = shuffle(cards);
  DOM.dealerCards.innerHTML = "";
  DOM.dealerCards.insertAdjacentHTML(
    "afterbegin",
    `<img src="cards/card_rear.png" alt="card1" id="dealer1">
    <img src=${cards[1].src} alt="card2" id="dealer2">`
  );
  DOM.dealer1 = document.querySelector("#dealer1");
  DOM.playerCards.innerHTML = `
  <img src=${cards[2].src} alt="card1" id="player1">
  <img src=${cards[3].src} alt="card2" id="player2">`;
  hand = [];
  bust = false;
  stand = false;
  ace = false;
  playerTotal = 0;
  DOM.bust.setAttribute("hidden", "");
  DOM.dealer1.src = "./cards/card_rear.png";
  DOM.dealer2.src = cards[1].src;
  DOM.dealerValue.innerHTML = cards[1].value;
  DOM.playerValue.innerHTML = cards[2].value + cards[3].value;
  cardAmmount = 2;
  hand.push(cards[2], cards[3]);
}

function checkGame() {
  if (hand.length === 2 && hand[0].value + hand[1].value === 21) {
    playerTotal = 21.5;
    stand = true;
    return;
  }
  ace = hand.some((card) => card.type === "Ace");
  playerTotal = 0;
  for (let i = 0; i <= cardAmmount - 1; i++) {
    playerTotal += hand[i].value;
    if (playerTotal <= 21) {
      continue;
    }
    if (ace) {
      playerTotal -= 10;
      ace = false;
    } else {
      DOM.img.src = "./cards/bust.png";
      DOM.bust.removeAttribute("hidden");
      bust = true;
      break;
    }
  }
  DOM.playerValue.innerHTML = playerTotal;
}

DOM.stand.addEventListener("click", () => {
  if (bust || stand) {
    return;
  }
  checkGame();
  stand = true;
  DOM.dealer1.src = cards[0].src;
  let dealerTotal = 0;
  if (cards[0].value + cards[1].value === 21) {
    dealerTotal = 21;
  } else {
    dealerTotal = cards[0].value + cards[1].value;
  }
  let iterator = 51;
  while (dealerTotal < 17) {
    DOM.dealerCards.insertAdjacentHTML(
      "beforeend",
      `<img src="${cards[iterator].src}">`
    );
    dealerTotal += cards[iterator].value;
    iterator--;
  }
  DOM.dealerValue.innerHTML = dealerTotal;
  if (dealerTotal > 21) {
    dealerTotal = 0;
  }
  DOM.dealer1.src = cards[0].src;
  if (dealerTotal < playerTotal) {
    DOM.img.src = "./cards/win.png";
    DOM.bust.removeAttribute("hidden");
  } else if (dealerTotal == playerTotal) {
    DOM.img.src = "./cards/tie.png";
    DOM.bust.removeAttribute("hidden");
  } else {
    DOM.img.src = "./cards/lose.webp";
    DOM.bust.removeAttribute("hidden");
  }
});

DOM.hit.addEventListener("click", () => {
  if (bust || stand) {
    return;
  }
  cardAmmount++;
  DOM.playerCards.insertAdjacentHTML(
    "beforeend",
    `<img src="${cards[cardAmmount + 1].src}">`
  );
  hand.push(cards[cardAmmount + 1]);
  checkGame();
});

DOM.newGame.addEventListener("click", () => startGame());

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
