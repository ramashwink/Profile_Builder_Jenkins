<template>
    <div >
    <h1>Students</h1>
    <base-card>
    <input class="searchbar" type="text" v-model="searchkey" placeholder="Search..">
    <button name="btn" @click="registerStudent">Register a new Student</button>
     <h4 v-if="students.length==0">There are no students available</h4>
    <p v-for="student in students" :key="student.studentRollNo">
    <student-item  @messageFromStudentChild="childMessageRecieved"  :rollno=student.studentRollNo :created_at=student.created_at :token=student.student_token></student-item> 
    </p>
    </base-card>
    </div>
    
</template>

<script>
import StudentItem from './StudentItem.vue';
export default {
    components: { StudentItem },
    data(){
      return{
        searchkey:''
      }
    },
    computed:{
        students(){
            let students = this.$store.getters['students'];
             students=students.filter((student) => {
              if (student.studentRollNo.includes(this.searchkey)) {
                return true;
               }
            });
            return students;
        }
    },
    created() {
    this.loadstudents();
    this.checkupdateStudents();
    },
     unmounted(){
      this.deregisterStudentSSE()
    },
    methods:{
       async deregisterStudentSSE(){
        try {
              await this.$store.dispatch('deregisterStudentSSE');
                } 
        catch (error) {
              this.error = error.message || 'Something went wrong';
                }
      },
        async checkupdateStudents(){
            try {
                await this.$store.dispatch('checkupdatestudents');
                } 
            catch (error) {
                this.error = error.message || 'Something went wrong';
                }
        },
      childMessageRecieved(message){
          if(message=="valueChanged"){
            this.loadstudents();
          }
        },
        async loadstudents(){
            try {
                await this.$store.dispatch('loadstudents');
                } 
            catch (error) {
                this.error = error.message || 'Something went wrong';
                }
        },
        registerStudent(){
            this.$router.push('/admin/registerStudent');
        }

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
  float: right;
  padding: 6px;

  margin-top: 8px;
  margin-right: 16px;
  font-size: 17px;
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