const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI||"mongodb://localhost:27017/UserDB", { useNewUrlParser: true });
const Student=require('../models/Student');
module.exports={
    registerStudent(req,res){
        const student_token= req.body.student_token;
        // User.find(function(err,faculties){
        //     res.send(faculties);
        // })

        //Need to implement to check for duplicate enteries
    const student=new Student({studentRollNo:req.body.studentRollNo,student_token:student_token,created_at:new Date()});
    student.save().then((student) => {
        res.send({registration:"Successfull"}); 
    })
    .catch((error) => {
        console.log(error);
        res.send(400, "Bad Request");
    });
    }
    
    
}