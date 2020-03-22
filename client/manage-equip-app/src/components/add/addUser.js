import React, { Component } from "react";

import { connect } from "react-redux";

import { addUserAction } from "../../redux/actions/admin"

import "./style/add.css";

class addUser extends Component {

    constructor() {
        super();
        this.state = {
            userName: "",
            email: "",
            password: "",
            role: "",
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();
        const newUser = {
            userName: this.state.userName,
            email: this.state.email,
            password: this.state.password,
            role: this.state.role
        };
        
        this.props.addUser(newUser)
        //this.props.signupUser(newUser, this.props.history)
        console.log(newUser);
      };

  render() {
    return (
      <div>
        <section className="content-header">
          <div>
            {/* Add Modal HTML */}
            <div id="addEmployeeModal">
              <div className="modal-dialog">
                <div className="modal-content">
                  <form onSubmit={this.onSubmit}>
                    <div className="modal-header">
                      <h4 className="modal-title">Add Employee</h4>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-hidden="true"
                      >
                        ×
                      </button>
                    </div>
                    <div className="modal-body">
                      <div className="form-group">
                        <label>Name</label>
                        <input 
                         className="form-control"
                         onChange={this.onChange}
                         value={this.state.userName}
                         id="userName"
                         type="text"
                        />
                      </div>
                      <div className="form-group">
                        <label>Email</label>
                        <input 
                         className="form-control"
                         onChange={this.onChange}
                         value={this.state.email}
                         id="email"
                         type="email"
                        />
                      </div>
                      {/* <div className="form-group">
                        <label>Address</label>
                        <textarea
                          className="form-control"
                          required
                          defaultValue={""}
                        />
                      </div> */}
                      {/* <div className="form-group">
                        <label>Phone</label>
                        <input type="text" className="form-control" required />
                      </div> */}
                      <div className="form-group">
                        <label>Role</label>
                        <input 
                         className="form-control"
                         onChange={this.onChange}
                         value={this.state.roel}
                         id="role"
                         type="text"
                        />
                      </div>
                      <div className="form-group">
                        <label>Password</label>
                        <input
                          className="form-control"
                          onChange={this.onChange}
                          value={this.state.password}
                          id="password"
                          type="password"
                        />
                      </div>
                    </div>
                    <div className="modal-footer">
                      <a href="/list-employee">
                      <input
                        type="button"
                        className="btn btn-default"
                        data-dismiss="modal"
                        defaultValue="Cancel"
                      />
                      </a>
                      
                      <input
                        type="submit"
                        className="btn btn-success"
                        defaultValue="Add"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
    return {
        add: state.newUser,
        token: state.rootReducer.token
    }
  
  }
  const mapDispatchToProps = (dispatch, newUser) => {
    return {
      addUser: token => dispatch(addUserAction(token, newUser))
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(addUser);