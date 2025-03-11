import { useState, useEffect } from "react";
import { dataInfo } from "../utils/dummyData";
import { genres } from "../utils/genrecollection";

function CategoryWiseFilter({ SetDetails }) {
    // State to store fetched video details
    const [videoDetails, setVideoDetails] = useState([]);

    // Fetch data from the API when the component mounts
    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        try {
            const response = await fetch("https://youtube-project-py16.onrender.com/");
            const data = await response.json();
            setVideoDetails(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    // Handles filtering videos based on genre selection
    function handleClick(event) {
        const selectedGenre = event.target.innerText.toLowerCase();
        console.log("Selected Genre:", selectedGenre);

        // If "All" is selected, show all videos
        if (selectedGenre === "all") {
            SetDetails(videoDetails);
            return;
        }

        // Filter videos based on selected genre
        const filteredVideos = videoDetails.filter(video => 
            video.genre.toLowerCase() === selectedGenre
        );

        // Update state only if there are matching videos
        if (filteredVideos.length > 0) {
            SetDetails(filteredVideos);
        }
    }

    return (
        <>
            {genres.map((genre, index) => (
                <button
                    key={index}
                    onClick={handleClick}
                    className="text-white py-1 px-5 text-[0.9rem] font-semibold hover:bg-[#464644] rounded-md mr-3 bg-[#212121]"
                >
                    {genre}
                </button>
            ))}
        </>
    );
}

export default CategoryWiseFilter;