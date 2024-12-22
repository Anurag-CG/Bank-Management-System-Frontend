import axios from "axios";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
  // useNavigate hook from react-router-dom to navigate to different routes
  const navigate = useNavigate();

  // List of Indian states and Union Territories
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

  // Initial profile data
  const initialProfileData = {
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

  // State to store profile data
  const [profileData, setProfileData] = useState(initialProfileData);
  useEffect(() => {
    // console.log(user);
    const decoded = jwtDecode(localStorage.getItem("userToken"));

    // Fetch user data from the server
    axios
      .post(
        `http://localhost:8777/user/findUser`,
        {
          userId: decoded.sub,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        // console.log("Response:", response.data);

        setProfileData((prev) => ({
          ...prev,
          ...response.data,
        }));
      })
      .catch((error) => {
        console.log(error);
        // console.error("Error:", error);
        // if (error.response.data.status === 403) {
        alert("You are not authorised");
        navigate("/login");
        // }
      });
  }, []);

  // State to store whether the profile is editable or not
  const [isEditable, setIsEditable] = useState(false);

  // Function to handle update profile
  const handleUpdate = () => {
    setIsEditable(!isEditable);

    // Update profile data on the server
    axios
      .put("http://localhost:8777/user/update", profileData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Function to handle change in input fields
  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  // return the JSX for the Profile component
  return (
    <>
      <div className="text-5xl text-green-500 text-center mt-28">
        {`Welcome ${profileData.firstName} ${profileData.lastName}`}
      </div>
      <ul className="text-green-500 w-[50%] m-auto font-jetBrain mt-6 flex flex-col gap-2 ">
        <li className="flex">
          <label htmlFor="aadharNumber" className="block w-1/3">
            Account number:
          </label>
          <span className="w-2/3">{profileData.accountNumber}</span>
        </li>
        <li className="flex">
          <label htmlFor="aadharNumber" className="block w-1/3">
            Aadhar number:
          </label>
          <span className="w-2/3">{profileData.aadharNumber}</span>
        </li>
        <li className="flex">
          <label htmlFor="panNumber" className="block w-1/3">
            Pan number:
          </label>
          <span className="w-2/3">{profileData.panNumber}</span>
        </li>
        <li className="flex">
          <label htmlFor="fname" className="block w-1/3">
            Father name:
          </label>
          <span className="w-2/3">{profileData.fname}</span>
        </li>
        <li className="flex">
          <label htmlFor="mname" className="block w-1/3">
            Mother name:
          </label>

          <span className="w-2/3">{profileData.mname}</span>
        </li>
        <li className="flex">
          <label htmlFor="dateOfBirth" className="block w-1/3">
            Date of Birth:
          </label>

          <span className="w-2/3">{profileData.dateOfBirth}</span>
        </li>
        <li className="flex">
          <label htmlFor="qualification" className="block w-1/3">
            Qualification:
          </label>
          {isEditable ? (
            <select
              className="w-2/3 rounded-md"
              name="qualification"
              onChange={handleChange}
              value={profileData.qualification}
            >
              <option value="">--select--</option>
              <option value="illiterate">Illiterate</option>
              <option value="10th">10th</option>
              <option value="12th">12th/Diploma</option>
              <option value="graduate">Graduate</option>
              <option value="postGraduate">Post Graduate</option>
              <option value="doctorate">Doctorate</option>
            </select>
          ) : (
            <span className="w-2/3">{profileData.qualification}</span>
          )}
        </li>
        <li className="flex">
          <label htmlFor="address" className="block w-1/3">
            Address:
          </label>
          {isEditable ? (
            <input
              name="address"
              type="text"
              value={profileData.address}
              onChange={(e) => handleChange(e, "address")}
              className="border-2 border-gray-300  rounded-md w-2/3"
            />
          ) : (
            <span className="w-2/3">{profileData.address}</span>
          )}
        </li>
        <li className="flex">
          <label htmlFor="city" className="block w-1/3">
            City:
          </label>
          {isEditable ? (
            <input
              name="city"
              type="text"
              value={profileData.city}
              onChange={handleChange}
              className="border-2 border-gray-300  rounded-md w-2/3"
            />
          ) : (
            <span className="w-2/3">{profileData.city}</span>
          )}
        </li>
        <li className="flex">
          <label htmlFor="state" className="block w-1/3">
            State:
          </label>
          {isEditable ? (
            <select
              className="w-2/3 rounded-md"
              value={profileData.state}
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
          ) : (
            <span className="w-2/3">{profileData.state}</span>
          )}
        </li>
        <li className="flex">
          <label htmlFor="pincode" className="block w-1/3">
            Pincode:
          </label>
          {isEditable ? (
            <input
              name="pincode"
              type="text"
              value={profileData.pincode}
              onChange={(e) => handleChange(e, "pincode")}
              className="border-2 border-gray-300  rounded-md w-2/3"
            />
          ) : (
            <span className="w-2/3">{profileData.pincode}</span>
          )}
        </li>
      </ul>
      <div className="text-center mt-5 mb-10">
        <button
          className="bg-gray-500 font-play-fair m-auto  bg-opacity-30 rounded backdrop:blur-md p-2"
          onClick={handleUpdate}
        >
          <h1 className="text-green-500 hover:text-green-200">
            {isEditable ? "Save" : "Update"}
          </h1>
        </button>
      </div>
      <div className="text-end mb-10 mr-4 font-play-fair">
        <Link to="/root/changePassword" className="hover:text-green-200">
          Change Password
        </Link>
      </div>
    </>
  );
};
export default Profile;
