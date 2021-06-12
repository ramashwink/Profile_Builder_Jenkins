import AuthenticateService from '@/services/AuthenticationService';
export default{
    setUser(context,payload)
    {

        const newpayload={
            userId:payload.user._id,
            expiresIn:payload.expiresIn,
            token:payload.token
        }
        localStorage.setItem('userId', payload.user._id);
        localStorage.setItem('tokenExpiration', payload.expiresIn);
        localStorage.setItem('token', payload.token);
        return context.commit('setUser',newpayload);
    },
    async tryLogin(context) {
        const token = localStorage.getItem('token');
        var userId=localStorage.getItem('userId');
        var expiresIn;
        if(token!=null)
        {
            try {
                const response =await AuthenticateService.checkUser(token);
                var tuserId= response.data.id;

                var isAdmin=response.data.isAdmin;
                if(userId!=tuserId ){
                    localStorage.setItem('userId', tuserId);
                    userId=tuserId;
                }
                expiresIn= localStorage.getItem('expiresIn');
            } catch (error) {
                // this.$router.replace('/login');
                context.dispatch('logout');
            }
            if (token && userId ) {
                context.commit('setUser', {userId: userId,expiresIn:expiresIn,token:token,isAdminLoggedIn:isAdmin});
            }
        }
       
        
        // const tokenExpiration = localStorage.getItem('tokenExpiration');

        // const expiresIn = +tokenExpiration - new Date().getTime();
        // if (expiresIn < 0) {
        //     return;
        // }
        // else {
        //    timer= setTimeout(function(){
        //         context.dispatch('autoLogout');
        //     },expiresIn)
        // }

    },
    logout(context) {
        context.commit('setUser', {
            token: null,
            userId: null,
            expiresIn: null,
        })
        // clearTimeout(timer);
        localStorage.removeItem('token');
        localStorage.removeItem('userId');    
        localStorage.removeItem('tokenExpiration');

    },
  


}