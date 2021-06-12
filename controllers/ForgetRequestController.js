const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI||"mongodb://localhost:27017/UserDB", { useNewUrlParser: true });
const ForgetRequest=require('../models/ForgetRequest');
const User=require('../models/User');
module.exports={
    // fetchfaculties(req,res){
    //     User.find(function(err,faculties){
    //         res.send(faculties);
    //     })
    // },
    newForgetRequest(req,res){
        const faculty_email= req.body.faculty_email;
        const faculty_problem=req.body.faculty_problem;
        const faculty_description=req.body.faculty_description;
    console.log("Description "+faculty_description);
    console.log("Email "+faculty_email);
    console.log("Problem "+faculty_problem);
    var id_of_problem_user=0;
    User.findOne({email:faculty_email}, function (err, user) {
    
            if(user==null){
                res.status(400).send({error:"No such user found"});
            }
            else{
            const forgetrequest=new ForgetRequest({_id:user._id,email:faculty_email,problem:faculty_problem,Description:faculty_description,completed:false,created_at:new Date()});
            forgetrequest.save().then((err) => {
                    res.send({registration:"Successfull"});             
            })
            .catch((error) => {
                if(error.code=11000){
                        
                    res.status(400).send({error:"User can only send one request at a time"});   
                }
                else{
                    res.status(400).send({error:"No such user found"});
                }
              
            });
            }
        
    })

  
    },
    fetchforgetrequests(req,res){
        ForgetRequest.find(function(err,forgetrequests){
            res.send(forgetrequests);
        })
    },
    deleteforgetrequests(req,res){
         console.log(req.body.id);
        ForgetRequest.findByIdAndDelete(req.body.id,function(err){
            if(err){
                console.log(err);
                res.send(err)
            }
            else
            {
                res.send("successful")
                console.log("Successfully Deleted");
            }
        })
    },
  
}