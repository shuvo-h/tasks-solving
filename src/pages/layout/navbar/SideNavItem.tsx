import { NavLink } from 'react-router-dom';
import { TChildRouteItem } from '../../../routes/route.type';

interface TSideNavItemProps {
    item: Pick<TChildRouteItem,"name"|"path">
}
const SideNavItem = ({item}:TSideNavItemProps) => {
 
    return (
        <NavLink 
            to={item.path}
            style={{display:"block", padding:"2px 0"}}
        >
            {item.name}
        </NavLink>
    );
};

export default SideNavItem;