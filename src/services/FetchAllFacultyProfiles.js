import Api from '@/services/Api';

export default{
    fetchallFacultyProfiles(){
        return Api().post('fetchallfacultyprofiles');
    },
}
