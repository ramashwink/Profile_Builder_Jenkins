<template>
    <div class="card">
        <h2>Endorsements</h2>
        <div  v-for="facultyProfileEndorsement in facultyProfileEndorsements" :key="facultyProfileEndorsement._id">
            <div class="endorse_container">
                <img :src="link(facultyProfileEndorsement.facultyendorsingId)" class="imagePreviewWrapper" :style="{ 'background-image': `url(${link(facultyProfileEndorsement.facultyendorsingId)})` }" >
                <div class="endorse_container_profile">
                    <p class="name">{{facultyProfileEndorsement.facultyendorsingName}}</p>
                    <p class="date">{{date(facultyProfileEndorsement.endorsementdate)}}</p>
                    <p class="description">"{{facultyProfileEndorsement.description}}"</p>
                </div>

            </div>

            <hr>
        </div>        
    </div>
</template>
<script>
export default {
    props:['facultyProfileEndorsements','id','allprofiles_send'],
    methods:{
        link(feid){
            var address=""
            this.allprofiles_send.filter(function(profile) {
                if(profile._id ==feid){
                    address= profile.ProfilePhotoPath;
                }
                });
          
            if(address==null){
                    return "https://i.stack.imgur.com/l60Hf.png"
                 }
            return address;
        },
        date(date){
            var d = new Date(date);
            var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
            var s=months[d.getMonth()]+" "+d.getFullYear();
            return s;
        },
    }

}
</script>
<style scoped>
.imagePreviewWrapper {
  float: left;
  border-radius: 100%;
  height: 3.5rem;
  width: 3.5rem;
  margin: 8px 8px 8px 8px;
  background-size: cover;
  background-position: center center;
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
h2{
    font-family: 'Quicksand', sans-serif;
     position: relative;
    top:20px;
    left:20px; 
    padding-bottom: 20px;
}
.endorse_container{
    display:flex;
    padding-left:1rem;
    align-items:center;
}
.endorse_container_profile{

    padding-left:1rem;
    padding-right:1rem;
}
.name{
    font-family: 'Quicksand', sans-serif;
    font-weight: 600;
    font-size:1.1rem;
    margin-bottom:0;
}
.date{
    font-family: 'Montserrat', sans-serif;
    font-weight:200;
    font-size:0.8rem;
    margin-top:0.2rem;
    margin-bottom:0;
 
}
.description{
    font-family: 'Montserrat', sans-serif;
    font-weight:500;
    font-size:1rem;
    margin-top:0.5rem;
    margin-bottom:0.2rem;
  
}
</style>