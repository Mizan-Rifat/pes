import { postAction, getAction } from "./actions";

//urls

const fetch_events_url = (id)=>`/api/`;
const add_events_url = `/api/`;
const delete_events_url =(id)=> `/api/`;
const update_events_url = (id)=>`/api/`;


//actions

const SET_EVENTS = 'pes/events/set_events';
const EVENTS_FETCHED = 'pes/events/events_fetched';
const EVENTS_ADDED = 'pes/events/events_added';
const EVENTS_DELETED = 'pes/events/events_deleted';
const EVENTS_UPDATED = 'pes/events/events_updated';

const LOADING_TRUE = 'pes/events/loading_true';
const LOADING_FALSE = 'pes/events/loading_false';
const FETCHING_TRUE = 'pes/events/fetching_true';
const FETCHING_FALSE = 'pes/events/fetching_false';
const SET_ERRORS = 'pes/events/set_errors';

// reducers

const initState = {
    fetching:true,
    loading:false,
    events:[],
    error:{},
};

export default (state=initState,action)=>{
    switch (action.type) {
        case SET_EVENTS:
        case EVENTS_FETCHED:
            
            return {
                ...state,
                fetching:false,
                loading:false,
                events:action.payload,
                
            }

        case EVENTS_ADDED:
            
            return {
                ...state,
                loading:false,
                events:[...state.events,action.payload],
                
            }
        case EVENTS_UPDATED:
            
            return {
                ...state,
                loading:false,
                events:state.events.map(item=>item.id == action.payload.id ? action.payload : item),
                
            }
        case EVENTS_DELETED:
            
            return {
                ...state,
                loading:false,
                events:state.events.filter(item => item.id != action.payload),
                
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

export const setEvents = (data) =>{
    return {
        type:SET_EVENTS,
        payload:data
    }
}
export const eventsFetched = (data) =>{
    return {
        type:EVENTS_FETCHED,
        payload:data
    }
}

export const eventsUpdated = (data) =>{
    return {
        type:EVENTS_UPDATED,
        payload:data
    }
}
export const eventsDeleted = (id) =>{
    return {
        type:EVENTS_DELETED,
        payload:id
    }
}
export const eventsAdded = (data) =>{
    return {
        type:EVENTS_ADDED,
        payload:data
    }
}

export const setErrors = (error) =>{
    return {
        type:SET_ERRORS,
        payload:error
    }
}

export const fetchEvents = () => (dispatch) => {
    
    const url = fetch_events_url;
    const actions={
        loading:{type:FETCHING_TRUE},
        success:eventsFetched,
        error:setErrors
    }
    return getAction(actions,url,dispatch);
}

export const addEvents = (newData) => (dispatch) => {
    
    const url = add_events_url;
    const actions={
        loading:{type:LOADING_TRUE},
        success:eventsAdded,
        error:setErrors
    }
    return postAction(actions,url,newData,dispatch);
}

export const updateEvents = (newData) => (dispatch) => {

    const url = update_events_url();
    const actions={
        loading:{type:LOADING_TRUE},
        success:eventsUpdated,
        error:setErrors
    }
    return postAction(actions,url,newData,dispatch,'put');
}

export const deleteEvents = (id) => (dispatch) => {

    const url = delete_events_url(id);
    const actions={
        loading:{type:LOADING_TRUE},
        success:eventsDeleted,
        error:setErrors
    }
    return postAction(actions,url,{},dispatch,'delete');
}
