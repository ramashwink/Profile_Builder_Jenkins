const AuthenticationController=require('./controllers/AuthenticationController');
const FacultyFetchController=require('./controllers/FacultyFetchController');
const RegisterStudentController=require('./controllers/RegisterStudentController');
const StudentFetchController=require('./controllers/StudentFetchController');

const AuthenticationControllerPolicy=require('./policies/AuthenticationControllerPolicy');

const ForgetRequestController=require('./controllers/ForgetRequestController');

const EachFacultyProfileFetchController=require('./controllers/EachFacultyProfileFetchController');

const AllFacultyProfileFetchController=require('./controllers/AllFacultyProfileFetchController');

const passport=require('passport');
require('./passport')(passport) 
function isAdmin(req,res,next)
{
    if(req.isAuthenticated()&&req.user.isAdmin==true)
    {
        next()
    }
    else
    {
        res.status(409).json({success:false,msg:'You are not Authorized'})
    }
}


const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: __dirname+'/public/upload/',
    filename: function(req, file, cb) {
      console.log("inside file naming");
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });

    function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Error: Images Only!');
    }
  }
const upload = multer({
    storage: storage,
    limits: {
      fileSize: 100000000000
    },
    fileFilter: function(req, file, cb) {
      checkFileType(file, cb);
    }
  });




module.exports=(app)=>
{
    app.use(passport.initialize());
    app.post('/register',AuthenticationControllerPolicy.register,AuthenticationController.register)

    app.post('/changePassword',AuthenticationController.changePassword)

    // app.post('/checkAdmin',AuthenticationController.checkAdmin)

    app.post('/login',AuthenticationController.login)
    // app.post('/protected-route',passport.authenticate('jwt', { session: false }),(req,res,next)=>{
    //     console.log(req.isAuthenticated());
    //     res.status(200).json({success:true,msg:'You are Authorized'})
    // })

    // app.post('/admin-route',passport.authenticate('jwt', { session: false }),(req,res,next)=>{
        
    // if(req.isAuthenticated()&&req.user.isAdmin==true)
    //      {
    //     console.log("You are allowed into admin route");
    //     res.status(200).json({success:true,msg:'You are Authorized into admin route'})
    //    }
    // else
    // {
    //     res.status(409).json({success:false,msg:'You are not Authorized'})
    // }
        
    // })
 
    //Faculties
    app.post('/fetchfaculties',FacultyFetchController.fetchfaculties)
    app.post('/deletefaculty',FacultyFetchController.deleteFaculty)
    //Students
    app.post('/registerStudent',RegisterStudentController.registerStudent)
    app.post('/fetchstudents',StudentFetchController.fetchstudents)
    app.post('/deletestudent',StudentFetchController.deletestudent)
    app.get('/samplecasetest',StudentFetchController.samplecasetest)

    //forgetPassword
    app.post('/addForgetRequests',ForgetRequestController.newForgetRequest)
    app.post('/fetchforgetrequest',ForgetRequestController.fetchforgetrequests)
    app.post('/deleteforgetrequest',ForgetRequestController.deleteforgetrequests)

    //Authentication
    app.post('/checkUser',AuthenticationController.checkUser)


//SSE events

    app.get('/check-faculty-updates',FacultyFetchController.checkupdatefaculties);
    app.get('/check-student-updates',StudentFetchController.checkupdatestudents);



//FacultyProfile
app.post('/fetchTheFacultyProfile',EachFacultyProfileFetchController.fetchEachFacultyProfile);
app.post('/addFacultyBasicDetails',EachFacultyProfileFetchController.addFacultyBasicDetails);
app.post('/addFacultyLinks',EachFacultyProfileFetchController.addFacultyLinks);
app.post('/addFacultyPreferences',EachFacultyProfileFetchController.addFacultyPreferences);
app.post('/addFacultyProject',EachFacultyProfileFetchController.addFacultyProject);
app.post('/addFacultyPublication',EachFacultyProfileFetchController.addFacultyPublication);
app.post('/editFacultyLinks',EachFacultyProfileFetchController.editFacultyLinks);
app.post('/addPublicationCount',EachFacultyProfileFetchController.addPublicationCount);
app.post('/editPublication',EachFacultyProfileFetchController.editPublication);
app.post('/editFacultyProject',EachFacultyProfileFetchController.editFacultyProject);
app.post('/editPassword',AuthenticationController.editPassword);
app.post('/editDetails',EachFacultyProfileFetchController.editDetails);
app.post('/sentRequest',EachFacultyProfileFetchController.sentRequest);
app.post('/updateRequest',EachFacultyProfileFetchController.updateRequest);
app.post('/rejectEmail',EachFacultyProfileFetchController.rejectEmail);
app.post('/deleterequest',EachFacultyProfileFetchController.deleterequest)
app.post('/updateSettings',EachFacultyProfileFetchController.updateSettings)
app.post('/endorseFaculty',EachFacultyProfileFetchController.endorseFaculty)
app.post('/deletelink',EachFacultyProfileFetchController.deletelink)
app.post('/deletepublication',EachFacultyProfileFetchController.deletepublication)
app.post('/deleteProject',EachFacultyProfileFetchController.deleteProject)


app.post('/uploadProfilePhoto',EachFacultyProfileFetchController.addFacultyProfilePhoto );


//AllFacultyProfiles
app.post('/fetchallfacultyprofiles',AllFacultyProfileFetchController.fetchAllFacultyProfiles);

//Sample
// app.post('/sample',EachFacultyProfileFetchController.sample);

}