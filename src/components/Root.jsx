import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Root = () => {
  // return the Navbar and the Outlet
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default Root;
