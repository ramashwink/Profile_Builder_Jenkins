<template>
    <div>
        <div class="top_card_container">
            <div class="sub_container">
                <div>
                    <p> <span class="content">Student Roll Number:</span> <span class="content_p">{{ request.studentRollNo}}</span>  </p>
                </div>
                <div v-if="showDescription">
                    <p class="content_description">{{request.studentDescription}}</p>
                </div>
            </div>
                <div class="padding">
                    <div class="card_container"> 
                        <i @click="sendEmail(request)" class="far fa-check-circle"></i>
                        <i  @click="reject()" class="far fa-times-circle"></i>
                    </div>
                </div>  
        </div> 
            <p @click="show()" class="show">Show Description</p>
        <hr>     
    </div>   
</template>

<script>
import FetchingEachFacultyProfile from '@/services/FetchingEachFacultyProfile';
export default {
    props:['request','facultyProfileOne'],
    data(){
        return{
            showDescription:false
        }
    },
    methods:{
        show(){
            this.showDescription=!this.showDescription;
        },
        async reject(){
            await FetchingEachFacultyProfile.rejectEmail({id:this.facultyProfileOne._id,request:this.request});
            this.$emit('reload');
        },
        async sendEmail(req){
                var to_send=req.studentRollNo+"@cb.students.amrita.edu";
                
                var data = {
                    service_id: 'service_i58bij8',
                    template_id: 'template_wvfft2d',
                    user_id: 'user_Q6iqwmYwzNbENEH7yruBG',
                    template_params: {
                        to_name: this.facultyProfileOne.studentRollNo,
                        from_name:'Profile Builder',
                        to_mail:to_send,
                        message: "Your Request has been accepted by "+this.facultyProfileOne.FirstName+" "+this.facultyProfileOne.LastName+".You can further contact him on "+this.facultyProfileOne.requestContactMe,
                        reply_to:"This is a test for a college Project. For further queries contact us at admin@gmail.com"                       
                    }
                };
                try {
                        await FetchingEachFacultyProfile.sendEmail(data);
                        await FetchingEachFacultyProfile.updateRequest({id:this.facultyProfileOne._id,request:this.request})
                    } catch(error) {
                        console.log({error})
                    }
                this.$emit('reload');
    },        
    }
}
</script>

<style scoped>
.card_container{
    display: flex;
}
.sub_container{
    width:90%;
}
.top_card_container{
    display: flex;
    align-items: center;
}   
.heading{

    font-family: "Montserrat", sans-serif;
}
.content{
        font-size:1.2rem;
    font-weight: bold;

    font-family: "Montserrat", sans-serif;
}
.content_p{
    font-size:1.2rem;
    letter-spacing: 1px;
    font-family: "Montserrat", sans-serif; 
}
.content_description{
    font-size:1rem;
    font-weight: 400;
    font-family: "Montserrat", sans-serif; 
}
.far{
    font-size:2.5rem;
}
.fa-check-circle{
    color: green;
    padding-right:0.5rem;
}
.fa-times-circle{
    color: red;
}
.show{
    text-align: center;
    margin:0;
    font-family: "Montserrat", sans-serif;
}
</style>