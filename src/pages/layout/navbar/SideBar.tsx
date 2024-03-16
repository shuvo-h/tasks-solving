import { toolRoutes } from "../routes/toolRoutes";
import SideNavItem from "./SideNavItem";
import "./navbar.css";

const SideBar = () => {
    const formatNavItemsComputed = () =>{
        const NavLinkList = toolRoutes.routes
        .filter(routeEl=>routeEl.sideBar)
        .map(({name,path})=>({name,path}));
        return NavLinkList;
    }
    
    return (
        <nav style={{minHeight:"calc(100vh - 20px)"}} className="sidebar">
           {
                formatNavItemsComputed().map((item,idx)=><SideNavItem item={item} key={idx} />)
           }
        </nav>
    );
};

export default SideBar;