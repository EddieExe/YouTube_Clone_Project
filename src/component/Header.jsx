import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

// Import Material UI Icons
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount';
import GoogleIcon from '@mui/icons-material/Google';
import InventoryIcon from '@mui/icons-material/Inventory';

// Import Assets
import YoutubeIcon from '../assets/Youtube_Icon.png';

// Import Styles
import './Header.css';

function Header() {
   const navigate = useNavigate();
   const [dropdownVisible, setDropdownVisible] = useState(false); 
   const [flag, setFlag] = useState(true);
   const [titleName, setTitleName] = useState('');
   
   const token = localStorage.getItem('token');
   const Name_user = localStorage.getItem('Name');
   const Email_user = localStorage.getItem('Email');

   // Toggle Dropdown Menu Visibility
   function handleDropdownToggle() {
      setDropdownVisible(!dropdownVisible);
   }

   // Handle Logout Functionality
   function handleLogout() {
      localStorage.removeItem('token');
      localStorage.removeItem('Name');  
      alert('Logged out Successfully'); 
      setDropdownVisible(false);  
      navigate('/');      
   }

   // Handle Search Input Change
   function handleChange(e) {
      setTitleName(e.target.value);
   }

   // Toggle Sidebar Menu
   function handleMenuClick() {
      setFlag(!flag);
   }

   return (
      <>
         {/* Header Section */}
         <div className="header-sec fixed top-0 w-full z-40 bg-[#0F0F0F] flex justify-between p-2 text-white">
            {/* Left Section - Logo & Menu */}
            <div className="sec-1 flex items-center">
               <button onClick={handleMenuClick} className='p-2 hover:rounded-full hover:bg-[#212121]'>
                  <MenuIcon />
               </button>
               <div id='img-container' className='flex items-center ml-3'>
                  <img src={YoutubeIcon} id='img-id' alt='YouTube Logo' width='30px' height='28px' />
                  <h2 id='youtube-head' className='font-[500] text-[1.5rem] pl-1'>YouTube</h2>
               </div>
            </div>
            
            {/* Middle Section - Search Bar */}
            <div className="sec-2 border border-[#646060] h-[3rem] w-[45%] rounded-[2rem]">
               <div className='w-full h-full flex justify-between'>
                  <input 
                     type="text" 
                     onChange={handleChange} 
                     id="input-id" 
                     placeholder='Search' 
                     className='bg-[#0f0f0f] w-[89.7%] h-full rounded-l-[2rem] pl-7 outline-none focus:outline-[#497dd8f1]'
                  />
                  <button id='search-btn' className='w-[10%] h-full bg-[#212121] rounded-r-[2rem] hover:bg-[#30302f]'>
                     <SearchIcon />
                  </button>
               </div>
            </div>
            
            {/* Right Section - User Profile & Dropdown */}
            {token ? (
               <div className="sec-3 mr-2 flex items-center">
                  <MoreVertIcon id='dot-icon-first' />
                  <button 
                     onClick={handleDropdownToggle} 
                     className='border flex justify-center items-center font-bold border-[#959593b1] rounded-full bg-[#fff] px-2 hover:bg-[#212121] hover:border-[#fff]'>
                     <span className='text-2xl font-bold text-[#ff0000]'>{Name_user.charAt(0).toUpperCase()}</span>
                  </button>
                  
                  {/* Dropdown Menu */}
                  {dropdownVisible && (
                     <div id='drop-down' className="dropdown-menu absolute w-[24%] top-[53px] right-3 bg-[rgb(33,33,33)] p-2 rounded-lg shadow-lg">
                        <div className='flex gap-4'>
                           <button className='flex justify-center items-center font-bold hover:bg-[#212121]'>
                              <span className='text-2xl font-bold text-[#ff0000]'>{Name_user.charAt(0).toUpperCase()}</span>
                           </button> 
                           <div>
                              <h1>{Name_user.charAt(0).toUpperCase() + Name_user.slice(1)}</h1>
                              <h1>{Email_user}</h1>
                              <Link to='/channelDetails'>
                                 <h1 className='text-[#3d3aee] hover:text-[#ff0000] cursor-pointer font-medium'>View Your Channel</h1>
                              </Link>
                           </div>
                        </div>
                        
                        {/* Dropdown Options */}
                        <div className='flex gap-2 items-center border-t-2 mt-3 pt-3'>
                           <GoogleIcon/>
                           <button className="text-white p-1 w-full text-left hover:text-[#ff0000]">Google Account</button>
                        </div>
                        <div className='flex gap-2 items-center border-t-2 mt-3 pt-3'>
                           <InventoryIcon/>
                           <button className="text-white p-1 w-full text-left hover:text-[#ff0000]">Purchases and Membership</button>
                        </div>
                        <div className='flex gap-2 items-center border-t-2 mt-3 pt-3'>
                           <SwitchAccountIcon/>
                           <button className="text-white p-1 w-full text-left hover:text-[#ff0000]">Switch Account</button>
                        </div>
                        <div className='flex gap-2 items-center border-t-2 mt-3 pt-3'>
                           <LogoutIcon/>
                           <button onClick={handleLogout} className="text-white p-1 w-full text-left hover:text-[#ff0000]">Logout</button>
                        </div>
                     </div>
                  )}
               </div>
            ) : (
               <Link to='/SignIn'>
                  <div className="sec-3 mr-5">
                     <MoreVertIcon id='dot-icon'/>
                     <button id='sec3-button' className='border border-[#959593b1] rounded-full p-2 px-4 hover:bg-[#212121]'>
                        <PersonIcon className='border border-red-100 rounded-full text-[#fff]'/> 
                        <span id='signin-text'>Sign In</span>
                     </button>
                  </div>
               </Link>
            )}
         </div>
         
         {/* Outlet for Nested Routes */}
         <div className='flex'>
            <Outlet context={{ flag, titleName }} />
         </div>
      </>
   );
}

export default Header;