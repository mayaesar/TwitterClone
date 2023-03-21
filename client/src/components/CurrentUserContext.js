import { createContext, useEffect, useState } from "react";
import {FaBomb} from "react-icons/fa";
import { Error } from "./Error";

export const CurrentUserContext = createContext();

export const CurrentUserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [isError, setIsError] = useState(null);
    const check = (res) => {
        if(res.status >= 200 && res.status <= 299){
            return res.json()
        }
        else{
            throw Error(<div>
                <FaBomb />
                <h2>An unknown error has occurred.</h2>
                <p>Please try refreshing the page</p>
            </div>)
        }
    };

    useEffect(() => {
        fetch('/api/me/profile')
            .then(check)
            .then (data => setCurrentUser(data))
            .catch((error) => setIsError(error))
    }, []);
    
    if (isError){
        return(
            <CurrentUserContext.Provider>
                <Error/>
            </CurrentUserContext.Provider>
        )
    }
    return(
        <CurrentUserContext.Provider value={{currentUser, check}}>
            {children}
        </CurrentUserContext.Provider>
    );
};