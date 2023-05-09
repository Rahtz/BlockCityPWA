import { Link, useLocation } from "react-router-dom";
import Blockcity from "./images/Blockcity.png";
import { useState } from "react";
import { supabase } from "./client";
import { BsPersonCircle } from "react-icons/bs";

const Navbar = ({ session, handleSessionChange }) => {
  const [navbar, setNavbar] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [email, setEmail] = useState(""); // email of the user
  const [password, setPassword] = useState(""); // password of the user
  const [Lmsg, setLMsg] = useState(""); // Login message
  const [user, setUser] = useState(""); // User object after registration / login
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);
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
    <>
      <nav
        className={`fixed top-0 left-0 z-50 h-screen w-auto bg-white text-gray-500 transition-transform duration-500 ease-in-out transform ${
          navbar ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col items-start mt-[70px] w-[150px] h-full border-onyx border-x-[1px] bg-black">
          <p
            className={`text-sm font-bold py-3 pl-2 w-full border-b-[1px] font-sans border-onyx ${
              location.pathname === "/home" ? "text-white" : ""
            }`}
          >
            <Link to="/home" onClick={() => setNavbar(false)}>
              Home
            </Link>
          </p>
          <p
            className={`text-sm font-bold py-3 pl-2 w-full border-b-[1px] font-sans border-onyx ${
              location.pathname === "/stat" ? "text-white" : ""
            }`}
          >
            <Link to="/stat" onClick={() => setNavbar(false)}>
              Stats
            </Link>
          </p>
          <p
            className={`text-sm font-bold py-3 pl-2 w-full border-b-[1px] font-sans border-onyx ${
              location.pathname === "/players" ? "text-white" : ""
            }`}
          >
            <Link to="/players" onClick={() => setNavbar(false)}>
              Players
            </Link>
          </p>
          <p
            className={`text-sm font-bold py-3 pl-2 w-full border-b-[1px] font-sans border-onyx ${
              location.pathname === "/teams" ? "text-white" : ""
            }`}
          >
            <Link to="/teams" onClick={() => setNavbar(false)}>
              Teams
            </Link>
          </p>
          {session ? (
            <p
              className={`text-sm font-bold py-3 pl-2 w-full border-b-[1px] font-sans border-onyx ${
                location.pathname === "/stats" ? "text-white" : ""
              }`}
            >
              <Link to="/stats" onClick={() => setNavbar(false)}>
                Add Stats
              </Link>
            </p>
          ) : (
            <></>
          )}
          {session ? (
            <p
              className={`text-sm font-bold py-3 pl-2 w-full border-b-[1px] font-sans border-onyx ${
                location.pathname === "/articles" ? "text-white" : ""
              }`}
            >
              <Link to="/articles" onClick={() => setNavbar(false)}>
                Add Articles
              </Link>
            </p>
          ) : (
            <></>
          )}
        </div>
      </nav>
      <nav className="fixed top-0 w-full border-b-[1px] border-onyx bg-black shadow z-50">
        <div className="flex justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
          <div>
            <div className="flex items-center py-3 md:py-5 md:block">
              <div className="flex items-center justify-center space-x-[3px] -ml-[14px]">
                <div className="md:hidden">
                  <button
                    className="p-2 ml-3 text-white rounded-md outline-none focus:border-gray-400 focus:border"
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
                <div className="flex space-x-5 pl-5">
                  <p className="lg:text-white">
                    <Link to="/home">Home</Link>
                  </p>
                  <p className="lg:text-white">
                    <Link to="/stat">Stats</Link>
                  </p>
                  <p className="lg:text-white">
                    <Link to="/players">Players</Link>
                  </p>
                  <p className="lg:text-white">
                    <Link to="/teams">Teams</Link>
                  </p>
                  {session ? (
                    <p className="lg:text-white">
                      <Link to="/stats">Add Stats</Link>
                    </p>
                  ) : (
                    <></>
                  )}
                  {session ? (
                    <p className="lg:text-white">
                      <Link to="/articles">Add Articles</Link>
                    </p>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <BsPersonCircle
              className="text-white w-[50px] h-[30px] -ml-[80px] mt-1"
              onClick={() => setShowDropdown(!showDropdown)}
            />
          </div>
        </div>
        {showDropdown && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
            <div className="py-1">
              {session ? (
                <button
                  href="#"
                  className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
                >
                  Profile
                </button>
              ) : (
                <></>
              )}
              {session ? (
                <button
                  href="#"
                  className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
                >
                  Settings
                </button>
              ) : (
                <></>
              )}

              {session ? (
                <button
                  onClick={logout}
                  href="#"
                  className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={handleCreateClick}
                  href="#"
                  className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        )}
        {showCreate && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity opacity-100 z-50">
            <div className="bg-white rounded-lg p-3 h-auto w-auto">
              <div class="w-full max-w-sm mx-auto">
                <h1 class="text-2xl font-bold mb-4">Login</h1>
                <form>
                  <div class="mb-4">
                    <label
                      class="block text-gray-700 font-bold mb-2"
                      for="email"
                    >
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
                    <label
                      class="block text-gray-700 font-bold mb-2"
                      for="password"
                    >
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
    </>
  );
};

export default Navbar;
