<template>
    <div class="card">
     <base-dialog :show=showDialog class="dialogbox" title="Add Publications" @close="opencloseDialog">
        <div class="publication-section">
            <div class="publication-content">
                <label for="publication-name">Publication Name</label>
                <input type="text" name="publicationName" v-model="pname" class="publication-name full">
               <div class="publication-date">
                    <div class="publication-start-date">
                        <label for="start-date">Start Date</label>
                        <input  name="startDate" v-model="startdate" type="date" class="start-date half">
                    </div>
                    <div class="publication-end-date">
                        <label for="end-date">End Date</label>
                        <input name="endDate" v-model="enddate" type="date" class="end-date half">
                    </div>
            </div>
            <div class="relative">
                  <label class="padding" for="project-link">Project Link</label>
                  <input name="link" v-model="link" type="text" class="project-link full">
            </div>
          
            </div>
        </div>
            <p class="error" v-if="error">{{error}}</p>
      
        
        <div class="dialogbutton">
            <button name="add" class="dialogpublicationbutton" @click="addnewPublication"  v-if="!doedit">Add</button>
            <button  name="edit" class="dialogpublicationbutton" @click="addnewPublication"  v-if="doedit">Edit</button>
            <button  name="delete" class="dialogdeletepublicationbutton" @click="deletePublication"  v-if="doedit">Delete</button>
        </div>

     </base-dialog>
     <h2>Publications</h2>
     <button v-if="computedisUserLoggedIn" class="publicationbutton" name="addNewPublication" @click="opencloseDialog">Add a new Publication</button>
     <div class="publicationPadding">
        <div  v-for="singlePublication in facultyPublications" :key="singlePublication._id">
            <p class="ptitle"><a @click="addViewCount(singlePublication._id)" :href="singlePublication.link">{{singlePublication.publicationName}}</a><em v-if="computedisUserLoggedIn" v-on:click="editpublication(singlePublication) " class=" edit fas fa-pen"></em></p>
            <p class="pdate">{{startDate(singlePublication.startdate)}} to {{endDate(singlePublication.enddate)}}</p>  
              <hr>
        </div>
      
    </div>
    </div>
</template>

<script>
import FetchingEachFacultyProfile from '@/services/FetchingEachFacultyProfile';
export default {
    props:['id','facultyPublications','computedisUserLoggedIn'],
     data(){
        return{
            showDialog:false,
            pname:"",
            link:"",
            error:"",
            enddate:"",
            doedit:false,
            startdate:"",
            publicationid:"",
            
        }
    },
    methods:{
        async deletePublication(){
            await FetchingEachFacultyProfile.deletepublication({id:this.id,publicationId:this.publicationid});
            this.$emit('addedAPublication');
            this.showDialog=false;
        },
        makedate(startdate){
            var d = new Date(startdate);
            var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
            return months[d.getMonth()]+" "+d.getFullYear();
        },
         startDate(startdate){
            return this.makedate(startdate);
        },
          endDate(enddate){
              if(enddate!=null){
                return this.makedate(enddate);
              }
              else
              {
                  return "";
              }
           
        },
        opencloseDialog(){
            this.showDialog=!this.showDialog;
            this.link="";
            this.error="";
            this.publicationid="";
            this.pname="";
            if(this.showDialog==false){
                this.doedit=false;
            }
        },
        editpublication(publication){
            this.showDialog=!this.showDialog;
             this.doedit=true;
             this.pname=publication.publicationName;
             this.link=publication.link;
             this.publicationid=publication._id;
             this.startdate=publication.startdate;
             this.enddate=publication.enddate;

        },
        async addViewCount(publ_id){
             var loggedinUser=localStorage.getItem('userId');
             await FetchingEachFacultyProfile.addPublicationCount({id:this.$route.params.id,publicatio_id:publ_id,loggedInId:loggedinUser});
        },
        async addnewPublication(){
            if(this.link==""){
                this.showDialog=true; 
                this.error="Input has not been entered"
            }
            else{
                 this.showDialog=false;
                 if(this.doedit==true){
                 try {
                    const response=await FetchingEachFacultyProfile.editpublication({id:this.id,publicationId:this.publicationid,publicationname:this.pname,publicationlink:this.link,startdate:this.startdate,enddate:this.enddate});
                    if(response.data.message==="success"){
                            this.$emit('addedAPublication')
                            this.link=""
                            this.enddate=""
                            this.startdate=""
                            this.error=""
                            this.publicationid=""
                    }
                } catch (error) {
                    console.log(error);
                     this.error=error;
                    this.error=error.response.data.error;
                }
                this.doedit=false;                          

                 }
                 else{
                    try {
                        const response=await FetchingEachFacultyProfile.addFacultyPublications({id:this.id,publicationname:this.pname,link:this.link,startdate:this.startdate,enddate:this.enddate});
                        if(response.data.message==="success"){
                            this.$emit('addedAPublication')
                            this.link=""
                            this.enddate=""
                            this.startdate=""
                            this.error=""
                            this.publicationid=""
                        }
                    } catch (error) {
                        console.log(error);
                        this.error=error;
                        this.error=error.response.data.error;
                }                    
                 }

            }
        },

    }
}
</script>

<style scoped>
.pdate{
    padding: 0;
    text-decoration: None;
    font-size: 0.9rem;
    margin:0;
}
.ptitle{
 
    font-size: 1.2rem;
    line-height: 1.4rem;
}
.publicationPadding{
    padding-top:8px;
    padding-left:8%;
    padding-bottom:8px;
}
.relative{
    position: relative;
}

.error{
    color:red;
    font-size: 1rem;
}
.space{
    margin-left: 10px;
}

.card {
     min-height: 90px;
  position: relative;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.26);
  font-family: 'Montserrat', sans-serif;
  margin: 2rem auto;
  background-color: #f6f6f6;
  max-width: 60%;
}
.dialogbutton{
    position: absolute; 
    bottom: 10px;
    left:10px;
}
.dialogpublicationbutton{
    text-align:center;
    padding: 0.75rem 2rem;
    font-family: 'Montserrat', sans-serif;
    background-color: #1a0b49;
    color: rgb(216, 208, 208);
    cursor: pointer;
    border-radius: 30px;
}
.dialogdeletepublicationbutton{
    margin-left: 0.4rem;
    text-align:center;
    padding: 0.75rem 2rem;
    font-family: 'Montserrat', sans-serif;
    background-color: #1a0b49;
    color: rgb(216, 208, 208);
    cursor: pointer;
    border-radius: 30px; 
}
.dialogbox{
     font-family: 'Montserrat', sans-serif;
     padding: 2px 10px 2px 2px;
}

/* .eachLink{
    padding: 2px 2px 2px 2px;
    font-size: 0px;
} */
i{

    font-size:20px;
    padding: 2px 12px 2px 30px;
}
a{
    text-decoration: none;
}
a:link {
  color: black;
  font-family: "Montserrat", sans-serif;
}

a:visited {
  color: black;
  font-family: "Montserrat", sans-serif;
}

a:hover {
  color: rgb(84, 83, 87);
  font-family: "Montserrat", sans-serif;
}
.publicationbutton{
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
.publicationbutton:hover,
.publicationbutton:active {
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


.publication-section{
    width: 100%;
    background-color: white;
    font-family: 'Nunito Sans', sans-serif;
    border-radius: 10px;
}
.publication-content{
    padding: 10px;
}
.publication-name{
    display: block;
}
input{
    margin: 5px 0px 5px 2px;
    border-radius: 5px;
    max-width: 100%;
}
.full{
    width: 95%;
    padding: 5px;
}
.project-check{
    width: 20px;
}
.half{
    margin-right: 10px;
    width: 260px;
    padding: 5px;
}
.publication-date{
    position: relative;
    height: 60px;
    padding-top: 5px;
}
.start-date,.end-date{
    display: block;
    margin: 5px 0px 2px 2px;
    border-radius: 5px;
    max-width: 100%;
}

.publication-start-date{
    position: absolute;
    left: 1px;
    
}
.publication-end-date{
    position: absolute;
    right: 15px;
}
.edit{
    padding-top:5px;
}
</style>