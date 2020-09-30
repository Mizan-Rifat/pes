import { postAction, getAction } from "./actions"

//urls 
const fetch_tournament_clubs_url = (id)=>`/api/tournament/clubs/${id}?owner=1`;
const add_club_in_tournament_url = `/api/tournament/club/add`;
const remove_club_in_tournament_url = `/api/tournament/club/remove`;

//actions
const TOURNAMENT_CLUBS_FETCHED = 'pes/tournament_clubs/clubs_fetched';
const CLUB_ADDED_IN_TOURNAMENT = 'pes/tournament_clubs/club_added_in_tournament';
const CLUB_REMOVED_FROM_TOURNAMENT = 'pes/tournament_clubs/club_removed_from_tournament';

const LOADING_TRUE = 'pes/tournament_clubs/loading_true';
const LOADING_FALSE = 'pes/tournament_clubs/loading_false';
const FETCHING_FALSE = 'pes/tournament_clubs/fetching_true';
const FETCHING_TRUE = 'pes/tournament_clubs/fetching_false';
const SET_ERRORS = 'pes/tournament_clubs/set_errors';

//reducer
const initState = {
    loading:false,
    fetching:true,
    clubs:[],
    error:{
        message:'',
        errors:{},
        errorCode:''
    },
};

export default (state=initState,action)=>{
    switch (action.type) {
       
        case TOURNAMENT_CLUBS_FETCHED:
            
            return {
                ...state,
                clubs:action.payload,
                fetching:false
            }
    
        case CLUB_ADDED_IN_TOURNAMENT:
            
            return {
                ...state,
                clubs:[...state.clubs,action.payload],
                loading:false
            }
        case CLUB_REMOVED_FROM_TOURNAMENT:
            
            return {
                ...state,
                clubs:state.clubs.filter(club => club.id != action.payload.club_id),
                loading:false
            }
      
        case LOADING_TRUE:
            
            return {
                ...state,
                loading:true
            }
        case LOADING_FALSE:
            
            return {
                ...state,
                loading:false
            }
        case FETCHING_TRUE:
            
            return {
                ...state,
                fetching:true
            }
        case FETCHING_FALSE:
            
            return {
                ...state,
                fetching:false
            }
        case SET_ERRORS:
            
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

//action_creators


export const tournamentClubsFetched = (clubs) =>{
    return {
        type:TOURNAMENT_CLUBS_FETCHED,
        payload:clubs
    }
}
export const clubAddedInTournament = (club) =>{
    return {
        type:CLUB_ADDED_IN_TOURNAMENT,
        payload:club
    }
}
export const clubRemovedFromTournament = (club_ids) =>{
    return {
        type:CLUB_REMOVED_FROM_TOURNAMENT,
        payload:club_ids
    }
}
export const setErrors = (error) =>{
    return {
        type:SET_ERRORS,
        payload:error
    }
}

export const fetchTournamentClubs = (id) => (dispatch) =>{
  
    const url = fetch_tournament_clubs_url(id),
    actions={
        loading:{type:FETCHING_TRUE},
        success:tournamentClubsFetched,
        error:setErrors
    }
    return getAction(actions,url,dispatch);
}

export const addClubInTournament = (data) => (dispatch) => {
    
    const url = add_club_in_tournament_url,
    actions={
        loading:{type:LOADING_TRUE},
        success:clubAddedInTournament,
        error:setErrors
    }
    return postAction(actions,url,data,dispatch);
}

export const removeClubFromTournament = (data) => (dispatch) => {
    
    const url = remove_club_in_tournament_url,
    actions={
        loading:{type:LOADING_TRUE},
        success:clubRemovedFromTournament,
        error:setErrors
    }
    return postAction(actions,url,data,dispatch);
}