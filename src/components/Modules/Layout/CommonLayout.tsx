import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";

const CommonLayout = () => {
    return (
        <div>
            <Navbar />
            <div>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default CommonLayout;