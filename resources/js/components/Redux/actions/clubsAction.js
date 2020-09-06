import { setSessionUserClub } from "./SessionAction"
import { postAction } from "./actions"
import { data } from "jquery"

export const loadingTrue = () =>{
    return {
        type:'CLUB_LOADING_TRUE',
    }
}
export const loadingFalse = () =>{
    return {
        type:'CLUB_LOADING_FALSE',
    }
}
export const fetchingTrue = () =>{
    return {
        type:'CLUB_FETCHING_TRUE',
    }
}
export const fetchingFalse = () =>{
    return {
        type:'CLUB_FETCHING_FALSE',
    }
}
export const allClubsFetched = (clubs) =>{
    return {
        type:'ALL_CLUBS_FETCHED',
        payload:clubs
    }
}
export const clubFetched = (club) =>{
    return {
        type:'CLUB_FETCHED',
        payload:club
    }
}
export const allClubsByTournamentFetched = (clubs) =>{
    return {
        type:'ALL_CLUB_FETCHED_BY_TOURNAMENT',
        payload:clubs
    }
}
export const clubAddedInTournament = (club) =>{
    return {
        type:'CLUB_ADDED_IN_TOURNAMENT',
        payload:club
    }
}
export const playerAddedInClub = (player) =>{
    return {
        type:'PLAYER_ADDED_IN_CLUB',
        payload:player
    }
}
export const clubsRemovedFromTournament = (club_ids) =>{
    return {
        type:'CLUBS_REMOVED_FROM_TOURNAMENT',
        payload:club_ids
    }
}
export const playersRemovedFromClub = (player_ids) =>{
    return {
        type:'PLAYERS_REMOVED_FROM_CLUB',
        payload:player_ids
    }
}

export const setErrors = (error) =>{
    return {
        type:'SET_CLUB_ERRORS',
        payload:error
    }
}


export const clubUpdated = (data) =>{
    return {
        type:'CLUB_UPDATED',
        payload:data
    }
}
export const playerUpdated = (data) =>{
    return {
        type:'PLAYER_UPDATED',
        payload:data
    }
}
export const clubsDeleted = (ids) =>{
    return {
        type:'DELETE_CLUB',
        payload:ids
    }
}
export const clubsCreated = (club) =>{
    return {
        type:'CLUB_CREATED',
        payload:club
    }
}


export const fetchAllClubs = () => {
    return (dispatch) => {
        dispatch(fetchingTrue())
        axios.get(`/api/allclubs`)
        .then(response=>{
            dispatch(allClubsFetched(response.data.data))
        })
        .catch(error=>{
            switch (error.response.status) {
                case 422:
                    console.log(error.response.data.errors)
                    reject(error.response.data.errors)
                    break;
                case 500:
                    console.log(error.response.data.message)
                    reject({msg:error.response.data.message})
                    break;
            
                default:
                    break;
            }

        })
    } 
}

export const fetchClub = (slug) => {
    return (dispatch) => {
        dispatch(fetchingTrue())
        axios.get(`/api/club/${slug}`)
        .then(response=>{
            dispatch(clubFetched(response.data.data))
        })
        .catch(error=>{
            const err = {
                errors:error.response.data.hasOwnProperty('errors') ? error.response.data.errors : {},
                message:error.response.data.message,
                errorCode:error.response.status
            }

            dispatch(setErrors(err))

            reject(err);

        })
    } 
}
export const sendInvitation = (club_ids,tournament_ids) => (dispatch) =>(
    new Promise((resolve,reject)=>{
        // dispatch(loadingTrue())
        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`/api/clubs/sendinvitation`,{
                club_ids,
                tournament_ids
              }).then(response=>{
                  console.log({response})
                // dispatch(clubAddedInTournament(response.data.club))
                resolve(response.data.message)
            }).catch(error=>{
                console.log('error')
                dispatch(loadingFalse())

                switch (error.response.status) {
                    case 422:
                        console.log(error.response.data.errors)
                        reject(error.response.data.errors)
                        break;
                    case 500:
                        console.log(error.response.data.message)
                        reject({msg:error.response.data.message})
                        break;
                
                    default:
                        break;
                }
            })
        })
    })
)

export const fetchAllClubsByTournament = (slug) => {
    return (dispatch) => {
        dispatch(fetchingTrue())
        axios.get(`/api/tournament/clubs?tournament_slug=${slug}`)
        .then(response=>{
            dispatch(allClubsByTournamentFetched(response.data.data))
        })
        .catch(error=>{
            dispatch(setError(error))

        })
    } 
}
export const addClubInTournament = (club_id,tournament_id) => (dispatch) =>(

    new Promise((resolve,reject)=>{
        dispatch(loadingTrue())
        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`/api/tournament/clubs/add`,{
                club_id,
                tournament_id
              }).then(response=>{
                  console.log({response})
                dispatch(clubAddedInTournament(response.data.club))
                resolve(response.data.message)
            }).catch(error=>{
                console.log('error')
                dispatch(loadingFalse())

                switch (error.response.status) {
                    case 422:
                        console.log(error.response.data.errors)
                        reject(error.response.data.errors)
                        break;
                    case 500:
                        console.log(error.response.data.message)
                        reject({msg:error.response.data.message})
                        break;
                
                    default:
                        break;
                }
            })
        })
    })
);
export const createClub = (formData) => (dispatch) =>(

    new Promise((resolve,reject)=>{
        
        dispatch(loadingTrue())

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`/api/club/create`,formData).then(response=>{
                  
                dispatch(clubCreated(response.data.data))
                // dispatch(setSessionUserClub(response.data.data))
                dispatch(loadingFalse())
                resolve(response.data.message)

            }).catch(error=>{
                const err = {
                    errors:error.response.data.hasOwnProperty('errors') ? error.response.data.errors : {},
                    message:error.response.data.message,
                    errorCode:error.response.status
                }
    
                dispatch(setErrors(err))
    
                reject(err);
            })
        })
    })
);
export const addPlayerInClub = (newData) => (dispatch) =>(

    new Promise((resolve,reject)=>{

        dispatch(loadingTrue())

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`/api/club/add/player`,newData).then(response=>{
                  
                dispatch(playerAddedInClub(response.data.data))
                resolve(response.data.message)

            }).catch(error=>{
                
                const err = {
                    errors:error.response.data.hasOwnProperty('errors') ? error.response.data.errors : {},
                    message:error.response.data.message,
                    errorCode:error.response.status
                }
    
                dispatch(setErrors(err))
    
                reject(err);
            })
        })
    })
);

export const updateClubInfo = (newData) => (dispatch) =>

    new Promise((resolve,reject)=>{

        dispatch(loadingTrue())

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`/api/club/info/update`,{
                ...newData
            }).then(response=>{
                dispatch(clubUpdated(response.data.data))
                return response;
            }).then(response=>{
                dispatch(setSessionUserClub(response.data.data))
                resolve(response.data.message);
            }).catch(error=>{
                const err = {
                    errors:error.response.data.hasOwnProperty('errors') ? error.response.data.errors : {},
                    message:error.response.data.message,
                    errorCode:error.response.status
                }
    
                dispatch(setErrors(err))
    
                reject(err);

            })
        })
    });
        

export const deleteClubs = (ids) => (dispatch) =>(

    new Promise((resolve,reject)=>{
        dispatch(loadingTrue())
        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`/api/deleteClubs`,{
                id:ids
            }).then(response=>{
                dispatch(clubsDeleted(ids))
                resolve(response.data.message)
            }).catch(error=>{
                dispatch(loadingFalse())
                reject(error.response.data.message)
            })
        })
    })
);
export const deleteClubsFromTournament = (club_ids,tournament_id) => (dispatch) =>(

    new Promise((resolve,reject)=>{
        dispatch(loadingTrue())
        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`/api/tournament/clubs/remove`,{
                club_ids,
                tournament_id
            }).then(response=>{
                dispatch(clubsRemovedFromTournament(club_ids))
                resolve(response.data.message)
            }).catch(error=>{
                dispatch(loadingFalse())
                console.log({error})
                // reject(error.response.data.message)

                switch (error.response.status) {
                    case 422:
                        console.log(error.response.data.errors)
                        reject(error.response.data.errors)
                        break;
                    case 500:
                        console.log(error.response.data.message)
                        reject({msg:error.response.data.message})
                        break;
                
                    default:
                        break;
                }
                
            })
        })
    })
);

export const removePlayerFromClub = (data) => (dispatch) =>(

    new Promise((resolve,reject)=>{
        dispatch(loadingTrue())
        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`/api/club/player/remove`,data)
            .then(response=>{
                dispatch(playersRemovedFromClub(data.player_ids))
                resolve(response.data.message)
            }).catch(error=>{
                
                const err = {
                    errors:error.response.data.hasOwnProperty('errors') ? error.response.data.errors : {},
                    message:error.response.data.message,
                    errorCode:error.response.status
                }
    
                dispatch(setErrors(err))
    
                reject(err);
                
            })
        })
    })
);

export const testAction = (data) => (dispatch) => {
    const url ='/api/club/add/player',
    actions={
        loading:loadingTrue,
        success:playerAddedInClub,
        error:setErrors
    }
    return postAction(actions,url,data,dispatch);
}


export const updatePlayersOfSquad = (newData) => (dispatch) =>

    new Promise((resolve,reject)=>{

        dispatch(loadingTrue())

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`/api/club/player/update`,newData).then(response=>{
                dispatch(playerUpdated(response.data.data))
                resolve(response.data.message);
            }).catch(error=>{
                const err = {
                    errors:error.response.data.hasOwnProperty('errors') ? error.response.data.errors : {},
                    message:error.response.data.message,
                    errorCode:error.response.status
                }
    
                dispatch(setErrors(err))
    
                reject(err);

            })
        })
    });