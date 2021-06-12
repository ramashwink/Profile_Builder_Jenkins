import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js'
export default{
    state(){
        return{
          user:null,
          token:'',
          expiresIn:null,
          isUserLoggedIn:false,
          isAdminLoggedIn:false,
        };
        
      },
      mutations,
      actions,
      getters,
}