import axios from "axios";
import React, { createContext, useState } from "react";
import CookiesStorageService from "../services/CookiesStorageService";

const StorageService = CookiesStorageService.getService();

const userContext = createContext({});

const UserContextProvider = ({ children }) => {
  const [isUserAuth, setIsUserAuth] = useState(false);
  const [error, seterror] = useState(null);
  const [isloading, setLoading] = useState(false);

  const [registerSucess, setRegisterSucess] = useState(false);

  React.useEffect(() => {
    if (!!StorageService.getAccessToken()) {
      setIsUserAuth(true);
    }
  }, []);

  const RegisterSubmit = (values) => {
    setLoading(true);
    seterror('')
    setRegisterSucess(false);
    axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
      .then(() => {
        setLoading(false);
        setRegisterSucess(true);
      })
      .catch((error) => {
        setLoading(false);
        setRegisterSucess(false);
        seterror(error?.response?.data?.message);
      });
  };

  const LoginSubmit = (values) => {
    setLoading(true);
    seterror('')
    axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
      .then((result) => {
        setIsUserAuth(true);
        StorageService.setToken(result?.data?.token).then(() => {
          setLoading(false);
        });
      })
      .catch((error) => {
        setLoading(false);
        seterror(error?.response?.data?.message);
      });
  };

  const logout = () => {
    setLoading(true);
    setTimeout(() => {
      StorageService.clearToken();
      setIsUserAuth(false);
      setLoading(false);
    }, 2000);
  };

  return (
    <userContext.Provider
      value={{
        LoginSubmit,
        RegisterSubmit,
        logout,
        error,
        isloading,
        isUserAuth,
        registerSucess,
        setRegisterSucess

      }}
    >
      {children}
    </userContext.Provider>
  );
};

export { UserContextProvider, userContext };
