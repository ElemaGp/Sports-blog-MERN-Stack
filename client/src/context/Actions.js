export const LoginStart = (userCredentials)=>({
    type: "LOGIN_START",
});

export const LoginSuccess = (user) => ({
    type: "LOGIN_SUCCESS",
    payload: user,
});

export const LoginFailure = () => ({
    type: "LOGIN_FAILURE",
});

export const Login = () => ({
    type: "LOGOUT",
});

//this Action.js oversees the actions that can happen after a user clicks to submit login details