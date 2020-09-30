import { getAction, postAction } from "../actions/actions";

//urls

const mark_notification_as_read_url = (id)=>`/api/notification/markasread/${id}`
const mark_notification_as_unread_url = (id)=>`/api/notification/markasunread/${id}`
const delete_notification_url = (id)=>`/api/notification/${id}`

//actions

const SET_NOTIFICATIONS = 'pes/notifications/set_notifications';
const MARK_NOTIFICATION_AS_READ = 'pes/notifications/mark_notification_as_read';
const MARK_NOTIFICATION_AS_UNREAD = 'pes/notifications/mark_notification_as_unread';
const NOTIFICATION_DELETED = 'pes/notifications/notification_deleted';
const NOTIFICATION_RECIEVED = 'pes/notifications/notification_received';
const SET_NOTIFICATION_ERRORS = 'pes/notifications/set_notifications_erros';

// reducer

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
        case SET_NOTIFICATIONS:
            
            return {
                ...state,
                loading:false,
                notifications:action.payload
            }  
        case MARK_NOTIFICATION_AS_READ:
        
            return {
                ...state,
                loading:false,
                notifications:state.notifications.map(notification=>notification.id == action.payload.id ? {...notification,read_at : new Date()} : notification )
                
            }
        case MARK_NOTIFICATION_AS_UNREAD:
            
            return {
                ...state,
                loading:false,
                notifications:state.notifications.map(notification=>notification.id == action.payload.id ? {...notification,read_at : null} : notification )
                
            }
        case NOTIFICATION_RECIEVED:
            
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
        case NOTIFICATION_DELETED:
            
            return {
                ...state,
                notifications:state.notifications.filter(item=>item.id != action.payload)
                
            } 
        case SET_NOTIFICATION_ERRORS:
            
            return {
                ...state,
                loading:false,
                error:action.payload
                
            } 
    
        default:
            return state;
    }
}

//action creators

export const setNotifications=(data)=>(
    {
        type:SET_NOTIFICATIONS,
        payload:data.notifications
    }
)
export const notificationMarkedAsRead=(id)=>(
    {
        type:MARK_NOTIFICATION_AS_READ,
        payload:{id}
    }
)
export const notificationMarkedAsUnRead=(id)=>(
    {
        type:MARK_NOTIFICATION_AS_UNREAD,
        payload:{id}
    }
)
export const receiveNotification=(notification)=>(
    {
        type:NOTIFICATION_RECIEVED,
        payload:notification
    }
)
export const notificationDeleted=(id)=>(
    {
        type:NOTIFICATION_DELETED,
        payload:id
    }
)
export const setErrors = (error) =>{
    return {
        type:SET_NOTIFICATION_ERRORS,
        payload:error
    }
}
export const notificationMarkAsRead = (id) => (dispatch) => {

    const url = mark_notification_as_read_url(id),
    actions={
        success:notificationMarkedAsRead,
        error:setErrors
    }
    return postAction(actions,url,{},dispatch,'put');
}
export const notificationMarkAsUnRead = (id) => (dispatch) => {

    const url = mark_notification_as_unread_url(id),
    actions={
        success:notificationMarkedAsUnRead,
        error:setErrors
    }
    return postAction(actions,url,{},dispatch,'put');
}
export const deleteNotification = (id) => (dispatch) => {
  
    const url = delete_notification_url(id)
    const actions={
        success:notificationDeleted,
        error:setErrors
    }

    return postAction(actions,url,{},dispatch,'delete');
}
