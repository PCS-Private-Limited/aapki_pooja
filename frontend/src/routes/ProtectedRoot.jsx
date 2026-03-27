import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Layout from "../Layout";
import Booking from "../pages/Booking";
import Shop from "../pages/Shop";
import Contact from "../pages/Contact";

export const Router= createBrowserRouter([
    {path:"/", element:<Layout/>,
        children:[
            {index:true, element:<Home/>},
            {path:"/booking", element:<Booking/>},
            {path:"/shop", element:<Shop/>},
            {path:"/contact", element:<Contact/>},
        ]
    }
    
])