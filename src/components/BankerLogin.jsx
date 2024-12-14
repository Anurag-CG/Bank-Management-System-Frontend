import { useState } from "react";

const BankerLogin = () => {
  const initialFormData = {
    username: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log(formData);
  };

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
                Username:
              </label>
              <input
                type="text"
                onChange={handleChange}
                className="p-2 font-basker text-black border border-[#000000] w-2/3 mr-4"
                value={formData.username}
                name="username"
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
          </form>
        </div>
      </div>
    </>
  );
};

export default BankerLogin;
