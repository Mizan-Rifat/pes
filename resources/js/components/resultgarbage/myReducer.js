export default (state,action) => {
    switch (action.type) {

        case 'EVENT_ID_CHANGE':
            
            return {
                ...state,
                [`team${action.payload.teamNo}`]:{
                    ...[`team${action.payload.teamNo}`],
                    state[`team${action.payload.teamNo}`].events:[
                        ...events.slice(0,action.payload.index),5
                    ]
                }
            }
    
        default:
            return state
    }
}