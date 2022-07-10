const rooms = {}

const addUser = (roomId, user, pattern) =>  {
    if(rooms.hasOwnProperty(roomId)){
        const exists = rooms[roomId].find(e => e.user.user_id === user.user_id)
        if(!exists){
            rooms[roomId].push({ user, pattern, state: "waiting-deal" })
        } else {
            console.log('User already exists')
        }
    } else {
        rooms[roomId] = [{ user, pattern, state: "deal" }]
    }
}

const removeUser = (roomId, user) => {
    if(rooms.hasOwnProperty(roomId)){
        const findId = rooms[roomId].findIndex(e => e.user.user_id === user.user_id)
        rooms.splice(findId, 1)
    }
}
module.exports = {rooms, addUser, removeUser}