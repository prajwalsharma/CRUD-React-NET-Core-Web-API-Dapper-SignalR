import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import * as signalR from "@microsoft/signalr";

export const FetchData = () => {
  const [employees, setemployees] = useState();
  const [loading, setLoading] = useState(true);
  const [connectionid, setConnectionid] = useState();

  // Set Hub connection on start
  useEffect(() => {
    // 1. Create SignalR connection
    let connection = new signalR.HubConnectionBuilder()
      .withUrl("/employeehub")
      .withAutomaticReconnect()
      .build();

    // 2. Start the connection
    connection.start().then(() => {
      console.log("Connection Established...");
      setConnectionid(connection.connection.connectionId);
      axios
        .get("api/employees")
        .then((res) => {
          setemployees(res.data);
          setLoading(false);
        })
        .catch((err) => {
          alert(err.message);
          setLoading(false);
        });
    });

    // 3. Listen to events
    if (connection) {
      connection.on("FetchLatestEmployees", () => {
        setLoading(true);
        axios
          .get("api/employees")
          .then((res) => {
            setemployees(res.data);
            setLoading(false);
          })
          .catch((err) => {
            alert(err.message);
            setLoading(false);
          });
      });
    }

    return () => {
      if (connection) {
        connection.stop().then(() => console.log("Connection stopped..."));
      }
    };
  }, []);

  // Delete employee from API
  const deleteEmployee = async (employeeId) => {
    await axios
      .delete(`api/employee/${employeeId}`)
      .then((response) => {
        if (response.status === 200) {
          axios.get("api/employees").then((res) => setemployees(res.data));
        }
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div>
      <h1 id="tabelLabel">Employee Management System</h1>
      <p>This component demonstrates fetching data from the server.</p>
      {loading && <p>Loading...</p>}
      {employees && (
        <table
          className="table table-striped table-bordered"
          aria-labelledby="tabelLabel"
        >
          {connectionid && <caption>Connection_Id: {connectionid}</caption>}
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
            {employees &&
              employees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.name}</td>
                  <td>{employee.city}</td>
                  <td>{employee.department}</td>
                  <td>{employee.gender}</td>
                  <td className="text-center">
                    <button
                      onClick={() => deleteEmployee(employee.id)}
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
      {employees && employees.length === 0 && !loading && (
        <p className="text-center">No Records Found</p>
      )}
    </div>
  );
};
