import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import bg from '../src/assets/bg.jpg';

const MainLayout = () => {
    return (
        <div
            className="min-h-screen"
            style={{ 
                backgroundImage: `url(${bg})`, 
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
            <div className="max-w-screen-xl mx-auto">
                <div className="mx-5">
                    <Navbar />
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default MainLayout;
