<template>
    <div >
    <the-header></the-header>
    <admin-sidebar @messageFromChild="childMessageRecieved"></admin-sidebar>
    <admin-forget-requests v-if="gotoComponent=='ForgetRequests'"></admin-forget-requests>
    <admin-student v-if="gotoComponent=='Student'"></admin-student>
    <admin-faculty v-if="gotoComponent=='Faculty'"></admin-faculty>
    </div>
    
</template>

<script>
import AdminSidebar from './AdminSidebar.vue';
import AdminStudent from './AdminStudent.vue';
import AdminForgetRequests from './AdminForgetRequests.vue';
import AdminFaculty from './AdminFaculty.vue';
export default {
  components: { AdminSidebar,AdminFaculty,AdminStudent,AdminForgetRequests},
  data(){
      return{
          gotoComponent:'Faculty',
      }
  },
    created() {
    this.$store.dispatch('loadforgetrequests');
    console.log(this.$route.params.load);
    if(this.$route.params.load=="Student"){
        this.gotoComponent='Student'
    }
    else if(this.$route.params.load=="Faculty"){
        this.gotoComponent='Faculty'
    }
    },
    methods:{
        childMessageRecieved(message){
           this.gotoComponent=message
        },
    
    }
}
</script>

<style scoped>
 
  html {
  font-family: "Roboto", sans-serif;
  background-color: #ffffff;
}
</style>