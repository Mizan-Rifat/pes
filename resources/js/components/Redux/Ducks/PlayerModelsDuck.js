import { postAction, getAction } from "./actions";

//urls

const fetch_player_model_url = `/api/playermodels`;
   
// const fetch_player_model_url = (params)=>{
//     let url = `/api/playermodels?page=${params.page}`;
//     if(params.search){
//         url += `&search=${search}`
//     }
//     if(params.limit){
//         url += `&limit=${limit}`
//     }
//     return url;
// };
const add_player_model_url = `/api/playermodel`;
const delete_player_model_url =(id)=> `/api/playermodel/${id}`;
const update_player_model_url = (id)=>`/api/playermodel/${id}`;


//actions

const PLAYER_MODEL_FETCHED = 'pes/player_model/player_model_fetched';
const PLAYER_MODEL_ADDED = 'pes/player_model/player_model_added';
const PLAYER_MODEL_DELETED = 'pes/player_model/player_model_deleted';
const PLAYER_MODEL_UPDATED = 'pes/player_model/player_model_updated';

const LOADING_TRUE = 'pes/player_model/loading_true';
const LOADING_FALSE = 'pes/player_model/loading_false';
const FETCHING_TRUE = 'pes/player_model/fetching_true';
const FETCHING_FALSE = 'pes/player_model/fetching_false';
const SET_ERRORS = 'pes/player_model/set_errors';

// reducers

const initState = {
    fetching:true,
    loading:false,
    players:[],
    error:{},
};

export default (state=initState,action)=>{
    switch (action.type) {
        case PLAYER_MODEL_FETCHED:
            
            return {
                ...state,
                fetching:false,
                loading:false,
                players:action.payload,
                
            }

        case PLAYER_MODEL_ADDED:
            
            return {
                ...state,
                loading:false,
                players:[...state.players,action.payload],
                
            }
        case PLAYER_MODEL_UPDATED:
            
            return {
                ...state,
                loading:false,
                players:state.players.map(item=>item.id == action.payload.id ? action.payload : item),
                
            }
        case PLAYER_MODEL_DELETED:
            
            return {
                ...state,
                loading:false,
                players:state.players.filter(item => item.id != action.payload),
                
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
                fetching:false,
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

// action_creators

export const player_modelFetched = (data) =>{
    return {
        type:PLAYER_MODEL_FETCHED,
        payload:data
    }
}

export const player_modelUpdated = (data) =>{
    return {
        type:PLAYER_MODEL_UPDATED,
        payload:data
    }
}
export const player_modelDeleted = (id) =>{
    return {
        type:PLAYER_MODEL_DELETED,
        payload:id
    }
}
export const player_modelAdded = (data) =>{
    return {
        type:PLAYER_MODEL_ADDED,
        payload:data
    }
}

export const setErrors = (error) =>{
    return {
        type:SET_ERRORS,
        payload:error
    }
}

export const fetchPlayer_model = () => (dispatch) => {
    
    const url = fetch_player_model_url;
    const actions={
        loading:{type:FETCHING_TRUE},
        success:player_modelFetched,
        error:setErrors
    }
    return getAction(actions,url,dispatch);
}

export const addPlayer_model = (newData) => (dispatch) => {
    
    const url = add_player_model_url;
    const actions={
        loading:{type:LOADING_TRUE},
        success:player_modelAdded,
        error:setErrors
    }
    return postAction(actions,url,newData,dispatch);
}

export const updatePlayer_model = (newData) => (dispatch) => {

    const url = update_player_model_url(newData.id);
    const actions={
        loading:{type:LOADING_TRUE},
        success:player_modelUpdated,
        error:setErrors
    }
    return postAction(actions,url,newData,dispatch,'put');
}

export const deletePlayer_model = (id) => (dispatch) => {

    const url = delete_player_model_url(id);
    const actions={
        loading:{type:LOADING_TRUE},
        success:player_modelDeleted,
        error:setErrors
    }
    return postAction(actions,url,{},dispatch,'delete');
}
