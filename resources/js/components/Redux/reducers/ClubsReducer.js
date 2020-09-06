const initState = {
    loading:false,
    fetching:true,
    allClubs:[],
    clubs:[],//tournament_clubs
    club:{},//current club
    error:{
        message:'',
        errors:{},
        errorCode:''
    },
    success:''
};

export default (state=initState,action)=>{
    switch (action.type) {
        case 'ALL_CLUBS_FETCHED':
            
            return {
                ...state,
                allClubs:action.payload,
                fetching:false
            }
        case 'ALL_CLUB_FETCHED_ERROR':
            
            return {
                ...state,
                error:action.payload,
                fetching:false
            }
        case 'TOURNAMENT_CLUBS_FETCHED':
            
            return {
                ...state,
                clubs:action.payload,
                fetching:false
            }
        case 'CLUB_FETCHED':
            
            return {
                ...state,
                club:action.payload,
                fetching:false,
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
                loading:false
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
                loading:false
            }
        case 'CLUB_UPDATED':
            
            return {
                ...state,
                loading:false,
                club:action.payload
            }
        case 'CLUB_CREATED':
            
            return {
                ...state,
                loading:false,
                club:action.payload
            }

        case 'PLAYER_UPDATED':
            
            return {
                ...state,
                loading:false,
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
        case 'CLUB_FETCHING_TRUE':
            
            return {
                ...state,
                fetching:true
            }
        case 'CLUB_FETCHING_FALSE':
            
            return {
                ...state,
                fetching:false
            }
        case 'SET_CLUB_ERRORS':
            
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