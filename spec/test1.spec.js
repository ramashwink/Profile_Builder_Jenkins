var req = require("request");
const axios = require('axios')

describe("A suite", function() {
    it("contains spec with an expectation", function() {
      expect(true).toBe(true);
    });
});

describe("GET /", () => {
    const body= 0;
    beforeAll((done) => {
        req.get("http://localhost:8081/fetchfaculties", (error, response, body) => {
            body = response.body;
            done();
        });
    });
    it("fetching faculties successfully", () => {
        expect(body.length).not.toBe(0);
    });
    

    beforeAll((done) => {
        req.get("http://localhost:8081/fetchstudents", (error, response, body) => {
            body = response.body;
            done();
        });
    });
    it("fetching faculties successfully", () => {
        expect(body.length).not.toBe(0);
    });


    beforeAll((done) => {
        const body= 0;
        req.get("http://localhost:8081/sample", (error, response, body) => {
            body = response.body;
            console.log("/sample")
            console.log(response.body);
            done();
        });
    });
    it("fetching faculties successfully", () => {
        expect(body.length).not.toBe(0);
    });


    beforeAll((done) => {
        axios
            .post('http://localhost:8081/editDetails', {
                _id :"60b8d2bcca7d2a32fcc87ad9",
                FirstName: 'Kavi',
                LastName: 'R',
                Address: '19 A type 3 qtrs block 9',
                City: 'Seoul',
                PhoneNo: '9876463521',
                Description: 'PhD in physics',
                Department: 'EEE'
            })
            .then(res => {
                console.log("/editDetails")
                console.log(res.data)
                done();
            })
            .catch(error => {
                console.error(error.response.data)
                done();
            })
    });
    it("successful",()=>{
        console.log("success for edit basic details");
    });
});