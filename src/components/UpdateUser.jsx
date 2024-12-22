import { useState } from "react";
import axios from "axios";
const UpdateUser = () => {
  // Initial Data
  const initialData = {
    accountNumber: "",
  };

  // Initial Validation Message
  const initialValidationMessage = {
    accountNumber: "",
  };

  // Initial Profile Data to Update
  const initialProfileDataToUpdate = {
    accountNumber: "",
    aadharNumber: "",
    panNumber: "",
    firstName: "",
    lastName: "",
    fname: "",
    mname: "",
    dateOfBirth: "",
    qualification: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  };

  // Indian States and UTs
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

  // state for form data
  const [formData, setFormData] = useState(initialData);

  // state for validation message
  const [validationMessage, setValidationMessage] = useState(
    initialValidationMessage
  );

  // state for balance
  const [balance, setBalance] = useState(null);

  // state for profile data to update
  const [profileDataToUpdate, setProfileDataToUpdate] = useState(
    initialProfileDataToUpdate
  );

  // handle change function
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // validate form function
  const validateForm = (formData) => {
    let flag = true;
    // Account Number Validation
    const accountNumber = /^[789]{1}[0-9]{9}$/;
    if (!accountNumber.test(formData.accountNumber)) {
      setValidationMessage((prev) => ({
        ...prev,
        accountNumber: "Please enter valid Account Number",
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

  // handle submit check balance function
  const handleSubmitCheckBalance = () => {
    if (validateForm(formData)) {
      // axios get request
      axios
        .get(
          `http://localhost:8777/bank/viewBalance?accountNumber=${formData.accountNumber}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("bankerToken")}`,
            },
          }
        )
        .then((response) => {
          console.log("Response:", response.data);
          setResponseMessage(`Rs. ${response.data}`);
        })
        .catch((error) => {
          console.log(error);
          console.error("Error:", error);
        });
      // setBalance(100);
      setProfileDataToUpdate(initialProfileDataToUpdate);
    }
  };

  // handle change update profile function
  const handleSubmitUpdateProfile = () => {
    if (validateForm(formData)) {
      // axios get request
      axios
        .get(
          `http://localhost:8777/bank/findUser?accountNumber=${formData.accountNumber}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("bankerToken")}`,
            },
          }
        )
        .then((response) => {
          console.log("Response:", response.data);
          setProfileDataToUpdate(response.data);
          // console.log(formData);
        })
        .catch((error) => {
          console.log(error);
          console.error("Error:", error);
        });
    }
    setBalance(null);
  };

  // handle change update profile function
  const handleChangeUpdateProfile = (e) => {
    // console.log(profileDataToUpdate, initialProfileDataToUpdate);
    setProfileDataToUpdate((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // check if any data is changed
  const checkInitialProfileDataChanged = () => {
    for (let key in profileDataToUpdate) {
      if (profileDataToUpdate[key]) return true;
    }
  };

  // validate profile data to update
  const validateProfileDataToUpdate = (profileDataToUpdate) => {
    let flag = true;
    // const aadharRegex = /^[0-9]{12}$/;
    // if (!aadharRegex.test(profileDataToUpdate.aadharNumber)) {
    //   setValidationMessage((prev) => ({
    //     ...prev,
    //     aadharNumber: "Please enter valid Aadhar Number",
    //   }));
    //   flag = false;
    // } else {
    //   setValidationMessage((prev) => ({
    //     ...prev,
    //     aadharNumber: "",
    //   }));
    // }

    // PAN Number Validation
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (!panRegex.test(profileDataToUpdate.panNumber)) {
      setValidationMessage((prev) => ({
        ...prev,
        panNumber: "Invalid Pan Number",
      }));
      flag = false;
    } else {
      setValidationMessage((prev) => ({
        ...prev,
        panNumber: "",
      }));
    }

    // First Name Validation
    const firstNameRegex = /^[a-zA-Z]{1,25}$/;
    if (!firstNameRegex.test(profileDataToUpdate.firstName)) {
      setValidationMessage((prev) => ({
        ...prev,
        firstName: "Invalid First Name",
      }));
      flag = false;
    } else {
      setValidationMessage((prev) => ({
        ...prev,
        firstName: "",
      }));
    }

    // Last Name Validation
    const lastNameRegex = /^[a-zA-Z]{1,25}$/;
    if (!lastNameRegex.test(profileDataToUpdate.lastName)) {
      setValidationMessage((prev) => ({
        ...prev,
        lastName: "Invalid Last Name",
      }));
      flag = false;
    } else {
      setValidationMessage((prev) => ({
        ...prev,
        lastName: "",
      }));
    }

    // Father Name Validation
    const fnameRegex = /^[A-Za-z ]{1,50}$/;
    if (!fnameRegex.test(profileDataToUpdate.fname)) {
      setValidationMessage((prev) => ({
        ...prev,
        fname: "Invalid Father Name",
      }));
      flag = false;
    } else {
      setValidationMessage((prev) => ({
        ...prev,
        fname: "",
      }));
    }

    // Mother Name Validation
    if (!fnameRegex.test(profileDataToUpdate.mname)) {
      setValidationMessage((prev) => ({
        ...prev,
        mname: "Invalid Mother Name",
      }));
      flag = false;
    } else {
      setValidationMessage((prev) => ({
        ...prev,
        mname: "",
      }));
    }

    // Date of Birth Validation
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
    let age = calculateAge(profileDataToUpdate.dateOfBirth);
    if (!profileDataToUpdate.dateOfBirth) {
      setValidationMessage((prev) => ({
        ...prev,
        dateOfBirth: "Please select your DOB",
      }));
      flag = false;
    } else if (age < 18) {
      setValidationMessage((prev) => ({
        ...prev,
        dateOfBirth: "Age must be 18 years or above",
      }));
      flag = false;
    } else {
      setValidationMessage((prev) => ({
        ...prev,
        dateOfBirth: "",
      }));
    }

    // City Validation
    const cityRegex = /^[a-zA-Z]{1,25}$/;
    if (!cityRegex.test(profileDataToUpdate.city)) {
      setValidationMessage((prev) => ({
        ...prev,
        city: "Enter valid city Name",
      }));
      flag = false;
    } else {
      setValidationMessage((prev) => ({
        ...prev,
        city: "",
      }));
    }

    // Pincode Validation
    const pincodeRegex = /^[0-9]{6}$/;
    if (!pincodeRegex.test(profileDataToUpdate.pincode)) {
      setValidationMessage((prev) => ({
        ...prev,
        pincode: "Enter valid Pincode",
      }));
      flag = false;
    } else {
      setValidationMessage((prev) => ({
        ...prev,
        pincode: "",
      }));
    }

    // Qualification Validation
    if (!profileDataToUpdate.qualification) {
      setValidationMessage((prev) => ({
        ...prev,
        qualification: "Please select Qualification",
      }));
      flag = false;
    } else {
      setValidationMessage((prev) => ({
        ...prev,
        qualification: "",
      }));
    }

    // State Validation
    if (!profileDataToUpdate.state) {
      setValidationMessage((prev) => ({
        ...prev,
        state: "Please select State",
      }));
      flag = false;
    } else {
      setValidationMessage((prev) => ({
        ...prev,
        state: "",
      }));
    }

    // Address Validation
    if (!profileDataToUpdate.address) {
      setValidationMessage((prev) => ({
        ...prev,
        address: "Enter valid Address",
      }));
      flag = false;
    } else {
      setValidationMessage((prev) => ({
        ...prev,
        address: "",
      }));
    }
    return flag;
  };

  // Response Message
  const [responseMessage, setResponseMessage] = useState("");

  // Error State
  const [isError, setIsError] = useState(false);

  // Handle Submit Update Profile Final
  const handleSubmitUpdateProfileFinal = () => {
    if (validateProfileDataToUpdate(profileDataToUpdate))
      // axios put request
      axios
        .put("http://localhost:8777/bank/updateUser", profileDataToUpdate, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("bankerToken")}`,
          },
        })
        .then((response) => {
          console.log("Response:", response.data);
          setResponseMessage("Profile Updated successfully");
          setProfileDataToUpdate(initialProfileDataToUpdate);
          setIsError(false);
        })
        .catch((error) => {
          console.error("Error:", error);
          setResponseMessage("Error, something went wrong");
          setIsError(true);
        });
  };

  // return component for UpdateUser
  return (
    <>
      <div className="flex flex-col w-[50%]">
        <form className="bg-slate-300 rounded w-[100%] p-2 my-8 flex flex-col gap-2">
          <div className="flex">
            <label className="w-1/3">Account Number</label>
            <input
              name="accountNumber"
              value={formData.accountNumber}
              className="w-2/3"
              onChange={handleChange}
            ></input>
          </div>
          <div className="text-red-600 text-xs font-play-fair font-bold">
            {validationMessage.accountNumber}
          </div>
          <div className="flex justify-center gap-2">
            <div
              onClick={handleSubmitCheckBalance}
              className="hover:cursor-pointer hover:bg-slate-100 border border-black hover:border-[#649568] hover:border w-[30%] rounded bg-slate-300 p-2 text-center"
            >
              Check Balance
            </div>
            <div
              onClick={handleSubmitUpdateProfile}
              className="hover:cursor-pointer hover:bg-slate-100 border border-black hover:border-[#649568] hover:border w-[30%] rounded bg-slate-300 p-2 text-center"
            >
              Update Profile
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
        {balance && (
          <div className="bg-slate-300 rounded w-[100%] p-2 my-8 flex flex-col gap-2 text-center">
            Your Account Balance is : {balance}
          </div>
        )}
        {checkInitialProfileDataChanged() && (
          <>
            <form className="flex justify-center items-center flex-col">
              {/* <img
                className="fixed left-0 top-0 object-cover h-[100%] w-[100%] "
                src={loginBg}
              ></img> */}

              <div className="z-10 opacity-[0.88] my-6 bg-slate-100 p-2 rounded font-jetBrain w-[100%] border-slate-300 border-4 flex flex-col gap-[0.25rem]">
                <h1 className="text-3xl text-center underline mb-3">
                  Update User
                </h1>

                {/* ----------------AadharInput---------------- */}
                {/* <div className="flex">
                  <label className="w-1/3">Aadhar Number</label>
                  <input
                    className="w-2/3"
                    name="aadharNumber"
                    onChange={handleChangeUpdateProfile}
                    value={profileDataToUpdate.aadharNumber}
                    type="text"
                    required
                  ></input>
                </div>
                <div className="text-red-500 text-xs font-play-fair font-bold">
                  {validationMessage.aadharNumber}
                </div> */}

                {/* ---------------- Pan Input----------------- */}

                <div className="flex">
                  <label className="w-1/3">Pan Number</label>
                  <input
                    className="w-2/3"
                    name="panNumber"
                    onChange={handleChangeUpdateProfile}
                    value={profileDataToUpdate.panNumber}
                    type="text"
                  ></input>
                </div>
                <div className="text-red-500 text-xs font-play-fair font-bold">
                  {validationMessage.panNumber}
                </div>

                {/* ------------------ First Name --------------------- */}

                <div className="flex">
                  <label className="w-1/3">First Name</label>
                  <input
                    className="w-2/3"
                    name="firstName"
                    onChange={handleChangeUpdateProfile}
                    value={profileDataToUpdate.firstName}
                    type="text"
                    required
                  ></input>
                </div>
                <div className="text-red-500 text-xs font-play-fair font-bold">
                  {validationMessage.firstName}
                </div>

                {/* ------------------- Last Name -------------------- */}

                <div className="flex">
                  <label className="w-1/3">Last Name</label>
                  <input
                    className="w-2/3"
                    name="lastName"
                    onChange={handleChangeUpdateProfile}
                    value={profileDataToUpdate.lastName}
                    type="text"
                    required
                  ></input>
                </div>
                <div className="text-red-500 text-xs font-play-fair font-bold">
                  {validationMessage.lastName}
                </div>

                {/* --------------------Father Name ----------------- */}

                <div className="flex">
                  <label className="w-1/3">Father Name</label>
                  <input
                    name="fname"
                    onChange={handleChangeUpdateProfile}
                    value={profileDataToUpdate.fname}
                    className="w-2/3"
                    type="text"
                    required
                  ></input>
                </div>
                <div className="text-red-500 text-xs font-play-fair font-bold">
                  {validationMessage.fname}
                </div>

                {/* ----------------------Mother Name -------------------- */}

                <div className="flex">
                  <label className="w-1/3">Mother Name</label>
                  <input
                    className="w-2/3"
                    name="mname"
                    onChange={handleChangeUpdateProfile}
                    value={profileDataToUpdate.mname}
                    type="text"
                    required
                  ></input>
                </div>
                <div className="text-red-500 text-xs font-play-fair font-bold">
                  {validationMessage.mname}
                </div>

                {/* ---------------------Date of Birth--------------------- */}

                <div className="flex">
                  <label className="w-1/3">Date of Birth</label>
                  <input
                    className="w-2/3"
                    name="dateOfBirth"
                    onChange={handleChangeUpdateProfile}
                    value={profileDataToUpdate.dateOfBirth}
                    type="date"
                    required
                  ></input>
                </div>
                <div className="text-red-500 text-xs font-play-fair font-bold">
                  {validationMessage.dateOfBirth}
                </div>

                {/* ---------------------Qualification--------------------- */}

                <div className="flex">
                  <label className="w-1/3">Qualification</label>
                  <select
                    className="w-2/3"
                    name="qualification"
                    onChange={handleChangeUpdateProfile}
                    value={profileDataToUpdate.qualification}
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
                <div className="text-red-500 text-xs font-play-fair font-bold">
                  {validationMessage.qualification}
                </div>

                {/* --------------------Address------------------------ */}

                <div className="flex">
                  <label className="w-1/3">Address</label>
                  <input
                    className="w-2/3"
                    name="address"
                    onChange={handleChangeUpdateProfile}
                    value={profileDataToUpdate.address}
                    required
                  ></input>
                </div>
                <div className="text-red-500 text-xs font-play-fair font-bold">
                  {validationMessage.address}
                </div>

                {/* ---------------------State---------------------- */}

                <div className="flex">
                  <label className="w-1/3">State</label>
                  <select
                    className="w-2/3"
                    value={profileDataToUpdate.state}
                    onChange={handleChangeUpdateProfile}
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
                <div className="text-red-500 text-xs font-play-fair font-bold">
                  {validationMessage.state}
                </div>

                {/* ---------------------City------------------- */}

                <div className="flex">
                  <label className="w-1/3">City</label>
                  <input
                    className="w-2/3"
                    value={profileDataToUpdate.city}
                    onChange={handleChangeUpdateProfile}
                    name="city"
                    required
                  ></input>
                </div>
                <div className="text-red-500 text-xs font-play-fair font-bold">
                  {validationMessage.city}
                </div>

                {/* -----------------------PinCode----------------------- */}

                <div className="flex">
                  <label className="w-1/3">Pincode</label>
                  <input
                    className="w-2/3"
                    value={profileDataToUpdate.pincode}
                    onChange={handleChangeUpdateProfile}
                    name="pincode"
                    required
                  ></input>
                </div>
                <div className="text-red-500 text-xs font-play-fair font-bold">
                  {validationMessage.pincode}
                </div>
                <div className="flex justify-center">
                  <div
                    onClick={handleSubmitUpdateProfileFinal}
                    className="hover:cursor-pointer hover:bg-slate-100 border border-transparent hover:border-[#649568] hover:border w-[30%] rounded bg-slate-300 p-2 text-center"
                  >
                    Submit
                  </div>
                </div>
              </div>
            </form>
          </>
        )}
      </div>
    </>
  );
};

export default UpdateUser;
