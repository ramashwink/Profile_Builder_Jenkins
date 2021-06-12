<template>
<div>
        <the-header></the-header>
       <div class="main-block">
        <h1>Add a new student </h1>
        <label id="icon" for="name"><i class="fas fa-user"></i></label>
        <input type="text" name="student_roll_no" placeholder="Student Roll Number" v-model="studentRollNo" autocomplete="new-password">
        <br>
        <label id="icon" for="token"><i class="fas fa-key"></i></label>
        <input type='text' name="student_token" placeholder="Student Token" v-model="student_token" autocomplete="new-password">
        <br>
        <div>
            <p class="error" v-if="error!=''">{{error}}</p>
        </div>
        <div class='btn-block'>
        <button @click="registerStudent">Register</button>
        </div>
    </div>
</div>
 
</template>
<script>
import RegisterStudent from '@/services/RegisterStudent';
export default {
    data(){
        return{
            studentRollNo:'',
            student_token:'',
            error:''
        }
    },
    methods:{
        async registerStudent(){
          
            try {
                  const response =await RegisterStudent.registerStudent({ studentRollNo:this.studentRollNo,student_token:this.student_token})
                  if(response.data.registration=="Successfull"){
                      this.$router.replace({name: 'admin', params: { load: "Student" }});
                  }
               
            } catch (error) {
                this.error=error.response.data.error;
            }
        }
    }
}
</script>

<style scoped>
.error{
    color: red;
}
.main-block {
    max-width: 340px; 
    min-height: 250px; 
    padding: 5px 25px;
    margin: auto;
    border-radius: 5px; 
    border: solid 1px #ccc;
    box-shadow: 1px 2px 5px rgba(0,0,0,.31); 
    background: #ebebeb; 
    position: absolute;
    text-align: center;
    margin-left:38%;
    margin-top: 30px;
    }

    body, div, h1, form, input, p { 
    padding: 0;
    margin: 0;
    outline: none;
    font-family: 'Ubuntu', sans-serif;
    font-size: 16px;
    color: #666;
    text-align:center;
    }
    h1 {
    padding: 10px 0;
    font-size: 32px;
    font-weight: 300;
    text-align: center;
    }
    p {
    font-size: 12px;
    }
    hr {
    color: #a9a9a9;
    opacity: 0.3;
    }
    input[type=text], input[type=password] {
    width: calc(100% - 57px);
    height: 36px;
    margin: 13px 0 0 -5px;
    padding-left: 10px; 
    border-radius: 0 5px 5px 0;
    border: solid 1px #cbc9c9; 
    box-shadow: 1px 2px 5px rgba(0,0,0,.09); 
    background: #fff; 
    }
    input[type=password] {
    margin-bottom: 15px;
    }
    .btn-block {
    margin-top: 10px;
    text-align: center;
    }
    button {
    width: 100%;
    padding: 10px 0;
    margin: 10px auto;
    border-radius: 5px; 
    border: none;
    background: #383e56; 
    font-size: 14px;
    font-weight: 600;
    color: #fff;
    }
    button:hover {
    background: #142850;
    }
    #icon {
    display: inline-block;
    padding: 9.3px 15px;
    box-shadow: 1px 2px 5px rgba(0,0,0,.09); 
    background: #383e56;
    color: #fff;
    text-align: center;
    }
</style>