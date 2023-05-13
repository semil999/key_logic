import { COMMENT, LIKE, POSTDATA } from "../Type/types"

const initialstate = {
    post : []
}

const postReducer = (state = initialstate , action) => {
    switch(action.type){
        case POSTDATA :
            return {
                post : action.postdata
            }
        
        case COMMENT :
            let post = state.post?.find(x => x.id == action.comment.postId)
            'comment' in post == true ? post.comment.push(action.comment) : post.comment = [action.comment]
            // post.comment = [ ...[] , action.comment]
            // state.post?.filter(x => x.id == post.id ? x = post : x)
            return {
                post : state.post?.filter(x => x.id == post.id ? x = post : x)
            }
        default :
            return state
    }
}

export default postReducer