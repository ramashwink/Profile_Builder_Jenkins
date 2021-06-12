<template>
<div class="container"> 
        <div class="navigation-icons">
<<<<<<< HEAD
             <i name="faculty" @click="executeFaculty" class="fas fa-chalkboard-teacher"></i>
            <p class="center">Faculty</p>
            <hr >
            <i name="student" @click="executeStudent" class="fas fa-user-graduate "></i>
            <p class="center">Student</p>
            <hr >
            <i name="request" @click="executeForgetRequests"  class="far fa-comments  "></i>
=======
             <em @click="executeFaculty" class="fas fa-chalkboard-teacher"></em>
            <p class="center">Faculty</p>
            <hr >
            <em @click="executeStudent" class="fas fa-user-graduate "></em>
            <p class="center">Student</p>
            <hr >
            <em  @click="executeForgetRequests" class="far fa-comments  "></em>
>>>>>>> 14fd8570e6e3468969ef805ec7425d2a8fb1ffbf
            <p class="center notification">Requests <span v-if="noofrequests>0" class="badge">{{noofrequests}}</span></p>
         
       
        </div>
</div>
    
</template>
<script>
export default {
    computed:{
        noofrequests(){
            console.log(this.$store.getters.noofforgetrequests);
            return this.$store.getters.noofforgetrequests;
        }
    },
    methods:{
        executeStudent(){
            this.$emit('messageFromChild','Student')
        },
        executeFaculty(){
             this.$emit('messageFromChild','Faculty')
        },
        executeForgetRequests(){
             this.$emit('messageFromChild','ForgetRequests')
        }
    }
}
</script>

<style scoped>

hr {width: 100%;margin-left: auto;margin-right: auto;}
.center{
    font-family: 'Montserrat', sans-serif;
    text-align: center;
     color: rgb(158, 150, 150);
     padding: 0px 1px 0px 10px;
}

 /* .container{
     border-radius: 0 5% 5% 0;
      position: absolute;
      top:100px;
      bottom:100px;
      left:5px;
      width:65px;
      padding:10px;
      min-height: calc(100vh-20px);
      background-color:rgb(42, 45, 53) ;
      border: solid rgb(97, 95, 95);
      border-width: 1px 5px 3px 0;
      z-index: 999;
      transition: all .5s ease-in-out;
  } */

  .container{
      border-radius: 0 5% 5% 0;
      display: flex;
      position: absolute;
      background-color:rgb(42, 45, 53) ;
      width:60px;
      padding:15px;
      margin-left: 0;
      border: solid rgb(97, 95, 95);
      border-width: 1px 5px 3px 0;
      z-index: 999;

  }
      .control {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 50px;
      margin-bottom: 10px;
    }
    .contol em {
        font-size: 2rem;
        
        cursor: pointer;
        transition: all .5s ease-in-out;
      }
     .navigation-icons {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      
      width: 50px;
      float: left;
     
    }
    .navigation-icons em {
        font-size: 2rem;
        padding: 20px 0 0px 0;
        
        cursor: pointer;
        transition: all .5s ease-in-out;
    }
    em:hover {
          color: #fff;
          
        }
        
    .fa-user-graduate ,.fa-chalkboard-teacher,.fa-comments{
  color: rgb(158, 150, 150);
}

.notification{
    position: relative;
}
 .badge {
  position: absolute;
  top:-60px;
  right: -6px;
  padding: 5px 10px;
  border-radius: 50%;
  background: red;
  color: white;
}
</style>