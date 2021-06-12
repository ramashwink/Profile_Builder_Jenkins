<template>
    <div  class="card">
        <em @click="deleteFacultyRequest" class="far fa-trash-alt"></em>
        <h4><em class="fas fa-envelope-open"></em>  Faculty Email: <span>{{email}}</span></h4>
        <h4><em class="fa fa-exclamation-circle"></em> Issue: <span>{{ problem }}</span></h4>
        
        
        <div class="center">
           <h5  @click="showtheDescription" v-if="problem=='Report An Bug'">Show Description</h5>
           <p v-if="showDescription">{{description}}</p>
           <h4 v-if="completed" class="green">Done</h4>
           <button name="reset" @click="resetPassword" class="outline" v-if="problem=='Forgot Password' && !completed">Reset Password</button>
        </div>
       
        <p class="left">Created At : {{ created_at }}  </p>
    </div>
</template>


<script>
import AuthenticateService from '@/services/AuthenticationService';
import DeleteForgetRequest from '@/services/FetchingForgetRequests';
export default {
    props:['email','description','created_at','id','problem','completed'],
    data(){
      return{
        changed:false,
        showDescription:false
      }
      
    },
  methods:{
    showtheDescription(){
      this.showDescription=!this.showDescription;
    },
    async resetPassword(){
      console.log(this.id);
      try {
            const response =await AuthenticateService.changePassword({email:this.email,id:this.id})
            if(response.data.msg=="Successfull"){
                console.log("successfull");
               this.$emit('messageFromStudentChild','valueChanged')
            }
            console.log(response);
            } catch (error) {
                console.log(error);
                this.error=error.response.data.error;
            }
  
    },
    async deleteFacultyRequest(){
      console.log(this.id);
       DeleteForgetRequest.deleteForgetRequest({id:this.id}).then((response)=>{
           console.log("Inside After promise");
           if(response.status==200){
               this.$emit('messageFromStudentChild','valueChanged')
           }
           else
           {
               console.log("Error in Student deletion");
           }
       })
      
    }
  }
}
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap');
.green{
  color: green;
}
.center{
  text-align:center
}
.left
{
  text-align: left;
}
.right
{
  text-align: right;
  font-size: 0.8rem;
  padding-left: 18%;
}
.card {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border: 1px solid #424242;
  text-align: left;
  padding: 0.5rem 1rem;
  margin: 2rem auto;
  max-width: 40rem;
}
.far,.fas,.fa {
    font-size: 2.0rem;
    padding: 5px 2px 2px 0;
    }
li {
  margin: 1rem 0;
  border-radius: 12px;
  text-align: left;
  padding: 1rem;
}

h4 {
  font-size: 1.2rem;
}

h3,
h4,h5 {
  font-family: 'Montserrat', sans-serif;
  margin: 0.5rem 0.5rem;
}

div {
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
}
p{
  font-family: 'Montserrat', sans-serif;
  padding-top:2px;
  font-size: 0.8rem;
}
span{
  font-size: 1.2rem;
  font-weight:normal;
  font-family: 'Montserrat', sans-serif;
}
.fa-trash-alt{
 position: relative;
   margin-left:98%;
  font-size: 1.0rem;
  color: red;
}
.fa-trash-alt:hover{
    color: grey;
}

button {
  
  text-align:center;
  padding: 0.75rem 1.5rem;
  
  font-family: 'Montserrat', sans-serif;
  background-color: #3a0061;
  border: 1px solid #3a0061;
  color: white;
  cursor: pointer;
  border-radius: 30px;
}

button:hover,
button:active {
  background-color: #270041;
  border-color: #270041;
}

.flat {
  background-color: transparent;
  color: #3a0061;
  border: none;
}

.outline {
  background-color: transparent;
  border-color: #270041;
  color: #270041;
}

.flat:hover,
.flat:active,
.outline:hover,
.outline:active {
  background-color: #edd2ff;
}
</style>