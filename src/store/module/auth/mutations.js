export default{
 
    setUser(state,payload)
    {
        console.log(payload);
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
        // console.log("State user"+state.user);
        // console.log("State isUserLoggedIn"+state.isUserLoggedIn);
        // console.log("State expiresIn"+state.expiresIn);
        // console.log("State token"+state.token);
        // console.log("State isAdminLoggedIn"+state.isAdminLoggedIn);
    },

  
    // logoutUser(state,payload){
    //     console.log("Inside user");
    //     state.isUserLoggedIn=false;
    //     state.user=payload;
    // }
}