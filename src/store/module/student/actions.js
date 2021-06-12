import FetchingStudents from '@/services/FetchingStudents';
let source;
export default{
    
    async loadstudents(context){ 
       const response =await FetchingStudents.fetchStudent();
       const students=[];
       for (var key in response.data) {
        students.push(response.data[key])
       }
        context.commit('setStudents',students);
       return {responsestatus:response.status}
    },
    async checkupdatestudents(context){ 
     
        source = new EventSource('https://profile-builder-deploy.herokuapp.com/check-student-updates');
        source.onmessage = function(e) {
            const students=[];
       
            if(e.data!= 'undefined')
            {
                var jsonData = JSON.parse(e.data);
            for (var key in jsonData) {
                students.push(jsonData[key]);
              }
             
              context.commit('changeStudents',students);
            }
            
        };
        source.onopen=function(){
            console.log("opened");
        };
        source.onerror=function(){
            console.log("error");
        }
    },
      async deregisterStudentSSE(){ 
       source.close();
    }
    
}