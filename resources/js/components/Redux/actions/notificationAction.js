import { postAction, getAction } from "./actions"

export const setNotifications=(data)=>(
    {
        type:'SET_NOTIFICATIONS',
        payload:data.notifications
    }
)


export const notificationMarkedAsRead=(id)=>(
    {
        type:'MARK_NOTIFICATION_AS_READ',
        payload:{id}
    }
)
export const notificationMarkedAsUnRead=(id)=>(
    {
        type:'MARK_NOTIFICATION_AS_UNREAD',
        payload:{id}
    }
)
export const receiveNotification=(notification)=>(
    {
        type:'RECEIVE_NOTIFICATION',
        payload:notification
    }
)
export const notificationDeleted=(id)=>(
    {
        type:'NOTIFICATION_DELETED',
        payload:id
    }
)

export const setErrors = (error) =>{
    return {
        type:'SET_NOTIFICATION_ERRORS',
        payload:error
    }
}


export const notificationMarkAsRead = (id) => (dispatch) => {

    const url =`/api/notification/markasread/${id}`,
    actions={
        success:notificationMarkedAsRead,
        error:setErrors
    }
    return getAction(actions,url,dispatch);
}

export const notificationMarkAsUnRead = (id) => (dispatch) => {

    const url =`/api/notification/markasunread/${id}`,
    actions={
        success:notificationMarkedAsUnRead,
        error:setErrors
    }
    return getAction(actions,url,dispatch);
}

export const deleteNotification = (id) => (dispatch) => {
  console.log('jh')
    const url =`/api/notification/delete/${id}`
    const actions={
        success:notificationDeleted,
        error:setErrors
    }

    return postAction(actions,url,{},dispatch);
}
