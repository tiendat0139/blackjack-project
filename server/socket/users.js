
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

const removeUser = (socketId) => {
    const findId = users.find(e => e.socketId === socketId)
    if(findId){
        users.splice(findId, 1)
    } else {
        console.log('User not exists')
    } 
}

const addToRoom = (roomId, user, pattern) => {
    const findUser = users.find(e => e.user_id === user.user_id)
    console.log(findUser, typeof findUser);

    if (findUser) {
        console.log("roomId77: ", roomId)

        if (findUser.roomId.length < 5 || typeof findUser.roomId === "object") {
            console.log("roomId79: ", roomId);
            if (getRoomData(roomId).length === 0) {
                findUser.role = 1
                findUser.state = "deal"
            } else {
                findUser.role = 0
                findUser.state = "waiting-deal"
            }
            findUser.pattern = pattern
            findUser.roomId = roomId
            console.log("roomId89:", roomId);
        } else {
            console.log("User is in room!");
        }
    } else {
        console.log("User is not exist!");
    }
}


const removeFromRoom = (userId, roomId) => {
    const findUser = users.find(e => e.user_id === userId && e.roomId === roomId)
    if(!findUser){
        console.log('User not exists in any room')
    } else if (findUser.role === 0) {
        findUser.roomId = ''
        findUser.role = null
        findUser.state = null
        findUser.cards = null
        findUser.rank = null
        findUser.betCoin = null
        console.log('Remove user from room')
    } else if (findUser.role === 1) {
        const room = getRoomData(roomId) 
        for (let i = 0; i < room.length; i++) {
            room[i].roomId = ''
            room[i].role = null
            room[i].state = null
            room[i].cards = null
            room[i].betCoin = null
            room[i].rank = null
        }
    }
    console.log("users112: ", users)
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