var req = require("request");
const axios = require('axios')
describe("GET /", () => {
    const body= 0;
    beforeAll((done) => {
        req.get("http://localhost:8081/fetchallfacultyprofiles", (error, response, body) => {
            console.log("/fetchallfacultyprofiles")
            body = response.body;
            //console.log(body);
            done();
            });
        });
        it("fetching faculties successfully", () => {
            expect(body.length).not.toBe(0);
        });
    beforeAll((done) => {
        const body=0;
        req.get("http://localhost:8081/fetchforgetrequest", (error, response, body) => {
            body = response.body;
                //console.log(body);
            done();
            });
        });
        it("fetching forget Requests", () => {
            expect(body.length).not.toBe("");
        });

    beforeAll((done) => {
        const body=0;
        req.post("http://localhost:8081/sample", (error, response, body) => {
            body = response.body;
            console.log("sample successful in post");
            console.log(body);
            done();
            });        
        });
        it("fetching faculties successfully", () => {
            expect(body.length).not.toBe(0);
        });
        
    beforeAll((done) => {
        axios
            .post('http://localhost:8081/editFacultyLinks', {
                id: '60b8d2bcca7d2a32fcc87ad9', linkid:"60c1e04d15567377acb67915" ,link: "https://stackoverflow.com/questions/14835582/nodejs"
            })
            .then(res => {
                console.log("/editFacultyLinks")
                done();
            })
            .catch(error => {
                console.error(error)
            })
        });
        it("successful",()=>{
            console.log("success");
        });
    beforeAll((done) => {
        axios
            .post('http://localhost:8081/login', {
                email: 'faculty3@gmail.com', password:"wrongpassword" 
            })
            .then(res => {
                console.log("/login")
                console.log(res.data)
                done();
            })
            .catch(error => {
                console.log("/loginNegativeCase")
                console.error(error.response.data)
                done();
            })
        });
        it("successful",()=>{
            console.log("success");
        });

    beforeAll((done) => {
        axios
            .post('http://localhost:8081/register', {
                email: 'faculty12@gmail.com', password:"noscandcapitalandnumber" 
            })
            .then(res => {
                console.log("/register")
                console.log(res.data)
                done();
            })
            .catch(error => {
                console.log("/registerNegativeCase")
                console.error(error.response.data)
                done();
            })
        });
        it("successful",()=>{
            console.log("success");
        });
});