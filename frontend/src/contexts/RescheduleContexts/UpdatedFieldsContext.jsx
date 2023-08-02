import React from 'react';

const defaultUpdatedFields = {
    set_time: null,
    set_group_id: null,
    set_length: null,
    set_location: null,
    set_note: null,
    set_cancelled: null
};

const UpdatedFieldsContext = React.createContext({
    updatedFields: defaultUpdatedFields,
    setUpdatedFields: () => {}
});

const UpdatedFieldsProvider = ({ children }) => {
    const [updatedInfo, setUpdatedInfo] = React.useState(defaultUpdatedFields);

    return (
        <UpdatedFieldsContext.Provider
            value={{ updatedFields: updatedInfo, setUpdatedFields: setUpdatedInfo }}
        >
            {children}
        </UpdatedFieldsContext.Provider>
    );
};

export { UpdatedFieldsContext, UpdatedFieldsProvider };
