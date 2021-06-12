var req = require("request");
const axios = require('axios')

describe("POST /", () => {
    /*beforeEach((done) => {
        axios
            .post('http://localhost:8081/deleteFaculty',{
                id:"60bc6ad47fad2c1790e1fa99"
            })
            .then(res => {
                console.log("/deleteFaculty")
                console.log(res.data)
                done();
            })
            .catch(error => {
                console.error(error.response.data)
                done();
            })
        });
        it("faculty deletion status",()=>{
            console.log("faculty deletion status : Successful ");
            //console.log(res.data);
        });*/

    beforeEach((done) => {
        axios
            .post('http://localhost:8081/registerStudent',{
                studentRollNo: 'CB.EN.U4CSE18340', student_token:"cse18340"
            })
            .then(res => {
                console.log("/registerStudent")
                console.log(res.data)
                done();
            })
            .catch(error => {
                console.error(error.response.data)
                done();
            })
        });
        it("successful registration of Student",()=>{
            console.log("Student registration status : Successful");
        });
});
    