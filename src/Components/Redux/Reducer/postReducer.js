import { LIKE, POSTDATA } from "../Type/types"

const initialstate = {
    post : []
}

const postReducer = (state = initialstate , action) => {
    switch(action.type){
        case POSTDATA :
            return {
                post : action.postdata
            }
        
        default :
            return state
    }
}

export default postReducer