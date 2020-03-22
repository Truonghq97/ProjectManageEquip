import React, { Component } from "react";

export default class ContentEquip extends Component {
  render() {
    return (
      <div className="content-wrapper">
        <section className="content-header">
          <div class="table-title">
            <div className="row">
              <div class="col-sm-9">
                <h2>
                  Manage <b>Equipments</b>
                </h2>
              </div>
              <div class="col-sm-3">
                <a href="/add-user" class="btn btn-success" data-toggle="modal">
                  <i class="material-icons">&#xE147;</i>{" "}
                  <span>Add New Equipment</span>
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
                <th>Type</th>
                <th>Status</th>
                <th>Decription</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              
                  <tr>
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
                    <td>HP</td>
                    <td>Laptop</td>
                    <td>Rented</td>
                    <td>89 Chiaroscuro Rd, Portland, USA</td>
                    <td>
                      <a href="/get-user" className="edit" data-toggle="modal">
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
                    </td>
                  </tr>
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
          <div></div>

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
