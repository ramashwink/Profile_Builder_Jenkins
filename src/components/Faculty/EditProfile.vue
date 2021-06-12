<template>
    <div>
     <base-dialog :show=true  title="Edit Profile" @close="opencloseDialog">
        <div class="container">
            <div class="tabs">
                <button v-on:click="changetabs_p" class="buttontabs">Change Password</button>
            </div>
            <div class="tabs">
                <button  @click="changetabs_d" class="buttontabs">Edit Personal Details</button>
            </div>
        </div>
        <div>
            <div v-if="changepassword">
                <div class="password_container">
                    <h5>Enter your Old Password</h5>
                    <input v-model="oldpass" class="password" type="password">
                </div>
                <div class="password_container" >
                    <h5>Enter your New Password</h5>
                    <input  v-model="newpass" class="password" type="password">
                </div>
                <p class="err" v-if="error!=''">{{perror}}</p>
                <div class="password_container ">
                    <button class="pbutton" @click="changePassword">Change</button>
                </div>
                
            </div>
            <div v-if="changedetails">
                <div class="c">
                    <h5  class="h">First Name : </h5>
                    <input class="i" type="text" v-model="fname" >
                </div>
                <div class="c" >
                    <h5 class="h">Last Name : </h5>
                    <input class="i" type="text" v-model="lname" >
                </div>
                <div class="c">
                    <h5 class="h">Address : </h5>
                    <input class="i"  type="text" v-model="address" >
                </div>
                <div class="c">
                    <h5 class="h" >City : </h5>
                    <input class="i" type="text"  v-model="city" >
                </div>
                <div class="c">
                    <h5 class="h">Phone Number :</h5>
                     <input class="i" type="text" v-model="phoneNo" >
                </div>
                <div class="c">
                    <h5 class="h">Department :</h5>
                    <input class="i" type="text"  v-model="department">
                </div>
                <div class="c">
                    <h5 class="h">Description :</h5>
                    <input class="i" type="text"  v-model="description">
                </div>
                <div class="c">
                    <h5 class="h">Project Availability :</h5>
                    <input class="i" type="checkbox"  v-model="availability">
                </div>
                
                <p class="err" v-if="error!=''">{{derror}}</p>
                <div class="c ">
                    
                    <button class="pbutton" @click="editpersonal">Edit</button>
                </div>
            </div>
        </div>

     </base-dialog>      
    </div>

</template>

<script>
import FetchingEachFacultyProfile from '@/services/FetchingEachFacultyProfile';
export default {
    props:['id','facultyprofile'],
    data(){
        return{
            changepassword:true,
            changedetails:false,
            oldpass:"",
            newpass:"",
            perror:"",
            department:this.facultyprofile.Department,
            fname:this.facultyprofile.FirstName,
            lname:this.facultyprofile.LastName,
            address:this.facultyprofile.Address,
            city:this.facultyprofile.City,
            phoneNo:this.facultyprofile.PhoneNo,
            description:this.facultyprofile.Description,
            availability:this.facultyprofile.ProjectAvailability,
            derrror:""

        }
    },
    methods:{
        opencloseDialog(){
          
             this.$emit('finished')
        },
        changetabs_p(){
          
            this.changepassword=true;
            this.changedetails=false;
        },
        changetabs_d(){
            this.changepassword=false;
            this.changedetails=true;
        },
        async editpersonal(){
            if(this.fname=="" || this.lname==""|| this.address==""||this.city==""||this.phoneNo==""||this.description=="")
            {
                this.derror="Fields Not Entered"
            }
            else{
                const response=await FetchingEachFacultyProfile.editDetails({id:this.id,fname:this.fname,lname:this.lname,address:this.address,city:this.city,phoneNo:this.phoneNo,department:this.department,description:this.description,availability:this.availability});
                    if(response.data.message==="success"){
                        this.$emit('finished')
                        this.oldpass=""
                        this.newpass=""
                         this.perror=""
                    }
                    else{
                        this.perror=response.data.message;
                    }
            }
        },
        async changePassword(){
            if(this.oldpass=="")
            {
                this.perror="*Old Password not entered"
            }
            else if(this.newpass==""){
                this.perror="*New Password not entered"
            }
            else{
                const response=await FetchingEachFacultyProfile.editPassword({id:this.id,oldpass:this.oldpass,newpass:this.newpass});
                    if(response.data.message==="success"){
                        this.$emit('finished')
                        this.oldpass=""
                        this.newpass=""
                         this.perror=""
                    }
                    else{
                        this.perror=response.data.message;
                    }
            }

        }
    }
}
</script>

<style scoped>
.h{
    width: 50%;
    text-align: center;
}
.i{
 
    width: 50%;
    font-family: 'Montserrat', sans-serif; 
    height:24px;
}
.c{
    
    display: flex;
    justify-content: space-evenly;
    align-items: center;

}

.password{
    height:50%
}
.password_container{

    display: flex;
    justify-content: space-around;
    align-items: center;

}
.container{
     border: solid 1px;
     border-radius:10px;
    display: flex;
    justify-content: space-around;
}
.tabs{
     width: 100%;
     display: flex;
     justify-content: center;
      border-radius: 10px;
     
}
.buttontabs{
    border: none;
    width: 100%;
  
    height:30px;
    background-color: transparent;
     font-family: 'Montserrat', sans-serif; 
}
.buttontabs:hover{
    background-color: rgb(201, 197, 197);
}
.err{
    color: red;
    text-align: center;
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