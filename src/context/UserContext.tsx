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

interface User {
  token: string;
  email: string;
}

interface UserContextType {
  user: User | null;
  login: (userData: AuthenticationRequest) => Promise<boolean>;
  logout: () => void;
  register: (userData: AuthenticationRequest) => Promise<boolean>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser({ ...parsedUser });
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

      const data: User = {
        token: response.token,
        email: response.email,
      };
      setUser(data);

      localStorage.setItem("user", JSON.stringify(data));

      return true;
    } catch (error) {
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
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
