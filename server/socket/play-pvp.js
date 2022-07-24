const { getScore, isBlackJack } = require("../utilities/BlackJackUtilities")
const { getRoomData, users } = require("./users")

function bet(userId, betCoin) {
    const findUser = users.find(user => user.user_id === userId) 

    if (findUser) {
        findUser.betCoin = betCoin
    } else {
        console.log("User is not exist!");
    }
}

function getDealer(room) {
    const dealer = room.find(user => user.role === 1)

    return room.indexOf(dealer)
}

function deal(roomCode, cards) {
    console.log("cards:", cards)
    const room = getRoomData(roomCode)
    let blackjack = false
    const dealer = getDealer(room)
    let blackjackBet

    for (let i = 0; i < room.length; i++) {
        room[i].cards = cards[i]
        if (isBlackJack(room[i].cards)) {
            room[i].rank = 0
            blackjackBet = room[i].betCoin
            blackjack = true
        } else {
            room[i].state = "another-turn"
        }
    }

    if (!blackjack) {
        if (dealer + 1 < room.length) {
            room[dealer + 1].state = "my-turn"
        } else {
            room[0].state = "my-turn"
        }
    } else {
        const totalBet = room.reduce((total, user) => total + user.betCoin, 0)
        room.forEach(user => {
            user.state = "end"
            if (user.rank !== 0) {
                user.rank = -1
                user.winLoseCoins = user.betCoin
            } else {
                user.winLoseCoins = (totalBet - user.betCoin)
            }
        })
    }

    console.log(room);
}

function hitCard(roomCode, user, card) {
    let room = getRoomData(roomCode)

    const hitUser = room.find(u => u.user_id === user.user_id)

    let lose = false

    if (hitUser) {
        hitUser.cards.push(card)
        if (getScore(hitUser.cards) > 21) {
            hitUser.rank = -1
            lose = true
        }
    }

    let ranks = []

    if (lose) {
        for (let i = 0; i < room.length; i++) {
            const userScore = getScore(room[i].cards)
            if (ranks.length === 0) ranks.push(room[i])
            else {
                if (userScore < getScore(ranks[0].cards)) ranks.unshift(room[i])
                else if (userScore > getScore(ranks[ranks.length - 1].cards)) ranks.push(room[i])
                else {
                    for (let j = 1; j < ranks.length - 1; j++) {
                        if (userScore > getScore(ranks[j].cards) && userScore < getScore(ranks[j + 1].cards)) {
                            ranks.splice(j + 1, 0, room[i])
                            break
                        }
                    }
                }
            }
        }

        const totalBet = room.reduce((total, user) => total + user.betCoin, 0)

        for (let i = 0; i < ranks.length; i++) {
            ranks[i].state = "end"
            if (ranks[i].rank !== -1) {
                ranks[i].rank = i + 1
                ranks[i].winLoseCoins = (totalBet / ranks.length * (i + 1)) - ranks[i].betCoin
            } else {
                ranks[i].winLoseCoins = ranks[i].betCoin
            }
        }
    
        room = ranks
    }

    console.log(room)
}

function standCard(roomCode) {
    const room = getRoomData(roomCode)

    let index

    for (let i = 0; i < room.length; i++) {
        if (room[i].state === "my-turn" || room[i].state === "deal-turn") {
            room[i].state = "another-turn"
            index = i + 1
            break
        }
    }

    if (index === room.length) index = 0

    console.log("index: ", index);

    if (index !== getDealer(room)) room[index].state = "my-turn"
    else room[index].state = "deal-turn"

    console.log(room);
}

function changePattern(roomCode, user, pattern) {
    const room = getRoomData(roomCode)

    const changeUser = room.find(u => u.user_id === user.user_id)

    if (changeUser) {
        changeUser.pattern = pattern
    }
}

module.exports = { bet, deal, hitCard, standCard, changePattern }