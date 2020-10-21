import React, { useEffect } from "react";
import { LOGGED_IN_USER } from "./redux/actions/types";
import Footer from "./components/Footer";
import Header from "./components/Header";
 import HomeScreen from "./screens/HomeScreen";
import { Switch, Route } from "react-router-dom";
import LoginScreen from "./screens/auth/LoginScreen";
import RegisterScreen from "./screens/auth/RegisterScreen";
import { useDispatch } from "react-redux";
import RegisterComplete from "./screens/auth/RegisterComplete";
import { auth } from "./firebase";
import ForgotPassword from "./screens/auth/ForgotPassword";
import { getCurrentUser } from "./redux/actions/auth_actions";
import History from "./screens/user/History";
import PrivateRoute from "./utils/PrivateRoute";
import WishList from "./screens/user/Wishlist";
import Password from "./screens/user/Password";
import AdminDashboard from "./screens/admin/AdminDashboard";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idToken = await user.getIdTokenResult();
        getCurrentUser(idToken.token)
          .then((res) => {
            dispatch({
              type: LOGGED_IN_USER,
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idToken.token,
                isAdmin: res.data.isAdmin,
                id: res.data.id,
                picture: res.data.picture,
              },
            });
          })
          .catch((err) => console.log(err));
      }
    });
    // cleanup
    return () => unsubscribe();
  }, [dispatch]);
  return (
    <>
      <Header />
      <main className="py-3">
        <Switch>
          <Route exact path="/login" component={LoginScreen} />
          <Route exact path="/register" component={RegisterScreen} />
          <Route exact path="/forgotPassword" component={ForgotPassword} />
          <PrivateRoute exact path="/user-history" component={History} />
          <PrivateRoute exact path="/user-wishlist" component={WishList} />
          <PrivateRoute exact path="/user-password" component={Password} />
          <PrivateRoute
            exact
            path="/admin-dashboard"
            component={AdminDashboard}
          />
          <Route exact path="/register/complete" component={RegisterComplete} />
          <Route exact path="/" exact component={HomeScreen} />
        </Switch>
      </main>
      <Footer />
    </>
  );
}

export default App;
