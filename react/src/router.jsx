import {createBrowserRouter, Navigate} from "react-router-dom";
import Login from "./views/Login.jsx";
import Signup from "./views/Signup.jsx";
import Notfound from "./views/Notfound.jsx";
import DefaultLayout from "./components/DefaultLayout.jsx";
import GuestLayout from "./components/GuestLayout.jsx";
import Home from "./views/Home.jsx";
import Projects from "./views/Projects.jsx";
import Upload from "./views/Upload.jsx";
import ProjectDetails from "./views/ProjectDetails.jsx";
import Profile from "./views/Profile.jsx";
import ProfileEdit from "./views/ProfileEdit.jsx";
import About from "./views/About.jsx";

const router = createBrowserRouter([
    // Protected routes (require authentication)
    {
        path:'/',
        element: <DefaultLayout/>,
        children:[
            {
            index: true,
            element: <Home />        
             },
            {
                path: 'upload',
                element: <Upload/>        
            },
            {
                path: 'profile',
                element: <Profile />        
            },
            {
                path: 'profile/edit',
                element: <ProfileEdit />        
            },
            {
                path: 'projects',
                element: <Projects/>        
            },
            {
                path: 'projects/:id',
                element: <ProjectDetails />        
            },
        ]
    },

    // Public routes (don't require authentication)
    {
        path:'/',
        element: <GuestLayout/>,
        children:[
            
            {
                index:true,
                element: <Navigate to="login" replace/>        
            },
            {
                path: 'login',  
                element: <Login/>        
            },
            {
                path: 'signup',
                element: <Signup/>        
            },
            
            
            {
                path: 'about',
                element: <About />        
            },
        ]
    },
    
    // 404 route
    {
        path: '*',
        element: <Notfound/>        
    },
])

export default router;