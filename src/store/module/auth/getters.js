export default{
    userId(state)
    {
      return state.userId;
    },
    token(state){
      return state.token;
    },
    isUserLoggedIn(state)
    {
      return !!state.token;
    },
    isAuthenticated(state)
    {
  
      return !!state.token;
    },
    idofuserloggedIn(state)
    {
      return state.user;
    },
    isAdminLoggedIn(state)
    {
      return state.isAdminLoggedIn;
    }
   
  
    // didAutoLogout(state){
    //   return state.didAutoLogout;
    // }
}