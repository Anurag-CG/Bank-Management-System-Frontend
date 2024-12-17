import { useState } from "react";
import axios from "axios";

const BankerDelete = () => {
  const initialData = {
    accountNumber: "",
    aadharNumber: "",
  };
  const initialValidationMessage = {
    accountNumber: "",
    aadharNumber: "",
  };
  const [formData, setFormData] = useState(initialData);
  const [validationMessage, setValidationMessage] = useState(
    initialValidationMessage
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const validateForm = (formData) => {
    let flag = true;
    const aadharRegex = /^[0-9]{12}$/;
    if (!aadharRegex.test(formData.aadharNumber)) {
      setValidationMessage((prev) => ({
        ...prev,
        aadharNumber: "Please enter valid Aadhar Number",
      }));
      flag = false;
    } else {
      setValidationMessage((prev) => ({
        ...prev,
        aadharNumber: "",
      }));
    }
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
    return flag;
  };
  const [responseMessage, setResponseMessage] = useState("");
  const [isError, SetIsError] = useState(false);
  const handleSubmit = () => {
    if (validateForm(formData)) {
      console.log(formData);
      axios
        .delete(
          `http://localhost:8777/bank/deleteUser?accountNumber=${formData.accountNumber}&aadharNumber=${formData.aadharNumber}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log("Response:", response.data);
          setResponseMessage(response.data);
          SetIsError(false);
        })
        .catch((error) => {
          console.error("Error:", error);
          setResponseMessage("User not found");
          SetIsError(true);
        });
    }
  };
  return (
    <>
      <form className="bg-slate-300 rounded w-[50%] p-2 my-8 flex flex-col gap-2">
        {/* ----------------Account Number Input---------------- */}
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

        {/* ---------------- Aadhar Number input ----------------- */}

        <div className="flex">
          <label className="w-1/3">Aadhar Number</label>
          <input
            className="w-2/3"
            name="aadharNumber"
            onChange={handleChange}
            value={formData.aadharNumber}
            type="text"
          ></input>
        </div>
        <div className="text-red-600 text-xs font-play-fair font-bold">
          {validationMessage.aadharNumber}
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

export default BankerDelete;
