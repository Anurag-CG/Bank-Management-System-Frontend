import { useState } from "react";
import axios from "axios";

const AdminAdd = () => {
  const initialFormData = {
    bankerName: "",
    password: "",
  };
  const initialValidationMessage = {
    bankerName: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [validationMessage, setValidationMessage] = useState(
    initialValidationMessage
  );
  const [responseMessage, setResponseMessage] = useState("");
  const [isError, SetIsError] = useState(false);
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
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
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
          alert(response.data);
        })
        .catch((error) => {
          console.log(error);
          setResponseMessage("Error");
        });
    }
  };

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
            type="text"
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
