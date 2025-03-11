import { Link, useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import './SignIn.css';
import { useState, useCallback } from 'react';
import YoutubeIcon from '../assets/Youtube_Icon.png';

function SignIn() {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({ email: '', password: '' });
  const [msg, setMsg] = useState('');
  const [errMsg, setErrMsg] = useState('');

  const handleChange = useCallback((e) => {
    setUserDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrMsg('');
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userDetails.email || !userDetails.password) {
      setErrMsg('All fields are required!');
      return;
    }

    try {
      const response = await fetch('https://youtube-project-py16.onrender.com/login', {
        method: "POST",
        headers: { 'Content-Type': "application/json" },
        body: JSON.stringify({
          userEmail: userDetails.email,
          userPassword: userDetails.password
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await response.json();
      localStorage.setItem('token', data.tokenNumber);
      localStorage.setItem('Name', data.user.Name);
      localStorage.setItem('Email', data.user.email);

      setMsg('Logged In Successfully');
      setErrMsg('');
      setTimeout(() => navigate('/'), 900);
    } catch (error) {
      setErrMsg(error.message);
      setMsg('');
    }
  };

  return (
    <div id='outer-div' className="flex h-[80vh] w-[85%] mx-auto my-5 mt-[4rem] justify-center items-center text-white flex-col">
      <div id='inner-div' className="bg-[#212121] w-[50%] rounded-lg flex flex-col items-center">
        <div className="flex mt-1 items-center">
          <img src={YoutubeIcon} width='60px' height='100px' alt="YouTube Logo" />
          <h1 className="font-bold">YouTube Login</h1>
          <Link to='/'>
            <span className="mx-5 text-[#ff0000]"><HomeIcon /></span>
          </Link>
        </div>
        <form onSubmit={handleSubmit} className="w-[100%] flex flex-col items-center">
          {errMsg && <div className="text-[#ff0000]">{errMsg}</div>}
          {msg && <div className="text-green-600">{msg}</div>}
          
          {/* Reusable Input Field */}
          <InputField
            type="email"
            name="email"
            placeholder="Enter Mail"
            value={userDetails.email}
            onChange={handleChange}
          />
          <InputField
            type="password"
            name="password"
            placeholder="Enter Password"
            value={userDetails.password}
            onChange={handleChange}
          />

          <button className="my-4 input-box w-[65%] bg-[#ff0000] text-center py-[0.4rem] hover:font-bold px-4 hover:bg-[#ef3333]">
            Submit
          </button>
        </form>
        <div id='text' className='mb-11'>
          <span>Don't have an account?</span> 
          <Link to='/SignUp'>
            <button className="hover:text-[#ef3333] hover:underline text-[#ff0000] font-bold">Sign Up here</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

// Reusable InputField Component
const InputField = ({ type, name, placeholder, value, onChange }) => (
  <div className="my-4 input-box w-[65%]">
    <input
      className="font-bold border-[#ff000000] text-black outline-none focus:outline-1 focus:outline-[#ff0000] w-[100%] py-[0.4rem] px-4 placeholder-[#212121] placeholder:font-semibold"
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  </div>
);

export default SignIn;
