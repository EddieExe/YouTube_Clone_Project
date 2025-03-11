import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import ShowCard from "./ShowCard";
import CategoryWiseFilter from "./CategoryWiseFilter";
import Shimmer from './Shimmer.jsx';
import './VideoCard.css';

function VideoCard() {
    const { flag, titleName } = useOutletContext(); // Access props from context

    const [videoDetails, setVideoDetails] = useState([]);
    const [allVideos, setAllVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        try {
            let response = await fetch('https://youtube-project-py16.onrender.com/');
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            let data = await response.json();
            setVideoDetails(data);
            setAllVideos(data);
        } catch (error) {
            setError("Error loading videos");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const debounceTimeout = setTimeout(() => {
            if (titleName) {
                const filteredVideos = allVideos.filter((video) =>
                    video.description.toLowerCase().includes(titleName.toLowerCase())
                );
                setVideoDetails(filteredVideos);
            } else {
                setVideoDetails(allVideos);
            }
        }, 300); // Debounced for better performance

        return () => clearTimeout(debounceTimeout);
    }, [titleName, allVideos]);

    return (
        <>
            <div id='button-category' className="fixed p-6 top-[3rem] w-full bg-[#0f0f0f] z-20 left-[10.9rem] h-[4.5rem] text-white">
                <CategoryWiseFilter SetDetails={setVideoDetails} />
            </div>

            {loading ? <Shimmer /> : error ? <p className="text-red-500 text-center">{error}</p> : (
                <div className={`video-grid ${flag ? '' : 'wide'}`}>
                    {videoDetails.map((video) => (
                        <ShowCard key={video._id} video={video} />
                    ))}
                </div>
            )}
        </>
    );
}

export default VideoCard;
