<template>
  <div>
    <h1 class="aligncenter">Forget Password</h1>
    <base-card>
      <label for="facultyemail">Email:</label>
      <input
        name="facultyemail"
        type="email"
        placeholder="Email"
        v-model="email" 
      />
       <label for="problem">Please Select the problem:</label>
       <select id="cars" name="problem" v-model="problem">
        <option value="Forgot Password">Forgot Password</option>
        <option value="Report An Bug">Report An Bug</option>
      </select>
      <label v-if="problem=='Report An Bug'" for="description">Description:</label>
      <textarea  v-if="problem=='Report An Bug'" id="description" v-model="description" name="description" rows="7" cols="40" required>  </textarea>
      <h4>Please Answer the Question Given Below:</h4>
    
      <p ><span class="n1"> {{ randomFirstNumber }} </span> <span  class="n1"> + </span> <span class="n1">{{ randomSecondNumber }} </span>  <span  class="n1"> - </span> <span class="n1"> {{ randomThirdNumber }} </span></p>
      <input v-model="answer" type="number" />
      <p v-if="error!=''"  class="wrong">{{error}}</p>
      <button @click="checkSubmit" type="submit" value="submit">Submit</button>
      <button @click="randomCreation" type="reset" value="reset">Reset</button>
    </base-card>
  </div>
</template>

<script>
import FetchingForgetRequests from '@/services/FetchingForgetRequests';
import BaseCard from "../layout/BaseCard.vue";
export default {
  components: { BaseCard },
  data() {
    return {
      total: 0,
      email: "",
      description: "",
      tried: 0,
      success: true,
      randomFirstNumber: 0,
      randomSecondNumber: 0,
      randomThirdNumber: 0,
      answer: 0,
      error:'',
      problem:'Forgot Password'
    };
  },
  created() {
    this.randomCreation();
  },
  methods: {
    randomCreation() {
      this.randomFirstNumber = Math.ceil(Math.random() * 20);
      this.randomSecondNumber = Math.ceil(Math.random() * 20);
      this.randomThirdNumber = Math.ceil(Math.random() * 20);
    },
   async  checkSubmit(){
      var Actualanswer=(this.randomFirstNumber+this.randomSecondNumber)-this.randomThirdNumber;
    
      if(this.email=='' || (this.description=='' && this.problem=="Report An Bug"))
      {
 
        this.error="Please enter the Necessary details";
      }
      else
      {
        if(this.answer==Actualanswer)
        {
          this.tried+=1;
          this.sucess=true;
          this.error=""
           try {
                await FetchingForgetRequests.addForgetRequests({
                faculty_email:this.email,
                faculty_problem:this.problem,
                faculty_description:this.description,
            })
             this.$router.replace("/login");
            } catch (error) {
                this.error=error.response.data.error;
            }
        }
      else if(this.answer!=Actualanswer)
      {
        this.tried+=1;
          this.sucess=false;
          this.error="Validation failed.Please Try Again!!"
      }
      }
      
    }

  },

};
</script>

<style scoped>
.n2{
    padding: 4px 2px 2px 2px;
   display:inline-block;
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
    -moz-transform:rotate(45deg);
     transform-origin: 50% 0%;
}
.n1 { 
  padding: 4px 2px 2px 2px;
   display:inline-block;
  transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
    -moz-transform:rotate(-45deg);
     transform-origin: 50% 0%;
    } 
.right{
  color: green;
  font-family: 'Montserrat', sans-serif;
  
}
.wrong{
  color: red;
  font-family: 'Montserrat', sans-serif;
}
.aligncenter{
  font-family: 'Montserrat', sans-serif;
  text-align: center;
}
.form-control {
  margin: 0.5rem 0;
}

label {
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
  display: block;
  padding-top: 2%;
  margin-bottom: 0.5rem;
}


input,
textarea,select {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus,select:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}


h4 {
  font-family: 'Montserrat', sans-serif;
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}


button {
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  margin-top: 20px;
  margin-left: 10px;
  margin-right: 10px;
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