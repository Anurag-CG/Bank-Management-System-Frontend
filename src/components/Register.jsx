import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const initialFormData = {
    accountNumber: "",
    aadharNumber: "",
    loginId: "",
    password: "",
  };
  const initialValidationMessage = {
    accountNumber: "",
    aadharNumber: "",
    loginId: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [validationMessage, setValidationMessage] = useState(
    initialValidationMessage
  );
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const validateForm = () => {
    let flag = true;
    const accountNumber = /^[789]{1}[0-9]{9}$/;
    if (!accountNumber.test(formData.accountNumber)) {
      setValidationMessage((prev) => ({
        ...prev,
        accountNumber: "Please enter valid Account Number",
      }));
      flag = false;
    } else {
      setValidationMessage((prev) => ({
        ...prev,
        accountNumber: "",
      }));
    }

    const loginId = /^[A-Za-z]{1,}[A-Za-z\d]{4,}$/;
    if (!loginId.test(formData.loginId)) {
      setValidationMessage((prev) => ({
        ...prev,
        loginId:
          "User ID must have one starting alphabet character followed by alphabet or number and total length of atleast 5",
      }));
      flag = false;
    } else {
      setValidationMessage((prev) => ({
        ...prev,
        loginId: "",
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
  const [responseMessage, setResponseMessage] = useState("");
  const [isError, SetIsError] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = () => {
    if (validateForm()) {
      axios
        .post(`http://localhost:8777/user/addLogin?accountNumber`, formData, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log("Response:", response.data);
          setResponseMessage(response.data);
          SetIsError(false);
          alert(`Login Id created successfully`);
          navigate("/login");
        })
        .catch((error) => {
          console.log(error);
          console.error("Error:", error);
          setResponseMessage(error.response.data);
          SetIsError(true);
        });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[100vh] font-futura">
      <form className="bg-slate-300 rounded w-[50%] p-8 my-8 flex flex-col gap-2">
        <div className="flex">
          <label className="w-1/3">Account Number</label>
          <input
            className="w-2/3"
            name="accountNumber"
            onChange={handleChange}
            value={formData.accountNumber}
            type="text"
            required
          ></input>
        </div>
        <div className="text-red-600 text-xs font-play-fair font-bold">
          {validationMessage.accountNumber}
        </div>

        <div className="flex">
          <label className="w-1/3">Aadhar Number</label>
          <input
            className="w-2/3"
            name="aadharNumber"
            onChange={handleChange}
            value={formData.aadharNumber}
            type="text"
            required
          ></input>
        </div>
        <div className="text-red-600 text-xs font-play-fair font-bold">
          {validationMessage.aadharNumber}
        </div>

        <div className="flex">
          <label className="w-1/3">User ID</label>
          <input
            className="w-2/3"
            name="loginId"
            onChange={handleChange}
            value={formData.loginId}
            type="text"
            required
          ></input>
        </div>
        <div className="text-red-600 text-xs font-play-fair font-bold">
          {validationMessage.loginId}
        </div>
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
            Create
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
    </div>
  );
};

export default Register;