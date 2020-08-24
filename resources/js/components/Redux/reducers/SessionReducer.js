const initState = {
    loading:true,
    user:[],
    error:{},
    success:''
};

export default (state=initState,action)=>{
    switch (action.type) {
        case 'USER_FETCHED':
            
            return {
                ...state,
                users:action.payload,
                loading:false
            }
        
        case 'UPDATE_USER':
            
            return {
                ...state,
                loading:false,
                users:state.users.map(user=>(
                    user.id === action.payload.user.id ? action.payload.user : user 
                ))
            }
       
        
        case 'SESSION_USER_LOADING_TRUE':
            
            return {
                ...state,
                loading:true
            }
        
        case 'SESSION_USER_LOADING_FALSE':
            
            return {
                ...state,
                loading:false
            }
        case 'SET_ERRORS':
            
            return {
                ...state,
                loading:false,
                error:action.payload
            }
    
        default:
            return state;
    }
}