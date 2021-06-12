<template>
<div>
     <base-dialog :show=showDialog class="dialogbox" title="Choose Image" @close="opencloseDialog">
      <form @submit.prevent="addNewProfilePhoto">
        <div class="imagePreviewWrapper" :style="{ 'background-image': `url(${previewImage})` }" @click="selectImage"></div>
        <input  @change="uploadFile"  id='fileUpload' name='profilepic' ref="fileInput" type="file" @input="pickFile">
        <button class="dialogprofilebutton"> Add</button>
       </form>
     </base-dialog>
    <div  :style="{ 'background-image': `url(${srcdest})` }"  class="profile-picture" />
    <button v-if="computedisUserLoggedIn" @click="opencloseDialog" class="profile-picture-button" >+</button>
</div>
</template>
<script>
import FetchingEachFacultyProfile from '@/services/FetchingEachFacultyProfile';
export default {
    props:['id','facultyprofilephotolink','computedisUserLoggedIn'],
       data(){
        return{
            srcdest:"require(`@/assets/picture.png`)",
            showDialog:false,
            error:"",
            previewImage: null,
            file:null
        }
    },
   created(){
       var fileloc="";
      if(this.facultyprofilephotolink!=null)
      {
        var filename = this.facultyprofilephotolink.replace(/^.*[\\]/, '');
       fileloc="http://localhost:8081/upload/"+filename;
      }
      else
      {
          fileloc="http://localhost:8081/upload/"+"default.png";
      }
      console.log("Inside watcher "+this.facultyprofilephotolink);
      console.log("Inside file loca "+fileloc);
      this.srcdest=fileloc;
   },
  watch:{
     facultyprofilephotolink(){
       var fileloc="";
      if(this.facultyprofilephotolink!=null)
      {
        var filename = this.facultyprofilephotolink.replace(/^.*[\\]/, '');
       fileloc="http://localhost:8081/upload/"+filename;
      }
      else
      {
          fileloc="http://localhost:8081/upload/"+"default.png";
      }
      console.log("Inside watcher "+this.facultyprofilephotolink);
      console.log("Inside file loca "+fileloc);
      this.srcdest=fileloc;
     }
      
    },
    methods:{
       uploadFile (event) {
        this.file = event.target.files;
        },
       async  addNewProfilePhoto(){
               this.showDialog=false;
              
               console.log(this.file);
               const formData=new FormData();
               formData.append('id',this.id)
               formData.append('profilepic',this.file[0])
                try {
                    const response=await FetchingEachFacultyProfile.addFacultyProfilePhoto(formData);
                    if(response.data.message==="success"){
                        this.$emit('addedAProfilePhoto',true)
                        this.previewImage=""
                         this.error=""
                    }
                } catch (error) {
                    console.log(error);
                     this.error=error;
                    this.error=error.response.data.error;
                }
        },
          opencloseDialog(){
        
            this.showDialog=!this.showDialog;
            this.previewImage=null;
            this.file=null;
            
           
        },
        selectImage () {
          this.$refs.fileInput.click()
      },
      pickFile () {
        let input = this.$refs.fileInput
        let file = input.files
        this.filelocation=file
        if (file && file[0]) {
          let reader = new FileReader
          reader.onload = e => {
            this.previewImage = e.target.result
          }
          reader.readAsDataURL(file[0])
         console.log(file[0]);
          this.$emit('input', file[0])
        }
      }
    }
}
</script>
<style scoped>
.imagePreviewWrapper {
   border-radius: 100%;
    height: 180px;
    width: 180px;
    display: block;
    cursor: pointer;
    margin: 0 auto 30px;
    background-size: cover;
    background-position: center center;
}
.profile-picture {
   display: block;
   background-size: cover;
    background-position: center center;
     margin: 0 30px 30px 30px;
  border-radius: 100%;
  height: 180px;
  width: 180px;
  z-index: 1;
  position: absolute;

 
}
.profile-picture-button {
    background-color: rgb(121, 116, 116);
    color: white;
    border-radius: 100%;
    height: 40px;
    width: 40px;
    z-index: 1;
    top: 260px;
    left: 460px;
    position: absolute;
}
.dialogprofilebutton{
      text-align:center;
  padding: 0.75rem 1.5rem;
  font-family: 'Montserrat', sans-serif;
  background-color: #271d57;
  border: 1px solid #3a0061;
  color: white;
  cursor: pointer;
  border-radius: 10px;
  position:absolute; 
    bottom:20px;
   left:20px
}
</style>