<template>
    <div id="showContent">
    <h1>Faculty</h1>
    
    <base-card >
    <input type="text" class="searchbar" v-model="searchkey" name="search" placeholder="Search..">
    <button name="btn"  @click="register">Register a new Faculty</button>
    <h4 v-if="faculties.length==1">There are no faculty available</h4>
    <p v-for="faculty in faculties" :key="faculty._id">
        <faculty-item  @messageFromChild="childMessageRecieved" v-if="!faculty.isAdmin" :id=faculty._id :email=faculty.email :created_at=faculty.created_at :modified_at=faculty.modified_at ></faculty-item> 
    </p>
    </base-card>
   
    </div>
</template>

<script>
import FacultyItem from './FacultyItem.vue';
export default {
    components: { FacultyItem },
    data(){
      return {
        searchkey:'',
      };
    },
    computed:{
        faculties(){
            let faculties = this.$store.getters['faculties'];
          
           
            faculties=faculties.filter((faculty) => {
              if (faculty.email.includes(this.searchkey)) {
                return true;
               }
            });
            
            return faculties;
        }
    },
    created() {
    this.loadfaculties();
    this.checkupdateFaculties();
    },
    unmounted(){
      this.deregisterFacultySSE()
    },
    methods:{
      async deregisterFacultySSE(){
        try {
              await this.$store.dispatch('deregisterFacultySSE');
                } 
        catch (error) {
              this.error = error.message || 'Something went wrong';
                }
      },
        childMessageRecieved(message){
          if(message=="valueChanged"){
            this.loadfaculties();
          }
        },
        async checkupdateFaculties(){
            try {
                await this.$store.dispatch('checkupdatefaculties');
                } 
            catch (error) {
                this.error = error.message || 'Something went wrong';
                }
        },
        async loadfaculties(){
            try {
                await this.$store.dispatch('loadfaculties');
                } 
            catch (error) {
                this.error = error.message || 'Something went wrong';
                }
        },
        register(){
            this.$router.push('/admin/register');
        },
    }
}
</script>

<style scoped>
 h4{
  text-align:center;
  font-family: 'Montserrat', sans-serif;
  color: black;
}
.searchbar {
  border: 1px solid #ccc;
  float: right;
  padding: 6px;
  margin-top: 8px;
  margin-right: 16px;
  font-size: 17px;
 
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
  text-align: center;
    font-family: 'Montserrat', sans-serif;
}
</style>