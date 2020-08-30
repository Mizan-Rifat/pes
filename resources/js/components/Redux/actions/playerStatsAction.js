export const reset = () =>{
    return {
        type:'RESET',
    }
}
export const loadingTrue = () =>{
    return {
        type:'STATS_LOADING_TRUE',
    }
}

export const loadingFalse = () =>{
    return {
        type:'STATS_LOADING_FALSE',
    }
}

export const statsFetched = (data) =>{
    return {
        type:'STATS_FETCHED',
        payload:data
    }
}
export const sortStats = (stats) =>{
    return {
        type:'STATS_SORTING',
        payload:stats
    }
}


export const fetchStats = (tournament_id) => (dispatch) => (

    new Promise((resolve,reject)=>{

        dispatch(loadingTrue())
        
        axios.get(`/api/tournament/players/stats?tournament_id=${tournament_id}`)
        .then(response=>{
            dispatch(statsFetched(response.data.data))
            resolve()
            
        })
        .catch(error=>{
            
            switch (error.response.status) {
                case 422:
                    console.log(error.response.data.errors)
                    reject(error.response.data.errors)
                    break;
                case 500:
                    console.log(error.response.data.message)
                    reject({msg:error.response.data.message})
                    break;
                case 404:
                    console.log(error.response.data.message)
                    reject({msg:'Result Not Found'})
                    break;
            
                default:
                    break;
            }
            dispatch(loadingFalse())
         

        })
    
    })
)
