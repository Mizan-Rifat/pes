import { postAction, getAction } from "./actions";

//urls

const fetch_images_url = (id)=>`/api/`;
const add_images_url = `/api/result/image/add`;
const delete_images_url =(id)=> `/api/result/image/${id}`;
const update_images_url = (id)=>`/api/`;


//actions

const SET_IMAGES = 'pes/images/set_images';
const IMAGES_ADDED = 'pes/images/images_added';
const IMAGE_DELETED = 'pes/images/image_deleted';
const IMAGES_UPDATED = 'pes/images/images_updated';

const LOADING_TRUE = 'pes/images/loading_true';
const LOADING_FALSE = 'pes/images/loading_false';
const FETCHING_TRUE = 'pes/images/fetching_true';
const FETCHING_FALSE = 'pes/images/fetching_false';
const SET_ERRORS = 'pes/images/set_errors';

// reducers

const initState = {
    fetching:true,
    loading:false,
    images:[],
    error:{},
};

export default (state=initState,action)=>{
    switch (action.type) {

        case SET_IMAGES:
            return {
                ...state,
                fetching:false,
                loading:false,
                images:action.payload
            }

        case IMAGES_ADDED:
            
            return {
                ...state,
                loading:false,
                images:action.payload,
                
            }
        case IMAGES_UPDATED:
            
            return {
                ...state,
                loading:false,
                images:state.images.map(item=>item.id == action.payload.id ? action.payload : item),
                
            }
        case IMAGE_DELETED:
            
            return {
                ...state,
                loading:false,
                images:state.images.filter(item => item.id != action.payload),
                
            }
        case LOADING_TRUE:
            
            return {
                ...state,
                loading:true
            }
        case LOADING_FALSE:
            
            return {
                ...state,
                loading:false
            }
        case FETCHING_TRUE:
            
            return {
                ...state,
                fetching:true
    
            }
        case FETCHING_FALSE:
            
            return {
                ...state,
                fetching:false,
            }
        case SET_ERRORS:
            
            return {
                ...state,
                loading:false,
                fetching:false,
                error:action.payload
            }
    
        default:
            return state;
    }
}

// action_creators

export const setImages = (data) =>{

    return {
        type:SET_IMAGES,
        payload:data.images
    }
}

export const imagesUpdated = (data) =>{
    return {
        type:IMAGES_UPDATED,
        payload:data
    }
}
export const imageDeleted = (id) =>{
    return {
        type:IMAGE_DELETED,
        payload:id
    }
}
export const imagesAdded = (data) =>{
    return {
        type:IMAGES_ADDED,
        payload:data
    }
}

export const setErrors = (error) =>{
    return {
        type:SET_ERRORS,
        payload:error
    }
}

export const fetchImages = () => (dispatch) => {
    
    const url = fetch_images_url;
    const actions={
        loading:{type:FETCHING_TRUE},
        success:imagesFetched,
        error:setErrors
    }
    return getAction(actions,url,dispatch);
}


export const addImages = (data,config) => (dispatch) => {
    
    const url = add_images_url,
    actions={
        loading:{type:LOADING_TRUE},
        success:imagesAdded,
        error:setErrors
    }
    return postAction(actions,url,data,dispatch,'post',config);
}

export const updateImages = (newData) => (dispatch) => {

    const url = update_images_url();
    const actions={
        loading:{type:LOADING_TRUE},
        success:imagesUpdated,
        error:setErrors
    }
    return postAction(actions,url,newData,dispatch,'put');
}

export const deleteImage = (id) => (dispatch) => {

    const url = delete_images_url(id);
    const actions={
        loading:{type:LOADING_TRUE},
        success:imageDeleted,
        error:setErrors
    }
    return postAction(actions,url,{},dispatch,'delete');
}
