import { useState } from "react";
import BankerAdd from "./BankerAdd";
import BankerDelete from "./BankerDelete";
import UpdateUser from "./UpdateUser";
import FundTransfer from "./FundTransfer";
import CreditTransaction from "./CreditTransaction";
import DebitTransaction from "./DebitTransaction";
import BankerAddLogin from "./BankerAddLogin";
import BankerDeleteLogin from "./BankerDeleteLogin";

const BankerHome = () => {
  const [activeServiceButton, setActiveServiceButton] = useState("");
  const handleServiceClick = (e) => {
    setActiveServiceButton(e.target.getAttribute("data-id"));
  };

  return (
    <div className="bg-slate-500 min-h-[100vh] ">
      <div className="text-black flex flex-col font-basker justify-start items-center py-2 px-1">
        <div className="flex w-[90%]">
          <div
            data-id="add"
            className={`p-2 ${
              activeServiceButton == "add"
                ? "bg-slate-50 border-d-0 border-t-2 border-x-2"
                : "bg-slate-300 border-2"
            }  flex-1 rounded-t border-black text-center hover:cursor-pointer`}
            onClick={handleServiceClick}
          >
            Add User
          </div>
          <div
            data-id="delete"
            className={`p-2 ${
              activeServiceButton == "delete"
                ? "bg-slate-50 border-d-0 border-t-2 border-x-2"
                : "bg-slate-300 border-2"
            } flex-1 rounded-t border-black  text-center  hover:cursor-pointer`}
            onClick={handleServiceClick}
          >
            Delete user
          </div>
          <div
            data-id="update"
            className={`p-2 ${
              activeServiceButton == "update"
                ? "bg-slate-50 border-d-0 border-t-2 border-x-2"
                : "bg-slate-300 border-2"
            } flex-1 rounded-t border-black  text-center  hover:cursor-pointer`}
            onClick={handleServiceClick}
          >
            Update User
          </div>
          <div
            data-id="fund"
            className={`p-2 ${
              activeServiceButton == "fund"
                ? "bg-slate-50 border-d-0 border-t-2 border-x-2"
                : "bg-slate-300 border-2"
            } flex-1 rounded-t border-black  text-center  hover:cursor-pointer`}
            onClick={handleServiceClick}
          >
            Fund Transfer
          </div>
          <div
            data-id="credit"
            className={`p-2  ${
              activeServiceButton == "credit"
                ? "bg-slate-50 border-d-0 border-t-2 border-x-2"
                : "bg-slate-300 border-2"
            } flex-1  rounded-t border-black  text-center  hover:cursor-pointer`}
            onClick={handleServiceClick}
          >
            Credit Transaction
          </div>
          <div
            data-id="debit"
            className={`p-2  ${
              activeServiceButton == "debit"
                ? "bg-slate-50 border-d-0 border-t-2 border-x-2"
                : "bg-slate-300 border-2"
            } flex-1  rounded-t border-black  text-center  hover:cursor-pointer`}
            onClick={handleServiceClick}
          >
            Debit Transaction
          </div>
          <div
            data-id="addLogin"
            className={`p-2  ${
              activeServiceButton == "addLogin"
                ? "bg-slate-50 border-d-0 border-t-2 border-x-2"
                : "bg-slate-300 border-2"
            } flex-1  rounded-t border-black  text-center  hover:cursor-pointer`}
            onClick={handleServiceClick}
          >
            Add login
          </div>
          <div
            data-id="deleteLogin"
            className={`p-2  ${
              activeServiceButton == "deleteLogin"
                ? "bg-slate-50 border-d-0 border-t-2 border-x-2"
                : "bg-slate-300 border-2"
            } flex-1  rounded-t border-black  text-center  hover:cursor-pointer`}
            onClick={handleServiceClick}
          >
            Delete login
          </div>
        </div>
        {activeServiceButton ? (
          <div className=" w-[90%] bg-slate-50 rounded-t-none rounded-b border-black border-x-2 border-b-2 flex justify-center items-start">
            {activeServiceButton === "add" && <BankerAdd />}
            {activeServiceButton === "delete" && <BankerDelete />}
            {activeServiceButton === "update" && <UpdateUser />}
            {activeServiceButton === "fund" && <FundTransfer />}
            {activeServiceButton === "credit" && <CreditTransaction />}
            {activeServiceButton === "debit" && <DebitTransaction />}
            {activeServiceButton === "addLogin" && <BankerAddLogin />}
            {activeServiceButton === "deleteLogin" && <BankerDeleteLogin />}
          </div>
        ) : (
          <> </>
        )}
      </div>
    </div>
  );
};

export default BankerHome;
