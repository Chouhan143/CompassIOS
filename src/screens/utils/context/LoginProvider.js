// LoginProvider.js
import {createContext, useContext, useState} from 'react';

const LoginContext = createContext();
const TryDemoContext = createContext(); // Add this line
const TransactionFlagContext = createContext();

const LoginProvider = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [demoClicked, setDemoClicked] = useState(false);
  const [TransactionFlag, setTransactionFlag] = useState(false);

  return (
    <LoginContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        TransactionFlag,
        setTransactionFlag,
        demoClicked,
        setDemoClicked,
      }}>
      <TryDemoContext.Provider value={{demoClicked, setDemoClicked}}>
        {children}
      </TryDemoContext.Provider>
    </LoginContext.Provider>
  );
};

export const useLogin = () => useContext(LoginContext);
export const useTryDemo = () => useContext(TryDemoContext); // Add this line
export const useTransactionFlag = () => useContext(TransactionFlagContext);

export default LoginProvider;
