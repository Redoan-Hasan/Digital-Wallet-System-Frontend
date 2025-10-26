import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";

const CommonLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="grow">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default CommonLayout;