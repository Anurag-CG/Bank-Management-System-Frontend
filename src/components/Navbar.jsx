import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-500 bg-opacity-30 backdrop-blur-lg border-b border-white border-opacity-20 w-[90%] m-auto mt-2 rounded-full font-futura">
        <div className="flex items-center justify-between h-16 w-[90%] m-auto">
          <div className="flex items-center">
            <Link to="/root" className="text-white font-bold text-xl">
              CG
            </Link>
          </div>
          <div className="flex space-x-4">
            <Link
              to="/root/profile"
              className="text-green-500 hover:text-green-200 transition-colors duration-300"
            >
              Profile
            </Link>
            <Link
              to="/FundTransfer"
              className="text-green-500 hover:text-green-200 transition-colors duration-300"
            >
              Fund Transfer
            </Link>
            <Link
              to="/balance"
              className="text-green-500 hover:text-green-200 transition-colors duration-300"
            >
              Check Balance
            </Link>
          </div>
          {/* </div> */}
        </div>
      </nav>
    </>
  );
};

export default Navbar;