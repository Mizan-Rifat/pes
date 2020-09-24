const initState = {
    loading:false,
    fetching:true,
    gInfo:[],
    error:{
        message:'',
        errors:{},
        errorCode:''
    },
};

export default (state=initState,action)=>{

    switch (action.type) {

        case 'SET_GINFO':
            
            return {
                ...state,
                loading:false,
                fetching:false,
                gInfo:action.payload
            }  
        
      
        case 'GINFO_LOADING_TRUE':
        
            return {
                ...state,
                loading:true
            }
        case 'GINFO_LOADING_FALSE':
            
            return {
                ...state,
                loading:false
            }
        case 'GINFO_FETCHING_TRUE':
            
            return {
                ...state,
                fetching:true
            }
        case 'GINFO_FETCHING_FALSE':
            
            return {
                ...state,
                fetching:false
            }
        case 'SET_GINFO_ERRORS':
            
            return {
                ...state,
                loading:false,
                fetching:false,
                error:action.payload
            }
    
        default:
            return state;
    }
}