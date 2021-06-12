import FetchingFaculties from '@/services/FetchingFaculties';
let source;
export default{
    
    async loadfaculties(context){ 
       const response =await FetchingFaculties.fetchFaculty();
       const faculties=[];
       for (var key in response.data) {
        faculties.push(response.data[key])
       }
        context.commit('setFaculties',faculties);
        return {responsestatus:response.status}
    },
    async checkupdatefaculties(context){ 
        
         source = new EventSource('http://localhost:8081/check-faculty-updates');
         source.onmessage = function(e) {
             const faculties=[];
          
             if(e.data!= 'undefined'){
                var jsonData = JSON.parse(e.data);
             for (var key in jsonData) {
                faculties.push(jsonData[key]);
               }
               context.commit('changeFaculties',faculties);
             }
             
         };
         source.onopen=function(){
             console.log("opened");
         };
         source.onerror=function(){
             console.log("error");
         }
     },
       async deregisterFacultySSE(){ 
        source.close();
     }
     
}