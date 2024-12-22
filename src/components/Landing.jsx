import "../App.css";
import BankImg from "../assets/BankImage.svg";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  // Function to navigate to different pages
  const navigate = useNavigate();

  // handleClickOpenAccount function to navigate to openAccount page
  const handleClickOpenAccount = () => {
    navigate("/openAccount");
  };

  // handleClickLogin function to navigate to login page
  const handleClickLogin = () => {
    navigate("/login");
  };

  // handleClickBankerLogin function to navigate to bankerLogin page
  const handleClickBankerLogin = () => {
    navigate("/bankerLogin");
  };

  // handleClickAdminLogin function to navigate to adminLogin page
  const handleClickAdminLogin = () => {
    navigate("/adminLogin");
  };

  // return landing page component
  return (
    <div className="flex p-4 h-[100vh]">
      <div className="flex flex-1 flex-col">
        <div className="flex flex-1 flex-col justify-center">
          <h1 className="text-6xl font-bold  font-play-fair">
            Experience Awesome Banking Like Never Before
          </h1>
          <div className="flex mt-8 gap-8">
            <div
              className="hover:cursor-pointer hover:bg-slate-100 hover:text-[#649568] rounded-full bg-slate-300 text-[#0e100f] w-[33%] p-2 text-center transition-colors duration-300"
              onClick={handleClickOpenAccount}
            >
              Open Account
            </div>
            <div
              className="hover:cursor-pointer hover:bg-slate-200 hover:text-[#649568] rounded-full border-2 w-[33%] border-slate-300 text-slate-300 p-2 text-center
              transition-colors duration-300"
              onClick={handleClickLogin}
            >
              Login
            </div>
          </div>
        </div>
        <p
          className="underline hover:cursor-pointer font-basker"
          onClick={handleClickBankerLogin}
        >
          Banker Login
        </p>
        <p
          className="underline hover:cursor-pointer font-basker"
          onClick={handleClickAdminLogin}
        >
          Admin Login
        </p>
      </div>
      <div className="flex-1 flex justify-center">
        <img className="h-5/6" src={BankImg} alt="bank-image" />
      </div>
    </div>
  );
};

export default Landing;
