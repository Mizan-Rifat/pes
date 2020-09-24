export const loadingTrue = () =>{
    return {
        type:'TOURNAMENT_LOADING_TRUE',
    }
}
export const fetchingTrue = () =>{
    return {
        type:'TOURNAMENT_LOADING_TRUE',
    }
}
export const loadingFalse = () =>{
    return {
        type:'TOURNAMENT_FETCHING_FALSE',
    }
}
export const fetchingFalse = () =>{
    return {
        type:'TOURNAMENT_FETCHING_FALSE',
    }
}

export const infoFetched = (data) =>{
    return {
        type:'TOURNAMENT_INFO_FETCHED',
        payload:data
    }
}
export const infoUpdated = (tournament) =>{
    return {
        type:'INFO_UPDATED',
        payload:tournament
    }
}

export const setErrors = (error) =>{
    return {
        type:'SET_TOURNAMENT_ERRORS',
        payload:error
    }
}

export const fetchInfo = (slug) => (dispatch) => {

    const url =`/api/tournament/?slug=${slug}`,
    actions={
        loading:fetchingTrue,
        success:infoFetched,
        error:setErrors
    }
    return postAction(actions,url,data,dispatch);
}



