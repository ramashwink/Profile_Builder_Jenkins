const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI||"mongodb://localhost:27017/UserDB", { useNewUrlParser: true });
const FacultyProfile=require('../models/FacultyProfile');
const Students=require('../models/Student');
module.exports={
    deletelink(req,res){
        FacultyProfile.findOneAndUpdate({_id: req.body.id}, {$pull: {links: {_id: req.body.linkid}}}, function(err, data){
            res.send({message:"success"})
        });
    },
    deletepublication(req,res){
        FacultyProfile.findOneAndUpdate({_id: req.body.id}, {$pull: {publications: {_id: req.body.publicationId}}}, function(err, data){
            res.send({message:"success"})
        });
    },
    deleteProject(req,res){
        FacultyProfile.findOneAndUpdate({_id: req.body.id}, {$pull: {projects: {_id: req.body.project_id}}}, function(err, data){
            res.send({message:"success"})
        });
    },
    addPublicationCount(req,res){
        if(req.body.loggedInId!=null){
            if(req.body.loggedInId!=req.body.id){
                FacultyProfile.findByIdAndUpdate({_id:req.body.id},{'$inc': {'fpublicationCount':1}},{new:true})
                .then((data)=>console.log("updated"))
                .catch((err)=> console.log(err))
            }
        }
        else
        {           
            FacultyProfile.findByIdAndUpdate({_id:req.body.id},{'$inc': {'npublicationCount':1}},{new:true})
            .then((data)=>console.log("updated"))
            .catch((err)=> console.log(err))

        }        
    },
    endorseFaculty(req,res){
        var endorsedFacultyId=req.body.endorsedfacultyid;
        var endorsingFacultyId=req.body.facultyendorsing;
        var endorseDate=req.body.date;
        var endorseDescription=req.body.endorseDescription;
        FacultyProfile.findOne({_id:endorsingFacultyId}, function(err2, facultyProfile){
            if (facultyProfile!=null){
                FacultyProfile.findOne({_id:endorsedFacultyId}, function(err1, facultyProfile2){
                    if(facultyProfile2!=null){
                        var endorse={endorsedfacultyId:endorsedFacultyId,
                            facultyendorsingId:endorsingFacultyId,
                            facultyendorsingName:facultyProfile.FirstName+" "+facultyProfile.LastName,
                            description:endorseDescription,
                            endorsementdate:endorseDate};
                        FacultyProfile.findOneAndUpdate({ _id:endorsedFacultyId  },{ $push: { endorsements: endorse} },function (error, success) {
                            if (error) {
                            console.log(error);
                            } else {
                            res.send({message:"success"})
                        }
                        });
                    }
                });
        

            }
        });

    },
    fetchEachFacultyProfile(req,res){
        FacultyProfile.findOne({_id:req.body.id}, function(err, facultyProfile){
            if (err){
                console.log("errr",err);
            }else{
                
                res.send(facultyProfile);
            }
        });

        // Profile Visits Code

        var d = new Date();
        var weekday = new Array(7);
        weekday[0] = "sunday";
        weekday[1] = "monday";
        weekday[2] = "tuesday";
        weekday[3] = "wednesday";
        weekday[4] = "thursday";
        weekday[5] = "friday";
        weekday[6] = "saturday";

        var months = new Array(12);
        months[0] = "January";
        months[1] = "February";
        months[2] = "March";
        months[3] = "April";
        months[4] = "May";
        months[5] = "June";
        months[6] = "July";
        months[7] = "August";
        months[8] = "September";
        months[9] = "October";
        months[10] = "November";
        months[11] = "December";

        var fmonths = new Array(12);
        fmonths[0] = "fJanuary";
        fmonths[1] = "fFebruary";
        fmonths[2] = "fMarch";
        fmonths[3] = "fApril";
        fmonths[4] = "fMay";
        fmonths[5] = "fJune";
        fmonths[6] = "fJuly";
        fmonths[7] = "fAugust";
        fmonths[8] = "fSeptember";
        fmonths[9] = "fOctober";
        fmonths[10] = "fNovember";
        fmonths[11] = "fDecember";

        var fweekday = new Array(7);
        fweekday[0] = "fsunday";
        fweekday[1] = "fmonday";
        fweekday[2] = "ftuesday";
        fweekday[3] = "fwednesday";
        fweekday[4] = "fthursday";
        fweekday[5] = "ffriday";
        fweekday[6] = "fsaturday";

        console.log("Logged In Id"+req.body.loggedinUser);
        if(req.body.loggedinUser!=null){
            if(req.body.loggedinUser!=req.body.id){
                FacultyProfile.findByIdAndUpdate({_id:req.body.id},{'$inc': {'fvisits':1}},{new:true})
                .then((data)=>console.log("updatded"))
                .catch((err)=> console.log(err))

                /*Day Updation*/
                var wday=fweekday[d.getDay()]; 
                var update={}
                update[wday]=1;
                FacultyProfile.findByIdAndUpdate({_id:req.body.id},{'$inc': update},{new:true})
                .then((data)=>console.log("updatded Day"))
                .catch((err)=> console.log(err))

                /*Month Updation*/
                var updateMonth={}
                var fmonth=fmonths[d.getMonth()]; 
                updateMonth[fmonth]=1;
                FacultyProfile.findByIdAndUpdate({_id:req.body.id},{'$inc': updateMonth},{new:true})
                .then((data)=>console.log("updatded Day"))
                .catch((err)=> console.log(err))
            }
        }
        else
        {
             wday=weekday[d.getDay()]; 
            var month=months[d.getMonth()]; 
            update={}
            update[wday]=1;
        
            updateMonth={}
             updateMonth[month]=1;
              console.log(update);
            FacultyProfile.findByIdAndUpdate({_id:req.body.id},{'$inc': {'tcount':1}},{new:true})
            .then((data)=>console.log("updatded"))
            .catch((err)=> console.log(err))
            FacultyProfile.findByIdAndUpdate({_id:req.body.id},{'$inc': update},{new:true})
            .then((data)=>console.log("updatded Day"))
            .catch((err)=> console.log(err))
            FacultyProfile.findByIdAndUpdate({_id:req.body.id},{'$inc': updateMonth},{new:true})
            .then((data)=>console.log("updatded Day"))
            .catch((err)=> console.log(err))
        }
    },
    addFacultyLinks(req,res){
        var link = { link:req.body.link };
        FacultyProfile.findOneAndUpdate({ _id: req.body.id },{ $push: { links: link  } },function (error, success) {
            if (error) {
            console.log(error);
            } else {
            res.send({message:"success"})
        }
    });
    },
    addFacultyProject(req,res){
        var project = { projectName:req.body.projectName,
            currentlyworking:req.body.currentlyworking,
            startdate:req.body.startdate,
            enddate:req.body.enddate,
            contributers:req.body.contributers,
            associated_with:req.body.associated_with,
            project_url:req.body.project_url,
            project_description:req.body.project_description
         };
        FacultyProfile.findOneAndUpdate({ _id: req.body.id },{ $push: { projects: project} },function (error, success) {
            if (error) {
            console.log(error);
            } else {
            res.send({message:"success"})
        }
    });
    },
    addFacultyPreferences(req,res){
        var preferencelist = req.body.preference;
        console.log(preferencelist);
        console.log(req.body.id );
        FacultyProfile.findOneAndUpdate({ _id: req.body.id },{'preferences': req.body.preference},function (error, success) {
            if (error) {
            console.log(error);
            } else {
            res.send({message:"success"})
        }
    });
    },
    addFacultyBasicDetails(req,res){
        
        const facultyprofile=new FacultyProfile({_id:req.body.id,
            FirstName:req.body.fname,
            LastName:req.body.lname, 
            Address:req.body.address,
            City:req.body.city,
            PhoneNo:req.body.phoneNo,
            Description:req.body.description,
            Department:req.body.department,
            created_at:new Date(),
            modified_at:new Date()});
        facultyprofile.save().then(() => {
            res.send({registration:"Successfull"}); 
        })
        .catch((error) => {
            console.log(error);
            res.send(400, "Bad Request");
        });
    },

    addFacultyProfilePhoto(req,res){

      FacultyProfile.findOneAndUpdate({ _id: req.body.id },{ProfilePhotoPath:req.body.pictureurl},function (error, success) 
      {
        if (error) 
        {
        console.log(error);
        } 
        else {
        res.send({message:"success"})
        }
    });
  },
  addFacultyPublication(req,res){
    FacultyProfile.findOneAndUpdate({ _id: req.body.id },
        { $push: { publications: {publicationName:req.body.publicationname,link:req.body.link,startdate:req.body.startdate,enddate:req.body.enddate}} },function (error, success) {
        if (error) {
        console.log(error);
        } else {
        res.send({message:"success"})
    }
    });
  },

//Editing
editFacultyLinks(req,res){
        console.log("Id" +req.body.id);
        console.log("link" +req.body.link);
        console.log("link" +req.body.linkid);
        FacultyProfile.updateOne({'links._id':req.body.linkid},
            {'$set': {
                'links.$.link': req.body.link,}},function(err,model) {
                if(err){
                    console.log(err);
                }
                else{
                    res.send({message:"success"})
                }
        });
    },
    editPublication(req,res){
        console.log("Id" +req.body.id);
        console.log("link" +req.body.publicationlink);
        console.log("Id of pbl" +req.body.publicationId);
        console.log("Publication Name" +req.body.publicationname);
        console.log("startdate" +req.body.startdate);
        console.log("enddate" +req.body.enddate);
        FacultyProfile.updateOne({'publications._id':req.body.publicationId},
            {'$set': {
                'publications.$.link': req.body.publicationlink,
                'publications.$.publicationName': req.body.publicationname,
                'publications.$.startdate': req.body.startdate,
                'publications.$.enddate': req.body.enddate,
            }},function(err) {
                if(err){
                    console.log(err);
                }
                else{
                    res.send({message:"success"})
                }
        });
    },
    editFacultyProject(req,res){
        console.log("Id" +req.body.id);
        console.log("projectname" +req.body.projectName);
        console.log("Id of project" +req.body.project_id);
        console.log("currently working" +req.body.currentlyworking);
        console.log("startdate" +req.body.startdate);
        console.log("enddate" +req.body.enddate);
        console.log("contributers" +req.body.contributers);
        console.log("associated_with" +req.body.associated_with);
        console.log("project_url" +req.body.project_url);
        console.log("project_description" +req.body.project_description);
        FacultyProfile.updateOne({'projects._id':req.body.project_id},
            {'$set': {
                'projects.$.projectName': req.body.projectName,
                'projects.$.currentlyworking': req.body.currentlyworking,
                'projects.$.startdate': req.body.startdate,
                'projects.$.enddate': req.body.enddate,
                'projects.$.contributers': req.body.contributers,
                'projects.$.associated_with': req.body.associated_with,
                'projects.$.project_url': req.body.project_url,
                'projects.$.project_description': req.body.project_description,
                'projects.$.studentVisibility': req.body.studentVisibility,
            }},function(err,model) {
                if(err){
                    console.log(err);
                }
                else{
                    res.send({message:"success"})
                }
        });
    },
    editDetails(req,res){
        console.log("Id" +req.body.id);
        console.log("projectname" +req.body.projectName);
        console.log("Id of project" +req.body.project_id);
        console.log("currently working" +req.body.currentlyworking);
        console.log("startdate" +req.body.startdate);
        console.log("enddate" +req.body.enddate);
        console.log("contributers" +req.body.contributers);
        console.log("associated_with" +req.body.associated_with);
        console.log("project_url" +req.body.project_url);
        console.log("project_description" +req.body.project_description);
        FacultyProfile.updateOne({'_id':req.body.id},
            {'$set': {
                'FirstName': req.body.fname,
                'LastName': req.body.lname,
                'Address': req.body.address,
                'City': req.body.city,
                'PhoneNo': req.body.phoneNo,
                'Department':req.body.department,
                'Description': req.body.description,
                'ProjectAvailability':req.body.availability
            }},function(err,model) {
                if(err){
                    console.log(err);
                }
                else{
                    res.send({message:"success"})
                }
        });
    },
    sentRequest(req,res){
        FacultyProfile.findOne({'_id':req.body.id},function(err,st){
            if(st!=null){
                maxcount=st.requestCap;
                preqcount=st.requests.length;
                areqcount=st.acceptedrequests.length;
                tcount=preqcount+areqcount+1;
                if(tcount>maxcount){
                    res.send({message:"Requests Limit for the faculty exceeded"});
                }
                else{
                    Students.findOne({ studentRollNo: req.body.studentRollNo},function(err,student){
                        if(student!=null){
                            if(student.student_token==req.body.studentToken){
                                var request = { studentRollNo:req.body.studentRollNo,
                                    studentDescription:req.body.studentMessage,
                                 };
                                FacultyProfile.findOne({'_id':req.body.id,'requests.studentRollNo':req.body.studentRollNo},function(err,st){
                                    console.log("Student reuest");
                                    console.log(st);
                                    if(st==null){
                                        FacultyProfile.findOne({'_id':req.body.id,'acceptedrequests.studentRollNo':req.body.studentRollNo},function(err,ast){
                                            if(ast==null){
                                                    FacultyProfile.findOneAndUpdate({ _id: req.body.id },{ $push: { requests: request} },function (error, success) {
                                                        if (error) {
                                                        console.log(error);
                                                        } else {
                                                        res.send({message:"success"})
                                                    }
                                                });                                         
                                                }
                                                else{
                                                    res.send({message:"Only 1 accepted request allowed"})
                                                }   
                                            });                         
                                    }
                                    else
                                    {
                                        res.send({message:"Only 1 request allowed"})
                                    }
                                }) 
             
                            }
                            else
                            {
                                res.send({message:"Invalid Request"})
                            }
                        }
                        else{
                            res.send({message:"Invalid Request"})
                        }
                    });
                }                
            }
      
        });

        
    },
    sample(req,res){
        res.send()
    },
    updateRequest(req,res){
   
        FacultyProfile.findOneAndUpdate({_id: req.body.id}, {$pull: {requests: {_id: req.body.request._id}}}, function(err, data){
           
          });
        FacultyProfile.findOneAndUpdate({ _id: req.body.id},
            { $push: { acceptedrequests: req.body.request} },function (error, success) {
            if (error) {
               
            } else {
                res.send({message:"success"})
        }
        });
    },
    rejectEmail(req,res){
        FacultyProfile.findOneAndUpdate({_id: req.body.id}, {$pull: {requests: {_id: req.body.request._id}}}, function(err, data){
            res.send({message:"success"})
        });
    },
    deleterequest(req,res){
        FacultyProfile.findOneAndUpdate({_id: req.body.id}, {$pull: {acceptedrequests: {_id: req.body.request._id}}}, function(err, data){
            res.send({message:"success"})
        });
    },
    updateSettings(req,res){
        console.log("inside update settings");
        FacultyProfile.updateOne({'_id':req.body.id},
        {'$set': {
            'requestContactMe': req.body.requests_select,
            'requestCap': req.body.requests_cap,
        }},function(err,model) {
            if(err){
                console.log(err);
            }
            else{
                res.send({message:"success"})
            }
    });
    },


}

