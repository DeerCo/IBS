import React from 'react';

const UserContext = React.createContext({
    role: null,
    setRole: () => {}
});

const UserContextProvider = ({ children }) => {
    const [role, setRole] = React.useState(null);

    return <UserContext.Provider value={{ role, setRole }}>{children}</UserContext.Provider>;
};

export { UserContext, UserContextProvider };
