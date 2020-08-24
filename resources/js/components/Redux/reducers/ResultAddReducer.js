const initState = {
    loading:true,
    fixture:{},
    events:[],
    ratings:[],
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
                events:[...state.events,action.payload],
                
            }
        case 'ADD_RATING_TO_STATE':
            
            return {
                ...state,
                ratings:[...state.ratings,action.payload],
                
            }
        case 'REMOVE_EVENT_FROM_STATE':
            
            return {
                ...state,
                events:state.events.filter(event=> event.id != action.payload.id),
                
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
       
    
        default:
            return state;
    }
}