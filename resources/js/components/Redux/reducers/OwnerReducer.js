const initState = {
    loading:true,
    squadLoading:true,
    clubinfo:[],
    squad:[],
    error:{},
    success:''
};

export default (state=initState,action)=>{
    switch (action.type) {
        
        case 'OWNER_LOADING_TRUE':
            
            return {
                ...state,
                loading:true
            }
       
        
        case 'OWNER_LOADING_TRUE':
            
            return {
                ...state,
                loading:true
            }
        
        case 'OWNER_LOADING_FALSE':
            
            return {
                ...state,
                squadLoading:false
            }

        case 'OWNER_SQUAD_LOADING_TRUE':
            
            return {
                ...state,
                squadLoading:true
            }
        
        case 'OWNER_SQUAD_LOADING_FALSE':
            
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