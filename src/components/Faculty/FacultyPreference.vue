<template>
    <div class="card">
     <base-dialog :show=showDialog class="dialogbox" title="Select Preferences" @close="opencloseDialog">
            <div>
                <h3>Selected preferences</h3>
                 <button  @click="removefromselectedpreferences(preference2)" class="selectedtags" v-for="preference2 in AlreadyPreferences()" :key="preference2" >{{preference2}}</button>
            </div>
            <div>
                <h3>Available preferences</h3>
                 <button @click="addtoselectedpreferences(preference)" class="tags" v-for="preference in Availablepreferences" :key="preference" >{{preference}}</button>
            </div>
           <button class="dialogpreferencebutton"  @click="addNewPreference"> &#10003;</button>
      
     </base-dialog>
     <h2>Preferences</h2>
      <button  v-if="computedisUserLoggedIn " class="linkbutton" @click="opencloseDialog">Select Preferences</button>
      <div class="center">
           <button class="displayedtags" v-for="preference in facultyProfilePreferences" :key="preference" >{{preference}}</button>
      </div>
    </div>
</template>

<script>
import FetchingEachFacultyProfile from '@/services/FetchingEachFacultyProfile';
export default {
    props:['id','facultyProfilePreferences','computedisUserLoggedIn'],
    data(){
        return{
            showDialog:false,
            preferences:["Machine Learning","Computer Networks","Front-End Development","Back-End Development","Artificial Intellegence"],
            selectedpreferences:[],
            error:""
        }
    },

    computed:{
        
        Availablepreferences(){
            var difference = this.preferences.filter(x => this.selectedpreferences.indexOf(x) === -1);
            return difference
        }
    },
    methods:{
        AlreadyPreferences(){
            return  this.selectedpreferences;
        },
        async addNewPreference(){
 
            if(this.selectedpreferences.length==0){
                this.showDialog=true; 
                this.error="Input has not been entered"
            }
            else{
                 this.showDialog=false;
                try {
                    const response=await FetchingEachFacultyProfile.addFacultyPreferences({id:this.id,preference:this.selectedpreferences});
                    if(response.data.message==="success"){
                        this.$emit('addedAPreference')
                        this.link=""
                         this.error=""
                    }
                } catch (error) {
                  
                     this.error=error;
                    this.error=error.response.data.error;
                }
            }
        },
        opencloseDialog(){
        
            this.showDialog=!this.showDialog;
            this.link="";
            var difference = this.preferences.filter(x => this.facultyProfilePreferences.indexOf(x) != -1);
            this.selectedpreferences=difference
           
        },
        addtoselectedpreferences(preference){
            this.selectedpreferences.push(preference);
        },
        removefromselectedpreferences(preference){
  
            var index = this.selectedpreferences.indexOf(preference);
            if (index !== -1) {
            this.selectedpreferences.splice(index, 1);
            }
          
        }
        
    }
}
</script>

<style scoped>
.center{
    margin-left:5%;
    margin-bottom:5%;
}
.space{
    margin-left: 10px;
}
.contain
{
    padding: 20px 2px 12px 2px;
    font-size:20px;
}
.linkspadding{
    padding: 0px 2px 12px 2px;
}
.card {
     min-height: 90px;
  position: relative;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.26);
  
  margin: 2rem auto;
  background-color: #f6f6f6;
  max-width: 60%;
}
.dialogpreferencebutton{
      text-align:center;
  padding: 0.75rem 1rem;
  font-family: 'Montserrat', sans-serif;
  background-color: #271d57;
  border: 1px solid #3a0061;
  color: white;
  cursor: pointer;
  border-radius: 10px;
  position:absolute; 
    bottom:10px;
   left:20px;
  
}
.dialogbox{
     font-family: 'Montserrat', sans-serif;
     padding: 2px 10px 2px 2px;
}
.linkbutton{
  text-align:center;
  padding: 0.75rem 1.5rem;
  font-family: 'Montserrat', sans-serif;
  background-color: #271d57;
  border: 1px solid #3a0061;
  color: white;
  cursor: pointer;
  border-radius: 10px;
  position:absolute; 
    top:20px;
   right:20px
}
.linkbutton:hover,
.linkbutton:active {
  background-color: #316e97;
  border-color: #270041;
}
h2{
    font-family: 'Quicksand', sans-serif;
    position: relative;
    top:20px;
    left:20px; 
    padding-bottom: 20px;
}

.tags{
    text-align:center;
    padding: 0.75rem 1.5rem;
  font-family: 'Montserrat', sans-serif;
  background-color: #f7f6fa;
  margin-left:4px;
  margin-top:4px;
  margin-bottom:4px;
  color: rgb(27, 27, 27);
  cursor: pointer;
 border-radius: 30px;
}
.selectedtags{
    text-align:center;
    padding: 0.75rem 1.5rem;
  font-family: 'Montserrat', sans-serif;
  background-color: #207c14;
  margin-left:4px;
  margin-top:4px;
  margin-bottom:4px;
  color: rgb(255, 255, 255);
  cursor: pointer;
 border-radius: 30px; 
}
.displayedtags{
      text-align:center;
    padding: 0.75rem 2rem;
  font-family: 'Montserrat', sans-serif;
  background-color: #f7f6fa;
  margin-left:8px;
  margin-right:8;
  margin-top:4px;
  margin-bottom:3%;
 
  color: rgb(27, 27, 27);
  cursor: pointer;
 border-radius: 30px;
}
</style>