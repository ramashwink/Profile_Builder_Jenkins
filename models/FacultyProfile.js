const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI||"mongodb://localhost:27017/UserDB", { useNewUrlParser: true });
const LinkSchema = new mongoose.Schema({ link: String });
const ProjectSchema = new mongoose.Schema({
     projectName: String ,
     currentlyworking:Boolean,
     startdate:Date,
     enddate:Date,
     contributers:String,
     associated_with:String,
     project_url:String,
     studentVisibility:{type:Boolean,default:true},
     project_description:String
    });
const PublicationSchema=new mongoose.Schema({
    publicationName: String ,
    startdate:Date,
    enddate:Date,
    link: String 
   });
const EndorseSchma=new mongoose.Schema({
    endorsedfacultyId:String,
    facultyendorsingId:String,
    facultyendorsingName:String,
    description:String,
    endorsementdate:Date,
})
const RequestSchema=new mongoose.Schema({
    studentRollNo: String ,
    studentDescription:String,
   }); 
const AcceptedRequestSchema=new mongoose.Schema({
    studentRollNo: String ,
    studentDescription:String,
   }); 
const FacultyProfileSchema=new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    FirstName:{
        type:String,
        required:[true,"FirstName has not been entered"]
    },
    LastName:{
        type:String,
        required:[true,"LastName has not been entered"]
    },
    ProjectAvailability:{
        type:Boolean,
        default:true,
        required:[true,"ProjectAvailability has not been entered"]
    },
    Address:{
        type:String,
        required:[true,"Address has not been entered"]
    },
    City:{
        type:String,
        required:[true,"City has not been entered"]
    },
    Description:{
        type:String,
        required:[true,"Description has not been entered"]
    },
    PhoneNo:{
        type:String,
        required:[true,"Description has not been entered"]
    },
    Department:{
        type:String,
        required:[true,"Department has not been entered"]
    },
    links:[LinkSchema],
    publications:[PublicationSchema],
    projects:[ProjectSchema],
    requests:[RequestSchema],
    acceptedrequests:[AcceptedRequestSchema],
    endorsements:[EndorseSchma],
    requestContactMe:{
        type: String,
        default:'Email',
    },
    requestCap:{
        type: Number,
        default:100,
    },
    preferences:{
        type:Array
    },
    ProfilePhotoPath:{
        type:String,
    },
    created_at:{
        type:Date
    },
    modified_at:{
        type:Date
    },

     /*Profile Visits*/
    sunday:{
        type:Number
    },
    monday:{
        type:Number
    },
    tuesday:{
        type:Number
    },
    wednesday:{
        type:Number
    },
    thursday:{
        type:Number
    },
    friday:{
        type:Number
    },
    saturday:{
        type:Number
    },
    year:{
        type:Number
    },
    tcount:{
        type:Number
    },
    January:{
        type:Number
    },
    February:{
        type:Number
    },
    March:{
        type:Number
    },
    April:{
        type:Number
    },
    May:{
        type:Number
    },
    June:{
        type:Number
    },
    July:{
        type:Number
    },
    August:{
        type:Number
    },
    September:{
        type:Number
    },
    October:{
        type:Number
    },
    November:{
        type:Number
    },
    December:{
        type:Number
    },
    /*Faculty Visits*/
    fvisits:{
        type:Number
    },
    fsunday:{
        type:Number
    },
    fmonday:{
        type:Number
    },
    ftuesday:{
        type:Number
    },
    fwednesday:{
        type:Number
    },
    fthursday:{
        type:Number
    },
    ffriday:{
        type:Number
    },
    fsaturday:{
        type:Number
    },
    fJanuary:{
        type:Number
    },
    fFebruary:{
        type:Number
    },
    fMarch:{
        type:Number
    },
    fApril:{
        type:Number
    },
    fMay:{
        type:Number
    },
    fJune:{
        type:Number
    },
    fJuly:{
        type:Number
    },
    fAugust:{
        type:Number
    },
    fSeptember:{
        type:Number
    },
    fNovember:{
        type:Number
    },
    fDecember:{
        type:Number
    },
    npublicationCount:{
        type:Number  
    },
    fpublicationCount:{
        type:Number
    },
})
module.exports=mongoose.model("FacultyProfile",FacultyProfileSchema);
