import Api from '@/services/Api';

export default{
    fetchFaculty(){
        return Api().get('fetchfaculties');
    },
    deleteFaculty(credentials){
        return Api().post('deletefaculty',credentials);
    },
    // check_update_faculty(){
    //     return Api().get('check-faculty-updates');
    // }

}
