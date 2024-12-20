import { act, useState } from "react";
import AdminAdd from "./AdminAdd";
import AdminRemove from "./AdminRemove";
import AdminViewBanker from "./AdminViewBanker";
import AdminViewUser from "./AdminViewUser";

const AdminHome = () => {
  const [activeServiceButton, setActiveServiceButton] = useState(null);
  const handleServiceClick = (e) => {
    setActiveServiceButton(e.target.getAttribute("data-id"));
  };
  return (
    <>
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
              Add Banker
            </div>

            <div
              data-id="remove"
              className={`p-2 ${
                activeServiceButton == "remove"
                  ? "bg-slate-50 border-d-0 border-t-2 border-x-2"
                  : "bg-slate-300 border-2"
              }  flex-1 rounded-t border-black text-center hover:cursor-pointer`}
              onClick={handleServiceClick}
            >
              Remove Banker
            </div>

            <div
              data-id="viewBanker"
              className={`p-2 ${
                activeServiceButton == "viewBanker"
                  ? "bg-slate-50 border-d-0 border-t-2 border-x-2"
                  : "bg-slate-300 border-2"
              }  flex-1 rounded-t border-black text-center hover:cursor-pointer`}
              onClick={handleServiceClick}
            >
              View Banker
            </div>
            <div
              data-id="viewUser"
              className={`p-2 ${
                activeServiceButton == "viewUser"
                  ? "bg-slate-50 border-d-0 border-t-2 border-x-2"
                  : "bg-slate-300 border-2"
              }  flex-1 rounded-t border-black text-center hover:cursor-pointer`}
              onClick={handleServiceClick}
            >
              View User
            </div>
          </div>
          {activeServiceButton ? (
            <div className=" w-[90%] bg-slate-50 rounded-t-none rounded-b border-black border-x-2 border-b-2 flex justify-center items-start">
              {activeServiceButton === "add" && <AdminAdd />}
              {activeServiceButton === "remove" && <AdminRemove />}
              {activeServiceButton === "viewBanker" && <AdminViewBanker />}
              {activeServiceButton === "viewUser" && <AdminViewUser />}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminHome;
