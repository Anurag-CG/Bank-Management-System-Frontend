import { useState } from "react";
import axios from "axios";

const BankerDeleteLogin = () => {
  // Initial form data and validation message
  const initialFormData = {
    accountNumber: "",
    userId: "",
  };

  // Initial form data and validation message
  const initialValidationMessage = {
    accountNumber: "",
    userId: "",
  };

  // State to store form data
  const [formData, setFormData] = useState(initialFormData);

  // State to store validation message
  const [validationMessage, setValidationMessage] = useState(
    initialValidationMessage
  );

  // Function to handle change in input fields
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Function to validate form
  const validateForm = () => {
    let flag = true;

    // Regular expression for account number
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

    // Regular expression for user ID
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
        .delete(
          `http://localhost:8777/bank/deleteLogin?accountNumber=${formData.accountNumber}&userId=${formData.userId}`,
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
          setFormData(initialFormData);
          SetIsError(false);
        })
        .catch((error) => {
          console.log(error);
          console.error("Error:", error);
          if (error?.response?.data?.error)
            setResponseMessage(
              "You don't have permission to delete login user"
            );
          else setResponseMessage(error.response.data);
          SetIsError(true);
        });
    }
  };

  // return bank delete login component
  return (
    <>
      <form className="bg-slate-300 rounded w-[50%] p-2 my-8 flex flex-col gap-2">
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
        <div className="flex justify-center">
          <div
            onClick={handleSubmit}
            className="hover:cursor-pointer hover:bg-slate-100 border border-black hover:border-[#649568] hover:border w-[30%] rounded bg-slate-300 p-2 text-center"
          >
            Delete
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

export default BankerDeleteLogin;
