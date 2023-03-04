const User = require('../../models/user/user');
const {validationResult} = require('express-validator');
module.exports.registerPage = async function(req,res){
   
}
const bcrypt = require('bcrypt');

//registration
module.exports.register = async function(req,res){
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){

            return res.status(422).json({
                "Message":errors.array()
            });
        }
        
        let saltRound  = 10;
        let salt = await bcrypt.genSalt(saltRound);
        let hashedPassword = await bcrypt.hash(req.body.password,salt);
        const user = await User.create({
            username: req.body.username,
            email: req.body.email,
            password:hashedPassword
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
            "Message":error.message
        })
    }
}

//login
module.exports.login = async function(req,res){
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){

            return res.status(422).json({
                "Message":errors.array()
            });
        }

        let user = await User.find({email:req.body.email});
        if(user){
            let isPasswordMatch = await bcrypt.compare(req.body.password,user[0].password);
            if(isPasswordMatch){
                return res.status(200).json({
                    "Message":"User Logged In"
                })
            }else{
                return res.status(500).json({
                    "Message":"Invalid Email or Password"
                })
            }
        }else{
            return res.status(500).json({
                "Message":"Invalid Email or Password"
            })
        }

    } catch (error) {
        res.status(500).json({
            "Message":error.message
        })
    }
}    