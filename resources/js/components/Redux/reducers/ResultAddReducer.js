const initState = {
    fetching:true,
    loading:false,
    fixture:{},
    events:{
        team1:[],
        team2:[],
    },
    eventKey:0,
    ratings:{
        team1:[],
        team2:[],
    },
    error:{},
    success:'',
    submittedResult:{}
};

export default (state=initState,action)=>{
    switch (action.type) {

        case 'FIXTURE_DETAILS_FETCHED':
            
            return {
                ...state,
                fetching:false,
                fixture:action.payload,
                
            }
        case 'SUBMITTED_RESULT_FETCHED':
            
            return {
                ...state,
                fetching:false,
                submittedResult:action.payload,
                
            }
        case 'ADD_TEAM1_EVENT_TO_STATE':
            
            return {
                ...state,
                eventKey:state.eventKey + 1,
                events:{
                    ...state.events,
                    team1:[...state.events.team1,action.payload]
                },
                
            }
        case 'ADD_TEAM2_EVENT_TO_STATE':
            
            return {
                ...state,
                eventKey:state.eventKey + 1,
                events:{
                    ...state.events,
                    team2:[...state.events.team2,action.payload]
                },
            }
        
        case 'REMOVE_EVENT_FROM_STATE':
            
            return {
                ...state,
                events:{
                    ...state.events,
                    [`team${action.payload.team}`]:state.events[`team${action.payload.team}`].filter(event=> event.tableData.id != action.payload.id),
                }
                
            }

        case 'ADD_RATING_TO_STATE':
            
                return {
                    ...state,
                    ratings:{
                        ...state.ratings,
                        [`team${action.payload.team}`] : action.payload.ratings
                    },
                    
                }

        
        case 'REMOVE_RATING_FROM_STATE':
            
            return {
                ...state,
                loading:false,
                fixture:action.payload,
                
            }
        
        
        case 'EVENT_UPDATED':
        
            return {
                ...state,
                loading:false,
                fixture:action.payload,
                
            }
       
        case 'ADD_RESULT_LOADING_TRUE':
            
            return {
                ...state,
                loading:true
            }
        case 'ADD_RESULT_LOADING_FALSE':
            
            return {
                ...state,
                loading:false
            }
        case 'ADD_RESULT_FETCHING_TRUE':
        
            return {
                ...state,
                fetching:true
            }
        case 'ADD_RESULT_FETCHING_FALSE':
            
            return {
                ...state,
                fetching:false
            }
        case 'SET_ADD_RESULT_ERRORS':
            
            return {
                ...state,
                loading:false,
                fetching:false,
                error:action.payload
            }
        case 'ADD_RESULT_RESET':
            
            return initState
       
    
        default:
            return state;
    }
}