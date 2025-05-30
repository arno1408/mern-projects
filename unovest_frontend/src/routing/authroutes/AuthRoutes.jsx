import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import DemoExp from "../../DemoExp";
import SetNewPassword from "../../auth/password/SetNewPassword";
// import ForgetPassword from "../../auth/password/ForgetPassword";
const SignIn = lazy(() => import('../../auth/signin/SignIn'));
const SignUp = lazy(() => import('../../auth/signup/SignUp'));
const ForgetPassword = lazy(() => import('../../auth/password/ForgetPassword'));
// const NewPassword = lazy(() => import('../../auth/password/NewPassword'));
const ResetPassword  = lazy(() => import('../../auth/password/ResetPassword'));

const AuthRoutes = () => {
    let RoutingArray = [
        { path: "", component: SignIn },
        { path: "login", component: SignIn },
        { path: "login/:refferalId", component: SignIn },
        { path: "signup", component: SignUp },
        { path: "forget-password", component: ForgetPassword },
        { path: "calculationDemo", component: DemoExp },
        { path: "auth/set_password/", component: SetNewPassword },
        // { path: "reset-password/", component: NewPassword },
        { path: "reset-password/", component: ResetPassword },
    ]
    return (
        <Routes>

            {RoutingArray.map((singlepath) =>
                <Route key={singlepath.path} path={`/${singlepath.path}`} element={<singlepath.component />} />
                // <Route key={singlepath.path} path={`/${singlepath.path}`} element={<Protected Component={<singlepath.component />} />} />
            )}
        </Routes>
    )
}

export default AuthRoutes
