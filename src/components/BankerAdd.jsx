import { useState } from "react";
const BankerAdd = () => {
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

  const initialValidationMessage = {
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

  const indianStatesAndUTs = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Lakshadweep",
    "Delhi",
    "Puducherry",
    "Ladakh",
    "Lakshadweep",
    "Daman and Diu",
  ];

  const [formData, setFormData] = useState(initialFormData);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [validationMessage, setValidationMessage] = useState(
    initialValidationMessage
  );

  const validateForm = (formData) => {
    const aadharRegex = /^[0-9]{16}$/;
    if (!aadharRegex.test(formData.aadharNumber)) {
      setValidationMessage((prev) => ({
        ...prev,
        aadharNumber: "Please enter valid Aadhar Number",
      }));
    } else {
      setValidationMessage((prev) => ({
        ...prev,
        aadharNumber: "",
      }));
    }

    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (!panRegex.test(formData.panNumber)) {
      setValidationMessage((prev) => ({
        ...prev,
        panNumber: "Invalid Pan Number",
      }));
    } else {
      setValidationMessage((prev) => ({
        ...prev,
        panNumber: "",
      }));
    }

    const firstNameRegex = /^[a-zA-Z]{1,25}$/;
    if (!firstNameRegex.test(formData.firstName)) {
      setValidationMessage((prev) => ({
        ...prev,
        firstName: "Invalid First Name",
      }));
    } else {
      setValidationMessage((prev) => ({
        ...prev,
        firstName: "",
      }));
    }

    const lastNameRegex = /^[a-zA-Z]{1,25}$/;
    if (!lastNameRegex.test(formData.lastName)) {
      setValidationMessage((prev) => ({
        ...prev,
        lastName: "Invalid Last Name",
      }));
    } else {
      setValidationMessage((prev) => ({
        ...prev,
        lastName: "",
      }));
    }

    const fNameRegex = /^[A-Za-z ]{1,50}$/;
    if (!fNameRegex.test(formData.fName)) {
      setValidationMessage((prev) => ({
        ...prev,
        fName: "Invalid Father Name",
      }));
    } else {
      setValidationMessage((prev) => ({
        ...prev,
        fName: "",
      }));
    }

    if (!fNameRegex.test(formData.mName)) {
      setValidationMessage((prev) => ({
        ...prev,
        mName: "Invalid Mother Name",
      }));
    } else {
      setValidationMessage((prev) => ({
        ...prev,
        mName: "",
      }));
    }

    const calculateAge = (dob) => {
      const birthDate = new Date(dob);
      const currentDate = new Date();
      let age = currentDate.getFullYear() - birthDate.getFullYear();
      const m = currentDate.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && currentDate.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    };

    let age = calculateAge(formData.dateOfBirth);
    if (!formData.dateOfBirth) {
      setValidationMessage((prev) => ({
        ...prev,
        dateOfBirth: "Please select your DOB",
      }));
    } else if (age < 18) {
      setValidationMessage((prev) => ({
        ...prev,
        dateOfBirth: "Age must be 18 years or above",
      }));
    } else {
      setValidationMessage((prev) => ({
        ...prev,
        dateOfBirth: "",
      }));
    }

    const cityRegex = /^[a-zA-Z]{1,25}$/;
    if (!cityRegex.test(formData.city)) {
      setValidationMessage((prev) => ({
        ...prev,
        city: "Enter valid city Name",
      }));
    } else {
      setValidationMessage((prev) => ({
        ...prev,
        city: "",
      }));
    }

    const pincodeRegex = /^[0-9]{6}$/;
    if (!pincodeRegex.test(formData.pincode)) {
      setValidationMessage((prev) => ({
        ...prev,
        pincode: "Enter valid Pincode",
      }));
    } else {
      setValidationMessage((prev) => ({
        ...prev,
        pincode: "",
      }));
    }

    if (!formData.qualification) {
      setValidationMessage((prev) => ({
        ...prev,
        qualification: "Please select Qualification",
      }));
    } else {
      setValidationMessage((prev) => ({
        ...prev,
        qualification: "",
      }));
    }

    if (!formData.state) {
      setValidationMessage((prev) => ({
        ...prev,
        state: "Please select State",
      }));
    } else {
      setValidationMessage((prev) => ({
        ...prev,
        state: "",
      }));
    }
    if (!formData.address) {
      setValidationMessage((prev) => ({
        ...prev,
        address: "Enter valid Address",
      }));
    } else {
      setValidationMessage((prev) => ({
        ...prev,
        address: "",
      }));
    }
  };

  const handleSubmit = () => {
    validateForm(formData);
    console.log(formData);
  };

  return (
    <>
      <form className="bg-slate-300 rounded w-[50%] p-2 my-8 flex flex-col gap-2">
        {/* ----------------AadharInput---------------- */}
        <div className="flex">
          <label className="w-1/3">Aadhar Number</label>
          <input
            className="w-2/3"
            name="aadharNumber"
            onChange={handleChange}
            value={formData.aadharNumber}
            type="text"
            required
          ></input>
        </div>
        <div className="text-red-600 text-xs font-play-fair font-bold">
          {validationMessage.aadharNumber}
        </div>

        {/* ---------------- Pan Input----------------- */}

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
        <div className="text-red-600 text-xs font-play-fair font-bold">
          {validationMessage.panNumber}
        </div>

        {/* ------------------ First Name --------------------- */}

        <div className="flex">
          <label className="w-1/3">First Name</label>
          <input
            className="w-2/3"
            name="firstName"
            onChange={handleChange}
            value={formData.firstName}
            type="text"
            required
          ></input>
        </div>
        <div className="text-red-600 text-xs font-play-fair font-bold">
          {validationMessage.firstName}
        </div>

        {/* ------------------- Last Name -------------------- */}

        <div className="flex">
          <label className="w-1/3">Last Name</label>
          <input
            className="w-2/3"
            name="lastName"
            onChange={handleChange}
            value={formData.lastName}
            type="text"
            required
          ></input>
        </div>
        <div className="text-red-600 text-xs font-play-fair font-bold">
          {validationMessage.lastName}
        </div>

        {/* --------------------Father Name ----------------- */}

        <div className="flex">
          <label className="w-1/3">Father Name</label>
          <input
            name="fName"
            onChange={handleChange}
            value={formData.fName}
            className="w-2/3"
            type="text"
            required
          ></input>
        </div>
        <div className="text-red-600 text-xs font-play-fair font-bold">
          {validationMessage.fName}
        </div>

        {/* ----------------------Mother Name -------------------- */}

        <div className="flex">
          <label className="w-1/3">Mother Name</label>
          <input
            className="w-2/3"
            name="mName"
            onChange={handleChange}
            value={formData.mName}
            type="text"
            required
          ></input>
        </div>
        <div className="text-red-600 text-xs font-play-fair font-bold">
          {validationMessage.mName}
        </div>

        {/* ---------------------Date of Birth--------------------- */}

        <div className="flex">
          <label className="w-1/3">Date of Birth</label>
          <input
            className="w-2/3"
            name="dateOfBirth"
            onChange={handleChange}
            value={formData.dateOfBirth}
            type="date"
            required
          ></input>
        </div>
        <div className="text-red-600 text-xs font-play-fair font-bold">
          {validationMessage.dateOfBirth}
        </div>

        {/* ---------------------Qualification--------------------- */}

        <div className="flex">
          <label className="w-1/3">Qualification</label>
          <select
            className="w-2/3"
            name="qualification"
            onChange={handleChange}
            value={formData.qualification}
          >
            <option value="">--select--</option>
            <option value="illiterate">Illiterate</option>
            <option value="10th">10th</option>
            <option value="12th">12th/Diploma</option>
            <option value="graduate">Graduate</option>
            <option value="postGraduate">Post Graduate</option>
            <option value="doctorate">Doctorate</option>
          </select>
        </div>
        <div className="text-red-600 text-xs font-play-fair font-bold">
          {validationMessage.qualification}
        </div>

        {/* --------------------Address------------------------ */}

        <div className="flex">
          <label className="w-1/3">Address</label>
          <input
            className="w-2/3"
            name="address"
            onChange={handleChange}
            value={formData.address}
            required
          ></input>
        </div>
        <div className="text-red-600 text-xs font-play-fair font-bold">
          {validationMessage.address}
        </div>

        {/* ---------------------State---------------------- */}

        <div className="flex">
          <label className="w-1/3">State</label>
          <select
            className="w-2/3"
            value={formData.state}
            onChange={handleChange}
            name="state"
          >
            <option value="">--select--</option>
            {indianStatesAndUTs.map((item, index) => {
              return (
                <option value={item} key={index}>
                  {item}
                </option>
              );
            })}
          </select>
        </div>
        <div className="text-red-600 text-xs font-play-fair font-bold">
          {validationMessage.state}
        </div>

        {/* ---------------------City------------------- */}

        <div className="flex">
          <label className="w-1/3">City</label>
          <input
            className="w-2/3"
            value={formData.city}
            onChange={handleChange}
            name="city"
            required
          ></input>
        </div>
        <div className="text-red-600 text-xs font-play-fair font-bold">
          {validationMessage.city}
        </div>

        {/* -----------------------PinCode----------------------- */}

        <div className="flex">
          <label className="w-1/3">Pincode</label>
          <input
            className="w-2/3"
            value={formData.pincode}
            onChange={handleChange}
            name="pincode"
            required
          ></input>
        </div>
        <div className="text-red-600 text-xs font-play-fair font-bold">
          {validationMessage.pincode}
        </div>
        <div className="flex justify-center">
          <div
            onClick={handleSubmit}
            className="hover:cursor-pointer hover:bg-slate-100 border border-black hover:border-[#649568] hover:border w-[30%] rounded bg-slate-300 p-2 text-center"
          >
            Submit
          </div>
        </div>
      </form>
    </>
  );
};

export default BankerAdd;