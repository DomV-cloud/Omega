import FullComponent from "./components/Calendar/FullComponent";
import UsersLogin from "./components/Login/UsersLogin";
import RegistrationUser from "./components/Registration/RegistrationUser";
import Dashboard from "./components/Spotify/Dashboard";
import Login from "./components/Spotify/Login";
import Dictaphone from "./components/VoiceAssistant/Dictaphone";



const AppRoutes = [
     {
        path: "/",
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
    },
    {
        path: '/api/user',
        element: <UsersLogin />
    },
    {
        path: '/api/user/registration',
        element: <RegistrationUser />
    }
   
   
];

export default AppRoutes;
