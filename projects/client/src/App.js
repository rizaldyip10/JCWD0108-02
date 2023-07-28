import { Homepage } from './pages/homepage';
import { Navbar } from './components/landingPage/navbar';
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import { Detailpage } from './pages/detailpage';
import { CreateProduct } from './components/admin/createProduct';
import { DashboardProduct } from './components/admin/dashboardProduct';

function App() {
  const router = createBrowserRouter(
    [
      {path:"/",
    element:<Navbar/>,
    children:[
      {path: "/",element:<Homepage/>},
      {path: "detail",element:<Detailpage/>},
      {path: "create",element:<CreateProduct/>},
      {path: "dashboard",element:<DashboardProduct/>},
    ]
    }
    ]
  )

  return (
    <div>
            <RouterProvider router ={router}/>
    </div>
  );
}

export default App;
