import React, { Component, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './scss/style.scss'
import "./generic.css"
// import 'https://code.jquery.com/jquery-3.5.1.js'
// import 'https://cdn.datatables.net/1.12.1/js/jquery.dataTables.min.js'
// import 'https://cdn.datatables.net/buttons/2.2.3/js/dataTables.buttons.min.js'
// import 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js'
// import 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/pdfmake.min.js'
// import 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/vfs_fonts.js'
// import 'https://cdn.datatables.net/buttons/2.2.3/js/buttons.html5.min.js'
// import 'https://cdn.datatables.net/buttons/2.2.3/js/buttons.print.min.js'

let userData = JSON.parse(localStorage.getItem("userDataStore"));

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const JoinTeam = React.lazy(() => import('./views/pages/JoinTeam/JoinTeam'))
const TeamLogin = React.lazy(() => import('./views/pages/JoinTeam/TeamLogin'))
const Signin = React.lazy(() => import('./views/pages/login/signin'))
const Signup = React.lazy(() => import('./views/pages/register/signup'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))
const ChangePassword = React.lazy(() => import('./views/pages/AccountSetup/ChangePassword'))
const ResetPassword = React.lazy(() => import('./views/pages/AccountSetup/ResetPassword'))

class App extends Component {
  render() {
    
    return (
      <BrowserRouter>
      {/* {userData?.token} */}
        <Suspense fallback={loading}>
          <Routes>
            <Route exact path="/" name="Login Page" element={<Login />} />
            <Route exact path="/login" name="Login Page" element={<Login />} />
            <Route exact path="/team-login" name="Team Login Page" element={<TeamLogin />} />
            <Route exact path="/signin" name="Signin Page" element={<Signin />} />
            {/* <Route exact path="/register" name="Register Page" element={<Register />} /> */}
            <Route exact path="/signup" name="SignUp Page" element={<Signup />} />
            <Route exact path="/404" name="Page 404" element={<Page404 />} />
            <Route exact path="/500" name="Page 500" element={<Page500 />} />
            <Route exact path="/change-password" name="Change Password" element={<ChangePassword />} />
            <Route exact path="/reset-password" name="Reset Password" element={<ResetPassword />} />
            {
              userData?.token ?
              <Route path="*" name="Home" element={<DefaultLayout />} />
              :
              <Route exact path="*" name="Page 404" element={<Page404 />} />

            }              
            <Route path="*" name="Home" element={<DefaultLayout />} />

            <Route exact path="/dash" name="Compliance" element={<Dashboard />} />

          </Routes>
        </Suspense>
      </BrowserRouter>
    )
  }
}

export default App
