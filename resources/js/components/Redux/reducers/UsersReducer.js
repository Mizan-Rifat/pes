const initState = {
    loading:true,
    users:[],
    error:{},
    success:''
};

export default (state=initState,action)=>{
    switch (action.type) {
        case 'ALL_USER_FETCHED':
            
            return {
                ...state,
                users:action.payload,
                loading:false
            }
        case 'ALL_USERS_FETCHED_ERROR':
            
            return {
                ...state,
                error:action.payload,
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
        case 'DELETE_USER':
            
            return {
                ...state,
                loading:false,
                users:state.users.filter(user=> !action.payload.ids.includes(user.id)),
                success:action.payload.message
            }
        case 'BLOCK_USER':
            
            return {
                ...state,
                loading:false,
                users:state.users.map(user=> action.payload.includes(user.id) ? {...user,blocked:!user.blocked} : user)
            }
       
        
        case 'USERS_LOADING_TRUE':
            
            return {
                ...state,
                loading:true
            }
        
        case 'USERS_LOADING_FALSE':
            
            return {
                ...state,
                loading:false
            }
        case 'SET_USER_ERRORS':
            
            return {
                ...state,
                loading:false,
                error:action.payload
            }
    
        default:
            return state;
    }
}