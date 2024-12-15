import { useState } from "react";

const UpdateUser = () => {
  const initialData = {
    accountNumber: "",
  };
  const initialValidationMessage = {
    accountNumber: "",
  };
  const [formData, setFormData] = useState(initialData);
  const [validationMessage, setValidationMessage] = useState(
    initialValidationMessage
  );
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const validateForm = (formData) => {
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
    return flag;
  };
  const handleSubmitCheckBalance = () => {
    if (validateForm(formData)) {
    }
  };
  const handleSubmitUpdateProfile = () => {
    if (validateForm(formData)) {
    }
  };
  return (
    <>
      <form className="bg-slate-300 rounded w-[50%] p-2 my-8 flex flex-col gap-2">
        <div className="flex">
          <label className="w-1/3">Enter Account Number</label>
          <input
            name="accountNumber"
            value={formData.accountNumber}
            className="w-2/3"
            onChange={handleChange}
          ></input>
        </div>
        <div className="text-red-600 text-xs font-play-fair font-bold">
          {validationMessage.accountNumber}
        </div>
        <div className="flex justify-center gap-2">
          <div
            onClick={handleSubmitCheckBalance}
            className="hover:cursor-pointer hover:bg-slate-100 border border-black hover:border-[#649568] hover:border w-[30%] rounded bg-slate-300 p-2 text-center"
          >
            Check Balance
          </div>
          <div
            onClick={handleSubmitUpdateProfile}
            className="hover:cursor-pointer hover:bg-slate-100 border border-black hover:border-[#649568] hover:border w-[30%] rounded bg-slate-300 p-2 text-center"
          >
            Update Profile
          </div>
        </div>
      </form>
    </>
  );
};

export default UpdateUser;
