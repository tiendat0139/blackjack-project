
const users = []

const addUser = (userid, username) => {
    const usernameTrim = username.trim()
    const exist = users.find(e => e.username === usernameTrim);
    if(exist){
        console.log('User has joined app')
    } else {
        users.push({userid:userid, username, roomid : ''})
    }
}
const removeUser = (userid) => {
    const findId = users.find(e => e.userid === userid)
    if(findId){
        users.splice(findId,1)
        console.log(users)
    } else {
        console.log('User not exists')
    } 
}

const addToRoom = (username, roomid) => {
    const usernameTrim = username.trim()
    const findUser = users.find(e => e.username === usernameTrim)
    if(findUser){
        findUser.roomid = roomid
    }
}
const removeFromRoom = (userid, roomid) => {
    const findUser = users.find(e => e.userid === userid && e.roomid === roomid)
    if(!findUser){
        console.log('User not exists in any room')
    } else {
        findUser.roomid = ''
        console.log('Remove user from room')
    }
}
const getRoomData = (roomid) => {
    const room = []
    users.map(e => {
        if( e.roomid === roomid){
            room.push(e)
        }
    })
    return room
}
module.exports = {users, addUser, removeUser, addToRoom, removeFromRoom, getRoomData}