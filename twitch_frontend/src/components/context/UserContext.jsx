import React, { createContext, useState } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => { 
    const [userToken, setUserToken] = useState(false); 
    return (
        <UserContext.Provider value={{ userToken, setUserToken }}> 
            {children}
        </UserContext.Provider>
    );
};


export { UserProvider, UserContext };
