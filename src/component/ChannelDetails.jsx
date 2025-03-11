import { useOutletContext } from "react-router-dom";
import Sidebar from "./SideBar";
import './ChannelDetails.css';

function ChannelDetails() {
    // Getting context values from the parent component
    const { flag, titleName } = useOutletContext();

    // Retrieving user details from local storage
    const Name_user = localStorage.getItem('Name');
    const Email_user = localStorage.getItem('Email');

    return (
        <>
            {/* Display Sidebar only if flag is false */}
            {!flag && <Sidebar />}

            {/* Main Channel Details Container */}
            <div id="upper-container" className="bg-[#0f0f0f] text-white relative top-20 w-[90%] left-12 mx-auto">
                <div className="w-[80%] mx-auto border-b border-white pb-3 flex gap-4">
                    
                    {/* Profile Picture Section */}
                    <div>
                        <h2 
                            id="header-channel" 
                            className="font-bold bg-[#ff0000] w-[10rem] h-[10rem] flex items-center justify-center rounded-full text-9xl"
                        >
                            {Name_user.charAt(0).toUpperCase()} {/* First letter of the name */}
                        </h2>
                    </div>

                    {/* User Information Section */}
                    <div id="header-second">
                        <h2 id="name-second" className="text-3xl">
                            {Name_user.charAt(0).toUpperCase() + Name_user.slice(1)} {/* Capitalized Full Name */}
                        </h2>
                        <h3>{Email_user}</h3>

                        {/* Action Buttons */}
                        <div className="mt-5 flex">
                            <button className="px-4 bg-[#212121] mr-4 rounded-[1rem] hover:bg-[#6a6767] py-2">
                                Customize Channel
                            </button>
                            <button className="px-4 bg-[#212121] rounded-[1rem] hover:bg-[#6a6767] py-2">
                                Manage Videos
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}

export default ChannelDetails;