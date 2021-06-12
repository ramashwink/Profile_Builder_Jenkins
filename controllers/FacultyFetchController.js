const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI||"mongodb://localhost:27017/UserDB", { useNewUrlParser: true });
const User=require('../models/User');
const FacultyProfile=require('../models/FacultyProfile');
module.exports={
    fetchfaculties(req,res){
        User.find(function(err,faculties){
            res.send(faculties);
        })
    },
    deleteFaculty(req,res){
        console.log(req.body);
        User.findByIdAndDelete(req.body.id,function(err){
            if(err){
                console.log(err);
                res.send(err)
            }
            else
            {
                FacultyProfile.findByIdAndDelete(req.body.id,function(err){
                    if(err){
                        console.log(err);
                        res.send(err)
                    }
                    else
                    {
                        res.send("successful")
                        console.log("Successfully Deleted");
                    }
                });
            }
        });
     
    },
    checkupdatefaculties(req,res){
        var allfaculties;
        res.writeHead(200, {
            'Connection': 'keep-alive',
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache'
          });
                 
        var ticker = setInterval(function() {
            console.log("Running In Faculty ticker");
                User.find(function(err,faculties){
                    allfaculties=faculties
                 }).then(()=>{res.write('data: ' + JSON.stringify(allfaculties) + '\n\n');})
            }, 2500);

            req.on('close', function() {
                console.log('Client disconnected from event stream ');
                res.end();
                clearInterval(ticker);
            });    
              
      
    
      
    },
}