import axios from "axios";
import { User } from "oidc-client";
import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Button from "reactstrap/lib/Button";
import FormInput from "./FormInput";

const Edit = (props) => {
  // Inline Styles
  const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const history = useHistory();

  // Create a local state
  const [id, setId] = useState();
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [department, setDepartment] = useState("");
  const [gender, setGender] = useState("");
  const [loading, setLoading] = useState(true);
  const [isfound, setIsFound] = useState(false);

  useEffect(() => {
    console.log(props);
    fetchCurrentEmployee(props.match.params.id);
  }, []);

  // Fetch current employee from API
  const fetchCurrentEmployee = async (employeeId) => {
    await axios
      .get(`api/employee/${employeeId}`)
      .then((response) => {
        let data = response.data;

        if (data.length === 0) {
          setIsFound(false);
        } else {
          setId(data.id);
          setName(data.name);
          setCity(data.city);
          setDepartment(data.department);
          setIsFound(true);
          setGender(data.gender);
        }

        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert(error.message);
      });
  };

  // Submit form data to server
  const SubmitForm = async (e) => {
    e.preventDefault();

    // Prepare the employee object
    const employeeData = {
      Id: id,
      Name: name,
      City: city,
      Department: department,
      Gender: gender,
    };

    // Call the API
    await axios
      .put("api/employee", employeeData)
      .then((response) => {
        if (response.status === 200) {
          fetchCurrentEmployee(props.match.params.id);
          alert("Employee record updated!");
          history.push("/fetch-data");
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
      <h1>Edit Employee</h1>
      <p className="mt-3 mb-3">
        This component demonstrates editing existing employee to server.
      </p>
      <hr />
      <div style={style}>
        {loading ? (
          <p>Loading...</p>
        ) : isfound ? (
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
                Update
              </Button>
            </div>
          </form>
        ) : (
          <p>Employee not found!</p>
        )}
      </div>
    </div>
  );
};

export default Edit;
