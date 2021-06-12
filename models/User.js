const crypto=require('crypto');
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI||"mongodb://localhost:27017/UserDB", { useNewUrlParser: true });
const UserSchema=new mongoose.Schema({
    email:{
        type:String,
        unique:[true,"Account is already present"],
        required:[true,"Email has not been entered"]
    },
    isAdmin:{
        type:Boolean,
        required:[true,"Enter whether he is an admin"]
    },
    salt:{
        type:String
    },
    hash:{
        type:String,
    },
    created_at:{
        type:Date
    },
    modified_at:{
        type:Date
    }
})
module.exports=mongoose.model("User",UserSchema);
