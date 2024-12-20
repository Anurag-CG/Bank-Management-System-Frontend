import { useState } from "react";
import axios from "axios";
const AdminViewUser = () => {
  const initialFormData = {
    accountNumber: "",
  };
  const initialValidationMessage = {
    accountNumber: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [validationMessage, setValidationMessage] = useState(
    initialValidationMessage
  );
  const [responseMessage, setResponseMessage] = useState("");
  const [responseData, setResponseData] = useState({});
  const [isError, SetIsError] = useState(false);
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const validateForm = () => {
    let flag = true;
    if (formData.accountNumber.length !== 10) {
      setValidationMessage((prev) => ({
        ...prev,
        accountNumber: "Invalid Account Number",
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
      axios
        .get(
          `http://localhost:8777/admin/viewUser?accountNo=${formData.accountNumber}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          SetIsError(false);
          setResponseMessage("Data Fetched successfully");
          console.log(response.data);
          setResponseData(response.data);
        })
        .catch((error) => {
          console.log(error);
          SetIsError(true);
          setResponseMessage("Invalid ID");
        });
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
        {
          <ul>
            {Object.entries(responseData).map(([key, value]) => (
              <li key={key}>
                <strong>{key.replace(/([A-Z])/g, " $1")}</strong>: {value}
              </li>
            ))}
          </ul>
        }
      </form>
    </>
  );
};

export default AdminViewUser;
