import { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const UserFundTransfer = () => {
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

  // State variables
  const [formData, setFormData] = useState(initialFormData);

  // State variable for validation message
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

    // validate sender's account number
    // if (!accountNumber.test(formData.senderAccount)) {
    //   setValidationMessage((prev) => ({
    //     ...prev,
    //     senderAccount: "Please enter valid sender's Account Number",
    //   }));
    //   flag = false;
    // } else {
    //   setValidationMessage((prev) => ({
    //     ...prev,
    //     senderAccount: "",
    //   }));
    // }

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

  // State variables for response message and error
  const [responseMessage, setResponseMessage] = useState("");
  const [isError, SetIsError] = useState(false);
  const handleSubmit = () => {
    if (validateForm()) {
      // API call to transfer fund

      const decoded = jwtDecode(localStorage.getItem("userToken"));
      console.log(decoded.sub);
      axios
        .post(
          `http://localhost:8777/user/findUser`,
          {
            userId: decoded.sub,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
          }
        )
        .then((response) => {
          const updatedFormData = {
            ...formData,
            senderAccount: response.data.accountNumber,
          };
          axios
            .post(`http://localhost:8777/user/fund_transfer`, updatedFormData, {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("userToken")}`,
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
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  // Return component for UserFundTransfer
  return (
    <>
      <div className="flex justify-center items-center min-h-[100vh] font-futura">
        <form className="bg-slate-300 rounded-tr-3xl rounded-bl-3xl w-[50%] p-6 my-8 flex flex-col gap-2">
          {/* <div className="flex">
            <label className="w-1/3">Sender's Account Number</label>
            <input
              className="w-2/3"
              name="senderAccount"
              onChange={handleChange}
              value={formData.senderAccount}
              type="text"
              required
            ></input>
          </div> */}
          <div className="text-red-600 text-xs font-play-fair font-bold">
            {validationMessage.senderAccount}
          </div>
          <div className="flex">
            <label className="w-1/3">Receiver's Account Number</label>
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
      </div>
    </>
  );
};

export default UserFundTransfer;
