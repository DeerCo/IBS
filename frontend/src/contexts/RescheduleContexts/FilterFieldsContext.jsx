import React from 'react';

const defaultFilterFields = {
    interview_id: '',
    booked: false,
    time: '',
    date: '',
    group_id: '',
    length: '',
    location: '',
    note: '',
    cancelled: false
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
