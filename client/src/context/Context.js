import {createContext, useEffect, useReducer} from "react";
import Reducer from "./Reducer";

const INITIAL_STATE = {  //the initial state
    user: JSON.parse(localStorage.getItem("user")) || null, //this sets the initial state value of the logged in user (whom i named "user" in the useEffect fuction below), to be user. That means that once the user is logged in, even if he refreshes, the inital storage state in the browser console-apllication is still "user". Meaning that he's still logged in (kinda like a jwt cookie). If there's no user logged in, the intial value is null.
    isFetching: false,
    error: false,
};

export const Context = createContext(INITIAL_STATE);

export const ContextProvider = ({children}) => {  //This ContextProvider is what we finally export which allows us use the props in all children components.
    const [state, dispatch] = useReducer(Reducer, INITIAL_STATE); //the Reducer will update the intial state depending on what the Action says

    useEffect(() =>{ //this stores the user in the browser's local storage any time they log in. This acts like the jwt cookie and keeps the user logged in. The useEffect fires everytime the user that logs in changes.
        localStorage.setItem("user", JSON.stringify(state.user)); //this names the logged in user "user" and stores it in the browser in JSON format (kinda like a jwt cookie).
    },[state.user]);

    return (  
    <Context.Provider  
      value={{  
        user: state.user,         //these three values can now be used in all children components, like they've been passed as props (because i've surrounded my index.js with it).
        isFetching: state.isFetching,
        error: state.error,
        dispatch,  //dispatch simply means the actions in the "Actions" (LoginStart, LoginSuccess and LoginFailure) can now be dispatched(done).
    }}
    > 
    {children}
    </Context.Provider>
    
)};