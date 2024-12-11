import { useState } from "react";
import loginBg from "../assets/loginBg.jpg";

const OpenAccount = () => {
  const initialFormData = {
    aadharNumber: "",
    panNumber: "",
    firstName: "",
    lastName: "",
    fName: "",
    mName: "",
    dateOfBirth: "",
    qualification: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // console.log(formData);
  };
  const handleSubmit = () => {
    console.log(formData);
  };

  return (
    <>
      <form className="flex justify-center items-center flex-col h-[100vh]">
        {/* <div style="background-image: url('../assets/loginBg.jpg'); background-size: cover; background-position: center;"></div> */}
        <img className="absolute" src={loginBg}></img>

        <div className="z-10 opacity-[0.88] bg-slate-100 p-2 rounded font-jetBrain w-[60%] border-slate-300 border-4 flex flex-col gap-2">
          <h1 className="text-3xl text-center underline">Registration</h1>
          <div className="flex">
            <label className="w-1/3">Aadhar Number</label>
            <input
              className="w-2/3"
              name="aadharNumber"
              onChange={handleChange}
              value={formData.aadharNumber}
              type="text"
            ></input>
          </div>
          <div className="flex">
            <label className="w-1/3">Pan Number</label>
            <input
              className="w-2/3"
              name="panNumber"
              onChange={handleChange}
              value={formData.panNumber}
              type="text"
            ></input>
          </div>
          <div className="flex">
            <label className="w-1/3">First Name</label>
            <input
              className="w-2/3"
              name="firstName"
              onChange={handleChange}
              value={formData.firstName}
              type="text"
            ></input>
          </div>
          <div className="flex">
            <label className="w-1/3">Last Name</label>
            <input
              className="w-2/3"
              name="lastName"
              onChange={handleChange}
              value={formData.lastName}
              type="text"
            ></input>
          </div>
          <div className="flex">
            <label className="w-1/3">Father Name</label>
            <input
              name="fName"
              onChange={handleChange}
              value={formData.fName}
              className="w-2/3"
              type="text"
            ></input>
          </div>
          <div className="flex">
            <label className="w-1/3">Mother Name</label>
            <input
              className="w-2/3"
              name="mName"
              onChange={handleChange}
              value={formData.mName}
              type="text"
            ></input>
          </div>
          <div className="flex">
            <label className="w-1/3">Date of Birth</label>
            <input
              className="w-2/3"
              name="dateOfBirth"
              onChange={handleChange}
              value={formData.dateOfBirth}
              type="date"
            ></input>
          </div>
          <div className="flex">
            <label className="w-1/3">Qualification</label>
            <input
              className="w-2/3"
              name="qualification"
              onChange={handleChange}
              value={formData.qualification}
            ></input>
          </div>
          <div className="flex">
            <label className="w-1/3">Address</label>
            <input
              className="w-2/3"
              name="address"
              onChange={handleChange}
              value={formData.address}
            ></input>
          </div>
          <div className="flex">
            <label className="w-1/3">City</label>
            <input
              className="w-2/3"
              value={formData.city}
              onChange={handleChange}
              name="city"
            ></input>
          </div>
          <div className="flex">
            <label className="w-1/3">State</label>
            <input
              className="w-2/3"
              value={formData.state}
              onChange={handleChange}
              name="state"
            ></input>
          </div>
          <div className="flex">
            <label className="w-1/3">Pincode</label>
            <input
              className="w-2/3"
              value={formData.pincode}
              onChange={handleChange}
              name="pincode"
            ></input>
          </div>
          <div onClick={handleSubmit} className="flex justify-center">
            <div className="hover:cursor-pointer hover:bg-slate-100 border border-transparent hover:border-[#649568] hover:border w-[30%] rounded bg-slate-300 p-2  text-center">
              Submit
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default OpenAccount;
