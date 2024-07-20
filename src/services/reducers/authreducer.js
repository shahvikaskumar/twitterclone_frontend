const initialstate = {
    isauth:false,
    user:null,
    token:null,
};

const authreducer = (state = initialstate, action) => {
    switch(action.type){
        case 'Login success':
        case 'Register success':
            return {
                isauth:true,
                user:action.payload.username,
                token:action.payload.token,
            };
        
        case 'Login fail':
        case 'Register fail':
            return {
                ...state,
                isauth:false,
                user:null,
                token:null,
            };
        
        default:
            return state;
    }
};

export default authreducer;