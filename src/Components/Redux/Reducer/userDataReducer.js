import { USERDATA } from "../Type/types"

const initialState = {
    user : []
}

const userDataReducer = (state = initialState , action) => {
    switch(action.type){
        case USERDATA :
            return {
                user : action.userdata
            }
        
        default :
            return state
    }
}

export default userDataReducer