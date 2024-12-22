import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BankerLogin = () => {
  // state to store the form data
  const initialFormData = {
    bankerId: "",
    password: "",
  };

  // navigate to different pages
  const navigate = useNavigate();

  // state to store the form data
  const [formData, setFormData] = useState(initialFormData);

  // function to handle the change in the input fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // state to store the response message
  const [responseMessage, setResponseMessage] = useState("");

  // state to store the error status
  const [isError, SetIsError] = useState(false);

  // function to validate the form
  const validateForm = () => {
    if (formData.userId === "" || formData.password === "") {
      alert("Please fill all the fields");
      return false;
    }
    return true;
  };

  // function to handle the form submission
  const handleSubmit = () => {
    if (validateForm()) {
      axios
        .post("http://localhost:8777/login/bank", formData, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log(response);
          localStorage.setItem("bankerToken", response.data);
          navigate("/bankerHome");
          SetIsError(false);
        })
        .catch((error) => {
          console.log(error);
          setResponseMessage("Invalid Credentials");
          SetIsError(true);
        });
    }
  };

  // return the JSX for the component
  return (
    <>
      <div className="w-[100vw] h-[100vh] flex bg-slate-500 justify-center items-center">
        <div className="bg-white w-[50vw] h-[50vh]  rounded-lg border-slate-100 border-4">
          <h1 className="text-3xl text-black text-center underline mt-2">
            Login
          </h1>

          <form className="flex flex-col justify-center items-center h-[80%]">
            <div className="flex items-center w-full mb-4">
              <label className="w-1/3 text-xl text-black mr-4 text-end">
                Banker Id:
              </label>
              <input
                type="text"
                onChange={handleChange}
                className="p-2 font-basker text-black border border-[#000000] w-2/3 mr-4"
                value={formData.bankerId}
                name="bankerId"
              />
            </div>
            <div className="flex items-center w-full mb-4 ">
              <label className="w-1/3 text-xl mr-4 text-black text-end">
                Password:
              </label>
              <input
                type="password"
                onChange={handleChange}
                className="p-2 border text-black border-[#000000] w-2/3 mr-4"
                value={formData.password}
                name="password"
              />
            </div>
            <div
              className="text-xl text-black hover:cursor-pointer hover:bg-[#e5e5e568] border-2 border-[#000000] rounded-md p-2 "
              onClick={handleSubmit}
            >
              Submit
            </div>
            <div
              className={`text-center mt-3 ${
                isError ? "text-red-600" : "text-green-600"
              } `}
            >
              {responseMessage}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default BankerLogin;
