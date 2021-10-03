import axios from "axios";
import React from "react";
import { useState } from "react";
import Button from "reactstrap/lib/Button";
import FormInput from "./FormInput";
import { useHistory } from "react-router-dom";

const Create = () => {
  // Inline Styles
  const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const history = useHistory();

  // Create a local state
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [department, setDepartment] = useState("");
  const [gender, setGender] = useState("");

  // Submit form to server
  const SubmitForm = async (e) => {
    e.preventDefault();

    // Prepare the employee object
    const employeeData = {
      Name: name,
      City: city,
      Department: department,
      Gender: gender,
    };

    // Call the API
    await axios
      .post("https://localhost:44346/api/employee", employeeData)
      .then((response) => {
        if (response.status === 200) {
          alert("Employee saved!");
          history.push("fetch-data");
        }
      })
      .catch((error) => {
        alert(error.message);
      });

    // Clear the form
    setName("");
    setCity("");
    setDepartment("");
    setGender("");
  };

  return (
    <div>
      <h1>Create Employee</h1>
      <p className="mt-3 mb-3">
        This component demonstrates sending new employee to server.
      </p>
      <hr />
      <div style={style}>
        <form style={{ width: "400px", maxWidth: "400px" }}>
          <FormInput label="Name" value={name} onchange={setName} />
          <FormInput label="City" value={city} onchange={setCity} />
          <FormInput
            label="Department"
            value={department}
            onchange={setDepartment}
          />
          <FormInput label="Gender" value={gender} onchange={setGender} />
          <div className="form-group text-center">
            <Button type="submit" color="primary" onClick={SubmitForm}>
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;
