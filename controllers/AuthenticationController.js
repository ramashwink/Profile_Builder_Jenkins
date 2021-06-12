const User=require('../models/User');
const ForgetRequest=require('../models/ForgetRequest');
const jwt= require('jsonwebtoken');
const config=require('../config/config')
const crypto=require('crypto');
const mongoose = require("mongoose");
const Joi=require('joi');
mongoose.connect(process.env.MONGODB_URI||"mongodb://localhost:27017/UserDB", { useNewUrlParser: true });
const ONE_WEEK=60*60*24*7;
function jwtSignUser(user)
{
    
    return jwt.sign(user,config.authentication.jwtSecret,{
        expiresIn:ONE_WEEK
    })
}
function genPassword(password)
{
    console.log("Inside password"+password);
    var salt=crypto.randomBytes(32).toString('hex');
    var genhash=crypto.pbkdf2Sync(password,salt,10000,60,'sha512').toString('hex');
    console.log("Inside password"+salt+" "+genhash);
    return {salt:salt,hash:genhash};
}
 function validatePassword(candiatepassword,hash,salt){
    var hashVerify=crypto.pbkdf2Sync(candiatepassword,String(salt),10000,60,'sha512').toString('hex');
    var bt=String(hash) === hashVerify;
    return Promise.resolve(bt); 
    }
module.exports={
     checkUser(req,res){
        token=req.body.token;
        token=token.split(' ')[1];
        console.log("inside checkuser " +token);
        
        var decoded = jwt.verify(token, "secret");
        console.log("Decoded code is "+decoded);
        res.send({id:decoded.id,isAdmin:decoded.isAdmin})
    },
    // async checkAdmin(req,res){
    //     console.log("inside check admin");
    //     user_id=req.body.id;
    //     User.findById(user_id, function (err, user) {
    //         if(user.isAdmin){
    //             res.status(200).send({isAdmin:true})
    //         }
    //         else{
    //             res.status(200).send({isAdmin:false})
    //         }
    //     });
    // },
    async changePassword(req,res){
        defaultpass=req.body.email;
        console.log(defaultpass);
        defaultpass=defaultpass.charAt(0).toUpperCase()+defaultpass.slice(1);
        defaultpass="1"+defaultpass;
        console.log(defaultpass);
        const id=req.body.id;
        console.log(id);
        const userpassworddetails= genPassword(defaultpass);
        User.findByIdAndUpdate(id,{"salt": userpassworddetails.salt,hash:userpassworddetails.hash,modified_at:new Date()}, function(err, result){
            if(err)
            {
                console.log(err);
                res.status(400).send({err:err});
            }
            else{
                ForgetRequest.findByIdAndUpdate(id,{completed:true}, function(error, result){
                    if(error)
                    {
                        res.status(400).send({err:error});
                    }
                    else
                    {
                        res.send({msg:"Successfull"});
                    }
                });
                
            }
        });
    },
    async editPassword(req,res){
        console.log(req.body.oldpass);
        console.log(req.body.newpass);
        console.log("Passwords");
        User.findOne({ _id: req.body.id}, function (err, user) {
            validatePassword(req.body.oldpass,user.hash,user.salt).then(function(isPasswordValid){
                console.log(isPasswordValid);
                if(!isPasswordValid)
                    {
                    res.send({message:"The Old Password entered is wrong"});
                    }
                else{
                    const schema=Joi.object({
                        password:Joi.string().regex(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})"))
                    })
                    const { error, value } = schema.validate({ password: req.body.newpass});
                    if(error==null){
                        const userpassworddetails= genPassword(req.body.newpass);
                        User.findByIdAndUpdate(req.body.id,{"salt": userpassworddetails.salt,hash:userpassworddetails.hash,modified_at:new Date()}, function(error1, result){
                            if(error1)
                            {
                                console.log(error1);
                                res.send({message:error1});
                            }
                            else{
                                res.send({message:"success"});
                            }
                        });
                    }
                    else
                    {
                        res.send({message:"Password Does Not Match the Criteria"});
                    }

                }
            })
            
        });
    },
    async register(req,res){
        const userpassworddetails= genPassword(req.body.password);
        const user=new User({email:req.body.email,salt:userpassworddetails.salt, hash:userpassworddetails.hash,isAdmin:req.body.isAdmin,created_at:new Date(),modified_at:new Date()});
        user.save().then((user) => {
            res.send({registration:"Successfull"}); 
        })
        .catch((error) => {
            console.log(error);
            res.send(400, "Bad Request");
        });
         
    },
    async login(req,res){
       
        try {
            const {email,password}=req.body;
            const user =await User.findOne({
                where:{
                    email:email
                }
            });  

            User.findOne({ email: email}, function (err, user) {
                if(!user)
                {
                    res.status(403).send({errormessage:"The login information was incorrect"});
                }
                else{
                    validatePassword(password,user.hash,user.salt).then(function(isPasswordValid){
                        console.log(isPasswordValid);
                         if(!isPasswordValid)
                            {
                            res.status(403).send({errormessage:"The login information was incorrect"});
                            }
                            else{
                               afterloginuser={
                                    email:user.email,
                                    id:user.id,
                                    isAdmin:user.isAdmin,
                                    expiresIn:ONE_WEEK
                                }
                                console.log(user);
                                res.send({user:user,token:"Bearer "+jwtSignUser(afterloginuser),expiresIn:ONE_WEEK,isAdmin:user.isAdmin});
                            }
                        
                    })
                }
             
                
            });
           
        } catch (error) {
            console.log(error);
            res.status(500).send({
                error:"An error has occured trying to login"
            });
        }       
    },
    
   
}
