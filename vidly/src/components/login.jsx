import React from "react";
import { Navigate,useLocation } from "react-router-dom";
import Joi from "joi-browser";
import Form from "./common/form";
import auth from "../services/authService";


function withLocation(Login) {
 
  return props => <Login {...props} params={useLocation() }/>
  
}

class Login extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {}
  };



  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await auth.login(data.username, data.password);

      window.location = this.props.params ? this.props.params.pathname : "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
 
    if (auth.getCurrentUser()) return <Navigate to="/" replace={false} />;

    return (
      <div className="mx-5 mt-3">
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default withLocation(Login);
