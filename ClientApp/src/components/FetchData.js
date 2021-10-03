import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export class FetchData extends Component {
  constructor(props) {
    super(props);
    this.state = { employees: [], loading: true };
  }

  componentDidMount() {
    this.fetchEmployees();
  }

  render() {
    return (
      <div>
        <h1 id="tabelLabel">Employee Management System</h1>
        <p>This component demonstrates fetching data from the server.</p>
        {this.state.employees && (
          <table
            className="table table-striped table-bordered"
            aria-labelledby="tabelLabel"
          >
            <thead>
              <tr>
                <th>Name</th>
                <th>City</th>
                <th>Department</th>
                <th>Gender</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.state.employees &&
                this.state.employees.map((employee) => (
                  <tr key={employee.id}>
                    <td>{employee.name}</td>
                    <td>{employee.city}</td>
                    <td>{employee.department}</td>
                    <td>{employee.gender}</td>
                    <td className="text-center">
                      <button
                        onClick={() => this.deleteEmployee(employee.id)}
                        className="btn btn-danger btn-sm"
                      >
                        Delete
                      </button>
                    </td>
                    <td className="text-center">
                      <Link to={`/edit/${employee.id}`}>Edit</Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    );
  }

  // Fetch employee list from API
  async fetchEmployees() {
    const response = await fetch("api/employees");
    const data = await response.json();
    this.setState({ employees: data, loading: false });
  }

  // Delete employee from API
  async deleteEmployee(employeeId) {
    await axios
      .delete(`api/employee/${employeeId}`)
      .then((response) => {
        if (response.status === 200) {
          alert("Employee deleted successfully!");
          this.fetchEmployees();
        }
      })
      .catch((error) => alert(error.message));
  }
}
