const initState = {
    fetching:true,
    loading:true,
    fixtures:[],
    error:{},
    success:''
};

export default (state=initState,action)=>{
    switch (action.type) {
        case 'ALL_FIXTURES_FETCHED':
            
            return {
                ...state,
                fixtures:action.payload,
                loading:false,
                fetching:false

            }
        
        case 'DELETE_FIXTURE':
        
            return {
                ...state,
                loading:false,
                fixtures:state.fixtures.filter(fixture=> !action.payload.includes(fixture.id)),
                success:action.payload.message
            }
        case 'CREATE_FIXTURE':
        
            return {
                ...state,
                loading:false,
                fixtures:[...state.fixtures,action.payload.fixture]
            }
        case 'UPDATE_FIXTURE':
        
            return {
                ...state,
                loading:false,
                fixtures:state.fixtures.map(fixture=>(
                    fixture.id === action.payload.fixture.id ? action.payload.fixture : fixture 
                ))
            }

        case 'FIXURES_LOADING_TRUE':
            
            return {
                ...state,
                loading:true
            }
        case 'FIXURES_LOADING_FALSE':
            
            return {
                ...state,
                loading:false
            }
        case 'FIXURES_FETCHING_TRUE':
        
            return {
                ...state,
                fetching:true
            }
        case 'FIXURES_FETCHING_FALSE':
            
            return {
                ...state,
                fetching:false
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
                fixtures:[],
                error:{},
                success:''
            }
    
        default:
            return state;
    }
}