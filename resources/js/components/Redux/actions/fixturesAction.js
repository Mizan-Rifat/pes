import { getAction } from "./actions"

export const loadingTrue = () =>{
    return {
        type:'FIXURES_LOADING_TRUE',
    }
}
export const loadingFalse = () =>{
    return {
        type:'FIXURES_LOADING_FALSE',
    }
}
export const fetchingTrue = () =>{
    return {
        type:'FIXURES_FETCHING_TRUE',
    }
}
export const fetchingFalse = () =>{
    return {
        type:'FIXURES_FETCHING_FALSE',
    }
}

export const allFixturesFetched = (fixtures) =>{
    return {
        type:'ALL_FIXTURES_FETCHED',
        payload:fixtures
    }
}
export const submittedFixturesFetched = (fixtures) =>{
    return {
        type:'ALL_FIXTURES_FETCHED',
        payload:fixtures
    }
}
export const allFixturesFetchedError = (error) =>{
    return {
        type:'SET_ERRORS',
        payload:error
    }
}
export const fixtureCreated = (data) =>{
    return {
        type:'CREATE_FIXTURE',
        payload:data
    }
}
export const fixtureUpdated = (data) =>{
    return {
        type:'UPDATE_FIXTURE',
        payload:data
    }
}

export const fixtureDeleted = (ids) =>{
    return {
        type:'DELETE_FIXTURE',
        payload:ids
    }
}
export const setErrors = (errors) =>{
    return {
        type:'SET_ERRORS',
        payload:errors
    }
}
// export const fetchAllFixtures = (id,admin) => {

//     const qs = admin ? '&admin=1' : ''; 
//     return (dispatch) => {
//         dispatch(loadingTrue())
//         axios.get(`/api/tournament/fixtures?tournament_id=${id}${qs}`)
//         .then(response=>{
//             dispatch(allFixturesFetched(response.data.data))
            
//         })
//         .catch(error=>{
//             console.log(error)
//             dispatch(allFixturesFetchedError(error))

//         })
//     } 
// }

export const fetchAllFixtures = (id,admin) => (dispatch) =>{
    const qs = admin ? '&admin=1' : ''; 
    const url = `/api/tournament/fixtures?tournament_id=${id}${qs}`,
    actions={
        loading:fetchingTrue,
        success:allFixturesFetched,
        error:setErrors
    }
    return getAction(actions,url,dispatch);
}

export const fetchSubmittedFixtures = (tournament_id) => (dispatch) =>{
  
    const url = `/api/tournament/fixtures/submitted?tournament_id=${tournament_id}`,
    actions={
        loading:fetchingTrue,
        success:allFixturesFetched,
        error:setErrors
    }
    return getAction(actions,url,dispatch);
}

export const createTournamentFixtures = (tournament_id) => (dispatch) =>{
  
    const url = `/api/createfixtures?tournament_id=${tournament_id}`,
    actions={
        loading:loadingTrue,
        success:allFixturesFetched,
        error:setErrors
    }
    return getAction(actions,url,dispatch);
}


export const createFixture = (newData,tournament_id) => (dispatch) =>

    new Promise((resolve,reject)=>{

        dispatch(loadingTrue())

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`/api/createfixture`,{
                id:newData.id,
                tournament_id:tournament_id,
                team1:newData.team1_id,
                team2: newData.team2_id,
                date:newData.date,
                group:newData.group,
                round:newData.round,
                leg:newData.leg,
            }).then(response=>{
                dispatch(fixtureCreated(response.data))
                resolve(response.data.message);
            }).catch(error=>{
                dispatch(setErrors(error.response.data.errors))
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

export const updateFixture = (newData) => (dispatch) =>

    new Promise((resolve,reject)=>{

        dispatch(loadingTrue())

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`/api/updatefixture`,{
                id:newData.id,
                team1:newData.team1_id ,
                team2:newData.team2_id,
                date:newData.date,
                group:newData.group,
                round:newData.round,
                leg:newData.leg,
            }).then(response=>{
                dispatch(fixtureUpdated(response.data))
                resolve(response.data.message);
            }).catch(error=>{
                dispatch(setErrors(error.response.data.errors))
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

export const deleteFixture = (ids) => (dispatch) =>(

    new Promise((resolve,reject)=>{
        dispatch(loadingTrue())
        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`/api/deletefixture`,{
                id:ids
            }).then(response=>{
                dispatch(fixtureDeleted(ids))
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