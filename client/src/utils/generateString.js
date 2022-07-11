const randomString = (len) => {
    var result = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charLen = characters.length
    for(let i = 0; i < len; i++){
        result += characters.charAt(Math.floor(Math.random() * charLen));
    }
    return result
}
export default randomString