import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL = "http://localhost:5000/api/auth";

  /* ---------------- Load user on refresh ---------------- */
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setUser({ token });
    }

    setLoading(false);
  }, []);

  /* ---------------- LOGIN ---------------- */
  const login = async (email, password) => {
    const res = await axios.post(`${API_URL}/login`, {
      email,
      password,
    });

    localStorage.setItem("token", res.data.token);
    setUser(res.data.user);
  };

  /* ---------------- REGISTER / OTP ---------------- */
  const register = async (data) => {
    /*
      data can include:
      - sendOtp: true
      - verifyOtp: true
      - resendOtp: true
    */

    const res = await axios.post(`${API_URL}/register`, data);

    // If backend returns token after OTP verification
    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
    }

    return res.data;
  };

  /* ---------------- GOOGLE SIGN IN ---------------- */
  const googleSignIn = async () => {
    /*
      Option 1: Firebase popup auth
      Option 2: Backend OAuth redirect
      For now, placeholder
    */
    alert("Google Sign-In not connected yet");
  };

  /* ---------------- LOGOUT ---------------- */
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        googleSignIn,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};


// import { createContext, useState } from "react";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState({ name: "Test Student" });

//   const login = (userData) => setUser(userData);
//   const logout = () => setUser(null);

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
