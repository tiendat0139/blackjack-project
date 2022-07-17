const { getRoomData } = require("./users")

function deal(roomCode, cards) {
    const room = getRoomData(roomCode)

    for (let i = 0; i < room.length; i++) {
        room[i].cards = cards[i]
        if (room[i].state === "deal") room[i].state = "another-turn"
        else if (room[i].state === "waiting-deal") room[i].state = "my-turn"
    }
}

function hitCard(roomCode, user, card) {
    const room = getRoomData(roomCode)

    const hitUser = room.find(u => u.user_id === user.user_id)

    if (hitUser) {
        hitUser.cards.push(card)
    }
}

function standCard(roomCode) {
    const room = getRoomData(roomCode)

    let index

    for (let i = 0; i < room.length; i++) {
        if (room[i].state === "my-turn") {
            room[i].state = "another-turn"
            index = i + 1
            break
        }
    }

    if (index < room.length) room[index].state = "my-turn"
    else room[0].state = "my-turn"
}

function next() {

}

function changePattern(roomCode, user, pattern) {
    const room = getRoomData(roomCode)

    const changeUser = room.find(u => u.user_id === user.user_id)

    if (changeUser) {
        changeUser.pattern = pattern
    }
}

module.exports = { deal, hitCard, standCard, next, changePattern }