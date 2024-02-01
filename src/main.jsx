import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
//routes
import Root from './routes/Root'
import ProductList from './routes/ProductList'
import Product from './routes/Product'
import Logout from './routes/Logout'
import InProgress from './routes/InProgress'
import Error from './routes/Error'
//style
import './style/global.scss'

const router = createBrowserRouter([
  {
    path:"/",
    element: <Root/>,
    errorElement: <Error/>, 
    children: [
      {
        index:true,
        element: <InProgress/>,
      },
      {
        path: '/dashboard', 
        element: <InProgress/>,
      }, 
      {
        path: '/products', 
        element: <ProductList/>,
      },
      {
        path: '/products/:productId',
        element: <Product/>
      }, 
      {
        path: '/employees',
        element: <InProgress/>
      }
    ]
  },
  {
    path: '/logout',
    element: <Logout/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
