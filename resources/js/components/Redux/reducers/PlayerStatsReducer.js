const initState = {
    loading:true,
    stats:[],
    error:{},
    success:''
};

export default (state=initState,action)=>{
    switch (action.type) {
        
        case 'STATS_FETCHED':
            
            return {
                ...state,
                stats:action.payload,
                loading:false
            }
       
       
        case 'STATS_LOADING_TRUE':
            
            return {
                ...state,
                loading:true
            }
        case 'STATS_LOADING_FALSE':
            
            return {
                ...state,
                loading:false
            }
        case 'STATS_SORTING':
            
            return {
                ...state,
                stats:action.payload
            }
        case 'RESET':{
            return {
                loading:true,
                stats:[],
                error:{},
                success:''
            }
        }
        
    
        default:
            return state;
    }
}