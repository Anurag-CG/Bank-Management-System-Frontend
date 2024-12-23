import { useState } from "react";
import AdminAdd from "./AdminAdd";
import AdminRemove from "./AdminRemove";
import AdminViewBanker from "./AdminViewBanker";
import AdminViewUser from "./AdminViewUser";
import { useNavigate } from "react-router-dom";
const AdminHome = () => {
  // initial formData to store the form data
  const [activeServiceButton, setActiveServiceButton] = useState(null);

  // handleServiceClick function to handle the click on the service button
  const handleServiceClick = (e) => {
    setActiveServiceButton(e.target.getAttribute("data-id"));
  };

  // navigate to the login page
  const navigate = useNavigate();

  // handleLogout function to handle the logout
  const handleLogout = () => {
    localStorage.setItem("adminToken", "");
    navigate("/");
  };

  // return the admin home page
  return (
    <>
      <div className="bg-blue-500 min-h-[100vh] ">
        <div className="text-black flex flex-col font-basker justify-start items-center py-2 px-1">
          <h1 className="text-3xl">Welcome Admin</h1>
          <div className="flex w-[90%]">
            <div
              data-id="add"
              className={`p-2 ${
                activeServiceButton == "add"
                  ? "bg-blue-300 border-d-0 border-t-2 border-x-2"
                  : "bg-white border-2"
              }  flex-1 rounded-t border-black text-center hover:cursor-pointer`}
              onClick={handleServiceClick}
            >
              Add Banker
            </div>

            <div
              data-id="remove"
              className={`p-2 ${
                activeServiceButton == "remove"
                  ? "bg-blue-300 border-d-0 border-t-2 border-x-2"
                  : "bg-white border-2"
              }  flex-1 rounded-t border-black text-center hover:cursor-pointer`}
              onClick={handleServiceClick}
            >
              Remove Banker
            </div>

            <div
              data-id="viewBanker"
              className={`p-2 ${
                activeServiceButton == "viewBanker"
                  ? "bg-blue-300 border-d-0 border-t-2 border-x-2"
                  : "bg-white border-2"
              }  flex-1 rounded-t border-black text-center hover:cursor-pointer`}
              onClick={handleServiceClick}
            >
              View Banker
            </div>
            <div
              data-id="viewUser"
              className={`p-2 ${
                activeServiceButton == "viewUser"
                  ? "bg-blue-300 border-d-0 border-t-2 border-x-2"
                  : "bg-white border-2"
              }  flex-1 rounded-t border-black text-center hover:cursor-pointer`}
              onClick={handleServiceClick}
            >
              View User
            </div>
          </div>
          {activeServiceButton ? (
            <div className=" w-[90%] bg-blue-300 rounded-t-none rounded-b border-black border-x-2 border-b-2 flex justify-center items-start">
              {activeServiceButton === "add" && <AdminAdd />}
              {activeServiceButton === "remove" && <AdminRemove />}
              {activeServiceButton === "viewBanker" && <AdminViewBanker />}
              {activeServiceButton === "viewUser" && <AdminViewUser />}
            </div>
          ) : (
            <></>
          )}
        </div>
        <button
          className="text-black fixed right-10 bottom-10"
          onClick={handleLogout}
        >
          <img
            className="w-10 rounded-full border-black border"
            src="https://t4.ftcdn.net/jpg/05/80/99/99/360_F_580999947_8TiLCA1GVKXsGE8nQk0R7xzuHasBdBOU.jpg"
          ></img>
        </button>
      </div>
    </>
  );
};

export default AdminHome;
