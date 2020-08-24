export const reset = () =>{
    return {
        type:'RESET',
    }
}
export const loadingTrue = () =>{
    return {
        type:'OWNER_LOADING_TRUE',
    }
}

export const loadingFalse = () =>{
    return {
        type:'OWNER_LOADING_TRUE',
    }
}
export const squadLoadingTrue = () =>{
    return {
        type:'OWNER_SQUAD_LOADING_TRUE',
    }
}

export const squadLoadingFalse = () =>{
    return {
        type:'OWNER_SQUAD_LOADING_FALSE',
    }
}

export const infoFetched = (data) =>{
    return {
        type:'INFO_FETCHED',
        payload:data
    }
}

export const setErrors = (error) =>{
    return {
        type:'SET_ERRORS',
        payload:error
    }
}

export const addPlayerToSquad = (newData) => (dispatch) => {

    dispatch(squadLoadingTrue())

    axios.get(`/api/tournament/details?slug=${slug}`)
    .then(response=>{
        const {clubs,...info} = response.data.data
       
        dispatch(infoFetched(info))
        return clubs;
    }).then(clubs=>{
        dispatch(tournamentClubsFetched(clubs))
        dispatch(fetchLoadingFalse())
    })
    .catch(error=>{
        dispatch(setErrors(error))


    })
};


export const updateTournamentInfo = (newData) => (dispatch) =>

    new Promise((resolve,reject)=>{

        dispatch(loadingTrue())

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`/api/tournament/update/info`,newData)
            .then(response=>{
                dispatch(infoUpdated(response.data.tournament))
                console.log(response.data.tournament)
                resolve(response.data.message);
            }).catch(error=>{
                dispatch(setErrors(error.response.data.errors))
                // reject(error.response.data.errors);
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


