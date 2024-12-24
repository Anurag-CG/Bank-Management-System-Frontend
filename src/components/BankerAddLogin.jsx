import { useState } from "react";
import axios from "axios";

const BankerAddLogin = () => {
  // Initial form data and validation message
  const initialFormData = {
    accountNumber: "",
    userId: "",
    password: "",
  };
  // Initial form data and validation message
  const initialValidationMessage = {
    accountNumber: "",
    userId: "",
    password: "",
  };
  // State to store form data
  const [formData, setFormData] = useState(initialFormData);

  // State to store validation message
  const [validationMessage, setValidationMessage] = useState(
    initialValidationMessage
  );

  // Function to handle change in form input
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Function to validate form
  const validateForm = () => {
    let flag = true;
    // regex for accountNumber
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

    // regex for userId
    const userId = /^[A-Za-z]{1,}[A-Za-z\d]{4,}$/;
    if (!userId.test(formData.userId)) {
      setValidationMessage((prev) => ({
        ...prev,
        userId:
          "User ID must have one starting alphabet character followed by alphabet or number and total length of atleast 5",
      }));
      flag = false;
    } else {
      setValidationMessage((prev) => ({
        ...prev,
        userId: "",
      }));
    }

    // regex for password
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
  // State to store response message
  const [responseMessage, setResponseMessage] = useState("");

  // State to store error status
  const [isError, SetIsError] = useState(false);

  // Function to handle form submission
  const handleSubmit = () => {
    if (validateForm()) {
      axios
        .post(
          `http://localhost:8777/bank/addLogin?accountNumber=${formData.accountNumber}`,
          formData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("bankerToken")}`,
            },
          }
        )
        .then((response) => {
          console.log("Response:", response.data);
          setResponseMessage(response.data);
          SetIsError(false);
        })
        .catch((error) => {
          console.log(error);
          console.error("Error:", error);
          if (error?.response?.data?.error)
            setResponseMessage("You don't have permission to add login");
          else setResponseMessage(error.response.data);
          SetIsError(true);
        });
    }
  };

  // return banker add login component
  return (
    <>
      <form className="bg-slate-300 rounded w-[50%] p-2 m-auto flex flex-col gap-2">
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
          <label className="w-1/3">User ID</label>
          <input
            className="w-2/3"
            name="userId"
            onChange={handleChange}
            value={formData.userId}
            type="text"
            required
          ></input>
        </div>
        <div className="text-red-600 text-xs font-play-fair font-bold">
          {validationMessage.userId}
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
    </>
  );
};

export default BankerAddLogin;
