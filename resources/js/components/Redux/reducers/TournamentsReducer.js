const initState = {
    fetchLoading:true,
    loading:false,
    tournaments:[],
    error:{},
    success:''
};

export default (state=initState,action)=>{
    switch (action.type) {
        case 'ALL_TOURNAMENTS_FETCHED':
            
            return {
                ...state,
                fetchLoading:false,
                tournaments:action.payload,
                
            }
        case 'TOURNAMENT_CREATED':
            
            return {
                ...state,
                loading:false,
                tournaments:[...state.tournaments,action.payload],
                
            }
        case 'TOURNAMENT_DELETED':
            
            return {
                ...state,
                loading:false,
                tournaments:state.tournaments.filter(tournament => !action.payload.includes(tournament.id)),
                
            }
        
       
        case 'TOURNAMENTS_LOADING_TRUE':
            
            return {
                ...state,
                loading:true
            }
        case 'TOURNAMENTS_LOADING_FALSE':
            
            return {
                ...state,
                loading:false
            }
        case 'TOURNAMENTS_FETCH_LOADING_TRUE':
            
            return {
                ...state,
                fetchLoading:true
            }
        case 'TOURNAMENTS_FETCH_LOADING_FALSE':
            
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