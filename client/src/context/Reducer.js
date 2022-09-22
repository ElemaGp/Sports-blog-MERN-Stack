//this "Reducer" file helps the "Context"(initial state) file interact with the "Actions"(the actions that can happen) file

const Reducer = (state, action) => {
    switch(action.type){
        case "LOGIN_START": //if the action.type is LOGIN_START...
            return{
                user: null,
                isFetching: true,
                error: false,
            };
        case "LOGIN_SUCCESS": //if the action.type is LOGIN_SUCCESS...
            return{
                user: action.payload, //action.payload means the payload property from the Actions file. The action.payload gives us access to the user object from backend, so we can now access user.username, user.email etc.
                isFetching: false,
                error: false,
            };
        case "LOGIN_FAILURE": //if the action.type is LOGIN_FAILURE...
            return{
                user: null,
                isFetching: false,
                error: true,
            };
           
            case "UPDATE_START": //if the action.type is UPDATE_START...
            return{
                ...state, //this means that the user's state will remain whatever it was previously, at the start of update.
                isFetching: true
            };
        case "UPDATE_SUCCESS": //if the action.type is UPDATE_SUCCESS...
            return{
                user: action.payload, //action.payload means the payload property from the Actions file. The action.payload gives us access to the user object from backend, so we can now access user.username, user.email etc.
                isFetching: false,
                error: false,
            };
        case "UPDATE_FAILURE": //if the action.type is UPDATE_FAILURE...
            return{
                user: state.user, //if it couldn't update, user's state will remain whatever it was previously before he tried to update it.
                isFetching: false,
                error: true,
            };
        case "LOGOUT": //if the action.type is LOGOUT...
            return{
                user: null,
                isFetching: false,
                error: false,
            };
            default: 
                return state;
    }
};

export default Reducer;

