import { useState } from "react";
import axios from "axios";
const FundTransfer = () => {
  const initialFormData = {
    senderAccount: "",
    receiverAccount: "",
    balance: "",
  };
  const initialValidationMessage = {
    senderAccount: "",
    receiverAccount: "",
    balance: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [validationMessage, setValidationMessage] = useState(
    initialValidationMessage
  );
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const validateForm = () => {
    console.log("Hi");
    let flag = true;
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
  const [responseMessage, setResponseMessage] = useState("");
  const [isError, SetIsError] = useState(false);
  const handleSubmit = () => {
    if (validateForm()) {
      axios
        .post(`http://localhost:8777/bank/fundtransfer`, formData, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log("Response:", response.data);
          setResponseMessage(
            `Rs. ${formData.balance} Amount Transferred successfully`
          );
          SetIsError(false);
        })
        .catch((error) => {
          console.error("Error:", error);
          setResponseMessage(error.response.data);
          SetIsError(true);
        });
    }
  };

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
