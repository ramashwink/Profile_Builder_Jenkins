<template>
    <div>
        <h1>Register</h1>
        <input type="email" name="email" placeholder="email" v-model="email" autocomplete="new-password">
        <br>
        <input type="password" name="password" placeholder="password" v-model="password" autocomplete="new-password">
        <br>
        <div>
            <p class="error" v-if="error!=''">{{error}}</p>
        </div>
        <button @click="register">Register</button>
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
                  const response =await AuthenticateService.register({
                email:this.email,
                password:this.password
            })
            this.$store.dispatch('setToken',response.data);
            this.$store.dispatch('setUser',response.data);
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
</style>