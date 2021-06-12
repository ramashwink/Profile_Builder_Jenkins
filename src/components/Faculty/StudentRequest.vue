<template>
    <div>
        <base-dialog :show=true  title="Request" @close="opencloseDialog">
            <div>
                <div class="input">
                    <label class="label" for="studentRollNo">Please enter your roll number: </label>
                    <input name="student_roll_no" v-model="studentRollNo" type="text" class="txt">
                </div>
                <div class="input">
                    <label class="label" for="studentToken">Please enter your token: </label>
                    <input name="student_token" v-model="studentToken" type="text" class="txt">
                </div>
                <div class="input">
                    <label for="studentMessage">Please enter your message for the faculty: </label>  
                </div>
                <div class="input">
                    <textarea  v-model="studentMessage" name="messageForFaculty" id="" cols="30" rows="10" class="textarea"></textarea>                     
                </div> 
                <div class="input">
                   <p class="error">*{{error}}</p>
                </div>
                <div class="input">
                    <button class="btn " name="send" @click="sentRequest()">Submit</button>
                </div>
                             
            </div>
        </base-dialog>      
    </div>

</template>
<script>
import FetchingEachFacultyProfile from '@/services/FetchingEachFacultyProfile';
export default {
     props:['id'],
     data(){
       return{
           studentRollNo:'',
           studentToken:'',
           studentMessage:'',
           error:''
       }  
     },
     methods:{
         opencloseDialog(){
            console.log("in");
             this.$emit('finished')
        },
        async sentRequest(){
            if(this.studentRollNo=="" || this.studentToken==""|| this.studentMessage=="")
            {
                this.error="Fields Not Entered"
            }
            else{
                const response=await FetchingEachFacultyProfile.sentRequest({id:this.id,studentRollNo:this.studentRollNo,studentToken:this.studentToken,studentMessage:this.studentMessage});
                    if(response.data.message==="success"){
                        this.$emit('finished')
                        this.studentRollNo="";
                        this.studentToken="";
                        this.studentMessage="";
                         this.error=""
                    }
                    else{
                        this.error=response.data.message;
                    }
            }
        }
     }
}
</script>
<style scoped>
.input{
    display: flex;
    justify-content: space-between;
    padding:10px 10px;
}
.textarea{
    width: 100%;
}
.txt{
    height:20px;
    width:50%;
}
.label{
    width: 50%;
}
.btn{
  text-align:center;
  padding: 0.75rem 1.5rem;
  font-family: 'Montserrat', sans-serif;
  background-color: #271d57;
  border: 1px solid #3a0061;
  color: white;
  cursor: pointer;
  border-radius: 10px;
}
.error{

    color: red;
    text-align: center;
}
</style>