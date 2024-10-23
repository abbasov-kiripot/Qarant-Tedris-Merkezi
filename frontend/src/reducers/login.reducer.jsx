
function loginReducer(state = false, action){
    if(action.type === "LOGIN_TRUE") {
        state = true
    }else if (action.type === "LOGIN_FALSE") {
        state = false
    } 
    return state;
}
export default loginReducer