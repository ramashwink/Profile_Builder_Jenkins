<template>
    <div>
        <base-dialog :show=true  title="Endorsement" @close="opencloseDialog">
            <div>
                <div class="input">
                    <label class="label" for="endorseDescription">Enter the description for the endorsement: </label>
                </div>
                <div class="txt">
                    <textarea v-model="endorseDescription" name="endorseDescription"  cols="30" rows="10" class="textarea"></textarea>                     
                </div>                 
                <div class="input">
                   <p class="error"><span v-if="error!=null">*</span>{{error}}</p>
                </div>
                <div class="bt">
                    <button class="btn " @click="endorse()">Submit</button>
                </div>
                             
            </div>
        </base-dialog>      
    </div>

</template>
<script>
import FetchingEachFacultyProfile from '@/services/FetchingEachFacultyProfile';
export default {
    props:['id'],
    data(){
        return{
            endorseDescription:""
        }
    },
    methods:{
         opencloseDialog(){
            console.log("in");
             this.$emit('finished')
        },        
    async endorse(){
            var endorsedfacultyid=this.id;
            var facultyendorsing=this.$store.getters.idofuserloggedIn;
            await FetchingEachFacultyProfile.endorseFaculty({endorsedfacultyid:endorsedfacultyid,facultyendorsing:facultyendorsing,date:new Date(),endorseDescription:this.endorseDescription})
            this.$emit('finished');
        }
    }
}
</script>
<style scoped>
.input{
    display: flex;
    justify-content: space-between;
    padding:10px 10px;
}
.txt{
    padding:10px 10px;
}
.textarea{
    width: 100%;
}
.btn{
  text-align:center;
  padding: 0.75rem 1.5rem;
  font-family: 'Montserrat', sans-serif;
  background-color: #271d57;
  border: 1px solid #3a0061;
  color: white;
  cursor: pointer;
  border-radius: 10px;
}
.error{

    color: red;
    text-align: center;
}
.bt{
    display:flex;
    justify-content:center;
}
</style>