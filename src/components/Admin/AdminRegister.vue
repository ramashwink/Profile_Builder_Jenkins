<template>
    <div>
        <the-header></the-header>
        <div class="main-block">
        
        <h1>Add a new faculty </h1>
        <label id="icon" for="name"><em class="fas fa-user"></em></label>

        <input type="email" name="email" placeholder="Email" v-model="email" autocomplete="new-password">
        <br>
        <label id="icon" for="name"><em class="fas fa-key"></em></label>

        <input type="password" name="password" placeholder="Password" v-model="password" autocomplete="new-password">
        <br>
        <div>
            <p class="error" v-if="error!=''">{{error}}</p>
        </div>
        <div class="btn-block">
        <button @click="register" name="register">Register</button>
        </div>
    </div>
    </div>
    
</template>
<script>
import AuthenticateService from '@/services/AuthenticationService';
export default {
    data(){
        return{
            email:'',
            password:'',
            error:''
        }
    },
    methods:{
        async register(){
            console.log("Button Was clicked the email is "+this.email+" "+this.password);
            try {
                  const response =await AuthenticateService.register({email:this.email,password:this.password,isAdmin:false})
                  if(response.data.registration=="Successfull"){
                      this.$router.replace({name: 'admin', params: { load: "Faculty" }});
                  }
                console.log(response);
            } catch (error) {
                console.log(error);
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
    input[type=email], input[type=password] {
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