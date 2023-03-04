const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        max:50
    },
    password:{
        type: String,
        required: true,
        min: 8
    
    },
    profilePic:{
        type: String,
        default: ""
    },
    coverPic:{
        type: String,
        default: ""
    },
    followers:{
        type: Array,
        default: []
    },
    following:{
        type: Array,
        default: []
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    desc:{
        type:String,
        max:50
    },
    city:{
        type:String,

    },
    from:{
        type:String,
        max:50
    },
    relationship:{
        type:Number,
        enum:[1,2,3]
    }
},{
    timestamps: true
 }
);

module.exports = mongoose.model('User', userSchema);
