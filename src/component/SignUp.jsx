import { Link, useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import "./SignIn.css";
import { useState } from "react";
import YoutubeIcon from "../assets/Youtube_Icon.png";

function SignUp() {
  const navigate = useNavigate();
  const [user_details, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [msg, set_msg] = useState("");
  const [err_msg, set_err_msg] = useState("");
  const [loading, setLoading] = useState(false);

  function handleInputChange(e) {
    setUserDetails({ ...user_details, [e.target.name]: e.target.value });
    set_err_msg("");
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!user_details.name || !user_details.email || !user_details.password) {
      set_err_msg("All fields are required!");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user_details.email)) {
      set_err_msg("Invalid email format!");
      return;
    }

    if (user_details.password.length < 6) {
      set_err_msg("Password must be at least 6 characters long!");
      return;
    }

    setLoading(true);

    fetch("https://youtube-project-py16.onrender.com/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: user_details.name,
        userEmail: user_details.email,
        userPassword: user_details.password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => {
            throw new Error(data.Message || "Registration failed");
          });
        }
        return response.json();
      })
      .then(() => {
        set_msg("Registration Successful");
        set_err_msg("");
        setTimeout(() => navigate("/SignIn"), 1000);
        setUserDetails({ name: "", email: "", password: "" });
      })
      .catch((error) => {
        set_err_msg(error.message || "Something went wrong");
        set_msg("");
      })
      .finally(() => setLoading(false));
  }

  return (
    <div id="outer-div" className="flex h-[80vh] w-[85%] mx-auto my-5 mt-[4rem] justify-center items-center text-white flex-col">
      <div id="inner-div" className="bg-[#212121] w-[60%] rounded-[0.8rem] flex flex-col items-center">
        <div className="flex items-center">
          <img src={YoutubeIcon} width="60px" height="100px" alt="YouTube Logo" />
          <h1 className="font-bold">YouTube Sign Up</h1>
          <Link to="/">
            <span className="mx-5 text-[#ff0000]">
              <HomeIcon />
            </span>
          </Link>
        </div>
        <form onSubmit={handleSubmit} className="w-[100%] flex flex-col items-center">
          {err_msg && <div className="text-[#ff0000]">{err_msg}</div>}
          {msg && <div className="text-green-600">{msg}</div>}

          <div className="my-4 input-box w-[60%]">
            <input
              className="placeholder-[#212121] font-bold border-[#ff000000] text-black outline-none focus:outline-1 focus:outline-[#ff0000] w-[100%] py-[0.4rem] px-4"
              type="text"
              value={user_details.name}
              name="name"
              placeholder="Enter Name"
              onChange={handleInputChange}
            />
          </div>
          <div className="my-4 input-box w-[60%]">
            <input
              className="placeholder-[#212121] font-bold border-[#ff000000] text-black outline-none focus:outline-1 focus:outline-[#ff0000] w-[100%] py-[0.4rem] px-4"
              type="email"
              value={user_details.email}
              name="email"
              placeholder="Enter Email"
              onChange={handleInputChange}
            />
          </div>
          <div className="my-4 input-box w-[60%]">
            <input
              className="placeholder-[#212121] font-bold border-[#ff000000] text-black outline-none focus:outline-1 focus:outline-[#ff0000] w-[100%] py-[0.4rem] px-4"
              type="password"
              value={user_details.password}
              name="password"
              placeholder="Enter Password"
              onChange={handleInputChange}
            />
          </div>
          <div className="my-4 input-box w-[60%] bg-[#ff0000] text-center">
            <button
              className="w-[100%] py-[0.4rem] hover:font-bold px-4 hover:bg-[#ef3333]"
              type="submit"
              disabled={loading}
            >
              {loading ? "Processing..." : "Submit"}
            </button>
          </div>
        </form>
        <div id="text" className="mb-8">
          <span>Already have an account?</span>{" "}
          <Link to="/SignIn">
            <button className="hover:text-[#ef3333] hover:underline text-[#ff0000] font-bold">
              Sign In / Log In here
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
