import FetchAllFacultyProfiles from '@/services/FetchAllFacultyProfiles';
export default{
    async loadallfacultyprofiles(context){ 
       const response =await FetchAllFacultyProfiles.fetchallFacultyProfiles();
       const facultyProfiles=[];
       for (var key in response.data) {
        facultyProfiles.push(response.data[key])
       }
      
        context.commit('setallFacultyProfiles',facultyProfiles);
        return {responsestatus:response.status}
    },
    
}