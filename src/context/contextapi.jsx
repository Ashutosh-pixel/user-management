import React, { createContext, useState } from 'react';

// Create a context
export const ContextApi = createContext();

const UserProvider = ({ children }) => {
    const [name, setName] = useState(null);
    const [site, setSite] = useState(null);
    const [userdata, setUserData] = useState([]);
    const [id, setId] = useState(null);

    return (
        <ContextApi.Provider value={{ name, setName, site, setSite, userdata, setUserData, id, setId }}>
            {children}
        </ContextApi.Provider>
    );
};

export default UserProvider;
