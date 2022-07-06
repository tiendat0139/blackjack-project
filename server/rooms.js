const rooms = {}

const addUser = (roomId, userId) =>  {
    if(rooms.hasOwnProperty(roomId)){
        const exists = rooms[roomId].find(e => e === userId)
        if(!exists){
            rooms[roomId].push(userId)
        } else {
            console.log('User already exists')
        }
    } else {
        rooms[roomId] = [userId]
    }
}

const removeUser = (roomId, userId) => {
    if(rooms.hasOwnProperty(roomId)){
        const findId = rooms[roomId].findIndex(e => e === userId)
        rooms.splice(findId, 1)
    }
}
module.exports = {rooms, addUser, removeUser}