const JwtStrategy=require('passport-jwt').Strategy;
const ExtractJwt=require('passport-jwt').ExtractJwt;
const User=require('./models/User');
const config=require('./config/config')
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI||"mongodb://localhost:27017/UserDB", { useNewUrlParser: true });

const options={
    jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:config.authentication.jwtSecret,
    algorithms:['HS256']
};

const strategy=new JwtStrategy(options,(payload,done)=>{
    console.log("Inside Strategy");
    console.log(payload.id);
    User.findOne({_id:payload.id}).then((user)=>{
        if(user){
            return done(null,user);
        }
        else
        {
            return done(null,false);
        }
    }).catch(err=>done(err,null));
})

module.exports=(passport)=>{
    passport.use(strategy)
}
