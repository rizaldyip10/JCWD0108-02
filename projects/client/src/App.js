import Axios from "axios";
import { useDispatch } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { setValue } from "./redux/cashierSlice";
import { Login } from "./pages/login";
import { ForgotPassword } from "./pages/forgotPass";
import { ResetPassword } from "./pages/resetPass";
import { useEffect, useState } from "react";
import { AdminDashboard } from "./pages/adminDashboard";
import { Cashier } from "./components/dashboard/manageCashier/cashier";
import { AdminHome } from "./components/dashboard/home/adminHome";
import { ChangeProfilePicture } from "./components/imgProfle";
import { Navbar } from './components/landingPage/navbar';
import { Homepage } from './pages/homepage';
import { DashboardProduct } from './components/admin/dashboardProduct';
import { DashboardCashier } from "./components/admin/dashboardCashier";
const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/forgotpass", element: <ForgotPassword /> },
  { path: "/resetpass/:token", element: <ResetPassword /> },
  { path: "/changeprofilepicture", element: <ChangeProfilePicture /> },
  {
    path: "/admin",
    element: <AdminDashboard />,
    children: [
      { path: "", element: <AdminHome /> },
      { path: "cashier", element: <Cashier /> },
    ],
  },
  {path:"/",
  element:<Navbar/>,
  children:[
    {path: "/",element:<Homepage/>},
  ]
},
{path: "/dashboard",element:<DashboardProduct/>},
{path: "/cashier",element:<DashboardCashier/>},
]);

function App() {
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const dispatch = useDispatch();
  const keepLogin = async () => {
    try {
      const response = await Axios.get("http://localhost:8000/auth/keeplogin", {
        headers,
      });
      dispatch(setValue(response.data));
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    keepLogin();
  }, []);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
