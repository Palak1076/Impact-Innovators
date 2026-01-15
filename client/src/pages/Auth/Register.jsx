import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const { register, googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    dob: ""
  });

  const [passwordStrength, setPasswordStrength] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [resendTimer, setResendTimer] = useState(30);

  /* ---------------- Password Strength ---------------- */
  const getPasswordStrength = (password) => {
    if (password.length < 6) return "Weak";
    if (
      /[A-Z]/.test(password) &&
      /\d/.test(password) &&
      /[^A-Za-z0-9]/.test(password)
    )
      return "Strong";
    return "Medium";
  };

  /* ---------------- Resend OTP Timer ---------------- */
  useEffect(() => {
    if (otpSent && resendTimer > 0) {
      const timer = setTimeout(() => {
        setResendTimer((t) => t - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [otpSent, resendTimer]);

  /* ---------------- Input Handler ---------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "password") {
      setPasswordStrength(getPasswordStrength(value));
    }
  };

  /* ---------------- Submit (Send OTP) ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordStrength === "Weak") {
      alert("Password is too weak");
      return;
    }

    try {
      await register({ ...formData, sendOtp: true });
      setOtpSent(true);
      setResendTimer(30);
    } catch (err) {
      alert("Failed to send OTP");
    }
  };

  /* ---------------- Verify OTP ---------------- */
  const verifyOtp = async () => {
    try {
      await register({
        ...formData,
        otp,
        verifyOtp: true
      });
      navigate("/dashboard");
    } catch (err) {
      alert("Invalid OTP");
    }
  };

  /* ---------------- Resend OTP ---------------- */
  const resendOtp = async () => {
    try {
      await register({ email: formData.email, resendOtp: true });
      setResendTimer(30);
      alert("OTP resent successfully");
    } catch (err) {
      alert("Failed to resend OTP");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-96"
      >
        <h1 className="text-2xl font-semibold text-center mb-4">
          {otpSent ? "Verify OTP" : "Register"}
        </h1>

        {/* ---------------- REGISTER FORM ---------------- */}
        {!otpSent && (
          <>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              className="border p-2 w-full mb-3 rounded"
              required
            />

            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              className="border p-2 w-full mb-3 rounded"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className="border p-2 w-full mb-3 rounded"
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="border p-2 w-full mb-1 rounded"
              required
            />

            {passwordStrength && (
              <p
                className={`text-sm mb-3 ${
                  passwordStrength === "Weak"
                    ? "text-red-500"
                    : passwordStrength === "Medium"
                    ? "text-yellow-500"
                    : "text-green-600"
                }`}
              >
                Password Strength: {passwordStrength}
              </p>
            )}

            <input
              type="date"
              name="dob"
              onChange={handleChange}
              className="border p-2 w-full mb-4 rounded"
              required
            />

            <button
              type="submit"
              className="bg-purple-600 text-white p-2 w-full rounded hover:bg-purple-700"
            >
              Register & Send OTP
            </button>

            <button
              type="button"
              onClick={googleSignIn}
              className="mt-3 border p-2 w-full rounded flex items-center justify-center gap-2 hover:bg-gray-100"
            >
              <img
                src="https://developers.google.com/identity/images/g-logo.png"
                alt="Google"
                className="w-5 h-5"
              />
              Sign up with Google
            </button>

            <p className="text-sm text-center mt-4">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-purple-600 font-medium hover:underline"
              >
                Login
              </Link>
            </p>
          </>
        )}

        {/* ---------------- OTP VERIFICATION ---------------- */}
        {otpSent && (
          <>
            <input
              type="text"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="border p-2 w-full mb-4 rounded"
            />

            <button
              type="button"
              onClick={verifyOtp}
              className="bg-green-600 text-white p-2 w-full rounded hover:bg-green-700"
            >
              Verify OTP
            </button>

            <div className="text-center mt-3 text-sm">
              {resendTimer > 0 ? (
                <p className="text-gray-500">
                  Resend OTP in {resendTimer}s
                </p>
              ) : (
                <button
                  type="button"
                  onClick={resendOtp}
                  className="text-purple-600 font-medium hover:underline"
                >
                  Resend OTP
                </button>
              )}
            </div>
          </>
        )}
      </form>
    </div>
  );
}

export default Register;
