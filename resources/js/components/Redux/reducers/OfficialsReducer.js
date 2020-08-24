const initState = {
    loading:true,
    officials:[],
    error:{},
    success:''
};

export default (state=initState,action)=>{
    switch (action.type) {
        case 'OFFICIALS_FETCHED':
            
            return {
                ...state,
                loading:false,
                officials:action.payload,
                
            }
        case 'OFFICIALS_ADDED':
            
            return {
                ...state,
                loading:false,
                officials:[...state.officials,action.payload],
                
            }
        case 'OFFICIALS_DELETED':
            
            return {
                ...state,
                loading:false,
                officials:state.officials.filter(official => !action.payload.includes(official.id)),
                
            }
        
       
        case 'OFFICIALS_LOADING_TRUE':
            
            return {
                ...state,
                loading:true
            }
        case 'OFFICIALS_LOADING_FALSE':
            
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
        case 'RESET':
            
            return {
                loading:true,
                officials:[],
                error:{},
                success:''
            }
       
    
        default:
            return state;
    }
}