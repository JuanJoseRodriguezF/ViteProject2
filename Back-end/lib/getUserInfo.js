function getUserInfo(user){
    return{
        username: user.username,
        email: user.email,
        id: user.id || user._id,
    }
};

module.exports = getUserInfo;