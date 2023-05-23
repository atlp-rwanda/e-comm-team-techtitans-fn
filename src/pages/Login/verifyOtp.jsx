import { useState } from "react";
import { useDispatch } from "react-redux";
import { verify } from "../../Redux/Features/Login.slice";
import { useNavigate } from "react-router-dom";

function OTPForm() {
  const navigate = useNavigate();
  const [otp, setOTP] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const dispatch = useDispatch();
  const email = localStorage.getItem("email");
  // const status = useSelector(state => state.user.status);
  // const error = useSelector(state => state.user.Error);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(verify({ email, otp }))
      .then((response) => {
        console.log("Login response:", response);
        if (response && response.payload.message === "Login successful") {
          setIsVerified(true);
          navigate("/dashboard");
        } else {
          setIsVerified(false);
        }
      })
      .catch((error) => console.log("Login error:", error));
  };

  return (
    <div>
      <div className="mt-1 decoration-0 p-8">
        {!isVerified && (
          <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto">
            <div className="mb-6">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="otp"
              >
                Enter OTP
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="otp"
                type="text"
                placeholder="Enter your OTP"
                value={otp}
                onChange={(event) => setOTP(event.target.value)}
              />
            </div>
            <div className="flex items-center justify-center">
              <button
                className="bg-titans hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Verify OTP
              </button>
            </div>
          </form>
        )}

        {/*{isVerified && <ProductHome/>}*/}
      </div>
    </div>
  );
}

export default OTPForm;
