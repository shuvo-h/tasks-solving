import { TChildRouteItem } from "../../../routes/route.type";
import Home from "../../home/Home";
import CsvToChart from "./tools/XlsxToChart/XlsxToChart";

export const toolRoutes:{prefix:"/tools",routes:TChildRouteItem[]} = {
    prefix:"/tools",
    routes: [
        {
            name:"CSV To Chart",
            path: "csv-to-chart",
            element: <CsvToChart />,
            loader: ()=><div>Loading...</div>,
            sideBar: true,
        },
        {
            name:"test tool",
            path: "abc/test/path",
            element: <Home />,
            loader: ()=><div>Loading...</div>,
            sideBar: true,
        },
    ],
};