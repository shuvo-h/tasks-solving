import { Outlet } from "react-router-dom";
import SideBar from "./navbar/SideBar";
import TopBar from "./navbar/TopBar";


const Layout = () => {
    return (
        <div>
            <TopBar />
            <div style={{display:"grid",gridTemplateColumns:"200px 1fr"}}>
                <aside>
                    <SideBar />
                </aside>
                <aside style={{border:"1px solid blue",  minHeight:"calc(100vh - 20px)"}}>
                    <Outlet />
                </aside>
            </div>
        </div>
    );
};

export default Layout;
