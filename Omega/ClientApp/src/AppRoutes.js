import FullComponent from "./components/Calendar/FullComponent";
import Dashboard from "./components/Spotify/Dashboard";
import Login from "./components/Spotify/Login";
import Dictaphone from "./components/VoiceAssistant/Dictaphone";



const AppRoutes = [
   
    {
        path:'/home',
        element: <FullComponent />
        
    },
    {
        path: '/spotify/auth',
        element: <Login/>
    },

    {
        path: '/voice-assistant',
        element: <Dictaphone/>
    },
    {
        path: '/spotify/dashboard',
        element: <Dashboard />
    }
    
   
];

export default AppRoutes;
