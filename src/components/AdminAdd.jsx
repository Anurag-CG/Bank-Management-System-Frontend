import { useState } from "react";
import axios from "axios";

const AdminAdd = () => {
  // initial formData to store the form data
  const initialFormData = {
    bankerName: "",
    password: "",
  };
  const initialValidationMessage = {
    bankerName: "",
    password: "",
  };

  // formData to store the form data
  const [formData, setFormData] = useState(initialFormData);

  // validationMessage to store the validation message
  const [validationMessage, setValidationMessage] = useState(
    initialValidationMessage
  );

  // responseMessage to store the response message from the server
  const [responseMessage, setResponseMessage] = useState("");

  // isError to store the error status
  const [isError, SetIsError] = useState(false);

  // validateForm function to validate the form data
  const validateForm = (formData) => {
    let flag = true;
    console.log(formData);
    if (!formData.bankerName) {
      setValidationMessage((prev) => ({
        ...prev,
        bankerName: "Name can't be empty",
      }));
      flag = false;
    } else {
      setValidationMessage((prev) => ({
        ...prev,
        bankerName: "",
      }));
    }

    const password =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!password.test(formData.password)) {
      setValidationMessage((prev) => ({
        ...prev,
        password:
          "Password must be at least 8 characters long, contain at least one letter, one digit, and one special character (!@#$%^&*).",
      }));
      flag = false;
    } else {
      setValidationMessage((prev) => ({
        ...prev,
        password: "",
      }));
    }

    return flag;
  };

  // handleChange function to handle the change in the input fields
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // handleSubmit function to handle the form submission
  const handleSubmit = () => {
    if (validateForm(formData)) {
      axios
        .post(`http://localhost:8777/admin/addBanker`, formData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          setResponseMessage("");
          alert(response.data);
          SetIsError(false);
        })
        .catch((error) => {
          console.log(error);
          setResponseMessage("Error");
          SetIsError(true);
        });
    }
  };

  // return the form
  return (
    <>
      <form className="bg-slate-300 rounded w-[50%] p-2 my-8 flex flex-col gap-2">
        {/* ----------------Banker Name---------------- */}
        <div className="flex">
          <label className="w-1/3">Banker Name</label>
          <input
            className="w-2/3"
            name="bankerName"
            onChange={handleChange}
            value={formData.bankerName}
            type="text"
            required
          ></input>
        </div>
        <div className="text-red-600 text-xs font-play-fair font-bold">
          {validationMessage.bankerName}
        </div>
        {/* -----------------Password----------------- */}
        <div className="flex">
          <label className="w-1/3">Password</label>
          <input
            className="w-2/3"
            name="password"
            onChange={handleChange}
            value={formData.password}
            type="password"
            required
          ></input>
        </div>
        <div className="text-red-600 text-xs font-play-fair font-bold">
          {validationMessage.password}
        </div>

        <div className="flex justify-center">
          <div
            onClick={handleSubmit}
            className="hover:cursor-pointer hover:bg-slate-100 border border-black hover:border-[#649568] hover:border w-[30%] rounded bg-slate-300 p-2 text-center"
          >
            Submit
          </div>
        </div>
        <div
          className={`text-center ${
            isError ? "text-red-600" : "text-green-600"
          } `}
        >
          {responseMessage}
        </div>
      </form>
    </>
  );
};
export default AdminAdd;
