import "./App.css";
import Landing from "./components/Landing";
import OpenAccount from "./components/OpenAccount";
import Login from "./components/Login";
import BankerLogin from "./components/BankerLogin";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/openAccount" element={<OpenAccount />} />
          <Route path="/login" element={<Login />} />
          <Route path="/bankerLogin" element={<BankerLogin />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
