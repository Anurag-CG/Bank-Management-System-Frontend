import { useState } from "react";
import axios from "axios";

const Login = () => {
  const initialFormData = {
    userId: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log(formData);
    axios
      .post("http://localhost:8777/user/login", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Response:", response.data);
      })
      .catch((error) => {
        console.log(error);
        console.error("Error:", error);
      });
  };

  return (
    <>
      <div className="flex h-[100vh] w-[100vw] justify-center items-center">
        <div className="bg-slate-300 w-[60vw] h-[50vh]  rounded-lg border-slate-100 border-4">
          <h1 className="text-3xl text-center underline mt-2">Login</h1>

          <form className="flex flex-col justify-center items-center h-[80%]">
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
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
