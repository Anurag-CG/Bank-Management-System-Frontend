import { useState } from "react";
import axios from "axios";

const AdminRemove = () => {
  const initialFormData = {
    bankerId: "",
    bankerName: "",
  };
  const initialValidationMessage = {
    bankerId: "",
    bankerName: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [validationMessage, setValidationMessage] = useState(
    initialValidationMessage
  );
  const [responseMessage, setResponseMessage] = useState("");
  const [isError, SetIsError] = useState(false);
  const validateForm = (formData) => {
    let flag = true;
    console.log(formData);
    if (!formData.bankerName) {
      setValidationMessage((prev) => ({
        ...prev,
        bankerName: "Name can't be empty",
      }));
      flag = false;
    } else {
      setValidationMessage((prev) => ({
        ...prev,
        bankerName: "",
      }));
    }

    if (formData.bankerId.length !== 9) {
      setValidationMessage((prev) => ({
        ...prev,
        bankerId: "Invalid Banker Id",
      }));
      flag = false;
    } else {
      setValidationMessage((prev) => ({
        ...prev,
        bankerId: "",
      }));
    }
    return flag;
  };
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = () => {
    if (validateForm(formData)) {
      console.log(localStorage.getItem("adminToken"));
      axios
        .delete(`http://localhost:8777/admin/removeBanker`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
            "Content-Type": "application/json",
          },
          data: formData,
        })
        .then((response) => {
          console.log(response.data);
          SetIsError(false);
          setResponseMessage("Deleted Successfully");
          setFormData(initialFormData);
        })
        .catch((error) => {
          console.log(error);
          SetIsError(true);
          console.error(error.response);
          setResponseMessage("Something went wrong");
        });
    }
  };

  return (
    <>
      <form className="bg-slate-300 rounded w-[50%] p-2 my-8 flex flex-col gap-2">
        <div className="flex">
          <label className="w-1/3">Banker Id</label>
          <input
            className="w-2/3"
            name="bankerId"
            onChange={handleChange}
            value={formData.bankerId}
            type="text"
            required
          ></input>
        </div>
        <div className="text-red-600 text-xs font-play-fair font-bold">
          {validationMessage.bankerId}
        </div>
        <div className="flex">
          <label className="w-1/3">Banker Name</label>
          <input
            className="w-2/3"
            name="bankerName"
            onChange={handleChange}
            value={formData.bankerName}
            type="text"
            required
          ></input>
        </div>
        <div className="text-red-600 text-xs font-play-fair font-bold">
          {validationMessage.bankerName}
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
export default AdminRemove;
