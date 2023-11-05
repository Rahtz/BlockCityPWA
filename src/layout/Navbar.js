import { Link, useLocation } from "react-router-dom";
import Blockcity from "../assets/images/Blockcity.png";
import { useState } from "react";
import { supabase } from "../services/client";
import { BsPersonCircle } from "react-icons/bs";
import { FiMenu, FiX } from "react-icons/fi";
import { AiOutlineHome } from "react-icons/ai";

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
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

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
      <nav className="fixed top-0 left-0 w-full z-50 bg-black text-white lg:h-[80px] lg:pb-1">
        <div className="md:flex md:items-center md:justify-between md:py-4 md:px-6">
          <div className="flex">
            <div className="flex items-center justify-between py-4 px-6 lg:py-1">
              <div className="flex items-center space-x-4">
                {" "}
                {/* Added a container div for the left side elements */}
                <div className="md:hidden">
                  <button
                    className="text-white focus:outline-none"
                    type="button"
                    onClick={toggleNavbar}
                  >
                    {isOpen ? (
                      <FiX className="w-6 h-6" />
                    ) : (
                      <FiMenu className="w-6 h-6" />
                    )}
                  </button>
                </div>
                <div className="text-xl font-bold">
                  <img src={Blockcity} alt="BC" className="w-8 lg:w-12" />
                </div>
              </div>
            </div>
            <div className={`hidden lg:flex ${isOpen ? "" : "hidden"}`}
            >
              <p
                className={`text-sm font-bold py-3 pl-2 w-full font-sans border-onyx ${
                  location.pathname === "/home" ? "text-white" : ""
                }`}
              >
                <Link to="/home" >
                  Home
                </Link>
              </p>
              <p
                className={`text-sm font-bold py-3 pl-2 w-full font-sans border-onyx ${
                  location.pathname === "/home2" ? "text-white" : ""
                }`}
              >
                <Link to="/home2" >
                  Home2
                </Link>
              </p>
              <p
                className={`text-sm font-bold py-3 pl-2 w-full font-sans border-onyx ${
                  location.pathname === "/stat" ? "text-white" : ""
                }`}
              >
                <Link to="/stat">
                  Stats
                </Link>
              </p>
              <p
                className={`text-sm font-bold py-3 pl-2 w-full font-sans border-onyx ${
                  location.pathname === "/players" ? "text-white" : ""
                }`}
              >
                <Link to="/players" >
                  Players
                </Link>
              </p>
              <p
                className={`text-sm font-bold py-3 pl-2 w-full font-sans border-onyx ${
                  location.pathname === "/teams" ? "text-white" : ""
                }`}
              >
                <Link to="/teams" >
                  Teams
                </Link>
              </p>
              <p
                className={`text-sm font-bold py-3 pl-2 w-full font-sans border-onyx ${
                  location.pathname === "/mvp" ? "text-white" : ""
                }`}
              >
                <Link to="/mvp" >
                  MVP
                </Link>
              </p>
              <p
                className={`text-sm font-bold py-3 pl-2 w-full font-sans border-onyx ${
                  location.pathname === "/milestones" ? "text-white" : ""
                }`}
              >
                <Link to="/milestones" >
                  Milestones
                </Link>
              </p>
              <p
                className={`text-sm font-bold py-3 pl-2 w-full font-sans border-onyx ${
                  location.pathname === "/compare" ? "text-white" : ""
                }`}
              >
                <Link to="/compare" >
                  Compare
                </Link>
              </p>
              {/* {session ? (
                <p
                  className={`text-sm font-bold py-3 pl-2 w-full font-sans border-onyx ${
                    location.pathname === "/stats" ? "text-white" : ""
                  }`}
                >
                  <Link to="/stats">
                    Add Stats
                  </Link>
                </p>
              ) : (
                <></>
              )}
              {session ? (
                <p
                  className={`text-sm font-bold py-3 pl-2 w-full font-sans border-onyx ${
                    location.pathname === "/articles" ? "text-white" : ""
                  }`}
                >
                  <Link to="/articles" >
                    Articles
                  </Link>
                </p>
              ) : (
                <></>
              )}
              {session ? (
                <p
                  className={`text-sm font-bold py-3 pl-2 w-full font-sans border-onyx ${
                    location.pathname === "/pictures" ? "text-white" : ""
                  }`}
                >
                  <Link to="/pictures">
                    Images
                  </Link>
                </p>
              ) : (
                <></>
              )} */}
              {session ? (
                <p
                  className={`text-sm font-bold py-3 pl-2 w-full font-sans border-onyx ${
                    location.pathname === "/admin" ? "text-white" : ""
                  }`}
                >
                  <Link to="/games">
                    Admin
                  </Link>
                </p>
              ) : (
                <></>
              )}
            </div>
            <div className="lg:hidden flex items-center ml-auto mr-4">
              {" "}
              {/* Modified class from "mr-auto" to "ml-auto" */}
              <div>
                {" "}
                {/* Hidden on small screens */}
                <BsPersonCircle
                  className="w-6 h-6"
                  onClick={() => setShowDropdown(!showDropdown)}
                />
              </div>
            </div>
          </div>
          <div
  className={`fixed inset-x-0 top-0 bg-black lg:hidden transition-transform duration-500 transform ${isOpen ? 'translate-y-0 mt-16' : '-translate-y-full'}`}
  style={{ zIndex: isOpen ? '-1' : '-1' }}
>

<Link to="/home" onClick={() => setIsOpen(false)}>
  <div className="flex items-center">
    {/* <AiOutlineHome /> */}
    <p
      className={`text-sm font-bold py-3 pl-1 pr-2 w-full border-b-[1px] font-sans border-onyx text-center ${
        location.pathname === "/home" ? "text-white" : ""
      }`}
      style={{ margin: 0 }}
    >
      Home
    </p>
  </div>
</Link>
            <Link to="/stat" onClick={() => setIsOpen(false)}>
            <p
              className={`text-sm font-bold py-3 pl-2 w-full border-b-[1px] font-sans border-onyx text-center ${
                location.pathname === "/stat" ? "text-white" : ""
              }`}
            >
              
                Stats
            </p>
              </Link>
              <Link to="/players" onClick={() => setIsOpen(false)}>
            <p
              className={`text-sm font-bold py-3 pl-2 w-full border-b-[1px] font-sans border-onyx text-center ${
                location.pathname === "/players" ? "text-white" : ""
              }`}
            >
                Players
            </p>
              </Link>
              <Link to="/teams" onClick={() => setIsOpen(false)}>
            <p
              className={`text-sm font-bold py-3 pl-2 w-full border-b-[1px] font-sans border-onyx text-center ${
                location.pathname === "/teams" ? "text-white" : ""
              }`}
            >
                Teams
            </p>
              </Link>
              <Link to="/mvp" onClick={() => setIsOpen(false)}>
            <p
              className={`text-sm font-bold py-3 pl-2 w-full border-b-[1px] font-sans border-onyx text-center ${
                location.pathname === "/mvp" ? "text-white" : ""
              }`}
            >
                MVP
            </p>
              </Link>
              <Link to="/milestones" onClick={() => setIsOpen(false)}>
            <p
              className={`text-sm font-bold py-3 pl-2 w-full border-b-[1px] font-sans border-onyx text-center ${
                location.pathname === "/milestones" ? "text-white" : ""
              }`}
            >
                Milestones
            </p>
              </Link>
              <Link to="/compare" onClick={() => setIsOpen(false)}>
            <p
              className={`text-sm font-bold py-3 pl-2 w-full border-b-[1px] font-sans border-onyx text-center ${
                location.pathname === "/compare" ? "text-white" : ""
              }`}
            >
                Compare
            </p>
              </Link>
            {/* {session ? (
                <Link to="/stats" onClick={() => setIsOpen(false)}>
              <p
                className={`text-sm font-bold py-3 pl-2 w-full border-b-[1px] font-sans border-onyx text-center ${
                  location.pathname === "/stats" ? "text-white" : ""
                }`}
              >
                  Add Stats
              </p>
                </Link>
            ) : (
              <></>
            )}
            {session ? (
                <Link to="/articles" onClick={() => setIsOpen(false)}>
              <p
                className={`text-sm font-bold py-3 pl-2 w-full border-b-[1px] font-sans border-onyx text-center ${
                  location.pathname === "/articles" ? "text-white" : ""
                }`}
              >
                  Articles
              </p>
                </Link>
            ) : (
              <></>
            )}
            {session ? (
                <Link to="/pictures" onClick={() => setIsOpen(false)}>
              <p
                className={`text-sm font-bold py-3 pl-2 w-full border-b-[1px] font-sans border-onyx text-center ${
                  location.pathname === "/pictures" ? "text-white" : ""
                }`}
              >
                  Images
              </p>
                </Link>
            ) : (
              <></>
            )} */}
            {session ? (
                <Link to="/admin" onClick={() => setIsOpen(false)}>
              <p
                className={`text-sm font-bold py-3 pl-2 w-full border-b-[1px] font-sans border-onyx text-center ${
                  location.pathname === "/games" ? "text-white" : ""
                }`}
              >
                  Admin
              </p>
                </Link>
            ) : (
              <></>
            )}
          </div>
          <div className="hidden lg:flex items-center ml-auto mr-4">
            {" "}
            {/* Modified class from "mr-auto" to "ml-auto" */}
            <div>
              {" "}
              {/* Hidden on small screens */}
              <BsPersonCircle
                className="w-6 h-6"
                onClick={() => setShowDropdown(!showDropdown)}
              />
            </div>
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
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 transition-opacity opacity-100">
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
