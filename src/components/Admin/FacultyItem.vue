<template>
    <div  class="card">
        <i @click="deleteuser" class="fas  fa-user-times"></i>
        
        <h4><i class="far fa-id-badge"> </i>   Faculty Id: <span>{{id}}</span></h4>
        <h4><i class="far fa-envelope"></i> Faculty Email: <span>{{ email }}</span></h4>
        <p class="left">Created At : {{ created_at }} <span class="right">Modified At: {{ modified_at }}</span> </p>
    </div>
</template>


<script>
import DeleteFaculty from '@/services/FetchingFaculties';
export default {
    props:['id','email','created_at','modified_at','isAdmin'],
  methods:{
    async deleteuser(){
     
       DeleteFaculty.deleteFaculty({id:this.id}).then((response)=>{
          if(response.status==200){
             this.$emit('messageFromChild','valueChanged')
          }
          else{
            console.log("Error in Faculty deletion");
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
  background-color:#fcfcfc;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border: 1px solid #424242;
  text-align: left;
  padding: 0.5rem 1rem;
  margin: 2rem auto;
  max-width: 40rem;
}
.far {
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