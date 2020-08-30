const initState = {
    loading:true,
    standings:[],
    error:{},
    success:''
};

export default (state=initState,action)=>{
    switch (action.type) {
        
        case 'STANDINGS_FETCHED':
            
            return {
                ...state,
                standings:action.payload,
                loading:false
            }
       
       
        case 'STANDINGS_LOADING_TRUE':
            
            return {
                ...state,
                loading:true
            }
        case 'STANDINGS_LOADING_FALSE':
            
            return {
                ...state,
                loading:false
            }
        case 'RESET':{
            return {
                loading:true,
                standings:[],
                error:{},
                success:''
            }
        }
        
    
        default:
            return state;
    }
}