import { useState } from "react";
import axios from "axios";

const DebitTransaction = () => {
  // Initial form data
  const initialFormData = {
    accountNumber: "",
    amount: "",
  };

  // Initial validation message
  const initialValidationMessage = {
    accountNumber: "",
    amount: "",
  };

  // State to store form data
  const [formData, setFormData] = useState(initialFormData);

  // State to store validation message
  const [validationMessage, setValidationMessage] = useState(
    initialValidationMessage
  );

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

    // validate amount
    if (formData.amount <= 0) {
      setValidationMessage((prev) => ({
        ...prev,
        amount: "Amount must be a positive number",
      }));
      flag = false;
    } else {
      setValidationMessage((prev) => ({
        ...prev,
        amount: "",
      }));
    }
    return flag;
  };

  // Function to handle change in input fields
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
          `http://localhost:8777/bank/debit?amount=${formData.amount}&accountNumber=${formData.accountNumber}`,
          null,
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
          console.error("Error:", error);
          if (error?.response?.data?.error)
            setResponseMessage("You don't have permission to add user");
          else setResponseMessage("Account not found");
          SetIsError(true);
        });
    }
  };

  // return the jsx component
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
          <label className="w-1/3">Amount</label>
          <input
            className="w-2/3"
            name="amount"
            onChange={handleChange}
            value={formData.amount}
            type="text"
            required
          ></input>
        </div>
        <div className="text-red-600 text-xs font-play-fair font-bold">
          {validationMessage.amount}
        </div>
        <div className="flex justify-center">
          <div
            onClick={handleSubmit}
            className="hover:cursor-pointer hover:bg-slate-100 border border-black hover:border-[#649568] hover:border w-[30%] rounded bg-slate-300 p-2 text-center"
          >
            Transfer
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

export default DebitTransaction;
