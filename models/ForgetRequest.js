const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI||"mongodb://localhost:27017/UserDB", { useNewUrlParser: true });
const ForgetRequestSchema=new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
    
    },
    email:{
        type:String,
        required:[true,"Email has not been entered"]
    },
    problem:{
        type:String,
        required:[true,"Problem has not been entered"]
    },
    Description:{
        type:String,
    },
    completed:{
        type:Boolean,
        required:[true,"Problem has not been entered"]
    },
    created_at:{
        type:Date
    },
})
module.exports=mongoose.model("ForgetRequest",ForgetRequestSchema);
