import React, { Component } from "react";
import { connect } from "react-redux";

import { getListUser } from "../../redux/actions/admin"

import "./styles/Content.css";

class Content extends Component {

  constructor (props) {
    super(props);
    this.state = {
      listUser: [],
    }
  }

  componentDidMount() {
    this.props.getlistUser(this.props.token);
}

static getDerivedStateFromProps(nextProps, prevState) {
  return {
      ...prevState, listUser: nextProps.listUser
  }
}

handleDelete = (item) => {
  const newsId = item._id
  console.log(newsId)
  
};

  render() {
    // console.log(this.state.listUser)
    if (this.state.listUser.length === 0) {
      return <div class="d-flex justify-content-center">
          <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
          </div>
      </div>
  }
  
    return (
      
 
      <div className="content-wrapper">
        <section className="content-header">
          <div class="table-title">
            <div className="row">
              <div class="col-sm-9">
                <h2>
                  Manage <b>Employees</b>
                </h2>
              </div>
              <div class="col-sm-3">
                <a
                  href="/add-user"
                  class="btn btn-success"
                  data-toggle="modal"
                >
                  <i class="material-icons">&#xE147;</i>{" "}
                  <span>Add New Employee</span>
                </a>
              </div>
            </div>
          </div>

          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>
                  <span className="custom-checkbox">
                    <input type="checkbox" id="selectAll" />
                    <label htmlFor="selectAll" />
                  </span>
                </th>
                <th>Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Password</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.state.listUser.map((item, key) => {
                return <tr key={key}>
                <td>
                  <span className="custom-checkbox">
                    <input
                      type="checkbox"
                      id="checkbox1"
                      name="options[]"
                      defaultValue={1}
                    />
                    <label htmlFor="checkbox1" />
                  </span>
                </td>
                <td>{item.userName}</td>
                <td>{item.email}</td>
                <td>89 Chiaroscuro Rd, Portland, USA</td>
                <td>(171) 555-2222</td>
                <td>{item.role}</td>
                <td>{item.password}</td>
                <td><button onClick={()  =>  this.handleDelete(item)}>Delete</button></td>
                {/* <td>
                  <a
                    href="/get-user"
                    className="edit"
                    data-toggle="modal"
                  >
                    <i
                      className="material-icons"
                      data-toggle="tooltip"
                      title="Edit"
                    >
                      
                    </i>
                  </a>
                  <a
                    href="#deleteEmployeeModal"
                    className="delete"
                    data-toggle="modal"
                  >
                    <i
                      className="material-icons"
                      data-toggle="tooltip"
                      title="Delete"
                      
                    >
                      
                    </i>
                  </a>
                </td> */}
              </tr>

              })}
              

              
            </tbody>
          </table>

          <div class="clearfix">
            <div class="hint-text">
              Showing <b>5</b> out of <b>25</b> entries
            </div>
            <ul class="pagination">
              <li class="page-item disabled">
                <a href="#">Previous</a>
              </li>
              <li class="page-item">
                <a href="#" class="page-link">
                  1
                </a>
              </li>
              <li class="page-item">
                <a href="#" class="page-link">
                  2
                </a>
              </li>
              <li class="page-item active">
                <a href="#" class="page-link">
                  3
                </a>
              </li>
              <li class="page-item">
                <a href="#" class="page-link">
                  4
                </a>
              </li>
              <li class="page-item">
                <a href="#" class="page-link">
                  5
                </a>
              </li>
              <li class="page-item">
                <a href="#" class="page-link">
                  Next
                </a>
              </li>
            </ul>
          </div>
          <div>


           
          
          </div>

            {/* Delete Modal HTML */}
          <div id="deleteEmployeeModal" className="modal fade">
            <div className="modal-dialog">
              <div className="modal-content">
                <form>
                  <div className="modal-header">
                    <h4 className="modal-title">Delete Employee</h4>
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
                    <p>Are you sure you want to delete these Records?</p>
                    <p className="text-warning">
                      <small>This action cannot be undone.</small>
                    </p>
                  </div>
                  <div className="modal-footer">
                    <input
                      type="button"
                      className="btn btn-default"
                      data-dismiss="modal"
                      defaultValue="Cancel"
                    />
                    <input
                      type="submit"
                      className="btn btn-danger"
                      defaultValue="Delete"
                    />
                  </div>
                </form>
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
      listUser: state.rootReducer.listUser,
      token: state.rootReducer.token
  }

}
const mapDispatchToProps = dispatch => {
  return {
    getlistUser: token => dispatch(getListUser(token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Content);