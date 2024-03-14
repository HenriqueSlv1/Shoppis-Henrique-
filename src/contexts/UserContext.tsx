import axios from "axios";
import { createContext, ReactNode, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserDTO } from "../types/User";
import Toast from "react-native-root-toast";

type UserContextProps = {
  token: string;
  setToken: (token: string) => void;
  getToken: () => Promise<void>;
  user: UserDTO | null;
  setUser: (user: UserDTO | null) => void;
  getUser: () => Promise<void>;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

type UserProviderProps = {
  children: ReactNode;
};

export const UserContext = createContext<UserContextProps>({
  token: "",
  setToken: () => {},
  getToken: async () => {},
  user: null,
  setUser: () => {},
  getUser: async () => {},
  login: async () => {},
  logout: async () => {},
});

export const UserContextProvider = ({ children }: UserProviderProps) => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState<UserDTO | null>(null);

  const storeToken = async (value: string) => {
    try {
      await AsyncStorage.setItem("@token", value);
    } catch (error) {
      showToast("Não foi possível salvar o token");
    }
  };

  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem("@token");
      if (value !== null) {
        setToken(value);
      }
    } catch (error) {
      showToast("Não foi possível recuperar o token");
    }
  };

  const storeUser = async (value: UserDTO | null) => {
    try {
      if (value !== null) {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem("@user", jsonValue);
      }
    } catch (error) {
      showToast("Não foi possível salvar os dados do usuário");
    }
  };

  const getUser = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@user");
      const userData = jsonValue !== null ? JSON.parse(jsonValue) : null;
      setUser(userData);
    } catch (error) {
      showToast("Não foi possível recuperar o usuário");
    }
  };

  const login = async (username: string, password: string) => {
    try {
      const url = "https://dummyjson.com/auth/login";
      const response = await axios.post<UserDTO>(url, { username, password });
      setUser(response.data);
      storeUser(response.data);
      setToken(response.data.token);
      storeToken(response.data.token);
    } catch (error) {
      showToast("Não foi possível realizar o login");
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("@token");
      await AsyncStorage.removeItem("@user");
      setToken("");
      await AsyncStorage.removeItem("@cart");
    } catch (error) {
      showToast("Não foi possível fazer logout");
    }
  };

  const showToast = (message: string) => {
    Toast.show(message, {
      duration: 3000,
      position: Toast.positions.BOTTOM,
      shadow: false,
      animation: true,
      hideOnPress: true,
      delay: 0,
      backgroundColor: "red",
    });
  };

  return (
    <UserContext.Provider
      value={{
        token,
        setToken,
        getToken,
        user,
        setUser,
        getUser,
        login,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};