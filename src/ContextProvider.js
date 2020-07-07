import React, { createContext, useState, useMemo, useContext } from 'react';

const Context = createContext();
const useStateContext = () => React.useContext(Context);

const StateContextProvider = ({ children, initialValue }) => {
    const [state, setState] = useState(initialValue);
    const value = useMemo(() => [state, setState], [state, setState])
    return (
        <Context.Provider value={value}>{children}</Context.Provider>
    )
}

export { StateContextProvider, useStateContext };