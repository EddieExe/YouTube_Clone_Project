import './ShowCard.css';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from 'react-router-dom';
import CircleIcon from '@mui/icons-material/Circle';

/**
 * ShowCard Component
 * Displays video details inside a card format, including thumbnail, description, owner, views, and time.
 * 
 * @param {Object} props - Contains video details such as image, description, owner, views, and time.
 */
function ShowCard(props) {
    return (
        <>
            {/* Link to the detailed video viewing page using the video ID */}
            <Link to={`/viewing_video/${props.video._id}`}>
                <div className="item text-white">
                    
                    {/* Video Thumbnail */}
                    <img 
                        src={props.video.imageIcon} 
                        alt="Video Thumbnail" 
                        id="img-size" 
                        className="rounded-[8px]" 
                    />
                    
                    {/* Video Details Section */}
                    <div className="flex gap-2 mt-3">
                        
                        {/* User Icon */}
                        <div>
                            <PersonIcon className="border border-red-100 rounded-full" />
                        </div>
                        
                        {/* Video Information */}
                        <div className="text-[0.8rem]">
                            {/* Video Description */}
                            <h2 className="font-bold">{props.video.description}</h2>
                            
                            {/* Video Owner Name */}
                            <h2 className="font-light text-[#8a8888] mt-1">{props.video.owner}</h2>
                            
                            {/* Views and Upload Time */}
                            <div className="flex gap-3 text-[#928e8e]">
                                <span>{props.video.views}</span>
                                
                                {/* Small separator dot */}
                                <span className="ml-[2px] mr-[-8px]">
                                    <CircleIcon sx={{ fontSize: '0.4rem' }} />
                                </span>
                                
                                <span>{props.video.time}</span>
                            </div>
                        </div>
                    </div>

                </div>
            </Link>
        </>
    );
}

export default ShowCard;