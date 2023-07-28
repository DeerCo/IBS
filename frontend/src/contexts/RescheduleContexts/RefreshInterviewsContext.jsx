import React from 'react';

const RefreshInterviewsContext = React.createContext({
    refreshInterviews: false,
    setRefreshInterviews: () => {}
});

const RefreshInterviewsProvider = ({ children }) => {
    const [refreshInterviews, setRefreshInterviews] = React.useState(false);

    return (
        <RefreshInterviewsContext.Provider value={{ refreshInterviews, setRefreshInterviews }}>
            {children}
        </RefreshInterviewsContext.Provider>
    );
};

export { RefreshInterviewsContext, RefreshInterviewsProvider };
