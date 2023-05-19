import { LOGINUSER } from "../Type/types"

let initialState = {
    loginUser : []
}

const loginUserReducer = (state = initialState , action) => {
    switch(action.type){
        case LOGINUSER :
            return {
                loginUser : action.data
            }

        default :
            return state
    }
}

export default loginUserReducer