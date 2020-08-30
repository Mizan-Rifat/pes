const initState = {
    loading:true,
    submitLoading:false,
    fixture:{},
    events:[],
    eventKey:0,
    ratings:{},
    error:{},
    success:''
};

export default (state=initState,action)=>{
    switch (action.type) {

        case 'FIXTURE_DETAILS_FETCHED':
            
            return {
                ...state,
                loading:false,
                fixture:action.payload,
                
            }
        case 'ADD_EVENT_TO_STATE':
            
            return {
                ...state,
                eventKey:state.eventKey + 1,
                events:[...state.events,{...action.payload,eventKey:state.eventKey}],
                
            }
        
        case 'REMOVE_EVENT_FROM_STATE':
            
            return {
                ...state,
                events:state.events.filter(event=> event.eventKey != action.payload.key),
                
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
        case 'ADD_RESULT_SUBMIT_LOADING_TRUE':
        
            return {
                ...state,
                submitLoading:true
            }
        case 'ADD_RESULT_SUBMIT_LOADING_FALSE':
            
            return {
                ...state,
                submitLoading:false
            }
       
    
        default:
            return state;
    }
}