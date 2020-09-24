const initState = {
    loading:false,
    notifications:[],
    error:{
        message:'',
        errors:{},
        errorCode:''
    },
};

export default (state=initState,action)=>{

    switch (action.type) {
        case 'SET_NOTIFICATIONS':
            
            return {
                ...state,
                loading:false,
                notifications:action.payload
            }  
        case 'MARK_NOTIFICATION_AS_READ':
        
            return {
                ...state,
                loading:false,
                notifications:state.notifications.map(notification=>notification.id == action.payload.id ? {...notification,read_at : new Date()} : notification )
                
            }
        case 'MARK_NOTIFICATION_AS_UNREAD':
            
            return {
                ...state,
                loading:false,
                notifications:state.notifications.map(notification=>notification.id == action.payload.id ? {...notification,read_at : null} : notification )
                
            }
        case 'RECEIVE_NOTIFICATION':
            
            return {
                ...state,
                notifications:[
                    {
                        ...action.payload,
                        read_at:null,
                        created_at:new Date()
                    },
                    ...state.notifications
                ]
                
            }
        case 'NOTIFICATION_DELETED':
            
            return {
                ...state,
                notifications:state.notifications.filter(item=>item.id != action.payload)
                
            } 
        case 'SET_NOTIFICATION_ERRORS':
            
            return {
                ...state,
                loading:false,
                error:action.payload
                
            } 
    
        default:
            return state;
    }
}