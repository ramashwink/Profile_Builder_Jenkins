import Api from '@/services/Api';

export default{
    fetchStudent(){
        return Api().post('fetchstudents');
    },
    deleteStudent(credentials)
    {
        return Api().post('deletestudent',credentials);
    }


}
