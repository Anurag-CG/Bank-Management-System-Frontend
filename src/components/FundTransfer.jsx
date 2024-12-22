import { useState } from "react";
import axios from "axios";
const FundTransfer = () => {
  // Initial form data
  const initialFormData = {
    senderAccount: "",
    receiverAccount: "",
    balance: "",
  };

  // Initial validation message
  const initialValidationMessage = {
    senderAccount: "",
    receiverAccount: "",
    balance: "",
  };

  // state to store form data
  const [formData, setFormData] = useState(initialFormData);

  // state to store validation message
  const [validationMessage, setValidationMessage] = useState(
    initialValidationMessage
  );

  // function to handle change in input fields
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // function to validate form
  const validateForm = () => {
    let flag = true;

    // Regular expression for account number
    const accountNumber = /^[789]{1}[0-9]{9}$/;
    if (!accountNumber.test(formData.receiverAccount)) {
      setValidationMessage((prev) => ({
        ...prev,
        receiverAccount: "Please enter valid receiver's Account Number",
      }));
      flag = false;
    } else {
      setValidationMessage((prev) => ({
        ...prev,
        receiverAccount: "",
      }));
    }
    // validate sender account number
    if (!accountNumber.test(formData.senderAccount)) {
      setValidationMessage((prev) => ({
        ...prev,
        senderAccount: "Please enter valid sender's Account Number",
      }));
      flag = false;
    } else {
      setValidationMessage((prev) => ({
        ...prev,
        senderAccount: "",
      }));
    }
    // validate balance
    if (formData.balance <= 0) {
      setValidationMessage((prev) => ({
        ...prev,
        balance: "Balance must be a positive number",
      }));
      flag = false;
    } else {
      setValidationMessage((prev) => ({
        ...prev,
        balance: "",
      }));
    }
    return flag;
  };

  // state to store response message
  const [responseMessage, setResponseMessage] = useState("");

  // state to store error
  const [isError, SetIsError] = useState(false);

  // function to handle form submission
  const handleSubmit = () => {
    if (validateForm()) {
      // API call to transfer funds
      axios
        .post(`http://localhost:8777/bank/fundtransfer`, formData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("bankerToken")}`,
          },
        })
        .then((response) => {
          console.log("Response:", response.data);
          setFormData(initialFormData);
          setResponseMessage(
            `Rs. ${formData.balance} Amount Transferred successfully`
          );
          SetIsError(false);
        })
        .catch((error) => {
          console.error("Error:", error);
          if (error?.response?.data?.error)
            setResponseMessage("You don't have permission to transfer funds");
          else setResponseMessage(error.response.data);
          SetIsError(true);
        });
    }
  };

  // return the jsx component
  return (
    <>
      <form className="bg-slate-300 rounded w-[50%] p-2 my-8 flex flex-col gap-2">
        <div className="flex">
          <label className="w-1/3">Sender Account Number</label>
          <input
            className="w-2/3"
            name="senderAccount"
            onChange={handleChange}
            value={formData.senderAccount}
            type="text"
            required
          ></input>
        </div>
        <div className="text-red-600 text-xs font-play-fair font-bold">
          {validationMessage.senderAccount}
        </div>
        <div className="flex">
          <label className="w-1/3">Receiver Account Number</label>
          <input
            className="w-2/3"
            name="receiverAccount"
            onChange={handleChange}
            value={formData.receiverAccount}
            type="text"
            required
          ></input>
        </div>
        <div className="text-red-600 text-xs font-play-fair font-bold">
          {validationMessage.receiverAccount}
        </div>

        <div className="flex">
          <label className="w-1/3">Balance</label>
          <input
            className="w-2/3"
            name="balance"
            onChange={handleChange}
            value={formData.balance}
            type="text"
            required
          ></input>
        </div>
        <div className="text-red-600 text-xs font-play-fair font-bold">
          {validationMessage.balance}
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

export default FundTransfer;
