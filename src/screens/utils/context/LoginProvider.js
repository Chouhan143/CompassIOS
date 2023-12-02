import {createContext, useContext, useState} from 'react';

const LoginContext = createContext();
const TransactionFlagContext = createContext();

const LoginProvider = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [TransactionFlag, setTransactionFlag] = useState(false);
  return (
    <LoginContext.Provider
      value={{isLoggedIn, setIsLoggedIn, TransactionFlag, setTransactionFlag}}>
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => useContext(LoginContext);
export const useTransactionFlag = () => useState(TransactionFlagContext);

export default LoginProvider;
