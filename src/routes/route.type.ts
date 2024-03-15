
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactElement } from "react";

export interface TChildRouteItem {
    name: string;
    path: string;
    element: ReactElement;
    loader: React.FC<any>;
    sideBar?: boolean;
} 