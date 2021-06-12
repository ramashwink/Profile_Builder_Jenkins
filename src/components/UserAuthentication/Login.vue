<template>
    <div>
      <the-header></the-header>
      
        <div class="box">
            <h1>Login</h1>
                <input type="email" name="email" placeholder="Email" v-model="email">
                <input type="password" name="password" placeholder="Password" v-model="password">
            <div>
            <p class="error" v-if="error!=''">{{error}}</p>
            </div>
            <button v-if="incorrect_login" @click="login">Login</button>
             <p @click="forgotpassword">Forgot Password</p>
        </div> 
        <div>
  
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
            error:'',
            incorrect_login:true,
            nooftimes:0
        };
    },
    created(){
        
      if(localStorage.getItem('nooffailedlogins')==null){
          localStorage.setItem('nooffailedlogins', 0);
      }
       if(localStorage.getItem('nooftimes')==null){
          localStorage.setItem('nooftimes', 0);
      }
       
      },
    methods:{
      forgotpassword(){
        this.$router.push("/ForgotPassword")
      },
      changeVisibility(){
        this.incorrect_login = !this.incorrect_login;
      },
       changeError(msg){
        this.error = msg;
      },
      
        async login(){
            try {
                const response =await AuthenticateService.login({
                email:this.email,
                password:this.password
            })
            localStorage.setItem('nooftimes', 0);
         
            this.$store.dispatch('setUser',response.data);

                if(response.data.isAdmin==true)
                {
              
                this.$router.replace('/admin');
                }else{
                 
                   this.$router.replace('/faculties/'+response.data.user._id);
                }
            } catch (error) {
                   var failedlogins = parseInt(localStorage.getItem('nooffailedlogins'));
                   this.changeError(error.response.data.errormessage);
                   if(failedlogins>4)
                   {
                    this.changeVisibility();
                    this.nooftimes= parseInt(localStorage.getItem('nooftimes'));
                     this.nooftimes+=1;
                     localStorage.setItem('nooftimes', this.nooftimes)
                     var timeouttime=2000*this.nooftimes;
                      this.changeError("Please Wait for "+timeouttime/1000+" seconds"); 
                
                     const insidethis=this;
                     setTimeout(function(){ 
                        insidethis.changeVisibility();
                        localStorage.setItem('nooffailedlogins', 0);
                        insidethis.changeError("");  
                     }, timeouttime);
                   }
                   failedlogins=failedlogins+1
                    localStorage.setItem('nooffailedlogins', failedlogins);
                        
            }
            
        
        }
    }
}
</script>

<style scoped>
.error{
    color: #a75864;
}
.box{
  border-radius: 5%;
  width: 300px;
  padding: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  background: #383e56;
  text-align: center;
}
.box h1{
  color: white;
  text-transform: uppercase;
  font-weight: 500;
}
.box input[type = "email"],.box input[type = "password"]{
  border:0;
  background: none;
  display: block;
  margin: 20px auto;
  text-align: center;
  border: 2px solid #3498db;
  padding: 14px 10px;
  width: 200px;
  outline: none;
  color: white;
  border-radius: 24px;
  transition: 0.25s;
}
.box input[type = "email"]:focus,.box input[type = "password"]:focus{
  width: 280px;
  border-color: #2ecc71;
}
.box button{
  border:0;
  background: none;
  display: block;
  margin: 20px auto;
  text-align: center;
  border: 2px solid #2ecc71;
  padding: 14px 40px;
  outline: none;
  color: white;
  border-radius: 24px;
  transition: 0.25s;
  cursor: pointer;
}
.box button:hover{
  background: #2ecc71;
}


</style>