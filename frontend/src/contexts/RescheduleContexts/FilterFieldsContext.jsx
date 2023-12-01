import React from 'react';

const defaultFilterFields = {
    interview_id: null,
    booked: null,
    time: null,
    date: null,
    group_id: null,
    length: null,
    location: null,
    note: null,
    cancelled: null
};

const FilterFieldsContext = React.createContext({
    filterFields: defaultFilterFields,
    setFilterFields: () => {}
});

const FilterFieldsProvider = ({ children }) => {
    const [filterInputFieldsObj, setFilterInputFieldsObj] = React.useState(defaultFilterFields);

    return (
        <FilterFieldsContext.Provider
            value={{ filterFields: filterInputFieldsObj, setFilterFields: setFilterInputFieldsObj }}
        >
            {children}
        </FilterFieldsContext.Provider>
    );
};

export { FilterFieldsContext, FilterFieldsProvider };
