import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { loginUser, registerUser } from "../api/auth/apiAuthCalls";
import AuthenticationRequest from "../api/auth/models/AuthenticationRequest";
import { enqueueSnackbar } from "notistack";
import RegisterResponse from "../api/auth/models/RegisterResponse";
import AuthenticationResponse from "../api/auth/models/AuthenticationResponse";

interface UserToken {
  token: string;
}

interface UserContextType {
  user: UserToken | null;
  login: (userData: AuthenticationRequest) => Promise<boolean>;
  logout: () => void;
  register: (userData: AuthenticationRequest) => Promise<boolean>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserToken | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setUser({ token: storedToken });
    }
  }, []);

  const register = async (
    userData: AuthenticationRequest
  ): Promise<boolean> => {
    try {
      const response: RegisterResponse = await registerUser(userData);
      enqueueSnackbar("Registreringen lyckades!", { variant: "success" });
      return true;
    } catch (error) {
      enqueueSnackbar("Registreringen misslyckades", { variant: "error" });
      return false;
    }
  };

  const login = async (userData: AuthenticationRequest): Promise<boolean> => {
    try {
      const response: AuthenticationResponse = await loginUser(userData);
      console.log("response", response);
      const data: UserToken = {
        token: response.token,
      };
      setUser(data);
      localStorage.setItem("token", data.token);

      return true;
    } catch (error) {
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    enqueueSnackbar("Du har loggat ut", { variant: "info" });
  };

  return (
    <UserContext.Provider value={{ user, login, logout, register }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
