export default{
 
    setUser(state,payload)
    {
        state.token=payload.token;
        if(state.token){
            state.isUserLoggedIn=true;
            state.user=payload.userId;
            state.expiresIn=payload.expiresIn;
            if(payload.isAdminLoggedIn==true)
            {
                state.isAdminLoggedIn=true
            }
            else
            {
                state.isAdminLoggedIn=false
            }
        }else{
            state.isAdminLoggedIn=false
            state.isUserLoggedIn=false;
            state.user=payload.userId;
            state.expiresIn=payload.expiresIn;
        }

    },
}