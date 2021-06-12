export default {
    forgetrequests(state){
        return state.forgetrequests;
    },
    noofforgetrequests(state){
        var tforgetrequests;
        tforgetrequests=state.forgetrequests.filter((tforgetrequest) => {
            if (tforgetrequest.completed==false) {
              return true;
             }
          });
        return tforgetrequests.length;
    },
  
};