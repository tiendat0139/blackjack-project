const { rooms } = require("./rooms")

function deal(roomCode, cards) {
    if (rooms.hasOwnProperty(roomCode)) {
        for (let i = 0; i < rooms[roomCode].length; i++) {
            rooms[roomCode][i]["cards"] = cards[i]
            if (rooms[roomCode][i]["state"] == "deal") rooms[roomCode][i]["state"] = "another-turn"
            else if (rooms[roomCode][i]["state"] == "waiting-deal") rooms[roomCode][i]["state"] = "my-turn" 
        }
    }

}

function hitCard(roomCode, user, card) {
    if (rooms.hasOwnProperty(roomCode)) {
        for (let i = 0; i < rooms[roomCode].length; i++) {
            if (rooms[roomCode][i]["user"].user_id === user.user_id) {
                if (rooms[roomCode][i].hasOwnProperty("cards")) {
                    rooms[roomCode][i]["cards"].push(card)
                }
                break
            }
        }
    }
}

function standCard(roomCode) {
    if (rooms.hasOwnProperty(roomCode)) {
        let index 
        for (let i = 0; i < rooms[roomCode].length; i++) {
            if (rooms[roomCode][i]["state"] == "my-turn") {
                rooms[roomCode][i]["state"] = "another-turn"
                index = i + 1
            }
        }

        if (index < rooms[roomCode].length) rooms[roomCode][index]["state"] = "my-turn"
        else rooms[roomCode][0]["state"] = "my-turn"
    }
}

function next() {

}

function changePattern(roomCode, user, pattern) {
    if (rooms.hasOwnProperty(roomCode)) {
        for (let i = 0; i < rooms[roomCode].length; i++) {
            if (rooms[roomCode][i]["user"].user_id === user.user_id) {
                rooms[roomCode][i]["pattern"] = pattern
                break
            }
        }
    }
}

module.exports = { deal, hitCard, standCard, next, changePattern }