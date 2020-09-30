import { getAction,postAction } from "./actions"

// urls

const tournament_fixtures_fetching_url = (id)=> `/api/tournament/fixtures/${id}?teamdetails=1`;
const update_fixture_url = '';
const add_fixture_url = '';
const delete_fixture_url = '';


//actions

const TOURNAMENT_FIXTURES_FETCHED = 'pes/fixtures/tournament_fixtures_fetched';
const FIXTURE_DELETED = 'pes/fixtures/tournament_fixtures_deleted';
const FIXTURE_UPDATED = 'pes/fixtures/tournament_fixtures_updated';
const FIXTURE_ADDED = 'pes/fixtures/tournament_fixtures_added';

const LOADING_TRUE = 'pes/fixtures/loading_true';
const LOADING_FALSE = 'pes/fixtures/loading_false';
const FETCHING_FALSE = 'pes/fixtures/fetching_true';
const FETCHING_TRUE = 'pes/fixtures/fetching_false';
const SET_ERRORS = 'pes/fixtures/set_errors';


//reducers

const initState = {
    fetching:true,
    loading:false,
    fixtures:[],
    error:{},
};

export default (state=initState,action)=>{
    switch (action.type) {

        case TOURNAMENT_FIXTURES_FETCHED:
            
            return {
                ...state,
                fixtures:action.payload,
                loading:false,
                fetching:false

            }
        
        case FIXTURE_DELETED:
        
            return {
                ...state,
                loading:false,
                fixtures:state.fixtures.filter(fixture=> !action.payload.includes(fixture.id)),
                success:action.payload.message
            }
        case FIXTURE_ADDED:
        
            return {
                ...state,
                loading:false,
                fixtures:[...state.fixtures,action.payload.fixture]
            }
        case FIXTURE_UPDATED:
        
            return {
                ...state,
                loading:false,
                fixtures:state.fixtures.map(fixture=>(
                    fixture.id === action.payload.fixture.id ? action.payload.fixture : fixture 
                ))
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
                error:action.payload
            }
        case 'RESET':
            
            return {
                loading:true,
                fixtures:[],
                error:{},
            }
    
        default:
            return state;
    }
}

//action_creators


export const tournamentFixturesFetched = (fixtures) =>{
    return {
        type:TOURNAMENT_FIXTURES_FETCHED,
        payload:fixtures
    }
}
export const fixtureAdded = (data) =>{
    return {
        type:FIXTURE_ADDED,
        payload:data
    }
}
export const fixtureUpdated = (data) =>{
    return {
        type:FIXTURE_UPDATED,
        payload:data
    }
}
export const fixtureDeleted = (id) =>{
    return {
        type:FIXTURE_DELETED,
        payload:id
    }
}
export const setErrors = (errors) =>{
    return {
        type:SET_ERRORS,
        payload:errors
    }
}

export const fetchTournamentFixtures = (tournament_id) => (dispatch) =>{
  
    const url = tournament_fixtures_fetching_url(tournament_id),
    actions={
        loading:{type:FETCHING_TRUE},
        success:tournamentFixturesFetched,
        error:setErrors
    }
    return getAction(actions,url,dispatch);
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