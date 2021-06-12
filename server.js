
const express= require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const morgan=require('morgan');
const config=require('./config/config');
const passport = require('passport');
const serveStatic = require('serve-static')
const app=express();
app.use(bodyParser.urlencoded({limit: '50mb',extended:false,parameterLimit: 1000000 }));
app.use(bodyParser.json({limit: '50mb'}));
app.use(cors());
app.use(morgan('dev'));
app.use(express.static('public'));
app.enable('trust proxy'); 
app.use(serveStatic(__dirname+"/dist"));
app.get(/.*/,function(req,res){
    res.sendFile(__dirname+"/dist/index.html");
});
require('./routes')(app)

/*multer*/
/*multer end*/
app.listen(process.env.PORT||8081,function(err)
{
    if(err)
    {
        console.log(err);
    }
    else{
        console.log('Server has started and is running');
    }
});

