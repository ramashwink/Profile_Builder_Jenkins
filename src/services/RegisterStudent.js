import Api from '@/services/Api';

export default{
    registerStudent(credentials){
        return Api().post('registerStudent',credentials);
    },
    
}
