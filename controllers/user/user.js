const User = require('../../models/user/user');
const bcrypt = require('bcrypt');
module.exports.home = async function(req,res){
    return res.json({
        "Message":"Welcome User"
    })
}
//read user
module.exports.getUser = async function(req,res){
    try {
        let user = await User.find({_id:req.params.id});
        let {password,updatedAt, ...other} = user[0]._doc;
        if(user){
            return res.json({
                "Message":"User Found",
                "User":other
            })
        }else{
            return res.status(403).json({
                "Message":"User Not Found"
            })
        }
    } catch (error) {
        res.status(500).json({
            "Message":error.message
        })
    }
}


//update user
module.exports.updateUser = async function(req,res){
    if(req.body.userId == req.params.id || req.user.isAdmin){
        if(req.body.password){
            try{
                let saltRound  = 10;
                        let salt = await bcrypt.genSalt(saltRound);
                        let hashedPassword = await bcrypt.hash(req.body.password,salt);
                        req.body.password = hashedPassword; 
            }catch(error){
                return res.status(500).json({
                    "Message":"Interna Server Error"
                })
            }
        }
        try {
         let updateUser = await User.findByIdAndUpdate(req.params.id,{
                $set:req.body
            });
          
            return res.status(200).json({
                    "Message":"User Updated"
            })
          

        } catch (error) {
            return res.status(500).json({
                "Message":"Interna Server Error"
            })
        }
    }else{
        return res.status(403).json({
            "Message":"You can update only your account"
        });
    }
}
//delete user account
module.exports.deleteUser = async function(req,res){
    if(req.body.userId == req.params.id || req.body.isAdmin){
        try {
            await User.findByIdAndDelete({_id:req.params.id});   
            return res.status(200).json({
                "Message":"User Deleted"
            });
    
        } catch (error) {
            return res.status(500).json({
                "Message":"Interna Server Error, User deletion failed"
            })
        }
    }else{
        return res.status(403).json({
            "Message":"You can delete only your account"
        });
    }    
    
}

//follow user
module.exports.followUser = async function(req,res){
    if(req.body.userId !== req.params.id){
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if(!user.followers.includes(req.body.userId)){  
                await user.updateOne({$push:{followers:req.body.userId}});
                await currentUser.updateOne({$push:{following:req.params.id}});
                res.status(200).json("user has been followed");
            }else{
                res.status(403).json("you already follow this user");
            }
        } catch (error) {
            res.status(500).json({
                "Message":error.message
            });
        }
    }else{
        res.status(403).json({
            "Message":"You can't follow yourself"
        })
    }
}
