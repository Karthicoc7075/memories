

export default (state={authData:null},action)=>{
    switch (action.type) {
        case 'AUTH':
       localStorage.setItem('profile',JSON.stringify({...action.data}))
       return {...state,authData:action.data};

       case 'LOGOUT':
        localStorage.clear();

        return {...state,authUser:null}
        default:
            return state
    }
}