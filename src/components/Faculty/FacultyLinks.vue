<template>
    <div class="card">
    
     <base-dialog :show=showDialog class="dialogbox" title="Add a new link" @close="opencloseDialog">
        <div class="contain">
            <label class="dialogbox" for="url">Enter the link:  </label>
            <input v-model="link" type="text" name="link">
            <span class="space">
                <button class="dialoglinkbutton" name="add" @click="addnewLink" v-if="!doedit"> Add</button>
                <button class="dialoglinkbutton" name="edit" @click="addnewLink" v-if="doedit"> Edit</button>
                <button class="dialoglinkbutton" name="delete" @click="deletelink" v-if="doedit"> Delete</button>
            </span>
            <p class="error" v-if="error">{{error}}</p>
        </div> 
     </base-dialog>
     <h2>Links</h2>
      <button v-if="computedisUserLoggedIn" class="linkbutton" name="addLink" @click="opencloseDialog">Add a new link</button>
      <div class="linkspadding">
        <div  class="divpadding" v-for="singlelink in facultyProfilelinks" :key="singlelink._id">
            <p class="eachlink" v-if="singlelink.link.includes('linkedin')">
                <em class="fab fa-linkedin"></em> <a :href="singlelink.link">{{singlelink.link}} </a>
                <em  v-if="computedisUserLoggedIn" @click="edit(singlelink)" class="far fa-edit"></em>
            </p>
            <p class="eachlink" v-else-if="singlelink.link.includes('github')">
                <em class="fab fa-github-square"></em><a :href="singlelink.link">{{singlelink.link}} </a>
                <em  v-if="computedisUserLoggedIn" @click="edit(singlelink)" class="far fa-edit"></em>
            </p>
            <p class="eachlink" v-else-if="singlelink.link.includes('facebook')">
                <em class="fab fa-facebook-square"></em><a :href="singlelink.link">{{singlelink.link}}</a>
                <em v-if="computedisUserLoggedIn" @click="edit(singlelink)" class="far fa-edit"></em>
            </p>
             <p class="eachlink" v-else-if="singlelink.link.includes('instagram')">
               <em class="fab fa-instagram-square"></em><a :href="singlelink.link">{{singlelink.link}}</a>
               <em  v-if="computedisUserLoggedIn"  @click="edit(singlelink)" class="far fa-edit"></em>
            </p>
            <p class="eachlink" v-else-if="singlelink.link.includes('twitter')">
               <em class="fab fa-twitter-square"></em><a :href="singlelink.link">{{singlelink.link}}</a>
               <em  v-if="computedisUserLoggedIn" @click="edit(singlelink)" class="far fa-edit"></em>
            </p>
            <p class="eachlink" v-else-if="singlelink.link.includes('stackoverflow')">
               <em class="fab fa-stack-overflow"></em><a :href="singlelink.link">{{singlelink.link}}</a>
               <em  v-if="computedisUserLoggedIn" @click="edit(singlelink)" class="far fa-edit"></em>
            </p>
            <p class="eachlink" v-else-if="singlelink.link.includes('medium')">
               <em class="fab fa-medium"></em><a :href="singlelink.link">{{singlelink.link}}</a>
               <em  v-if="computedisUserLoggedIn" @click="edit(singlelink)" class="far fa-edit"></em>
            </p>
            <p class="eachlink" v-else-if="singlelink.link.includes('reddit')">
               <em class="fab fa-reddit-square"></em><a :href="singlelink.link">{{singlelink.link}}</a>
               <em  v-if="computedisUserLoggedIn" @click="edit(singlelink)" class="far fa-edit"></em>
            </p>
             <p class="eachlink" v-else-if="singlelink.link.includes('google')">
               <em class="fab fa-google"></em><a :href="singlelink.link">{{singlelink.link}}</a>
               <em  v-if="computedisUserLoggedIn" @click="edit(singlelink)" class="far fa-edit"></em>
            </p>
             <p class="eachlink" v-else>
               <em class="fas fa-external-link-alt"></em><a :href="singlelink.link">{{singlelink.link}}</a>
               <em  v-if="computedisUserLoggedIn" @click="edit(singlelink)" class="far fa-edit"></em>
            </p>
            
            
        </div>
     </div>
    </div>
</template>

<script>
import FetchingEachFacultyProfile from '@/services/FetchingEachFacultyProfile';
export default {
    props:['id','facultyProfilelinks','computedisUserLoggedIn'],
    data(){
        return{
            showDialog:false,
            link:"",
            error:"",
            doedit:false,
            linkid:"",
        }
    },
    methods:{
        opencloseDialog(){
            this.showDialog=!this.showDialog;
            this.link="";
            this.error="";
        },
        edit(link){
            this.showDialog=!this.showDialog;
            this.link=link.link;
            this.doedit=true;
            this.linkid=link._id;
        },
        async addnewLink(){
            if(this.link==""){
                this.showDialog=true; 
                this.error="Input has not been entered"
            }
            else if(this.doedit!=true){
                this.showDialog=false;
                try {
                    const response=await FetchingEachFacultyProfile.addFacultyLinks({id:this.id,link:this.link});
                    if(response.data.message==="success"){
                        this.$emit('addedALink')
                        this.link=""
                         this.error=""
                    }
                } catch (error) {
                    console.log(error);
                     this.error=error;
                    this.error=error.response.data.error;
                }
            }
            else if(this.doedit===true){
                      this.showDialog=false;
                try {
                    const response=await FetchingEachFacultyProfile.editFacultyLinks({id:this.id,linkid:this.linkid,link:this.link});
                    if(response.data.message==="success"){
                        this.$emit('addedALink')
                        this.link=""
                         this.error=""
                    }
                } catch (error) {
                    console.log(error);
                     this.error=error;
                    this.error=error.response.data.error;
                }
                this.doedit=false;
            }
        },
        async deletelink(){
             await FetchingEachFacultyProfile.deletelink({id:this.id,linkid:this.linkid});
             this.$emit('addedALink');
             this.showDialog=false;
        }
    }
}
</script>

<style scoped>
.error{
    color:red;
    font-size: 1rem;
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
.dialoglinkbutton{
    font-family: 'Montserrat', sans-serif;
     padding: 2px 10px 2px 10px;
     background-color: #271d57;
     border: 1px solid #3a0061;
     border-radius: 2px;
     color: white;
     font-size:15px;
     margin-left:0.2rem;
}
.dialogbox{
     font-family: 'Montserrat', sans-serif;
     padding: 2px 10px 2px 2px;
}
input{
    width: 40%;
    padding: 2px 2px 2px 2px;
    font-size:15px;
}
/* .eachLink{
    padding: 2px 2px 2px 2px;
    font-size: 0px;
} */
i{

    font-size:20px;
    padding: 2px 12px 2px 30px;
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

.flat {
  background-color: transparent;
  color: #3a0061;
  border: none;
}
h2{
    font-family: 'Quicksand', sans-serif;
     position: relative;
    top:20px;
    left:20px; 
    padding-bottom: 20px;
}
</style>