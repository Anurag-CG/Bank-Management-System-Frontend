import { useState } from "react";
import axios from "axios";
const AdminViewBanker = () => {
  // Initial form data
  const initialFormData = {
    bankerId: "",
  };

  // Initial validation message
  const initialValidationMessage = {
    bankerId: "",
  };

  // form data state
  const [formData, setFormData] = useState(initialFormData);

  // validation message state
  const [validationMessage, setValidationMessage] = useState(
    initialValidationMessage
  );

  // response message state
  const [responseMessage, setResponseMessage] = useState("");

  // name state
  const [name, setName] = useState("");

  // id state
  const [id, setId] = useState("");

  // isError state
  const [isError, SetIsError] = useState(false);

  // Function to handle change in input fields
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Function to validate form
  const validateForm = () => {
    let flag = true;
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

  // Function to handle form submission
  const handleSubmit = () => {
    if (validateForm()) {
      axios
        .get(
          `http://localhost:8777/admin/viewBanker?bankerId=${formData.bankerId}`,
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
          setName(response.data.bankerName);
          setId(response.data.bankerId);
        })
        .catch((error) => {
          console.log(error);
          SetIsError(true);
          setResponseMessage("Invalid ID");
          setName("");
          setId("");
        });
    }
  };

  // returning the admin view banker component
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
        {name && (
          <div className="flex justify-center flex-col items-center">
            <div>{`Banker Name : ${name}`}</div>
            <div>{`Banker ID : ${id}`}</div>
          </div>
        )}
      </form>
    </>
  );
};

export default AdminViewBanker;
