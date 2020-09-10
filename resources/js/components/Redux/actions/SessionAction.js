import { getAction, postAction } from "./actions"

export const fetchingTrue = () =>{
    return {
        type:'SESSION_FETCHING_TRUE',
    }
}

export const fetchingFalse = () =>{
    return {
        type:'SESSION_FETCHING_FALSE',
    }
}
export const sessionLoadingTrue = () =>{
    return {
        type:'SESSION_LOADING_TRUE',
    }
}

export const sessionLoadingFalse = () =>{
    return {
        type:'SESSION_LOADING_FALSE',
    }
}
export const sessionUserFetched = (user) =>{
    return {
        type:'SESSION_USER_FETCHED',
        payload:user
    }
}
export const sessionUserUpdated = (user) =>{
    return {
        type:'SESSION_USER_UPDATED',
        payload:user
    }
}
export const sessionAdminFetched = (admin) =>{
    return {
        type:'SESSION_ADMIN_FETCHED',
        payload:admin
    }
}
export const userLoggedIn = (user) =>{
    return {
        type:'SESSION_USER_LOGGED_IN',
        payload:user
    }
}
export const adminLoggedIn = (user) =>{
    return {
        type:'SESSION_ADMIN_LOGGED_IN',
        payload:user
    }
}
export const userLoggedOut = () =>{
    return {
        type:'SESSION_USER_LOGGED_OUT',
    }
}
export const adminLoggedOut = () =>{
    return {
        type:'SESSION_ADMIN_LOGGED_OUT',
    }
}
export const userRegistered = (user) =>{
    return {
        type:'SESSION_USER_REGISTERED',
        payload:user
    }
}
export const setErrors = (error) =>{
    return {
        type:'SET_SESSION_ERRORS',
        payload:error
    }
}
export const setSessionUserClub = (club) =>{
    console.log({club})
    return {
        type:'SET_SESSION_USER_CLUB',
        payload:club
    }
}


export const fetchSessionUser = () => (dispatch) =>{
  
    const url ='/api/user',
    actions={
        loading:fetchingTrue,
        success:sessionUserFetched,
        error:setErrors
    }
    return getAction(actions,url,dispatch);
}


export const updateClubInfo = (data) => (dispatch) => {
    console.log('ss')
    const url ='/api/club/info/update',
    actions={
        loading:sessionLoadingTrue,
        success:setSessionUserClub,
        error:setErrors
    }
    return postAction(actions,url,data,dispatch);
}


export const fetchSessionAdmin = () => (dispatch) => (

    new Promise((resolve,reject)=>{

        dispatch(fetchingTrue())

        axios.get(`/api/admin`)
        .then(response=>{
            console.log(response.data)
            dispatch(sessionAdminFetched(response.data))
            resolve()
            
        })
        .catch(error=>{
            const err = {
                errors:error.response.data.hasOwnProperty('errors') ? error.response.data.errors : {},
                message:error.response.data.message,
                errorCode:error.response.status
            }

            dispatch(setErrors(err))
            reject(err);

        })
    })
)


export const loginUser = (formData) => (dispatch) => {
  
    const url ='/login'
    const actions={
        loading:sessionLoadingTrue,
        success:userLoggedIn,
        error:setErrors
    }
    const data = {
        email:formData.email,
        password:formData.password,
        remember:formData.remember,
    }

    return postAction(actions,url,data,dispatch);
}
export const logoutUser = () => (dispatch) => {
  
    const url ='/logout'
    const actions={
        loading:fetchingTrue,
        success:userLoggedOut,
        error:setErrors
    }
    return postAction(actions,url,{},dispatch);
}
export const registerUser = (formData) => (dispatch) => {
  
    const url ='/register'
    const actions={
        loading:sessionLoadingTrue,
        success:userRegistered,
        error:setErrors
    }

    const data = {
        name:formData.name,
        email:formData.email,
        password:formData.password,
        password_confirmation:formData.password_confirmation,
    }

    return postAction(actions,url,data,dispatch);
}

export const loginAdmin = (formData) => (dispatch) => (

    new Promise((resolve,reject)=>{

        dispatch(loadingTrue())

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`/admin/login`,{
                email:formData.email,
                password:formData.password,
                remember:formData.remember,
            },{
                accept:'Application/Json'
            })
            .then(response=>{
                dispatch(adminLoggedIn(response.data))
                console.log(response.data)
                resolve();
            }).catch(error=>{

                const err = {
                    errors:error.response.data.hasOwnProperty('errors') ? error.response.data.errors : {},
                    message:error.response.data.message,
                    errorCode:error.response.status
                }

                dispatch(setErrors(err))

                reject(err);

            })
        })
    })
)

export const logoutAdmin = () => (dispatch) => (

    new Promise((resolve,reject)=>{

        dispatch(loadingTrue())

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`/admin/logout`,{},{
                accept:'Application/Json'
            })
            .then(response=>{
                dispatch(adminLoggedOut())
                console.log(response.data)
                resolve();
            }).catch(error=>{

                const err = {
                    errors:error.response.data.hasOwnProperty('errors') ? error.response.data.errors : {},
                    message:error.response.data.message,
                    errorCode:error.response.status
                }

                dispatch(setErrors(err))

                reject(err);

            })
        })
    })
)

// export const registerUser = (formData) => (dispatch) => (

//     new Promise((resolve,reject)=>{

//         dispatch(loadingTrue())

//         axios.get('/sanctum/csrf-cookie').then(response => {
//             axios.post(`/register`,{
//                 name:formData.name,
//                 email:formData.email,
//                 password:formData.password,
//                 password_confirmation:formData.password_confirmation,
//             })
//             .then(response=>{
//                 dispatch(userRegistered(response.data))
//                 console.log(response.data)
//                 resolve();
//             }).catch(error=>{

//                 const err = {
//                     errors:error.response.data.hasOwnProperty('errors') ? error.response.data.errors : {},
//                     message:error.response.data.message,
//                     errorCode:error.response.status
//                 }

//                 dispatch(setErrors(err))

//                 reject(err)

//                 // switch (error.response.status) {
//                 //     case 406:
//                 //         reject(error.response.data.message)
//                 //         break;
//                 //     case 422:
//                 //         // console.log(error.response.data.errors)
//                 //         reject(error.response.data.errors)
//                 //         break;
//                 //     case 500:
//                 //         // console.log(error.response.data.message)
//                 //         reject({msg:error.response.data.message})
//                 //         break;
                
//                 //     default:
//                 //         reject()
//                 //         break;
//                 // }

//             })
//         })
//     })
// )

