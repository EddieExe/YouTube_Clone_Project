import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CircleIcon from '@mui/icons-material/Circle';
import './SuggestedVideo.css';

function SuggestedVideo() {
    const [videoDetails, setVideoDetails] = useState([]);
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
        } catch (error) {
            setError("Error loading videos");
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            {loading && <p className="text-white text-center">Loading...</p>}
            {error && <p className="text-red-500 text-center">{error}</p>}
            {
                videoDetails.map((data) => (
                    <div key={data._id} id='suggested-video-id' className="text-white grid border-b border-[#2322224c] p-2">
                        <Link to={`/viewing_video/${data._id}`}>
                            <div id='bottom-margin' className="mb-4">
                                <img 
                                    id='suggested-img' 
                                    src={data.imageIcon} 
                                    alt="Video Thumbnail" 
                                    className="rounded-lg w-full h-auto object-cover"
                                />
                            </div>
                        </Link>
                        <div className="text-sm">
                            <h1 className="font-bold text-[0.8rem]">{data.description}</h1>
                            <h1 className="mt-2 text-[#d6d1d1] font-medium">{data.owner}</h1>
                            <h1 className="mt-1 text-[#d6d1d1] font-light text-[0.7rem]">
                                <span className="mr-2">{data.views}</span>  
                                <CircleIcon sx={{ fontSize: '0.4rem' }} />  
                                <span className="ml-2">{data.time}</span>
                            </h1>
                        </div>
                    </div>
                ))
            }
        </>
    );
}

export default SuggestedVideo;
