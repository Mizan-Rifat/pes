
export const loadingTrue = () =>{
    return {
        type:'TOURNAMENTS_LOADING_TRUE',
    }
}
export const loadingFalse = () =>{
    return {
        type:'TOURNAMENTS_LOADING_FALSE',
    }
}
export const fetchLoadingTrue = () =>{
    return {
        type:'TOURNAMENTS_FETCH_LOADING_TRUE',
    }
}
export const fetchLoadingFalse = () =>{
    return {
        type:'TOURNAMENTS_FETCH_LOADING_FALSE',
    }
}
export const allTournamentsFetched = (clubs) =>{
    return {
        type:'ALL_TOURNAMENTS_FETCHED',
        payload:clubs
    }
}
export const setError = (error) =>{
    return {
        type:'SET_ERRORS',
        payload:error
    }
}

export const tournamentsUpdated = (data) =>{
    return {
        type:'UPDATE_CLUB',
        payload:data
    }
}
export const tournamentsDeleted = (ids) =>{
    return {
        type:'TOURNAMENT_DELETED',
        payload:ids
    }
}
export const tournamentCreated = (data) =>{
    return {
        type:'TOURNAMENT_CREATED',
        payload:data
    }
}



export const fetchAllTournaments = () => {
    return (dispatch) => {
        dispatch(fetchLoadingTrue())
        axios.get(`/api/alltournaments`)
        .then(response=>{
            console.log(response.data.data)
            dispatch(allTournamentsFetched(response.data.data))
            
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

export const createNewTournament = (newData) => (dispatch) =>(

    new Promise((resolve,reject)=>{
        dispatch(loadingTrue())
        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`/api/tournament/create`,newData)
            .then(response=>{
                dispatch(tournamentCreated(response.data.data))
                resolve(response.data.message)
            }).catch(error=>{
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
export const deleteTournaments = (ids) => (dispatch) =>(

    new Promise((resolve,reject)=>{
        dispatch(loadingTrue())
        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`/api/tournament/delete`,{ids})
            .then(response=>{
                dispatch(tournamentsDeleted(ids))
                resolve(response.data.message)
            }).catch(error=>{
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

