import ReactDOM from 'react-dom/client'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'

import App from './App.jsx'
import LoginSignupPage from './pages/LoginSignupPage.jsx'
import Calendar from './pages/Calendar.jsx'
import Journal from './pages/Journal.jsx'
// import './index.css'

const router = createBrowserRouter([
  {
    path:'/',
    element:<App />,
    errorElement: <h1>Wrong page!</h1>,
    children: [
      {
        index:true,
        element:<Calendar/>
      },
      {
        path:'/login',
        element:<LoginSignupPage />
      },
      {
        path:'/journal',
        element:<Journal/>
      },
    ]
  }
  
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
)

