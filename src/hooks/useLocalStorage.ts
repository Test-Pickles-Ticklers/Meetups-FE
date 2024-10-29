import { useEffect, useState } from "react";

const useLocalStorage = () => {
  const setToken = (token: string) => {
    localStorage.setItem("token", token);
    setLoggedIn(true);
  };

  const getToken = () => {
    return localStorage.getItem("token");
  };

  const removeToken = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
  };

  const [loggedIn, setLoggedIn] = useState(getToken != undefined);

  useEffect(() => {
    if (localStorage.getItem("token") != undefined) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [localStorage.getItem("token")]);

  return {
    setToken,
    getToken,
    removeToken,
    loggedIn,
  };
};

export default useLocalStorage;
