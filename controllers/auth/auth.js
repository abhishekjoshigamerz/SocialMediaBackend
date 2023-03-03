const User = require('../../models/user/user');

module.exports.register = function(req,res){
    const user = new User(req.body);
}