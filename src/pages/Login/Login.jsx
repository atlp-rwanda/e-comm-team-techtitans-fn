import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../Redux/Features/Login.slice";
// import OTPForm from "./OTPForm";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();
  const status = useSelector((state) => state.user.status);
  const error = useSelector((state) => state.user.Error);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(login({ email, password }))
      .then((response) => {
        console.log("Login response:", response);

        if (response && response.payload.message === "Please enter your OTP") {
          setIsLoggedIn(true);
          navigate("/OTPForm");
        } else {
          setIsLoggedIn(false);
        }
      })
      .catch((error) => console.log("Login error:", error));
  };

  return (
    <div>
      {status === "loading....." && (
        <div className="bg-white text-black p-2 font-extrabold ">
          Loading...
        </div>
      )}
      {status === "failed" && (
        <div className="bg-red-500 text-tatans p-2 font-extrabold  py-2 px-4  focus:outline-none focus:shadow-outline w-fit">
          {error}
        </div>
      )}

      <div className="mt-1 decoration-0 p-8">
        {!isLoggedIn && (
          <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto">
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="text"
                placeholder="Enter your email"
                value={email}
                required={true}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                required={true}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div className="flex items-center justify-center">
              <button
                className="bg-blue-500 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Log In
              </button>
            </div>
          </form>
        )}

        {/*{isLoggedIn && <OTPForm />}*/}
      </div>
    </div>
  );
}

export default LoginForm;
