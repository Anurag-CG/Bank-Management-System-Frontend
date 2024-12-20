import axios from "axios";
import { useState } from "react";
const UpdatePassword = () => {
  const initialFormData = {
    userId: "",
    previousPassword: "",
    newPassword: "",
  };
  const initialValidationMessage = {
    userId: "",
    previousPassword: "",
    newPassword: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [validationMessage, setValidationMessage] = useState(
    initialValidationMessage
  );

  const validateForm = () => {
    let flag = true;
    const userId = /^[A-Za-z]{1,}[A-Za-z\d]{4,}$/;
    if (!userId.test(formData.userId)) {
      setValidationMessage((prev) => ({
        ...prev,
        userId:
          "User ID must have one starting alphabet character followed by alphabet or number and total length of atleast 5",
      }));
      flag = false;
    } else {
      setValidationMessage((prev) => ({
        ...prev,
        userId: "",
      }));
    }

    const password =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!password.test(formData.previousPassword)) {
      setValidationMessage((prev) => ({
        ...prev,
        previousPassword:
          "Password must be at least 8 characters long, contain at least one letter, one digit, and one special character (!@#$%^&*).",
      }));
      flag = false;
    } else {
      setValidationMessage((prev) => ({
        ...prev,
        previousPassword: "",
      }));
    }
    if (!password.test(formData.newPassword)) {
      setValidationMessage((prev) => ({
        ...prev,
        newPassword:
          "Password must be at least 8 characters long, contain at least one letter, one digit, and one special character (!@#$%^&*).",
      }));
      flag = false;
    } else {
      setValidationMessage((prev) => ({
        ...prev,
        newPassword: "",
      }));
    }
    return flag;
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const [responseMessage, setResponseMessage] = useState("");
  const [isError, SetIsError] = useState(false);
  const handleSubmit = () => {
    if (validateForm()) {
      axios
        .put("http://localhost:8777/user/updatePassword", formData, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log(response.data);
          SetIsError(false);
          setResponseMessage("Password changed successfully");
        })
        .catch((error) => {
          console.log(error);
          SetIsError(true);
          setResponseMessage("Previous Password doesn't Match");
        });
    }
  };
  return (
    <div className="flex justify-center items-center min-h-[100vh]">
      <form className="bg-slate-300 rounded-tr-3xl rounded-bl-3xl w-[50%] p-6 my-8 flex flex-col gap-2">
        <div className="flex">
          <label className="w-1/3">User Id</label>
          <input
            className="w-2/3"
            name="userId"
            onChange={handleChange}
            value={formData.userId}
            type="text"
            required
          ></input>
        </div>
        <div className="text-red-600 text-xs italic font-play-fair ">
          {validationMessage.userId}
        </div>

        <div className="flex">
          <label className="w-1/3">Previous Password</label>
          <input
            className="w-2/3"
            name="previousPassword"
            onChange={handleChange}
            value={formData.previousPassword}
            type="text"
            required
          ></input>
        </div>
        <div className="text-red-600 text-xs italic font-play-fair ">
          {validationMessage.previousPassword}
        </div>

        <div className="flex">
          <label className="w-1/3">New Password</label>
          <input
            className="w-2/3"
            name="newPassword"
            onChange={handleChange}
            value={formData.newPassword}
            type="text"
            required
          ></input>
        </div>
        <div className="text-red-600 text-xs italic font-play-fair">
          {validationMessage.newPassword}
        </div>
        <div className="flex justify-center">
          <div
            onClick={handleSubmit}
            className="hover:cursor-pointer hover:bg-slate-100 border border-black hover:border-[#649568] hover:border w-[30%] rounded bg-slate-300 p-2 text-center"
          >
            Change
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
  );
};

export default UpdatePassword;
