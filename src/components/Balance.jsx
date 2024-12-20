import axios from "axios";
import { useEffect, useState } from "react";

const Balance = () => {
  const [userId, setUserId] = useState("Mohan2");
  const [balance, setBalance] = useState(0);
  useEffect(() => {
    axios
      .get(`http://localhost:8777/user/viewBalance?userId=${userId}`)
      .then((response) => {
        console.log(response.data);
        setBalance(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="flex justify-center items-center min-h-[100vh]">
      <h1 className="text-5xl font-thin">Your Balance is : {balance} </h1>
    </div>
  );
};

export default Balance;
