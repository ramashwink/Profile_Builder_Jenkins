import FetchingForgetRequests from '@/services/FetchingForgetRequests';

export default{
    
    async loadforgetrequests(context){ 
       const response =await FetchingForgetRequests.fetchForgetRequests();
       const forgetrequests=[];
       console.log("inside forgetrequest");
       console.log(response);
       for (var key in response.data) {
        forgetrequests.push(response.data[key])
       }
        context.commit('setForgetRequests',forgetrequests);
        return {responsestatus:response.status}
    },

     
}