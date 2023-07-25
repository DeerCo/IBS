import React from 'react';

const defaultUpdatedFields = {
    set_time: '',
    set_group_id: '',
    set_length: '',
    set_location: '',
    set_note: '',
    set_cancelled: false
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
