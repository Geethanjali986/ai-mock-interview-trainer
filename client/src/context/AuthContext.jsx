import {createContext,useContext,useEffect,useState} from "react";
import api from "../services/api";

const AuthContext=createContext();

export const AuthProvider=({children})=>{
  const [user,setUser]=useState(null);
  const [token,setToken]=useState(localStorage.getItem("token"));
  const [loading,setLoading]=useState(true);

  useEffect(()=>{
    const storedUser=localStorage.getItem("user");

    if(storedUser){
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  },[]);

  const register=async(name,email,password)=>{
    const response=await api.post("/auth/register",{name,email,password});

    localStorage.setItem("token",response.data.token);
    localStorage.setItem("user",JSON.stringify(response.data.user));

    setToken(response.data.token);
    setUser(response.data.user);

    return response.data;
  };

  const login=async(email,password)=>{
    const response=await api.post("/auth/login",{email,password});

    localStorage.setItem("token",response.data.token);
    localStorage.setItem("user",JSON.stringify(response.data.user));

    setToken(response.data.token);
    setUser(response.data.user);

    return response.data;
  };

  const logout=()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  return(
    <AuthContext.Provider value={{user,token,loading,register,login,logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth=()=>useContext(AuthContext);