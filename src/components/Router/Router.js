import { Route, Routes, Redirect } from "react-router-dom"
import Login from "../../client/Login"
import Products from "../../client/Products"
import Home from "../../client/Home"
import Account from "../../client/Account"
import Inventory from "../../client/Inventory"
import { Navigate } from "react-router-dom"
import Signup from "../../client/Signup"
import Signout from "../../client/Signout"
import Cart from "../../client/Cart"
import { PROJECT_NAME, baseUrl } from "../constants"
function Router() {

  const base_url = baseUrl();
    return (
        <>
        <Routes>
          <Route path={base_url} element={<AuthRoute><Products /></AuthRoute>}/>
          <Route path={base_url + "Login"} element={<Login />}/>
          <Route path={base_url + "Inventory"} element={<AuthRoute><Inventory/></AuthRoute>}/>
          <Route path={base_url + "Account"} element={<AuthRoute><Account/></AuthRoute>}/>
          <Route path={base_url + "Signup"} element={<Signup />}/>
          <Route path={base_url + "Products"} element={<AuthRoute><Products/></AuthRoute>}  />
          <Route path={base_url + "Signout"} element={<AuthRoute><Signout/></AuthRoute>}  />
          <Route path={base_url + "Cart"} element={<AuthRoute><Cart/></AuthRoute>}  />
          <Route path={base_url + "*"} element={<AuthRoute><Products/></AuthRoute>}/>
        </Routes>
        </>
    )
};

  function AuthRoute({ children }) {
    let auth = localStorage.getItem("user_email");
    if (!auth) 
    {
      return <Navigate to={baseUrl() + "Login"}  replace />;
    }
  
    return children;
  }
export default Router