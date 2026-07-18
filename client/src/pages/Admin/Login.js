import { message } from "antd";
import React from "react";
import { HideLoading, ShowLoading } from "../../redux/rootSlice";
import axios from "axios";
import { useDispatch } from "react-redux";

function Login() {
  const [user, setUser] = React.useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  const login = async () => {
    if (!user.username || !user.password) {
      message.error("Please enter username and password");
      return;
    }

    try {
      dispatch(ShowLoading());
      console.log("Attempting login with username:", user.username);
      const response = await axios.post("/api/portfolio/admin-login", user);
      console.log("Login response:", response.data);
      dispatch(HideLoading());
      
      if (response.data.success) {
        message.success(response.data.message);
        localStorage.setItem("token", JSON.stringify(response.data));
        window.location.href = "/admin";
      } else {
        console.error("Login failed:", response.data.message);
        message.error(response.data.message || "Login failed");
      }
    } catch (error) {
      dispatch(HideLoading());
      console.error("Login error:", error);
      
      if (error.response && error.response.data) {
        console.error("Server error data:", error.response.data);
        message.error(error.response.data.message || error.response.data.error || "Login failed");
      } else if (error.response) {
        console.error("Server error status:", error.response.status);
        message.error("Server error: " + error.response.status + " " + error.response.statusText);
      } else if (error.request) {
        console.error("No response from server:", error.request);
        message.error("No response from server. Make sure the backend is running on http://localhost:5000");
      } else {
        console.error("Error:", error.message);
        message.error(error.message || "Connection failed. Please try again.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-primary">
      <div className="w-96 flex gap-5 p-5 shadow border border-gray-500 flex-col bg-white">
        <h1 className="text-2xl">Portfolio - Admin Login</h1>
        <hr />
        <input
          type="text"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="Username"
        />
        <input
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Password"
        />
        <button className="bg-primary text-white p-2" onClick={login}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
