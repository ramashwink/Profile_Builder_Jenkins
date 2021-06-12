const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI||"mongodb://localhost:27017/UserDB", { useNewUrlParser: true });
const Student=require('../models/Student');
module.exports={
    fetchstudents(req,res){
        Student.find(function(err,students){
            res.send(students);
        })
    },
    samplecasetest(req,res){
        res.send("It is working");
    },
    deletestudent(req,res){
        console.log(req.body);
        Student.remove({ studentRollNo: req.body.rollno },function(err){
            console.log("Inside");
            if(err){
                console.log(err);
                res.send(err)
            }
            else
            {
                res.send("Successfully Deleted")
                console.log("Successfully Deleted");
            }
        })
    },
    checkupdatestudents(req,res){
        var allstudents;
        res.writeHead(200, {
            'Connection': 'keep-alive',
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache'
          });
                 
        var ticker = setInterval(function() {
            console.log("Running In Student ticker");
            Student.find(function(err,students){
                    allstudents=students
                 }).then(()=>{res.write('data: ' + JSON.stringify(allstudents) + '\n\n');})
            }, 2500);

            req.on('close', function() {
                console.log('Client disconnected from event stream ');
                res.end();
                clearInterval(ticker);
            });    
              
      
    
      
    },
}