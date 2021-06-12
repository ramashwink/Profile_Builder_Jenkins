<template>
    <div  class="card">
        <em @click="deletestudent" class="fas  fa-user-times"></em>
        <h4><em class="fas fa-id-card-alt"></em>  Student Roll Number: <span>{{rollno}}</span></h4>
        <h4><em class="fas fa-key"></em> Student Token: <span>{{ token }}</span></h4>
        <p class="left">Created At : {{ created_at }}  </p>
    </div>
</template>


<script>
import DeleteStudent from '@/services/FetchingStudents';
export default {
    props:['rollno','token','created_at'],
  methods:{
    async deletestudent(){
      console.log(this.rollno);
       DeleteStudent.deleteStudent({rollno:this.rollno}).then((response)=>{
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
.far,.fas {
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
h4 {
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
.fa-user-times{
 position: relative;
   margin-left:98%;
  font-size: 1.0rem;
  color: red;
}
.fa-user-times:hover{
    color: grey;
}
</style>