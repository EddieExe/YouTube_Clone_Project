// Import necessary modules from React and React Router
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Import global styles
import './index.css';

// Import main application component
import App from './App.jsx';

// Import components for routing
import Error from './component/Error.jsx';
import Sidebar from './component/SideBar.jsx';
import VideoCard from './component/VideoCard.jsx';
import ViewVideo from './component/ViewVideo.jsx';
import SignIn from './component/SignIn.jsx';
import SignUp from './component/SignUp.jsx';
import ChannelDetails from './component/ChannelDetails.jsx';

// Define the application routes
const appRouter = createBrowserRouter([
  {
    path: '/', // Root path
    element: <App />, // Main application component
    children: [
      {
        index: true, // Default child component for '/'
        element: (
          <>
            <Sidebar /> {/* Sidebar navigation */}
            <VideoCard /> {/* Video card component */}
          </>
        ),
      },
      {
        path: '/channelDetails', // Route for channel details
        element: <ChannelDetails />,
      },
      {
        path: '/viewing_video/:id', // Dynamic route for viewing videos
        element: <ViewVideo />,
      },
    ],
  },
  {
    path: '/SignIn', // Route for sign-in page
    element: <SignIn />,
  },
  {
    path: '/SignUp', // Route for sign-up page
    element: <SignUp />,
  },
  {
    path: '*', // Fallback route for unknown paths (404)
    element: <Error />,
  },
]);

// Render the application into the root element
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={appRouter} /> {/* Provides routing functionality */}
  </StrictMode>
);