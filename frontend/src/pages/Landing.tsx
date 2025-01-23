import { FormEvent, useState } from "react";
//import { Link } from "react-router-dom";
import { FaSearch, FaUserAlt } from "react-icons/fa";
import axios from "axios";
import { MdLogout } from "react-icons/md";

const Landing = () => {
  const [testCategories, setTestCategories] = useState();
  const [upcomingTests, setUpcomingTests] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [signupPanelOpen, setIsSignupPanelOpen] = useState(false);
  const [loginPanelOpen, setIsLoginPanelOpen] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [exam, setExam] = useState("");
  const [profile, setProfile] = useState({});

  const closePanel = () => {
    setIsSignupPanelOpen(false);
    setIsLoginPanelOpen(false);
  };

  const handleSignup = () => {
    setIsSignupPanelOpen(true);
  };

  const handleLogin = () => {
    setIsLoginPanelOpen(true);
  };

  const submitHandlerLogin = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/user/login`,
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      );
      if (response.status == 200) {
        const data = response.data.data;
        console.log(data);
        alert("User Logged In succesfully");
      }
      setIsLoginPanelOpen(false);
      setEmail("");
      setPassword("");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          alert("User not Found");
        } else if (error.response?.status === 404) {
          alert("Invalid password");
        }
      } else {
        console.error("Unexpected Error:", error);
      }
    }
  };

  const submitHandler = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/user/signup`,
        {
          name: name,
          email: email,
          password: password,
          role: role,
          exam: exam,
        },
        {
          withCredentials: true, //It is used to store cookies send from back end to authenticate user
        }
      );
      if (response.status == 200) {
        const data = response.data.data;
        console.log(data);
        setProfile(data);

        alert("User registered succesfully");
      }
      setIsSignupPanelOpen(false);
      setName("");
      setEmail("");
      setPassword("");
      setRole("");
      setExam("");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          alert("All Fields are required");
        } else if (error.response?.status === 404) {
          alert("User already exists");
        }
      } else {
        console.error("Unexpected Error:", error);
      }
    }
  };
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <header className="bg-gradient-to-r from-yellow-400 to-yellow-600 py-4">
        <div className="container mx-auto flex justify-between items-center px-6 md:px-12 bg-gray-800 shadow-xl p-6">
          <div className="flex items-center justify-between gap-6">
            <h1 className="text-4xl font-extrabold text-yellow-400 transform hover:scale-105 transition-all duration-300">
              CrackItHub
            </h1>
            <div className="text-lg transition duration-300 flex items-center">
              <div className="relative">
                {/* Button */}
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="hover:text-yellow-100 active:text-blue-500 px-4 py-2 rounded-lg transition-all duration-300"
                >
                  Test Categories
                </button>

                {/* Dropdown Panel */}
                <div
                  className={`absolute left-0 mt-2 w-40 bg-white border rounded-lg shadow-lg transition-all duration-300 ${
                    isOpen ? "block" : "hidden"
                  } group-hover:block`}
                >
                  <ul className="text-lg">
                    <li>
                      <button
                        className="w-full px-4 py-2 text-left text-gray-700 hover:bg-yellow-100 transition-all duration-300"
                        onClick={() => console.log("Medical selected")}
                      >
                        Medical
                      </button>
                    </li>
                    <li>
                      <button
                        className="w-full px-4 py-2 text-left text-gray-700 hover:bg-yellow-100 transition-all duration-300"
                        onClick={() => console.log("Engineering selected")}
                      >
                        Engineering
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
              <div>
                {profile ? (
                  <>
                    <button className="hover:text-yellow-100 ml-5 px-4 py-2 rounded-lg transition-all duration-300">
                      Create Test
                    </button>
                  </>
                ) : (
                  <>
                    <button className="hover:text-yellow-100 ml-5 px-4 py-2 rounded-lg transition-all duration-300">
                      Upcoming Tests
                    </button>
                  </>
                )}
              </div>

              <button className="hover:text-yellow-100 ml-5 px-4 py-2 rounded-lg transition-all duration-300">
                Features
              </button>
            </div>
            <div>
              <nav>
                <ul className="text-lg flex">
                  <li className="px-4">
                    <a
                      href="#blog"
                      className="text-white hover:text-blue-400 transition-all duration-300"
                    >
                      Blog
                    </a>
                  </li>
                  <li className="px-4">
                    <a
                      href="#contactUs"
                      className="text-white hover:text-blue-400 transition-all duration-300"
                    >
                      Contact Us
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>

          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Search for Test by name"
              className="px-4 py-2 w-72 rounded-full shadow-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 pr-10 transition-all duration-300"
            />
            <div>
              {profile ? (
                <>
                  <FaSearch className="absolute right-16 top-1/2 transform -translate-x-12 -translate-y-1/2 text-gray-500 text-2xl cursor-pointer hover:text-yellow-500 transition-all duration-300" />
                </>
              ) : (
                <>
                  <FaSearch className="absolute right-40 top-1/2 transform -translate-x-12 -translate-y-1/2 text-gray-500 text-2xl cursor-pointer hover:text-yellow-500 transition-all duration-300" />
                </>
              )}
            </div>

            <div>
              {profile ? (
                <>
                  {/* Profile Button */}
                  <button
                    className="bg-green-600 text-xl font-bold p-3 mx-2 rounded-full shadow-lg text-white hover:bg-green-700 transition-all duration-300"
                    //onClick={handleProfile}
                  >
                    <FaUserAlt />
                  </button>
                  {/* Logout Button */}
                  <button
                    className="bg-red-600 text-xl font-bold p-3 rounded-full shadow-lg text-white hover:bg-red-700 transition-all duration-300"
                    //onClick={handleLogout}
                  >
                    <MdLogout />
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="bg-blue-600 text-xl font-bold py-2 px-4 mx-2 rounded-xl shadow-lg text-white hover:bg-blue-700 transition-all duration-300"
                    onClick={handleSignup}
                  >
                    Signup
                  </button>
                  {signupPanelOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-150">
                      <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 py-5 px-8 rounded-lg shadow-lg w-full max-w-md">
                        <h1 className="text-4xl font-extrabold text-black transform hover:scale-105 transition-all duration-300 mb-5">
                          CrackItHub
                        </h1>
                        <div className="bg-white rounded-xl shadow-2xl p-6 w-full relative transform transition-all duration-300 ease-in-out scale-95 hover:scale-100 z-60">
                          <button
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
                            onClick={closePanel}
                          >
                            ✕
                          </button>
                          <form onSubmit={submitHandler}>
                            {/* Name Field */}
                            <div className="mb-4">
                              <label
                                htmlFor="name"
                                className="block text-lg font-medium text-gray-700"
                              >
                                Name
                              </label>
                              <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Enter your Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-black"
                                required
                              />
                            </div>

                            {/* Email Field */}
                            <div className="mb-4">
                              <label
                                htmlFor="email"
                                className="block text-lg font-medium text-gray-700"
                              >
                                Email
                              </label>
                              <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-black"
                                required
                              />
                            </div>

                            {/* Password Field */}
                            <div className="mb-4">
                              <label
                                htmlFor="password"
                                className="block text-lg font-medium text-gray-700"
                              >
                                Password
                              </label>
                              <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-black"
                                required
                              />
                            </div>

                            {/* Role Field */}
                            <div className="mb-4">
                              <label
                                htmlFor="role"
                                className="block text-lg font-medium text-gray-700"
                              >
                                Role
                              </label>
                              <select
                                id="role"
                                name="role"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500  text-black"
                                required
                              >
                                <option value="">Select Role</option>
                                <option value="student">Student</option>
                                <option value="admin">Admin</option>
                              </select>
                            </div>

                            {/* Exam Field */}
                            <div className="mb-4">
                              <label
                                htmlFor="exam"
                                className="block text-lg font-medium text-gray-700"
                              >
                                Exam
                              </label>
                              <select
                                id="exam"
                                name="exam"
                                value={exam}
                                onChange={(e) => setExam(e.target.value)}
                                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-black"
                                required
                              >
                                <option value="">Select Exam</option>
                                <option value="medical">Medical</option>
                                <option value="engineering">Engineering</option>
                              </select>
                            </div>

                            {/* Submit Button */}
                            <div className="mt-6">
                              <button
                                type="submit"
                                className="w-full px-4 py-2 bg-yellow-500 text-white font-semibold rounded-md hover:bg-yellow-400 transition duration-300"
                              >
                                Sign Up
                              </button>
                            </div>
                            <p className="text-center text-black">
                              Already have an account?
                              <button
                                className="text-blue-600 mb-7"
                                onClick={() => {
                                  closePanel(); // Close the panel
                                  setIsLoginPanelOpen(true); // Set signup panel to true
                                }}
                              >
                                Login
                              </button>
                            </p>
                          </form>
                        </div>
                      </div>
                    </div>
                  )}

                  <button
                    className="bg-blue-600 text-xl font-bold py-2 px-4 rounded-xl shadow-lg text-white hover:bg-blue-700 transition-all duration-300"
                    onClick={handleLogin}
                  >
                    Login
                  </button>
                  {loginPanelOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-150">
                      <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 p-8 rounded-lg shadow-lg w-full max-w-md">
                        <h1 className="text-4xl font-extrabold text-black transform hover:scale-105 transition-all duration-300 mb-5">
                          CrackItHub
                        </h1>
                        <div className="bg-white rounded-xl shadow-2xl p-6 w-full relative transform transition-all duration-300 ease-in-out scale-95 hover:scale-100 z-60">
                          <button
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
                            onClick={closePanel}
                          >
                            ✕
                          </button>
                          <form onSubmit={submitHandlerLogin}>
                            {/* Email Field */}
                            <div className="mb-4">
                              <label
                                htmlFor="email"
                                className="block text-lg font-medium text-gray-700"
                              >
                                Email
                              </label>
                              <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-black"
                                required
                              />
                            </div>

                            {/* Password Field */}
                            <div className="mb-4">
                              <label
                                htmlFor="password"
                                className="block text-lg font-medium text-gray-700"
                              >
                                Password
                              </label>
                              <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-black"
                                required
                              />
                            </div>

                            {/* Submit Button */}
                            <div className="mt-6">
                              <button
                                type="submit"
                                className="w-full px-4 py-2 bg-yellow-500 text-white font-semibold rounded-md hover:bg-yellow-400 transition duration-300"
                                onClick={submitHandlerLogin}
                              >
                                Log In
                              </button>
                            </div>
                            <p className="text-center text-black">
                              New Here?
                              <button
                                className="text-blue-600 mb-7"
                                onClick={() => {
                                  closePanel(); // Close the panel
                                  setIsSignupPanelOpen(true); // Set signup panel to true
                                }}
                              >
                                Create Account
                              </button>
                            </p>
                          </form>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 md:px-12 py-24">
        <section className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-extrabold text-yellow-500 mb-6">
            Your Gateway to JEE/NEET Success
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            CrackItHub provides a platform to help students and admins manage
            and excel in JEE/NEET preparation with ease.
          </p>
        </section>

        <section id="features" className="py-12">
          <h3 className="text-3xl font-bold text-white mb-12 text-center">
            Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-gray-800 p-8 rounded-lg">
              <h4 className="text-2xl font-semibold text-yellow-500 mb-4">
                For Students
              </h4>
              <ul className="text-gray-300 space-y-2">
                <li>Realistic test environment for JEE/NEET.</li>
                <li>Detailed performance analysis to improve scores.</li>
                <li>Access to test history and upcoming schedules.</li>
              </ul>
            </div>
            <div className="bg-gray-800 p-8 rounded-lg">
              <h4 className="text-2xl font-semibold text-yellow-500 mb-4">
                For Teachers
              </h4>
              <ul className="text-gray-300 space-y-2">
                <li>Manage tests and schedules seamlessly.</li>
                <li>Track student performance in real time.</li>
                <li>Customizable test interface and settings.</li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 py-6">
        <div className="container mx-auto text-center text-gray-500">
          <p>© {new Date().getFullYear()} CrackItHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
