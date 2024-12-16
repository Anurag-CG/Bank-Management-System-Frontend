import { useState } from "react";

const BankerDeleteLogin = () => {
  const initialFormData = {
    accountNumber: "",
    userId: "",
  };
  const initialValidationMessage = {
    accountNumber: "",
    userId: "",
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

    return flag;
  };
  const handleSubmit = () => {
    if (validateForm()) {
    }
  };

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
      </form>
    </>
  );
};

export default BankerDeleteLogin;
