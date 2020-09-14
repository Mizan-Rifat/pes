const initState = {
    fetching:true,
    loading:false,
    fixture:{},
    events:[],
    eventKey:0,
    ratings:[],
    images:[],
    eventsImages:[],
    ratings1Images:[],
    ratings2Images:[],
    error:{},
    success:'',
    submittedResult:{}
};

export default (state=initState,action)=>{
    switch (action.type) {

        case 'FIXTURE_DETAILS_FETCHED':
            
            return {
                ...initState,
                fetching:false,
                fixture:action.payload,
                
            }
        case 'SUBMITTED_RESULT_FETCHED':
            
            return {
                ...initState,
                fetching:false,
                fixture:action.payload.fixture,
                events:action.payload.events,
                ratings:action.payload.ratings,
                images:action.payload.images,
                // event_images_sub_by_team1:action.payload.event_images_sub_by_team1,
                // event_images_sub_by_team2:action.payload.event_images_sub_by_team2,
                // team1_ratings_images_sub_by_team1:action.payload.team1_ratings_images_sub_by_team1,
                // team1_ratings_images_sub_by_team2:action.payload.team1_ratings_images_sub_by_team2,
                // team2_ratings_images_sub_by_team1:action.payload.team2_ratings_images_sub_by_team1,
                // team2_ratings_images_sub_by_team2:action.payload.team2_ratings_images_sub_by_team2,
                
            }
        case 'SET_IMAGES':
            return {
                ...state,
                [action.payload.label]:action.payload.images

            }
        case 'IMAGE_ADDED':
            return {
                ...state,
                loading:false,
                images:action.payload

            }
        case 'IMAGE_DELETED':
            return {
                ...state,
                loading:false,
                images:state.images.filter(item=> item.id != action.payload.id)

            }
        case 'ADD_EVENT_TO_STATE':
            
            return {
                ...state,
                loading:false,
                eventKey:state.eventKey + 1,
                events:[
                    ...state.events,
                    action.payload
                ],
                
            }
        
        case 'REMOVE_EVENT_FROM_STATE':
            
            return {
                ...state,
                loading:false,
                events:state.events.filter(item=>item.id != action.payload.id)
                
            }

        case 'ADD_RATING_TO_STATE':
            
                return {
                    ...state,
                    ratings:[...state.ratings,...action.payload]
                    
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
                events:{
                    team1:state.events.team1.map(item=>item.id == action.payload.id ? action.payload : item),
                    team2:state.events.team2.map(item=>item.id == action.payload.id ? action.payload : item)
                },
                
            }
        case 'RATINGS_UPDATED':
        
            return {
                ...state,
                ratings:state.ratings.map(item=>item.id == action.payload.id ? action.payload : item)
            }
        case 'RATINGS_EDITED':
        
            return {
                ...state,
                loading:false,
                ratings:action.payload
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