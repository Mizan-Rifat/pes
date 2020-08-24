const initState = {
    loading:true,
    squadLoading:true,
    club:{},
    error:{},
    success:''
};

export default (state=initState,action)=>{
    switch (action.type) {
        
        case 'CLUB_FETCHED':
            
            return {
                ...state,
                club:action.payload,
                loading:false
            }
        
        case 'UPDATE_CLUB':
            
            return {
                ...state,
                loading:false,
                allClubs:[],
                clubs:state.clubs.map(club=>(
                    club.id === action.payload.club.id ? action.payload.club : user 
                ))
            }
        case 'DELETE_CLUB':
            
            return {
                ...state,
                loading:false,
                allClubs:[],
                clubs:state.clubs.filter(club=> !action.payload.includes(club.id)),
            }
       
        case 'CLUB_LOADING_TRUE':
            
            return {
                ...state,
                loading:true
            }
        case 'CLUB_LOADING_FALSE':
            
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