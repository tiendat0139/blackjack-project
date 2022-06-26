const rooms = {}

const addUser = (roomId, userId, username) =>  {
    if(rooms.hasOwnProperty(roomId)){
        const exists = rooms[roomId].find(e => e.userId === userId)
        if(!exists){
            rooms[roomId].push({userId, username})
        } else {
            console.log('User already exists')
        }
    } else {
        rooms[roomId] = [{userId, username}]
    }
}

const removeUser = (roomId, userId) => {
    if(rooms.hasOwnProperty(roomId)){
        const findId = rooms[roomId].findIndex(e => e.userId === userId)
        rooms.splice(findId, 1)
    }
}
module.exports = {rooms, addUser, removeUser}