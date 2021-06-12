<template>
    <div>
        <div class="top_card_container">
            <div class="sub_container">
                <div>
                    <p><span class="content">Student Roll Number:</span> <span class="content_p">{{ request.studentRollNo}}</span></p>
                </div>
                <div v-if="showDescription">
                    <p class="content_description">{{request.studentDescription}}</p>
                </div>
            </div>
            <div class="padding">
                <div class="card_container"> 
                    <em @click="deleterequest()" class="far fa-trash-alt"></em>
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
        async deleterequest(){
            await FetchingEachFacultyProfile.deleterequest({id:this.facultyProfileOne._id,request:this.request});
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
.content_description{
    font-size:1rem;
    font-weight: 400;
    font-family: "Montserrat", sans-serif; 
 
}
.far{
    font-size:1.5rem;
}
.fa-trash-alt{
    color: red;
}
.show{
    text-align: center;
    font-family: "Montserrat", sans-serif;
    margin:0;
}
.content_p{
    font-size:1.2rem;
    letter-spacing: 1px;
    font-family: "Montserrat", sans-serif; 
}

</style>