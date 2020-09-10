const initState = {
    fetching:true,
    loading:true,
    detailPanelLoading:true,
    results:[],
    team1_events:[],
    team2_events:[],
    team1_ratings:[],
    team2_ratings:[],
    error:{},
    team1:[],
    team2:[],
    success:'',
    test:[],
    resultDetails:{},
    resultDetailsLoading:true,
};

export default (state=initState,action)=>{
    switch (action.type) {
        case 'ALL_RESULT_FETCHED':
            
            return {
                ...state,
                results:action.payload,
                loading:false
            }
        case 'RESULT_DETAILS_FETCHED':
            
            return {
                ...state,
                resultDetails:action.payload,
                resultDetailsLoading:false

            }
        // case 'RESULT_DETAILS_FETCHED':
            
        //     return {
        //         ...state,
        //         team1_events:action.payload.team1_events,
        //         team2_events:action.payload.team2_events,
        //         team1_ratings:action.payload.team1_ratings,
        //         team2_ratings:action.payload.team2_ratings,
        //         // team1:action.payload.team1,
        //         // team2:action.payload.team2,
        //         detailPanelLoading:false
        //     }
        case 'ALL_RESULT_FETCHED_ERROR':
            
            return {
                ...state,
                error:action.payload,
                loading:false
            }
        case 'UPDATE_RESULT':
            
            return {
                ...state,
                loading:false,
                results:state.results.map(result=>(
                    result.id === action.payload.result.id ? action.payload.result : result 
                ))
            }
        case 'DELETE_RESULT':
            
            return {
                ...state,
                loading:false,
                results:state.results.filter(result=> !action.payload.ids.includes(result.id)),
                success:action.payload.message
            }
        case 'EVENT_DELETED':
            
            return {
                ...state,
                loading:false,
                [action.payload.key]:state[action.payload.key].filter(item => item.id != action.payload.id)
                
                
            }
        case 'RATING_DELETED':
            
            return {
                ...state,
                loading:false,
                [action.payload.key]:state[action.payload.key].filter(item => item.id != action.payload.id)
                
                
            }
        case 'EVENT_ADDED':
            
            return {
                ...state,
                [action.payload.key]:[...state[action.payload.key],action.payload.event]
                
            }
        case 'RATING_ADDED':
            
            return {
                ...state,
                [action.payload.key]:[...state[action.payload.key],action.payload.rating]
                
            }
       
        case 'RESULTS_LOADING_TRUE':
            
            return {
                ...state,
                loading:true
            }
        case 'RESULTS_DETAIL_PANEL_LOADING_TRUE':
            
            return {
                ...state,
                detailPanelLoading:true
            }
        case 'RESULTS_LOADING_FALSE':
            
            return {
                ...state,
                loading:false
            }

        case 'RESULTS_DETAIL_PANEL_LOADING_FALSE':
            
                return {
                    ...state,
                    detailPanelLoading:false
                }
        case 'RESULT_DETAILS_LOADING_TRUE':
            
                return {
                    ...state,
                    resultDetailsLoading:true
                }
        case 'RESULT_DETAILS_LOADING_FALSE':
            
                return {
                    ...state,
                    resultDetailsLoading:false
                }
                
        case 'SET_ERRORS':
            
            return {
                ...state,
                loading:false,
                error:action.payload
            }
        case 'RESET':
            
            return {
                loading:true,
                detailPanelLoading:true,
                results:[],
                team1_events:[],
                team2_events:[],
                team1_ratings:[],
                team2_ratings:[],
                error:{},
                team1:[],
                team2:[],
                success:'',
                test:[],
                resultDetails:{},
                resultDetailsLoading:true,
            }
    
        default:
            return state;
    }
}