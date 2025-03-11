import { Link, useOutletContext } from 'react-router-dom';
import {
    Home as HomeIcon,
    VideoCameraFront as VideoCameraFrontIcon,
    Subscriptions as SubscriptionsIcon,
    AccessibilityNew as AccessibilityNewIcon,
    History as HistoryIcon,
    TrendingUp as TrendingUpIcon,
    ShoppingBag as ShoppingBagIcon,
    LibraryMusic as LibraryMusicIcon,
    Movie as MovieIcon,
    Stream as StreamIcon,
    SportsEsports as SportsEsportsIcon,
    Newspaper as NewspaperIcon,
    Sports as SportsIcon,
    Podcasts as PodcastsIcon,
    GolfCourse as GolfCourseIcon,
    Checkroom as CheckroomIcon
} from '@mui/icons-material';

import './SideBar.css';

const mainMenu = [
    { name: "Home", icon: <HomeIcon />, path: "/" },
    { name: "Shorts", icon: <VideoCameraFrontIcon />, path: "/" },
    { name: "Subscription", icon: <SubscriptionsIcon />, path: "/" },
];

const exploreMenu = [
    { name: "Trending", icon: <TrendingUpIcon /> },
    { name: "Shopping", icon: <ShoppingBagIcon /> },
    { name: "Fashion", icon: <CheckroomIcon /> },
    { name: "Music", icon: <LibraryMusicIcon /> },
    { name: "Movies", icon: <MovieIcon /> },
    { name: "Live Stream", icon: <StreamIcon /> },
    { name: "Gaming", icon: <SportsEsportsIcon /> },
    { name: "News", icon: <NewspaperIcon /> },
    { name: "Sports", icon: <SportsIcon /> },
    { name: "Podcast", icon: <PodcastsIcon /> },
    { name: "Courses", icon: <GolfCourseIcon /> },
];

function Sidebar() {
    const { flag } = useOutletContext(); // Access props passed via context

    return (
        <div className={flag ? 'side-bar w-[5%] fixed left-0 mt-[4rem] flex flex-col' : 'sideBar-description w-[15%] fixed text-white bg-[#0f0f0f] left-0 mt-[4rem] overflow-y-scroll h-[85vh]'}>
            {flag ? (
                mainMenu.map((item, index) => (
                    <Link key={index} to={item.path}>
                        <div className='hover:bg-[#212121] hover:rounded-md flex flex-col justify-center items-center p-3 mb-4 text-white text-sm hover:cursor-pointer'>
                            {item.icon}
                            <span className='text-[0.7rem]'>{item.name}</span>
                        </div>
                    </Link>
                ))
            ) : (
                <>
                    <div className="sidebar-1 border-b border-[#212121] mb-2">
                        {mainMenu.map((item, index) => (
                            <Link key={index} to={item.path}>
                                <div className='p-3 cursor-pointer hover:bg-[#212121] flex items-center'>
                                    {item.icon}
                                    <span className='pl-3'>{item.name}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                    <div className="sidebar-3 p-3 border-b border-[#212121] mb-2">
                        <h1 className='pl-3'>Explore</h1>
                        {exploreMenu.map((item, index) => (
                            <div key={index} className='p-3 cursor-pointer hover:bg-[#212121] flex items-center'>
                                {item.icon}
                                <span className='pl-3'>{item.name}</span>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default Sidebar;