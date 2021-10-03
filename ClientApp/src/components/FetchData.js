import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import connection from "../index";

export const FetchData = () => {
    const [employees, setemployees] = useState();

    useEffect(() => {
        fetchEmployees();
        connection.on("FetchLatestEmployees", (action, newData) => {
            console.log("New data added by : " + action);
            console.log(newData);
            if (newData.length !== employees.length) {
                setemployees(newData);
            }
        });
    }, []);

    // Fetch employee list from API
    const fetchEmployees = async () => {
        const response = await fetch("api/employees");
        const data = await response.json();
        setemployees(data);
    };

    // Delete employee from API
    const deleteEmployee = async (employeeId) => {
        await axios
            .delete(`api/employee/${employeeId}`)
            .then((response) => {
                if (response.status === 200) {
                    alert("Employee deleted successfully!");
                    fetchEmployees();
                }
            })
            .catch((error) => alert(error.message));
    };

    return (
        <div>
            <h1 id="tabelLabel">Employee Management System</h1>
            <p>This component demonstrates fetching data from the server.</p>
            {employees && (
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
        </div>
    );
};
