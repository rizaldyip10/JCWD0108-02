import axios from "axios";
import { useEffect, useState } from "react";
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { AdminDashboard } from "./pages/adminDashboard";
import { Cashier } from "./components/dashboard/manageCashier/cashier";
import { AdminHome } from "./components/dashboard/home/adminHome";

function App() {

  const router = createBrowserRouter([
    { path: '/admin', element: <AdminDashboard />, children: [
      { path: '', element: <AdminHome />},
      { path: 'cashier', element: <Cashier />}
    ]}
  ])

  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
