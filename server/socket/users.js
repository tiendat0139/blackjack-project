
const users = []

// const addUser = (userid, username) => {
//     const usernameTrim = username.trim()
//     console.log(username)
//     const exist = users.find(e => e.username === usernameTrim);
//     if(exist){
//         console.log('User has joined app')
//         users.push({userid:userid, username, roomid : ''})
//     } else {
//         users.push({userid:userid, username, roomid : ''})
//     }
//     // console.log(users)
// }
// const removeUser = (userid) => {
//     const findId = users.find(e => e.userid === userid)
//     if(findId){
//         users.splice(findId,1)
//         console.log(users)
//     } else {
//         console.log('User not exists')
//     } 
// }

// const addToRoom = (username, roomid) => {
//     const usernameTrim = username.trim()
//     const findUser = users.find(e => e.username === usernameTrim)
//     if(findUser){
//         findUser.roomid = roomid
//     }
// }
// const removeFromRoom = (userid, roomid) => {
//     const findUser = users.find(e => e.userid === userid && e.roomid === roomid)
//     if(!findUser){
//         console.log('User not exists in any room')
//     } else {
//         findUser.roomid = ''
//         console.log('Remove user from room')
//     }
// }
// const getRoomData = (roomid) => {
//     const room = []
//     users.map(e => {
//         if( e.roomid === roomid){
//             room.push(e)
//         }
//     })
//     return room
// }

const addUser = (user, socketId) => {
    console.log(user);
    const exist = users.find(e => e.username === user.username);
    if(exist){
        console.log('User has joined app')
    } else {
        users.push({socketId, ...user, roomId : ''})
    }
    console.log("users: ", users)
}

const removeUser = (username) => {
    const findId = users.find(e => e.username === username)
    if(findId){
        users.splice(findId, 1)
    } else {
        console.log('User not exists')
    } 
}

const addToRoom = (roomId, user, pattern) => {
    const findUser = users.find(e => e.user_id === user.user_id)
    console.log(findUser);

    if (findUser) {
        if (getRoomData(roomId).length === 0) {
            findUser.role = 1
            findUser.state = "deal"
        } else {
            findUser.role = 0
            findUser.state = "waiting-deal"
        }
        findUser.pattern = pattern
        findUser.roomId = roomId
    }
}


const removeFromRoom = (userId, roomId) => {
    const findUser = users.find(e => e.userid === userId && e.roomid === roomId)
    if(!findUser){
        console.log('User not exists in any room')
    } else {
        findUser.roomid = ''
        console.log('Remove user from room')
    }
    console.log(users)
}
const getRoomData = (roomId) => {
    const room = []
    users.map(e => {
        if( e.roomId === roomId){
            room.push(e)
        }
    })
    return room
}

module.exports = {users, addUser, removeUser, addToRoom, removeFromRoom, getRoomData}