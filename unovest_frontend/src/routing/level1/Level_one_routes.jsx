import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { Protected } from "../../auth/utils/Protected";

const Desktop_L1 = lazy(() => import('../../pages/destop_L1/Desktop_L1'));
const Level_1_quize = lazy(() => import('../../pages/destop_L1/Level_1_quize'));
const Congratulation = lazy(() => import('../../components/Congratulation'));
const Level1_quize_result = lazy(() => import('../../pages/destop_L1/Level1_quize_result'));
const L1_all_insides = lazy(() => import('../../pages/destop_L1/L1_all_insides'));
const My_power = lazy(() => import('../../pages/destop_L1/My_power'));
const Analytics = lazy(() => import('../../pages/destop_L1/Analytics'));
const MyAccount = lazy(() => import("../../pages/account/MyAccount"));
const Summit = lazy(()=> import("../../components/my-power/Summit"))
const Level_one_routes = () => {
    L1_all_insides
    let RoutingArray = [
        { path: "level-1", component: Desktop_L1 },
        { path: "level-1/quiz", component: Level_1_quize },
        { path: "level-1/quiz/congratulation", component: Congratulation },
        { path: "level-1/quiz/result", component: Level1_quize_result },
        { path: "level-1/quiz/analytics", component: Analytics },
        { path: "level-1/quiz/result/insides", component: L1_all_insides },
        { path: "level-1/quiz/result/insides/my-power", component: My_power },
        { path: "my-account", component: MyAccount },
        { path: "level-1/quiz/result/insides/my-power/summit", component: Summit },
    ]
    return (
        <Routes>

            {RoutingArray.map((singlepath) =>
                // <Route key={singlepath.path} path={`/${singlepath.path}`} element={<singlepath.component />} />
                <Route key={singlepath.path} path={`/${singlepath.path}`} element={<Protected Component={<singlepath.component />} />} />
            )}
        </Routes>
    )
}

export default Level_one_routes
