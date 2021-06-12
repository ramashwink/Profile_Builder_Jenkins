import Api from '@/services/Api';

export default{
    fetchForgetRequests(){
        return Api().get('fetchforgetrequest');
    },
    deleteForgetRequest(credentials){
        return Api().post('deleteforgetrequest',credentials);
    },
    addForgetRequests(credentials){
        return Api().post('addForgetRequests',credentials);
    },

}
