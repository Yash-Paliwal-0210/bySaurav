import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../Firebase/Config";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";

const Resetpassword = () => {
  const [reset, setReset] = useState({
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const navigateTo = useNavigate();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      // Handle redirection if needed
    }
  }, [isLoggedIn]);

  const handleReset = (e) => {
    e.preventDefault();
    setLoading(true);
    sendPasswordResetEmail(auth, reset.email, {
      url: "http://localhost:5174/" // Replace with your actual reset URL
    })
      .then(() => {
        toast.success("Password reset link sent successfully");
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error.message);
        setLoading(false);
      });
  };

  return (
    <>
    <Navbar/>
      <ToastContainer />
      <section className="">
        <div className="flex justify-center items-center min-h-[87vh] px-4">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg">
            <div className="p-6 md:p-8">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 text-center">
                Reset Password
              </h1>
              <form className="mt-6 space-y-4" onSubmit={handleReset}>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                    Your email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="mt-1 block w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="name@company.com"
                    value={reset.email}
                    onChange={(e) => setReset({ ...reset, email: e.target.value })}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  {loading ? "Sending..." : "Reset Password"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Resetpassword;
