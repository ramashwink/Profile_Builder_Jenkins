export default {
    setFaculties(state,payload){
        state.faculties=payload;
        
    },
    changeFaculties(state,payload){
    
        if(state.faculties.length!=payload.length)
        {
            state.faculties=payload;
        }
        
        
    },
   
};