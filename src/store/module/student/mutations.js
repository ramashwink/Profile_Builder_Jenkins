export default {
    setStudents(state,payload){
        state.students=payload;
    },
    changeStudents(state,payload){

        if(state.students.length!=payload.length)
        {
            state.students=payload;
        }
        
        
    },
   
};