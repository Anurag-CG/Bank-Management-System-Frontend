import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  // Initial form data
  const initialFormData = {
    userId: "",
    password: "",
  };

  // navigate to different page
  const navigate = useNavigate();

  // State to store form data
  const [formData, setFormData] = useState(initialFormData);

  // Function to handle form data change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // State to store response message
  const [responseMessage, setResponseMessage] = useState("");

  // State to store error status
  const [isError, SetIsError] = useState(false);

  // Function to validate form
  const validateForm = () => {
    if (formData.userId === "" || formData.password === "") {
      alert("Please fill all the fields");
      return false;
    }
    return true;
  };

  // Function to handle form submission
  const handleSubmit = () => {
    console.log(formData);
    if (validateForm()) {
      // Make a POST request to the server
      axios
        .post("http://localhost:8777/login/user", formData, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log("Response:", response.data);
          localStorage.setItem("userToken", response.data);
          navigate("/root");
          SetIsError(false);
        })
        .catch((error) => {
          console.log(error);
          console.error("Error:", error);
          setResponseMessage("Invalid Credentials");
          SetIsError(true);
        });
    }
  };

  // return the jsx component for rendering
  return (
    <>
      <div
        className="flex h-[100vh] w-[100vw] justify-center items-center"
        style={{
          background:
            "radial-gradient(circle, rgba(0,166,16,1) 2%, rgba(9,36,0,1) 47%)",
        }}
      >
        <div className="bg-slate-300 w-[50vw] h-[50vh]  rounded-lg font-play-fair border-slate-100 border-4">
          <h1 className="text-3xl text-center underline mt-2">Login</h1>

          <form className="relative flex flex-col justify-center items-center h-[80%]">
            <div className="flex items-center w-full mb-4">
              <label className="w-1/3 text-xl mr-4 text-end">Username:</label>
              <input
                type="text"
                onChange={handleChange}
                className="p-2 border border-[#649568] w-2/3 mr-4"
                value={formData.userId}
                name="userId"
                required
              />
            </div>
            <div className="flex items-center w-full mb-4 ">
              <label className="w-1/3 text-xl mr-4 text-end">Password:</label>
              <input
                type="password"
                onChange={handleChange}
                className="p-2 border border-[#649568] w-2/3 mr-4"
                value={formData.password}
                name="password"
              />
            </div>
            <div
              className="text-xl hover:cursor-pointer hover:bg-[#64956868] border-2 border-[#649568] rounded-md p-2 "
              onClick={handleSubmit}
            >
              Submit
            </div>
            <Link
              className="font-basker text-sm absolute bottom-0 right-3 underline"
              to="/register"
            >
              Register Yourself
            </Link>
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

export default Login;
