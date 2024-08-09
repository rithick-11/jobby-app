import { Component } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

class Login extends Component {
  state = { username: "", password: "", errStatus: false, errMsg: "" };

  loginSucces = (jwtToken) => {
    Cookies.set("jwt_token", jwtToken, { expires: 10 });
    this.setState({ errMsg: "login successfully" });
  };

  toLogin = async (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    const detail = { username, password };
    const option = {
      method: "POST",
      body: JSON.stringify(detail),
    };
    const res = await fetch("https://apis.ccbp.in/login", option);
    const data = await res.json();
    console.log(res);
    if (res.ok === true) {
      this.setState({ errStatus: false });
      this.loginSucces(data.jwt_token);
      console.log(data.jwt_token);
    } else {
      this.setState({ errStatus: true, errMsg: data.error_msg });
    }
  };

  addDemoUserData = () => {
    this.setState({username:"rahul", password:"rahul@2021"})
  }

  render() {
    const { username, password, errStatus, errMsg } = this.state;
    if (Cookies.get("jwt_token") !== undefined) {
      return <Navigate to="/" />;
    }
    return (
      <div className="h-screen flex items-center justify-center bg-[#121212] text-white">
        <form
          className="bg-[#272727] py-6 px-12 flex flex-col gap-6 items-center rounded-lg"
          onSubmit={this.toLogin}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="h-10"
          />
          <div className="flex flex-col gap-1">
            <label
              className="text-[#f8fafc] font-bold text-sm"
              htmlFor="username"
            >
              USERNAME
            </label>
            <input
              type="text"
              placeholder="Username"
              id="username"
              className="px-3 py-1 bg-transparent border-[#7e858e] border-2 rounded-md"
              value={username}
              onChange={(e) => {
                this.setState({ username: e.target.value });
              }}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label
              className="text-[#f8fafc] font-bold text-sm"
              htmlFor="password"
            >
              PASSWORD
            </label>
            <input
              type="password"
              placeholder="Password"
              id="password"
              className="px-3 py-1 bg-transparent border-[#7e858e] border-2 rounded-md"
              value={password}
              onChange={(e) => {
                this.setState({ password: e.target.value });
              }}
            />
          </div>

          <div className="flex w-full justify-between">
            <button
              type="sumbit"
              className="bg-[#4f46e5] self-stretch px-3 py-1 text-md font-bold rounded-md"
            >
              Login
            </button>
            <button
              onClick={this.addDemoUserData}
              className="bg-transparent text-[#4f46e5] border-2 border-[#4f46e5] self-stretch px-3 py-1 text-md font-bold rounded-md"
            >
              Demo user
            </button>
          </div>
          {errStatus && (
            <p>
              {"*"}
              {errMsg}
            </p>
          )}
        </form>
      </div>
    );
  }
}

export default Login;
