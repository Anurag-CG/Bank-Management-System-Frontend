import "./App.css";
import Landing from "./components/Landing";
import OpenAccount from "./components/OpenAccount";
import Login from "./components/Login";
import BankerLogin from "./components/BankerLogin";
import BankerHome from "./components/BankerHome";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Root from "./components/Root";
import Profile from "./components/Profile";
import Home from "./components/Home";
import UserFundTransfer from "./components/UserFundTransfer";
import Balance from "./components/Balance";
import Register from "./components/Register";
import UpdatePassword from "./components/UpdatePassword";
import AdminLogin from "./components/AdminLogin";
import AdminHome from "./components/AdminHome";

function App() {
  // Main App component for routing
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/openAccount" element={<OpenAccount />} />
          <Route path="/login" element={<Login />} />
          <Route path="/bankerLogin" element={<BankerLogin />} />
          <Route path="/bankerHome" element={<BankerHome />} />
          <Route path="/register" element={<Register />} />
          <Route path="/adminLogin" element={<AdminLogin />} />
          <Route path="/adminHome" element={<AdminHome />} />
          <Route path="/root/*" element={<Root />}>
            <Route path="" element={<Home />} />
            <Route path="profile" element={<Profile />} />
            <Route path="fundTransfer" element={<UserFundTransfer />} />
            <Route path="balance" element={<Balance />} />
            <Route path="changePassword" element={<UpdatePassword />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
