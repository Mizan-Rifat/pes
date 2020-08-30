
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
export const squadLoadingTrue = () =>{
    return {
        type:'CLUB_SQUAD_LOADING_TRUE',
    }
}
export const squadLoadingFalse = () =>{
    return {
        type:'CLUB_SQUAD_LOADING_FALSE',
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

export const setError = (error) =>{
    return {
        type:'SET_ERRORS',
        payload:error
    }
}

export const clubsUpdated = (data) =>{
    return {
        type:'UPDATE_CLUB',
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


export const fetchAllClubs = () => {
    return (dispatch) => {
        dispatch(loadingTrue())
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
        dispatch(squadLoadingTrue())
        axios.get(`/api/club/${slug}`)
        .then(response=>{
            dispatch(clubFetched(response.data.data))
        })
        .catch(error=>{
            dispatch(squadLoadingFalse())
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
        dispatch(loadingTrue())
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
export const addPlayerInClub = (newData,club_id) => (dispatch) =>(

    new Promise((resolve,reject)=>{

        dispatch(squadLoadingTrue())
        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`/api/club/add/player`,{
                club_id,
                ...newData
              }).then(response=>{
                  
                dispatch(playerAddedInClub(response.data.data))
                resolve(response.data.message)

            }).catch(error=>{
                console.log('error')
                dispatch(squadLoadingFalse())

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

export const updateClubs = (newData) => (dispatch) =>

    new Promise((resolve,reject)=>{

        dispatch(loadingTrue())

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`/api/updateClubs`,{
                ...newData
            }).then(response=>{
                dispatch(ClubsUpdated(response.data))
                resolve(response.data.message);
            }).catch(error=>{
                dispatch(ClubsUpdatedError(error.response.data.errors))
                reject(error.response.data.errors);

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

export const removePlayerFromClub = (club_id,player_ids) => (dispatch) =>(

    new Promise((resolve,reject)=>{
        dispatch(squadLoadingTrue())
        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`/api/club/remove/player`,{
                club_id,
                player_ids
            }).then(response=>{
                dispatch(playersRemovedFromClub(player_ids))
                resolve(response.data.message)
            }).catch(error=>{
                dispatch(squadLoadingFalse())
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


export const updatePlayersOfSquad = (newData,club_id) => (dispatch) =>

    new Promise((resolve,reject)=>{

        dispatch(squadLoadingTrue())

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`/api/players/update`,{
                id:newData.id,
                club_id,
                jersey:newData.jersey,
            }).then(response=>{
                dispatch(playerUpdated(response.data.data))
                resolve(response.data.message);
            }).catch(error=>{
                dispatch(squadLoadingFalse())
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
    });