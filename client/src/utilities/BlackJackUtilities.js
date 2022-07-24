//get 1 deck
function getDeck(numberOfDeck = 1) {
  const suits = ["♠", "♣", "❤", "♦"];
  const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
  const deck = [];

  for (let i = 0; i < numberOfDeck; i++) {
    for (let j = 0; j < 4; j++) {
      for (let k = 0; k < 13; k++) {
        deck.push({ suit: suits[j], rank: ranks[k] })
      }
    }
  }
  return deck;
}

//get score of card
function getRankNum(rank) {
  switch (rank) {
    case "A":
      return 1;
    case "J":
    case "Q":
    case "K":
      return 10;
    default:
      return Number(rank);
  }
}

//get total of user's cards's score
function getTotal(hand) {
  let total = 0;
  for (const card of hand) {
    total += getRankNum(card.rank);
  }
  return total;
}

//
function hasAce(hand) {
  for (const card of hand) {
    if (card.rank === "A") return true;
  }
  return false;
}


//
function checkDealersScore(hand) {
  let total = getTotal(hand);
  // ソフトハンドのとき、Aceを 11 と数える
  if (isSoftHand(hand)) {
    total += 10;
  }
  if (total < 17) {
    return true;
  }
  return false;
}

function isAce(card) {
  return card.rank === "A";
}

function isFaceCardOrTen(card) {
  if (getRankNum(card.rank) === 10) {
    return true;
  }
  return false;
}

function isSoftHand(hand) {
  if (isBlackJack(hand)) {
    return false;
  }
  if (!hasAce(hand)) {
    return false;
  }
  if (getTotal(hand) + 10 < 21) {
    return true;
  }
  return false;
}

function isBlackJack(hand) {
  const firstCard = hand[0];
  const secondCard = hand[1];
  if (
    (isAce(firstCard) && isFaceCardOrTen(secondCard)) ||
    (isFaceCardOrTen(firstCard) && isAce(secondCard))
  ) {
    return true;
  }
  return false;
}

function getScore(hand) {
  if (isBlackJack(hand)) {
    return [21];
  }
  if (isSoftHand(hand)) {
    return [getTotal(hand), getTotal(hand) + 10];
  }
  return [getTotal(hand)];
}

function getScoreForDisplay(hand) {
  let score = getScore(hand);
  if (isSoftHand(hand)) {
    return `${score[0]} | ${score[1]}`;
  }
  return score[0];
}

function getLastScore(hand) {
  let score = getScore(hand);
  if (isSoftHand(hand)) {
    return score[1];
  }
  return score[0];
}

function judge(dealersHand, playersHand) {
  const dealersScore = getLastScore(dealersHand);
  const playersScore = getLastScore(playersHand);

 
  if (getTotal(playersHand) > 21) {
    return "LOSE!!";
  }

  if (dealersScore === playersScore) {
    return "PUSH";
  }

  if (isBlackJack(playersHand)) {
    return "BLACK JACK!!";
  }
 
  if (isBlackJack(dealersHand)) {
    return "LOSE!!";
  }
 
  if (dealersScore > 21) {
    return "WIN!!";
  }
  if (dealersScore < playersScore) {
    return "WIN!!";
  }
  if (dealersScore > playersScore) {
    return "LOSE!!";
  }

  return "WIN!!";
}

function getActionOnPlayer(dealersHand, playersHand){
const dealersScore = getLastScore(dealersHand);
  const playersScore = getLastScore(playersHand);

 
  if (getTotal(playersHand) > 21) {
    return "lose";
  }

  if (dealersScore === playersScore) {
    return "push";
  }

  if (isBlackJack(playersHand)) {
    return "blackjack";
  }
 
  if (isBlackJack(dealersHand)) {
    return "lose";
  }
 
  if (dealersScore > 21) {
    return "win";
  }
  if (dealersScore < playersScore) {
    return "win";
  }
  if (dealersScore > playersScore) {
    return "lose";
  }

  return 'win';
}

export { getDeck, getRankNum, getTotal, checkDealersScore, isAce, isBlackJack, isFaceCardOrTen, isSoftHand, getScore, judge, getActionOnPlayer, getScoreForDisplay, getLastScore }