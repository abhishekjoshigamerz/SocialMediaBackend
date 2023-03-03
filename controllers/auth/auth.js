const User = require('../../models/user/user');

module.exports.registerPage = async function(req,res){
   
}


//registration
module.exports.register = async function(req,res){
    try {
        const user = User.create({
            username: req.body.username,
            email: req.body.email,
            password:req.body.password
        });
        if(user){
            return res.json({
                "Message":"User Registered"
            })
        }else{
    
            return res.json({
                "Message":"User  Registaration Failed"
            })
        }    
    } catch (error) {
        res.status(500).json({
            "Message":"Internal Server Error"
        })
    }
    

}