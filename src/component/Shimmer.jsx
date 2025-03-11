import { useOutletContext } from "react-router-dom";
import './Shimmer.css';

function Shimmer() {
    // Creating an array of 20 elements filled with 0 to generate shimmer placeholders
    let arr = new Array(20).fill(0);
    
    console.log(arr);

    // Getting values from the Outlet context (passed via parent component)
    const { flag, titleName } = useOutletContext();

    return (
        <>
            {/* Dynamically setting grid layout based on 'flag' value */}
            <div id={`${flag ? 'grid' : 'grid-width'}`}>
                {arr.map((data, index) => {
                    return (
                        <div 
                            key={index} 
                            className="animation w-[100%] h-[200px] rounded-lg bg-[#212121] border border-black"
                        >
                        </div>
                    );
                })}
            </div>
        </>
    );
}

export default Shimmer;