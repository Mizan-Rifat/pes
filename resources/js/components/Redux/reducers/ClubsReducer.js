const initState = {
    loading:true,
    squadLoading:true,
    allClubs:[],
    clubs:[],//tournament_clubs
    club:{},
    error:{},
    success:''
};

export default (state=initState,action)=>{
    switch (action.type) {
        case 'ALL_CLUBS_FETCHED':
            
            return {
                ...state,
                allClubs:action.payload,
                loading:false
            }
        case 'ALL_CLUB_FETCHED_ERROR':
            
            return {
                ...state,
                error:action.payload,
                loading:false
            }
        case 'TOURNAMENT_CLUBS_FETCHED':
            
            return {
                ...state,
                clubs:action.payload,
                loading:false
            }
        case 'CLUB_FETCHED':
            
            return {
                ...state,
                club:action.payload,
                loading:false,
                squadLoading:false,
            }
        case 'CLUB_ADDED_IN_TOURNAMENT':
            
            return {
                ...state,
                clubs:[...state.clubs,action.payload],
                allClubs:[],
                loading:false
            }
        case 'CLUBS_REMOVED_FROM_TOURNAMENT':
            
            return {
                ...state,
                clubs:state.clubs.filter(club => !action.payload.includes(club.id)),
                allClubs:[],
                loading:false
            }
        case 'PLAYERS_REMOVED_FROM_CLUB':
            
            return {
                ...state,
                club:{
                    ...state.club,
                    players:state.club.players.filter(player => !action.payload.includes(player.id)),
                },
                squadLoading:false
            }
        case 'PLAYER_ADDED_IN_CLUB':
            
            return {
                ...state,
                club:{
                    ...state.club,
                    players:[
                        ...state.club.players,action.payload
                    ]
                },
                squadLoading:false
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

        case 'PLAYER_UPDATED':
            
            return {
                ...state,
                squadLoading:false,
                club:{
                    ...state.club,
                    players:state.club.players.map(player => player.id === action.payload.id ? action.payload : player),
                },
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
        case 'CLUB_SQUAD_LOADING_TRUE':
            
            return {
                ...state,
                squadLoading:true
            }
        case 'CLUB_SQUAD_LOADING_FALSE':
            
            return {
                ...state,
                squadLoading:false
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