import { createContext, useContext } from "react";

const CommonContext = createContext();

export const useCommonContext = () => useContext(CommonContext);

const ContextProvider = ({ children }) => {
  const value = {};
  return (
    <CommonContext.Provider value={value}>{children}</CommonContext.Provider>
  );
};


export default ContextProvider