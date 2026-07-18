import { message } from "antd";
import React from "react";
import { HideLoading, ShowLoading } from "../../redux/rootSlice";
import axios from "axios";
import { href } from "react-router-dom";
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
      const response = await axios.post("/api/portfolio/admin-login", user);
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        localStorage.setItem("token", JSON.stringify(response.data));
        window.location.href = "/admin";
      } else {
        message.error(response.data.message || "Login failed");
      }
    } catch (error) {
      dispatch(HideLoading());
      if (error.response && error.response.data) {
        message.error(error.response.data.message || error.response.data.error || "Login failed");
      } else if (error.response) {
        message.error("Server error: " + error.response.statusText);
      } else {
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
