import { Link } from "react-router-dom";
import Blockcity from "./images/Blockcity.png";
import { useState } from "react";
import { supabase } from "./client";

const Navbar = ({ session, handleSessionChange }) => {
  const [navbar, setNavbar] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [email, setEmail] = useState(""); // email of the user
  const [password, setPassword] = useState(""); // password of the user
  const [Lmsg, setLMsg] = useState(""); // Login message
  const [user, setUser] = useState(""); // User object after registration / login
//   const [session, setSession] = useState(localStorage.getItem("session") || ""); // session object after registration / login

const Login = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setLMsg(error.message);
    } else {
      setLMsg("Login successfully");
      setUser(data.user);
      handleSessionChange(data.session); // call handleSessionChange from props
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    handleSessionChange("");
    localStorage.removeItem("session");
  };

  const handleCreateClick = () => {
    setShowCreate(true);
  };

  const handleLogin = () => {
    Login(); // Call the Login function
    setShowCreate(false); // Call the setShowCreate function
  };

  return (
    <nav className="sticky top-0 w-full bg-black shadow z-50">
      <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
        <div>
          <div className="flex items-center  py-3 md:py-5 md:block ">
            <div className="flex items-center justify-center space-x-[3px] -ml-[14px]">
              <div className="md:hidden">
                <button
                  className="p-2 text-white rounded-md outline-none focus:border-gray-400 focus:border"
                  onClick={() => setNavbar(!navbar)}
                >
                  {navbar ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  )}
                </button>
              </div>
              <img src={Blockcity} alt="BC" className="w-8" />
            </div>
            <div className="flex ml-[20px] space-x-[20px]">
              <p className="text-white text-sm">
                <Link to="/home">Home</Link>
              </p>
              <p className="text-white text-sm">
                <Link to="/stat">Stats</Link>
              </p>
                  <p className="text-white text-sm">
                    <Link to="/players">Players</Link>
                  </p>
                  <p className="text-white text-sm">
                    <Link to="/teams">Teams</Link>
                  </p>
              
            </div>
          </div>
        </div>
        <div>
          <div
            className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
              navbar ? "block" : "hidden"
            }`}
          >
            <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
              <li
                className="text-white hover:text-blue-600"
                onClick={() => setNavbar(!navbar)}
              >
                {session ? (
                <button className="text-white text-sm" onClick={logout}>
                  Logout
                </button>
              ) : (
                <button
                  className="text-white text-sm"
                  onClick={handleCreateClick}
                >
                  Login
                </button>
              )}
              </li>
            </ul>
          </div>
        </div>
      </div>
      {showCreate && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity opacity-100 z-50">
          <div className="bg-white rounded-lg p-3 h-auto w-auto">
          <div class="w-full max-w-sm mx-auto">
  <h1 class="text-2xl font-bold mb-4">Login</h1>
  <form>
    <div class="mb-4">
      <label class="block text-gray-700 font-bold mb-2" for="email">
        Email
      </label>
      <input
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="email"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
      />
    </div>
    <div class="mb-6">
      <label class="block text-gray-700 font-bold mb-2" for="password">
        Password
      </label>
      <input
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
      />
    </div>
    <div class="flex items-center justify-between">
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="button"
        onClick={handleLogin}
      >
        Login
      </button>
    </div>
  </form>
</div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
