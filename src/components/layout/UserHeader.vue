<template >
   <div class="fixed" >
        <header class="background" >
        <nav>
            <h1>
                <router-link to="/"> Profile Builder</router-link> 
            </h1>
             <div class="search-bar">     
                    <span><input type="text" autoComplete="on" :list="allFacultyProfiles" v-model="search" name="search" class="search" placeholder="Search" ><i class="fas fa-search"></i> </span>
                    <div class="makeflex" name="search">
                      <ul class="SelectItems">
                      <li  v-on:click="goToSearch($event)" class="SelectListItems" v-for="facultyprofile in allFacultyProfiles" :id="facultyprofile._id" :key="facultyprofile._id" >
                        <p class="imagePreviewWrapper" :style="{ 'background-image': `url(${link(facultyprofile.ProfilePhotoPath)})` }" ></p>
                        <p name="search" class="searcht">{{facultyprofile.FirstName}}  {{facultyprofile.LastName}}</p> </li>
                      </ul>
                    </div>
            </div>
            <ul>
                <li>
                    <div class="container-items">
                         <p @click="loadprofile()" v-if="facultyphotolink()!=null" class="headerimagePreviewWrapper" :style="{ 'background-image': `url(${facultyphotolink()})` }" ></p>
                    </div> 
                </li>
                <li> 
                    <div class="container-items" name="home">
                         <router-link class="navigation-item" to="/home" ><i class="fas fa-home"></i> Home</router-link> <span class="sr-only"></span>
                    </div> 
                </li>
                <li>
                    <div class="container-items" v-if="isLoggedIn" name="stats">
                      <router-link class="navigation-item" :to=statsRoute ><i class="fas fa-chart-bar"></i>Stats</router-link> <span class="sr-only"></span>
                        
                    </div> 
                </li>
                <li>
                    <div class="container-items" v-if="isLoggedIn" name="requests">
                      <router-link class="navigation-item" :to=requestsRoute ><i class="far fa-comment-alt"></i>Requests <span v-if="requestsnumber()!=0" class="badge">{{requestsnumber()}}</span></router-link> <span class="sr-only"></span>
                        
                    </div> 
                </li>
                <div class="container-login" v-if="!isLoggedIn">
                      <li><router-link name="login" to="/login" v-if="!isLoggedIn">Login</router-link></li>
                </div>
                <div class="container-login" v-if="isLoggedIn">
                      <li><router-link to="/login" @click="logout()" name="logout">Logout</router-link></li>
                </div>  
            </ul>
        </nav>
    </header>

   </div>
</template>
<script>

export default {
   created() {
    this.loadAllfacultyProfiles();
  },
  data(){
    return{
      search:"",
    }
  },
   computed:{
     statsRoute(){
       console.log("the route "+this.$route);
       return "/faculties/"+this.$store.getters.idofuserloggedIn +"/stats"
     },
     requestsRoute(){
       return "/faculties/"+this.$store.getters.idofuserloggedIn +"/requests"
     },
    isLoggedIn(){
      return this.$store.getters.isUserLoggedIn;
    },
    allPhotoProfiles(){
      let allPhotoProfiles =[]
      allPhotoProfiles= this.$store.getters['allFacultyProfiles'];
      console.log("dss "+allPhotoProfiles);
      return allPhotoProfiles;
    },
     allFacultyProfiles()
        {
            let allfacultyprofiles = this.$store.getters['allFacultyProfiles'];
            if(this.search=="")
            {
              return ""
            }
             allfacultyprofiles=allfacultyprofiles.filter((allFacultyProfile) => {
              if (allFacultyProfile.FirstName.toUpperCase().includes(this.search.toUpperCase()) || allFacultyProfile.LastName.toUpperCase().includes(this.search.toUpperCase())  ) {
                return true;
               }
            });
            return allfacultyprofiles;
        },
  },
  methods:{
    requestsnumber(){
      var user_id=this.$store.getters.idofuserloggedIn;
      var profiles=this.allPhotoProfiles;
      var requestno=0;
      if(user_id!=null && profiles.length!=0)
      {
          var facultyprofile=profiles.find(item => item._id ===user_id );
          requestno=facultyprofile.requests.length;
      }
      else
      {
          return null;
      }
      return requestno;       
     },
    facultyphotolink(){
      var fileloc="";
      var user_id=this.$store.getters.idofuserloggedIn;
      var profiles=this.allPhotoProfiles;
      
      if(user_id!=null && profiles.length!=0)
      {

          var facultyprofile_photo=profiles.find(item => item._id ===user_id );
          var filename;
          if(facultyprofile_photo.ProfilePhotoPath==null){
            filename= "default.png"
          }
          else{
            filename = facultyprofile_photo.ProfilePhotoPath.replace(/^.*[\\]/, '');
          }
          fileloc="http://localhost:8081/upload/"+filename;
      }
      else
      {
          return null;
      }
      return fileloc;
    },
    link(thelink){
      console.log("the link"+thelink);
      if(thelink==null){
        return "http://localhost:8081/upload/"+"default.png";
      }
      return "http://localhost:8081/upload/"+thelink.replace(/^.*[\\]/, '');
    },
    async goToSearch(event){
      await this.$router.push("/faculties/"+event.currentTarget.id);
       this.$emit('messageFromUserHeader',true)
      this.search=""
      this.$store.dispatch("loadthefacultyprofile",{id:this.$route.params.id});
    },
    logout(){
      this.$store.dispatch('logout');
      this.$router.replace('/login');
    },
    loadprofile(){
      this.$store.dispatch("loadthefacultyprofile",{id:this.$store.getters.idofuserloggedIn});
      this.$router.replace('/faculties/'+this.$store.getters.idofuserloggedIn);
    },
    async loadAllfacultyProfiles()
    {
      try {
        await this.$store.dispatch("loadallfacultyprofiles");  
      } catch (error) {
        this.error = error.message || "Something went wrong";
      }
    },
  }
}
</script>
<style scoped>
@media only screen and (max-device-width: 480px) {
h1 a {
  color: #111110;
  margin: 0;
}

}
/*DESKTOP*/
.searcht{
  padding-left: 10%;
}
.imagePreviewWrapper {
  float: left;
  border-radius: 100%;
  height: 35px;
  width: 35px;
  margin: 8px 8px 8px 8px;
  background-size: cover;
  background-position: center center;
}
 .badge {
  position:absolute;
  top:0.5px;
  right:1rem;
  padding: 0.25rem 0.5rem;
  border-radius: 50%;
  background: red;
  color: white;
}
.headerimagePreviewWrapper {
  float: left;
  border-radius: 10px;
  cursor: pointer;
  height: 40px;
  width: 40px;  
  border-width: 2px;
  margin: 0px 8px 8px 8px;
  background-size: cover;
  background-position: center center; 
}
.makeflex{
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: center;
}
.fixed{
  position: fixed;
  width: 100%;
  top:0;
  left:0;
  z-index: 100;
  display: flex;
 
}
.SelectItems{
  position: absolute;
  display: block;
  width:30%;
  left:0.5rem;
  top:0.5rem;
  list-style-type: none;
  z-index:9999;
}
.SelectListItems{
  font-family: 'Montserrat', sans-serif;
  border-radius: 5px;
  box-shadow: rgb(99, 97, 96);
  padding: 8px 2px 2px 0px;
  border-bottom: 4px solid rgb(145, 137, 137);
  background-color: white;
}
.SelectListItems:hover{
  background-color: rgb(192, 186, 186);
}
.background{
  position: absolute;
  top: 0;
  width: 100%;
  left: 0;
  display: flex;
  background-color: whitesmoke
}
.fas{
  font-size: 1.4rem;
  margin-bottom: 5px;
  margin-left: 2px;
}
.far{
    font-size: 1.4rem;
  margin-bottom: 5px;
 
}
.navigation-item{
  font-size: 0.8rem;
  color: black;  
}
.search {
  height: 35px;
  width: 25rem;    
  border-radius: 100px;
  border: none;
  transition: all 0.2s;
  margin-right:-2rem;
  padding-left: 15px;
  -webkit-appearance: none;
}
.search:focus {
  outline:none;
  height: 35px;
  width: 26rem;    
  border-radius: 100px;
  border: none;
  margin-right:-2rem;
}
.search::placeholder{
  padding-left:5%;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
}
.search-bar{
  max-width: 500px;
  justify-content: flex-end;
  margin-bottom: 16px;
}
.fa-search{
  font-size: 1.2rem;
  padding-right: 4px;
}
/* Jodiss */
header {
  width: 100%;
  height: 4rem;
  font-family: 'Montserrat', sans-serif;
}
header a {
  text-decoration: none;
  color: #fb743e;
  display: inline-block;
  padding: 0.6rem 0.6rem;
  border: 1px solid transparent;
}
h1 {
  font-family: 'Bebas Neue', cursive;
  font-size:2rem;
  border-color: black;
  margin: 0;
  padding-bottom: 8px;
}
h1 a {
  letter-spacing: 2px;
  color: #fb743e;
  margin: 0;
}
h1 a:hover
{
  border-color:transparent;
}
header nav {
  left:0;
  width: 100%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
header ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
li {
   margin: 0;
  flex-basis: 1%;   
}
.container-items
{
  position: relative;
  text-align: center;
}
.container-login{
  margin:0;
  font-weight: bold;
  padding:0;
}
</style>

