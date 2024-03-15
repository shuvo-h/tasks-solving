import { toolRoutes } from "../routes/toolRoutes";
import SideNavItem from "./SideNavItem";

const SideBar = () => {
    const formatNavItemsComputed = () =>{
        const NavLinkList = toolRoutes.routes
        .filter(routeEl=>routeEl.sideBar)
        .map(({name,path})=>({name,path}));

        return NavLinkList;
    }
    return (
        <nav style={{border:"1px solid", minHeight:"calc(100vh - 20px)"}}>
           {
                formatNavItemsComputed().map((item,idx)=><SideNavItem item={item} key={idx} />)
           }
        </nav>
    );
};

export default SideBar;