import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Products } from '@/components/Products/Products';
import { Clients } from '@/components/Clients/Clients';
import { Orders } from '@/components/Orders/Orders';
import { NavBar } from '@/components/NavBar/NavBar';
import { Login } from '@/components/Login/Login';
import { Register } from '@/components/Register/Register';
import './index.css'
import { OrderDetails } from './components/OrderDetails/OrderDetails';

const Layout = () => {
  return (
      <>
        <NavBar />
        <main>
          <Outlet />
        </main>
      </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <div>Hello world!</div> },
      { path: "/products", element: <Products/> },
      { path: "/clients", element: <Clients/> },
      { path: "/orders", element: <Orders/> },
      { path: "/login", element: <Login/> },
      { path: "/register", element: <Register/> }, 
      { path: "/orderDetails/:orderId", element: <OrderDetails/> }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
