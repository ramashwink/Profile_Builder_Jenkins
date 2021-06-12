<template>
    <div >
    <h1>Requests</h1>
    <base-card>
    <input class="searchbar" type="text" v-model="searchkey" placeholder="Search..">
    <h4 v-if="forgetrequests.length==0">There are no requests available</h4>
    <p v-for="forgetrequest in forgetrequests" :key="forgetrequest.id">
    <forget-request-item  @messageFromStudentChild="childMessageRecieved" :problem=forgetrequest.problem :id=forgetrequest._id :completed=forgetrequest.completed :email=forgetrequest.email :created_at=forgetrequest.created_at :description=forgetrequest.Description></forget-request-item > 
    </p>
    </base-card>
    </div>
    
</template>

<script>
import ForgetRequestItem from './ForgetRequestItem.vue';
export default {
    components: { ForgetRequestItem },
    data(){
      return{
        searchkey:''
      }
    },
    computed:{
        forgetrequests(){
            let forgetrequests = this.$store.getters['forgetrequests'];
             forgetrequests=forgetrequests.filter((forgetrequest) => {
              if (forgetrequest.email.includes(this.searchkey)) {
                return true;
               }
            });

            return forgetrequests;
        }
    },
    created() {
    this.loadforgetrequests();
    },
  
    methods:{
      childMessageRecieved(message){
          if(message=="valueChanged"){
            this.loadforgetrequests();
          }
        },
        async loadforgetrequests(){
        
            try {
                await this.$store.dispatch('loadforgetrequests');
                } 
            catch (error) {
                this.error = error.message || 'Something went wrong';
                }
        },

    }
}
</script>

<style scoped>
h4{
  text-align:center;
  font-family: 'Montserrat', sans-serif;
}
.searchbar {
  margin-left:60%;
  padding: 6px;
  border: none;
  margin-top: 8px;
  margin-right: 16px;
  font-size: 17px;
}

.searchbar {
    border: 1px solid #ccc;
  }
 
  html {
  font-family: "Roboto", sans-serif;
  background-color: #ffffff;
}
button {
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  margin-top: 8px;
  font-family: 'Montserrat', sans-serif;
  background-color: #3a0061;
  border: 1px solid #3a0061;
  color: white;
  cursor: pointer;
  border-radius: 30px;
}

button:hover,
button:active {
  background-color: #270041;
  border-color: #270041;
}

.flat {
  background-color: transparent;
  color: #3a0061;
  border: none;
}

.outline {
  background-color: transparent;
  border-color: #270041;
  color: #270041;
}

.flat:hover,
.flat:active,
.outline:hover,
.outline:active {
  background-color: #edd2ff;
}
h1{
    font-family: 'Montserrat', sans-serif;
    text-align: center;
}
</style>