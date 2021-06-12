import FetchingEachFacultyProfile from '@/services/FetchingEachFacultyProfile';
export default{
    async loadthefacultyprofile(context,payload){
        var loggedinUser=localStorage.getItem('userId');
      
        const response =await FetchingEachFacultyProfile.fetchFacultyProfile({id:payload.id,loggedinUser:loggedinUser});
        const facultyprofile=response.data;
        context.commit('setFacultyProfile',facultyprofile);     
         return facultyprofile
    },

}