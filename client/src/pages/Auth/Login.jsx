

//AFTER CONNECTION
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      alert("Invalid credentials");
    }
  };


  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl mb-4">Login</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="border p-2 w-full mb-4 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="border p-2 w-full mb-4 rounded"
        />
        <button type="submit" className="bg-purple-600 text-white p-2 w-full rounded">Login</button>
      </form>
    </div>
  );
};

export default Login;
// import { useState, useContext } from "react";
// import { login } from "../../api/authApi";
// import { AuthContext } from "../../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const { setUser } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await login({ email, password });
//       setUser(res.user);
//       navigate("/dashboard");
//     } catch (err) {
//       alert(err.response?.data?.message || "Login failed");
//     }
//   };
// import { useContext } from "react";
// import { AuthContext } from "../../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// export default function Login() {
//   const { setUser } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleLogin = () => {
//     setUser({ name: "Test Student" });
//     navigate("/dashboard");
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <button
//         onClick={handleLogin}
//         className="bg-indigo-600 text-white px-6 py-2 rounded"
//       >
//         Login (Demo)
//       </button>
//     </div>
//   );
// }
