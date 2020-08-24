const initState = {
    loading:false,
    fetchLoading:true,
    clubloading:true,
    tournament:{},
    error:{},
    success:''
};

export default (state=initState,action)=>{
    switch (action.type) {
        case 'INFO_FETCHED':
            
            return {
                ...state,
                tournament:action.payload,
                
            }
        case 'INFO_UPDATED':
            
            return {
                ...state,
                loading:false,
                tournament:{...action.payload},
                
            }
        
       
        case 'INFO_LOADING_TRUE':
            
            return {
                ...state,
                loading:true
            }
        case 'INFO_LOADING_FALSE':
            
            return {
                ...state,
                loading:false
            }
        case 'INFO_FETCH_LOADING_TRUE':
            
            return {
                ...state,
                fetchLoading:true
            }
        case 'INFO_FETCH_LOADING_FALSE':
            
            return {
                ...state,
                fetchLoading:false
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