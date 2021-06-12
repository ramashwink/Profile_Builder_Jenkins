process.env.NODE_ENV = 'test';

const expect = require('chai').expect;
const request = require('supertest');

const app = require('../server.js');
const conn=require('../dbTest/index.js');


describe('POST /registerStudent', async() => {
  await before(() => {
    conn.connect();
  })

  await after(() => {
    conn.close();
  })

  await it('OK, creating a new record for student', () => {
    request(app).post('/registerStudent')
      .send({ studentRollNo: 'CB.EN.U4CSE18301', student_token: "dfghjksdf3456" })
      .then((res) => {
        const body = res.body;
        expect(body).to.contain.property('registration');
      })
      .catch((err)=>{console.log(err)});
  });
  await it('OK, deleting a student record', () => {
    request(app).post('/deletestudent')
      .then((res) => {
        const body = res.body;
        expect(body).to.contain("Successfully Deleted");
      })
      .catch((err)=>{console.log(err)});
  
  });
  await it('OK, fetching student records', () => {
    request(app).get('/fetchstudents')
      .then((res) => {
        const body = res.body;
        const faculties=res.body.faculties;
        expect(body.length).to.not.equal(0);
      })
      .catch((err)=>{console.log(err)});
  });
  await it('OK, fetching forget requests', () => {
    request(app).get('/fetchforgetrequest')
      .then((res) => {
        const body = res.body;
        expect(body.length).to.not.equal(0);
      })
      .catch((err)=>{console.log(err)});
  });
  await it('OK, deleting a forget request', () => {
    request(app).post('/deleteforgetrequest')
      .then((res) => {
        const body = res.body;
        expect(body).to.contain("Successful");
      })
      .catch((err)=>{console.log(err)});
  
  });
  




  
  await it('OK, deleting a faculty record', () => {
    request(app).post('/deletefaculty')
      .then((res) => {
        const body = res.body;
        expect(body).to.contain("Successful");
      })
      .catch((err)=>{console.log(err)});

});
await it('OK, displaying all faculty details', () => {
  request(app).get('/fetchallfacultyprofiles')
    .then((res) => {
      const body = res.body;
      expect(body.length).to.not.equal(0);
    })
    .catch((err)=>{console.log(err)});
});
await it('OK, fetching faculty', () => {
  request(app).get('/fetchfaculties')
    .then((res) => {
      const body = res.body;
      const faculties=res.body.faculties;
      expect(body.length).to.not.equal(0);
    })
    .catch((err)=>{console.log(err)});
});
await it('OK, creating a new record for faculty', () => {
  request(app).post('/register')
    .send({ email: 'gayathri@gmail.com', password: "#rtER45sdfgh",isAdmin:false })
    .then((res) => {
      const body = res.body;
      expect(body).to.contain.property('registration');
    })
    .catch((err)=>{console.log(err)});
  });
  await it('OK, adding links', () => {
    request(app).post('/addFacultyLinks')
    .send({ id: '6758924', link: "www.google.com"})
      .then((res) => {
        const body = res.body;
        expect(body).to.contain.property('success');
      })
      .catch((err)=>{console.log(err)});
  });
})