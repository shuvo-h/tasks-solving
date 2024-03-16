import { NavLink } from 'react-router-dom';
import { TChildRouteItem } from '../../../routes/route.type';

interface TSideNavItemProps {
    item: Pick<TChildRouteItem,"name"|"path">
}
const SideNavItem = ({item}:TSideNavItemProps) => {
 
    return (
        <NavLink 
            to={item.path}
            // className={'nav_item'}
            className={({isActive,})=>[
                "nav_item",
                isActive ? "active_item" : "",
            ].join(" ")}
        >
            {item.name}
        </NavLink>
    );
};

export default SideNavItem;