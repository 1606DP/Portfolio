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

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/portfolio/admin-login`,
        user
      );

      console.log("Login response:", response.data);

      if (response.data.success) {
        message.success(response.data.message);

        localStorage.setItem(
          "token",
          JSON.stringify(response.data)
        );

        window.location.href = "/admin";
      } else {
        message.error(response.data.message || "Login failed");
      }

    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);

      message.error(
        error.response?.data?.message ||
        "Unable to connect to server"
      );
    } finally {
      dispatch(HideLoading());
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-primary">
      <div className="w-96 flex gap-5 p-5 shadow border border-gray-500 flex-col bg-white">
        <h1 className="text-2xl">
          Portfolio - Admin Login
        </h1>

        <hr />

        <input
          type="text"
          value={user.username}
          onChange={(e) =>
            setUser({
              ...user,
              username: e.target.value,
            })
          }
          placeholder="Username"
        />

        <input
          type="password"
          value={user.password}
          onChange={(e) =>
            setUser({
              ...user,
              password: e.target.value,
            })
          }
          placeholder="Password"
        />

        <button
          className="bg-primary text-white p-2"
          onClick={login}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
