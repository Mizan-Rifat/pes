
export const loadingTrue = () =>{
    return {
        type:'SESSION_AUTH_LOADING_TRUE',
    }
}

export const loadingFalse = () =>{
    return {
        type:'SESSION_AUTH_LOADING_FALSE',
    }
}
export const userloadingTrue = () =>{
    return {
        type:'SESSION_USER_LOADING_TRUE',
    }
}

export const userLoadingFalse = () =>{
    return {
        type:'SESSION_USER_LOADING_FALSE',
    }
}
export const userFetched = (users) =>{
    return {
        type:'USER_FETCHED',
        payload:users
    }
}
export const userLoggedIn = (user) =>{
    return {
        type:'USER_LOGGED_IN',
        payload:user
    }
}
export const userLoggedOut = () =>{
    return {
        type:'USER_LOGGED_OUT',
    }
}
export const userRegistered = (user) =>{
    return {
        type:'USER_REGISTERED',
        payload:user
    }
}
export const setErrors = (error) =>{
    return {
        type:'SET_SESSION_ERRORS',
        payload:error
    }
}


export const fetchUser = () => {

    return (dispatch) => {
        
        dispatch(loadingTrue())
        axios.get(`/api/`)
        .then(response=>{
            console.log(response.data.data)
            dispatch(allUsersFetched(response.data.data))
            
        })
        .catch(error=>{
            console.log(error)
            dispatch(allUsersFetchedError(error))

        })
    } 
}

export const loginUser = (formData) => (dispatch) => (

    new Promise((resolve,reject)=>{

        dispatch(loadingTrue())

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`/login`,{
                email:formData.email,
                password:formData.password,
                remember:formData.remember,
            },{
                accept:'Application/Json'
            })
            .then(response=>{
                dispatch(userLoggedIn(response.data))
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
export const logoutUser = () => (dispatch) => (

    new Promise((resolve,reject)=>{

        dispatch(loadingTrue())

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`/logout`,{},{
                accept:'Application/Json'
            })
            .then(response=>{
                dispatch(userLoggedOut())
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

export const registerUser = (formData) => (dispatch) => (

    new Promise((resolve,reject)=>{

        dispatch(loadingTrue())

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`/register`,{
                name:formData.name,
                email:formData.email,
                password:formData.password,
                password_confirmation:formData.password_confirmation,
            })
            .then(response=>{
                dispatch(userRegistered(response.data))
                console.log(response.data)
                resolve();
            }).catch(error=>{

                const err = {
                    errors:error.response.data.hasOwnProperty('errors') ? error.response.data.errors : {},
                    message:error.response.data.message,
                    errorCode:error.response.status
                }

                dispatch(setErrors(err))

                reject(err)

                // switch (error.response.status) {
                //     case 406:
                //         reject(error.response.data.message)
                //         break;
                //     case 422:
                //         // console.log(error.response.data.errors)
                //         reject(error.response.data.errors)
                //         break;
                //     case 500:
                //         // console.log(error.response.data.message)
                //         reject({msg:error.response.data.message})
                //         break;
                
                //     default:
                //         reject()
                //         break;
                // }

            })
        })
    })
)

