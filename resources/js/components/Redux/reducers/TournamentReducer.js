const initState = {
    fetching:true,
    loading:false,
    tournamentInfo:{},
    error:{},
};

export default (state=initState,action)=>{

    switch (action.type) {

        case 'TOURNAMENT_INFO_FETCHED':
            
            return {
                ...state,
                fetching:false,
                tournamentInfo:action.payload,
                
            }

        case 'TOURNAMENT_LOADING_TRUE':
            
            return {
                ...state,
                loading:true
            }
        case 'TOURNAMENT_LOADING_FALSE':
            
            return {
                ...state,
                loading:false
            }
        case 'TOURNAMENT_FETCHING_TRUE':
            
            return {
                ...state,
                fetching:true
            }
        case 'TOURNAMENT_FETCHING_FALSE':
            
            return {
                ...state,
                fetching:false
            }
        case 'SET_TOURNAMENT_ERRORS':
            
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