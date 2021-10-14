/* eslint-disable eqeqeq */
export const initialState = null

export const reducer = (state,action) => {
    // eslint-disable-next-line eqeqeq
    if ( action.type == "USER") {
        return action.payload
    // eslint-disable-next-line eqeqeq
    } if ( action.type == "CLEAR" ) {
        return null
    }

    return state
}