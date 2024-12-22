import axios from "axios";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const Balance = () => {
  // Decoding the JWT token
  const decoded = jwtDecode(localStorage.getItem("userToken"));

  // State to store the user ID
  const [userId, setUserId] = useState(null);

  // State to store the balance
  const [balance, setBalance] = useState(0);

  // Fetching the balance of the user
  useEffect(() => {
    setUserId(decoded.sub);
    if (userId)
      axios
        .get(`http://localhost:8777/user/viewBalance?userId=${userId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          setBalance(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
  }, [userId]);

  // Rendering the balance
  return (
    <div className="flex justify-center items-center min-h-[100vh]">
      <h1 className="text-5xl font-thin">Your Balance is : {balance} </h1>
    </div>
  );
};

export default Balance;
