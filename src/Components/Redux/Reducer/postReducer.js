import { POSTDATA } from "../Type/types"

const initialstate = {
    post : []
}

const postReducer = (state = initialstate , action) => {
    switch(action.type){
        case POSTDATA :
            // let ary = []
            // let a = action.postdata?.map(x => {
            //     if(ary[ary.length-1]?.length < 9){
            //         ary[ary.length-1].push(x);  
            //     }
            //     else{
            //         ary.push([x])
            //     }
            // })
            return {
                post : action.postdata
            }
        default :
            return state
    }
}

export default postReducer