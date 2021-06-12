<template>
<div class="relative card" >
      <ul class="topspacing">
                <li class="pname">{{facultyproject.projectName}} <p  class="cworking" v-if="facultyproject.currentlyworking"> <span class="dot">&#8226;</span> In Progress</p> </li>
                <li class="date">  {{startDate(facultyproject.startdate)}} <span v-if="facultyproject.enddate!=null"> to </span>  {{endDate(facultyproject.enddate)}}</li>
                <li v-if="computedisUserLoggedIn"><i v-on:click="editProject() " class=" edit fas fa-pen"></i></li>
                <li class="cworking" v-if="facultyproject.currentlyworking"> </li>
                 
                
                <li  class="show" @click="showtheDescription" v-if="!showDescription"><i class="fas fa-chevron-down"></i></li>
                
                <div v-if="showDescription">
                    <li class="pdesc">{{facultyproject.project_description}}</li>
                     <li v-if="facultyproject.contributers!=''"> <span class="contributers">Contributers: </span> {{facultyproject.contributers}}</li>
                    <!-- <li> <span class="associated">Related Field </span>  {{facultyproject.associated_with}}</li> -->
                <li class="purl">  <a class="noline" :href="facultyproject.project_url">See Project</a>  </li>
                    
                </div>
                <li class="show" @click="showtheDescription" v-if="showDescription"><i class="fas fa-chevron-up"></i></li>
               
                
        </ul>
    
</div>
   
</template>

<script>

export default {
    props:['facultyproject','id','computedisUserLoggedIn'],
    data(){
        return{
            showDescription:false
        }
        
    },
    methods:{
        editProject(){
            this.$emit('editCalled')
        },
        startDate(startdate){
            var d = new Date(startdate);
            var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
            var s=months[d.getMonth()]+" "+d.getFullYear();
            return s;
        },
          endDate(enddate){
              if(enddate!=null){
                   var d = new Date(enddate);
                   var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
                   var s=months[d.getMonth()]+" "+d.getFullYear();
                    return s;
              }
              else
              {
                  return "";
              }
           
        },
        showtheDescription(){
            this.showDescription=!this.showDescription;
    },
    }
}
</script>


<style scoped>
.edit{
    position: absolute;
    top:20px;
    right:20px;
}
.noline{
    text-decoration: none;
}
.topspacing{
    padding-top: 2%;
}
.card {
  min-height: 90px;
  position: relative;
  border-radius: 12px;
  box-shadow: 0 0px 1px 0px rgba(0, 0, 0, 0.26);
  border-bottom: 5px solid rgb(75, 69, 69);
 
  background-color: #f6f6f6;
  max-width: 95%;
}
.show{
    text-align: center;
    font-size: 2rem;
}
.fas{
    padding: 0;
    margin: 0;

}
.relative{
    position: relative;
}
.dot
{
    font-size: 2.5rem;
    color: green;
}
.pname{
    font-family: 'Montserrat', sans-serif;
    font-size: 1.2rem ;
    font-weight: 500;
}
.cworking{
    position: absolute;
    top:10px;
    right:20px;
    color: green;
    font-family: 'Montserrat', sans-serif;
    font-size: 1.2rem ;
    font-weight: 400;
}
.date{
    font-family: 'Montserrat', sans-serif;
    font-size: 0.8rem ;
    font-weight: 400;
 
}

.contributers{
    font-family: 'Montserrat', sans-serif;
    font-size: 1rem ;
    font-weight: 400;
}
.associated{
    font-family: 'Montserrat', sans-serif;
    font-size: 1rem ;
    font-weight: 400;
}
.purl{
    text-decoration:none;
    font-family: 'Montserrat', sans-serif;
    font-size: 1.2rem ;
    font-weight: 400;
    padding-top: 1%;
   
}
.pdesc{
    font-family: 'Work Sans', sans-serif;
    padding-top: 4%;
    padding-bottom: 4%;
    font-size: 1rem ;
    font-weight: 400;
}
li{
    list-style: none;
}
</style>






