<template>
    <div class="topContainer">
        <user-header></user-header>
        <div class="container">
            <div @click="pending()" class="tab">
                <p class="tab_text">Pending Requests</p>
            </div>
            <div @click="accepted()" class="tab">
                <p class="tab_text">Accepted Requests</p>
            </div>
            <div @click="settings()" class="tab">
                <p class="tab_text">Request Settings</p>
            </div>

        </div>
        <div  class=" card ">
            <div v-if="pendingrequest">
                <p class="content" v-if="requests.length==0">No Pending Requests</p>
                <div class="send" v-for="request in requests" :key=request.studentRollNo>
                    <request-card  :request=request :facultyProfileOne=facultyProfileOne @reload="refresh()"></request-card>
                </div>
            </div>
            <div v-if="acceptedrequest">
                <p class="content"  v-if="acceptedrequests.length==0">No Accepted Requests</p>
                <div class="send" v-for="acceptedrequest in acceptedrequests" :key=acceptedrequest.studentRollNo>
                    <acceptedrequest-card  :request=acceptedrequest :facultyProfileOne=facultyProfileOne @reload="refresh()"></acceptedrequest-card>
                </div>
            </div>
            <div v-if="requestsetting">
                <h3>Request Setting</h3>
                 <div class="container_settings">
                     <label class="label_settings" for="RequestCap">Total No of Requests Allowed:  </label>
                     <input class="input_settings"  type="number" v-model="requests_cap">
                 </div>
                 <div  class="container_settings">
                     <label class="label_settings"  for="ContactMe">Contact Me : </label>
                     <select class="input_settings"  name="cars" id="cars" v-model="requests_select">
                        <option value="phone">Phone Number</option>
                        <option value="email">Email</option>
                        <option v-for="singlecontact in contactme" :key="singlecontact" :value="singlecontact.link">{{singlecontact.link}}</option>
                    </select>
                 </div>
                 <div class="center">
                     <button class="pbutton" @click="updateSettings()">Update</button>
                 </div>
            </div>   

        
        </div>
    </div>
</template>
<script>
// import emailjs from 'emailjs-com';
import FetchingEachFacultyProfile from '@/services/FetchingEachFacultyProfile';
import RequestCard from "./RequestCard.vue";
import AcceptedrequestCard from "./AcceptedRequestCard.vue";
export default {
    components:{RequestCard,AcceptedrequestCard},
    data(){
        return{
            facultyProfileOne:{},
            pendingrequest:true,
            acceptedrequest:false,
            requestsetting:false,
            requests_cap:0,
            requests_select:''
        }

    },
    computed:{
        requests(){
            return this.facultyProfileOne.requests
        },
        acceptedrequests(){
            return this.facultyProfileOne.acceptedrequests
        },
        contactme(){
          return this.facultyProfileOne.links;  
         
        },
    },
    created() {
        this.facultyId = this.$route.params.id;
        this.loadfacultyprofile();
        this.facultyProfileOne=this.$store.getters["facultyprofile"];
        this.requests_cap=  this.facultyProfileOne.requestCap;
        this.requests_select=  this.facultyProfileOne.requestContactMe;
    },
    methods:{
        async refresh(){
                await this.$store.dispatch("loadthefacultyprofile",{id:this.facultyId});
                 await this.$store.dispatch("loadallfacultyprofiles");  
                this.facultyProfileOne=this.$store.getters["facultyprofile"];
                
        },
        pending(){
            this.acceptedrequest=false;
            this.pendingrequest=true;
            this.requestsetting=false;
        },
        
        accepted(){
            this.acceptedrequest=true;
            this.pendingrequest=false;
            this.requestsetting=false;
        },
        settings(){
            this.acceptedrequest=false;
            this.pendingrequest=false;
            this.requestsetting=true;
        },
        async loadfacultyprofile() 
            {
                await this.$store.dispatch("loadthefacultyprofile",{id:this.facultyId});
                
            },
        async updateSettings(){
          
            await FetchingEachFacultyProfile.updateSettings({id:this.facultyId,requests_cap:this.requests_cap,requests_select:this.requests_select});
            this.refresh();
        },
       

}
}
</script>
<style scoped>
.center{
      display: flex;
      justify-content: center;
      padding: 1rem;
}
.container_settings{
    display:flex;
    padding:0.5rem;
    
}
.input_settings{
    width:50%;
    height:1.5rem;
    font-size:0.8rem;
    font-family: "Montserrat", sans-serif;
}
.label_settings{
    width:50%;
    height:1.5rem;
    font-size:1rem;
    font-family: "Montserrat", sans-serif;
}
hr{
    margin: 2rem 0;
}


.card_container{
    display: flex;

}
.card {
  margin:0;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  background-color: #f6f6f6;
  width: 60rem;
 
}
.container{
    margin-top:5rem;
    display: flex;
}
.tab{

    border-color: black;
    border-style: solid ;
    border-width: 1px;
    border-radius: 10px;
    width:20rem;
    height: 3rem;
    display: flex;
    justify-content: center;
    align-self: center;
}
.tab_text{
    text-align: center;
    font-size:1rem;
    font-family: "Montserrat", sans-serif;
}
.topContainer{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.heading{
    font-size:1.2rem;
    font-weight: bold;
    font-family: "Montserrat", sans-serif;
}
.content{
    font-size:1rem;

    font-family: "Montserrat", sans-serif;
}
.pbutton{
  text-align:center;
  padding: 0.75rem 1.5rem;
  font-family: 'Montserrat', sans-serif;
  background-color: #271d57;
  border: 1px solid #3a0061;
  color: white;
  cursor: pointer;
  border-radius: 10px;

}
.pbutton:hover,
.pbutton:active {
  background-color: #316e97;
  border-color: #270041;
}
</style>