<template>
  <div class="fullpage">
     <user-header   @messageFromUserHeader="UserHasChanged"></user-header>
     <div class="page">
         <div v-if="Object.keys(facultyProfile).length != 0 " >
         
         
            <div class="background-field">
              <faculty-image  v-if="Object.keys(facultyProfile).length != 0 " :id=$route.params.id :facultyprofilephotolink="facultyprofilephotolink" :computedisUserLoggedIn="computedisUserLoggedIn" @addedAProfilePhoto="refreshTheContent"></faculty-image>
              <img :src="require(`@/assets/cover-image.png`)"  alt="cover-picture" class="cover-image" />
            </div>
            <div class="profile-info">
        
                <div class="buttonposition">
                  <button  href="#" name="sendRequest" @click="openstudentRequestDialog()"  v-if="isAnyUserLoggedIn && facultyisAvailable"  class="myButton"><i class="far fa-paper-plane"></i>Sent Request</button>
                  <button href="#" name="btn" @click="openeditDialog()" v-if="computedisUserLoggedIn" class="myButton"><i class="fas fa-cog"></i>Edit Profile</button>
                  <button href="#" name="endorseProfile" @click="openendorseDialog()" v-if="!computedisUserLoggedIn && !isAnyUserLoggedIn" class="myButton">Endorse Profile</button>
                </div>
             

        
              <h2 class="profile-name">{{facultyProfile.FirstName}} {{facultyProfile.LastName}}</h2>
              <h3 class="profile-intro">{{facultyProfile.Description}}</h3>
              <div class="detailsstyle">
                <h3 class="profile-details"><em class="fas fa-map-marker-alt"></em> {{facultyProfile.Address}}</h3>
                <h3 class="profile-details"><em class="fas fa-phone-alt"></em>{{facultyProfile.PhoneNo}}</h3>
              </div>
             </div>
             
          </div>
     <faculty-links  v-if="Object.keys(facultyProfile).length != 0 " :id=$route.params.id :facultyProfilelinks="facultyProfilelinks" :computedisUserLoggedIn="computedisUserLoggedIn" @addedALink="refreshTheContent" ></faculty-links>
    <faculty-preference v-if="Object.keys(facultyProfile).length != 0 " :id=$route.params.id :facultyProfilePreferences="facultyProfilePreferences" :computedisUserLoggedIn="computedisUserLoggedIn" @addedAPreference="refreshTheContent"></faculty-preference>
    <faculty-project  v-if="Object.keys(facultyProfile).length != 0 " :id=$route.params.id :facultyProjects="facultyProjects" :computedisUserLoggedIn="computedisUserLoggedIn" :isAnyUserLoggedIn="isAnyUserLoggedIn" @addedAProject="refreshTheContent"></faculty-project>
    <faculty-publications  v-if="Object.keys(facultyProfile).length != 0 " :id=$route.params.id :facultyPublications="facultyPublications" :computedisUserLoggedIn="computedisUserLoggedIn" @addedAPublication="refreshTheContent"></faculty-publications>
    <edit-profile v-if="editDialog" :facultyprofile="facultyProfile"  :id=$route.params.id @finished="openeditDialog"></edit-profile>
    <student-request  v-if="studentDialog" :facultyprofile="facultyProfile"  :id=$route.params.id @finished="openstudentRequestDialog"></student-request>

    <faculty-endorse v-if="Object.keys(facultyProfile).length != 0 " :id=$route.params.id :facultyProfileEndorsements="facultyProfileEndorsements" :allprofiles_send="allprofiles" ></faculty-endorse>
    <endorse-faculty  v-if="endorseDialog"   :id=$route.params.id @finished="openendorseDialog"></endorse-faculty>
    <base-card v-if="Object.keys(facultyProfile).length === 0 && isLoggedIn">
      <h2 >Build Profile</h2>
      <div class="flex-container">
        <label class="flex-items" for="profileFirstName">First Name: </label>
        <input
          class="flex-items"
          name="profileFirstName"
          type="text"
          placeholder="First Name "
          v-model="profileFirstName"
        />
        <label class="flex-items" for="profileLastName">Last Name: </label>
        <input
          class="flex-items"
          name="profileLastName"
          type="text"
          placeholder="Last Name "
          v-model="profileLastName"
        />
        <br />
        <label class="flex-items" for="profileCity">City: </label>
        <input
          class="flex-items"
          name="profileCity"
          type="text"
          placeholder="City"
          v-model="profileCity"
        />
        <label class="flex-items" for="profilePhoneNo">Phone No:</label>
        <input
          class="flex-items"
          name="profilePhoneNo"
          type="text"
          placeholder="Phone Number"
          v-model="profilePhoneNo"
        />
        <label class="flex-items" for="department">Department:</label>
        <input
          class="flex-items"
          name="department"
          type="text"
          placeholder="Department"
          v-model="department"
        />

        <label class="flex-items" for="profileAddress">Home Address:
        </label>
        <input
          class="flex-items"
          name="profileAddress"
          type="text"
          placeholder="Address"
          v-model="profileAddress"
        />
      </div>
       <label class="flex-items" for="profileDescription">Short Description Of Yourself: </label>
       <input class="flex-items" name="profileDescription" type="text" placeholder="Short Description" v-model="profileDescription"/>
 
      <button @click="buildprofile" class="editButton" name="build">Build</button>

    </base-card>
   
     </div>
   
  </div>
</template>

<script>

import FetchingEachFacultyProfile from '@/services/FetchingEachFacultyProfile';
import BaseCard from "../layout/BaseCard.vue";
import FacultyLinks from "./FacultyLinks.vue";
import FacultyPreference from "./FacultyPreference.vue";
import FacultyImage from "./FacultyImage.vue";
import EndorseFaculty from "./EndorseFaculty.vue";
import FacultyProject from "./FacultyProject.vue";
import EditProfile from "./EditProfile.vue";
import StudentRequest from "./StudentRequest.vue";
import FacultyPublications from "./FacultyPublications.vue";
import FacultyEndorse from "./FacultyEndorse.vue";
export default {
  components: { FacultyEndorse,BaseCard,FacultyLinks,FacultyPreference,FacultyImage,FacultyProject,FacultyPublications,EditProfile,StudentRequest,EndorseFaculty},
  data() {
    return {
      editDialog:false,
      facultyId: "",
      profileFirstName:"",
      profileLastName:"",
      profileCity:"",
      profilePhoneNo:"",
      profileAddress:"",
      profileDescription:"",
      search:'',
      department:'',
      isLoggedIn:false,
      studentDialog:false,
      endorseDialog:false,
    };
  },
  created() {
    this.facultyId = this.$route.params.id;
    this.editDialog=false;
    this.loadfacultyprofile();
    this.loadAllfacultyProfiles();
   
  },

  computed: {
    facultyProfileEndorsements(){
      let facultyProfile = this.$store.getters["facultyprofile"];
      return facultyProfile.endorsements;
    },
    facultyisAvailable(){
      let facultyProfile = this.$store.getters["facultyprofile"];
      return facultyProfile.ProjectAvailability;
    },
    isAnyUserLoggedIn(){
      if (this.$store.getters.idofuserloggedIn==null){
        return true;
      }
      else{
        return false;
      }
    },
    facultyPublications(){
      let facultyProfile = this.$store.getters["facultyprofile"];
      return facultyProfile.publications;
    },
    facultyProjects(){
      let facultyProfile = this.$store.getters["facultyprofile"];
      return facultyProfile.projects;
    },
    facultyprofilephotolink(){
       let facultyProfile = this.$store.getters["facultyprofile"];
      return facultyProfile.ProfilePhotoPath;
    },
    facultyProfilelinks(){
      let facultyProfile = this.$store.getters["facultyprofile"];
      return facultyProfile.links;
    },
    facultyProfilePreferences(){
      let facultyProfile = this.$store.getters["facultyprofile"];
      return facultyProfile.preferences;
    },
    facultyProfile() {
      let facultyProfile = this.$store.getters["facultyprofile"];
      
      console.log(facultyProfile);
      return facultyProfile;
    },
     computedisUserLoggedIn(){
        this.isUserLoggedIn()
       return  this.isLoggedIn;
    },
    allprofiles(){
      let allfacultyprofiles = this.$store.getters['allFacultyProfiles'];
      console.log("hi");
      return allfacultyprofiles;
    },

  },
  methods: {

    openendorseDialog(){
      this.loadfacultyprofile();
      this.endorseDialog=!this.endorseDialog;
    },
    openeditDialog(){
    
      this.loadfacultyprofile();
      this.editDialog=!this.editDialog;
    },
    openstudentRequestDialog(){
      this.loadfacultyprofile();
      this.studentDialog=!this.studentDialog;
    },
    refreshTheContent(){
      console.log("inside refresh content");
      this.loadfacultyprofile();
      this.facultyProfilelinks();
      
    },
    handleUploaded(resp) {
        this.userAvatar = resp.relative_url;
      },
     isUserLoggedIn() {
       this.facultyId = this.$route.params.id;
      if (this.$store.getters.isUserLoggedIn) {
        if (this.$store.getters.idofuserloggedIn != this.facultyId) {
          this.isLoggedIn=false;
        } else {
          this.isLoggedIn=true;
        }
      } else {
        this.isLoggedIn= false;
      }
      return this.isLoggedIn;
    },
     UserHasChanged(args1){
        if(args1==true)
        { 
         this.isUserLoggedIn()
        }
      },
    async buildprofile(){
        console.log("Inside Build Profile");
        if(this.profileFirstName!="" && this.profileLastName!="" && this.profileAddress!="" && this.City!=""){
            try {
                await FetchingEachFacultyProfile.addFacultyBasicDetails({
                    id:this.facultyId,
                    fname:this.profileFirstName,
                    lname:this.profileLastName,
                    address:this.profileAddress,
                    phoneNo:this.profilePhoneNo,
                    city:this.profileCity,
                    department:this.department,
                    description:this.profileDescription
                    })
                       
            } catch (error) {
                console.log(error);
                this.error=error.response.data.error;
            }
            this.loadfacultyprofile();
        }
        else
        {
            console.log("Empty Input");
        }
        
    },
    async loadfacultyprofile() {
      try {
       await this.$store.dispatch("loadallfacultyprofiles");
      
       const response =await this.$store.dispatch("loadthefacultyprofile",{id:this.facultyId});
       
        if(Object.keys(response).length === 0 && !this.isUserLoggedIn())
        {
          console.log("Inside nulllll");
          this.$router.replace("/NotFound")
        }
        
        
      } catch (error) {
        this.error = error.message || "Something went wrong";
      }
    },
    async loadAllfacultyProfiles()
    {
      try {
        await this.$store.dispatch("loadallfacultyprofiles");
        
      } catch (error) {
        this.error = error.message || "Something went wrong";
      }
    },
  },

};
</script>

<style scoped>
@media (max-device-width: 480px) {
.profile-name {
  padding: 0 5px;
}

}
.far,.fa-cog{
  font-size: 150%;
  padding:4px 8px;
}
.relatve{
  position: relative;
}
.buttonposition{
   position: absolute;
   width:20%;
   bottom:40%;
   right:20px;
  display: flex;
  justify-content: space-between;
}
.page
{
  position: absolute;
  width: 100%;
  top: 100px;
}
.detailsstyle{
  padding-bottom: 10px;
}
.addresswidth {
  width: 76.8%;
  background-color: aqua;
}
input {
  text-align: left;
  font-family: "Montserrat", sans-serif;
  display: block;
  width: 100%;
  border: 1px solid #ccc;
}
label {
  font-family: "Montserrat", sans-serif;
  font-size: 20px;
}
.flex-container {
  display: flex;
  flex-wrap: wrap;
}
.flex-items {
  padding-top: 1.5%;
  flex: 1 0 18%; /* explanation below */
  margin: 8px;
  height: 30px;
}

.divrelative {
  position: relative;
}
h2,
h3 {
  font-family: Arial, Helvetica, sans-serif;
}
.background-field {
 
  margin: auto;
    text-align: center;
    height: 5%;
    max-width: 60%;
    background-color: #d3e0ea;
    border-radius: 10px 10px 0 0;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden
}
.cover-image{
  
    object-fit: cover;
   width: 4000px;
   height: 250px;
}

.profile-info {
  position: relative;
  margin: auto;
  height: 2%;
  max-width: 60%;
  background-color: #f4f9f9;
  border-radius: 10px;
  padding: 100px 0px 0px 0px;
}
.profile-details{
  padding: 0 20px;
  font-family: "Nunito Sans", sans-serif;
  margin-top: 0;

}
.fa-map-marker-alt,.fa-phone-alt{
  padding: 2px 10px 2px 0px;
}
.profile-name {
  padding: 0 20px;
  font-family: "Nunito Sans", sans-serif;

  margin-top: 0;
}
.profile-intro {
  padding: 0 20px 20px 20px;
  font-family: "Lato", sans-serif;
}

.myButton {
  background-color: #79bbff;
 
  border: 1px solid #337bc4;
  cursor: pointer;
  color: #ffffff;
  font-family: Arial, sans-serif;
  font-size: 0.95rem;
  font-weight: bold;
  padding:1rem 1rem;
  border-radius: 100px;
  width:100%;
  text-align: center;
  text-decoration: none;
  text-shadow: 0px 1px 0px #276bb0;
}
.editButton{
    background-color: #79bbff;
  border-radius: 5px;
  border: 1px solid #337bc4;
  display: inline-block;
  cursor: pointer;
  color: #ffffff;
  font-family: Arial,sans-serif;
  font-size: 16px;
  font-weight: bold;
  padding: 12px 44px;
  text-decoration: none;
  position: relative;
  text-shadow: 0px 1px 0px #276bb0;
  top: 10px;
  margin-bottom: 2%;
  margin-left: 80%;
}
.myButton:hover {
  background-color: #378de5;
}
</style>