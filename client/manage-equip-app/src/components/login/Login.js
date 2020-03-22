import React, { Component } from "react";

import { connect } from "react-redux";

import { loginActions } from "../../redux/actions/admin";

import "./Login.css";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      userName: "",
      password: ""
    };
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      userName: this.state.userName,
      password: this.state.password
    };

    this.props.login(userData);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <section className="login-block">
            <div className="container">
              <div className="row">
                <div className="col-md-4 login-sec">
                  <h2 className="text-center">Login Now</h2>
                  <form className="login-form">
                    <div className="form-group">
                      <label
                        htmlFor="exampleInputEmail1"
                        className="text-uppercase"
                      >
                        Username
                      </label>
                      <input
                        className="form-control"
                        onChange={this.onChange}
                        value={this.state.userName}
                        id="userName"
                        type="text"
                      />
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor="exampleInputPassword1"
                        className="text-uppercase"
                      >
                        Password
                      </label>
                      <input
                        className="form-control"
                        onChange={this.onChange}
                        value={this.state.password}
                        id="password"
                        type="password"
                      />
                    </div>
                    <div className="form-check">
                      <label className="form-check-label">
                        <input type="checkbox" className="form-check-input" />
                        <small>Remember Me</small>
                      </label>
                      <button
                        type="submit"
                        className="btn btn-login float-right"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                  <div className="copy-text">
                    Created with <i className="fa fa-heart" /> by{" "}
                    <a href="http://grafreez.com">K</a>
                  </div>
                </div>
                <div className="col-md-8 banner-sec">
                  <div
                    id="carouselExampleIndicators"
                    className="carousel slide"
                    data-ride="carousel"
                  ></div>
                </div>
              </div>
            </div>
          </section>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.data
  };
  
};

const mapDispatchToProps = dispatch => {
  return {
    login: userData => {
      dispatch(loginActions(userData));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
