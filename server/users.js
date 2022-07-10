
const users = []

const addUser = (userid, username) => {
    const usernameTrim = username.trim()
    console.log(username)
    const exist = users.find(e => e.username === usernameTrim);
    if(exist){
        console.log('User has joined app')
        users.push({userid:userid, username, roomid : ''})
    } else {
        users.push({userid:userid, username, roomid : ''})
    }
    // console.log(users)
}
const removeUser = (username) => {
    const findId = users.find(e => e.username === username)
    if(findId){
        users.splice(findId,1)
    } else {
        console.log('User not exists')
    } 
}

const addToRoom = (username, roomid) => {
    const usernameTrim = username.trim()
    const findUser = users.find(e => e.username === usernameTrim)
    if(findUser.roomid !== ''){
        console.log('User already exists in the room')
    } else {
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
    console.log(users)
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