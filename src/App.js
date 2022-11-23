import React,{ useCallback,useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import NewPlace from "./places/pages/NewPlace";
import UpdatePlace from "./places/pages/UpdatePlace";
import UserPlaces from "./places/pages/UserPlaces";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import { AuthContext } from "./shared/context/auth-context";
import Auth from "./user/pages/Auth";
import Users from "./user/pages/Users";

const App = () => {
  const [isLoggedIn,setIsLoggedIn] = useState(false);

  const login = useCallback(()=>{
    setIsLoggedIn(true);
  },[]);

  const logout = useCallback(()=>{
    setIsLoggedIn(false);
  },[]); 

  let routes;

  if(isLoggedIn){
    routes = (
      <Routes>
            <Route exact path="/" element={ <Users />} />
            <Route path="/:userId/places" element={<UserPlaces />} />
            <Route exact path="/places/new" element={ <NewPlace />} />
            <Route path="/places/:placeId" element={<UpdatePlace />}  />
            <Route path="*" element={<Navigate to="/"/>} />
      </Routes>
    );
  } else {
    routes =(
      <Routes>
          <Route exact path="/" element={ <Users />} />
          <Route path="/:userId/places" element={<UserPlaces />} />
          <Route path="/auth" element={<Auth / >} />
          <Route path="*" element={<Navigate to="/auth"/>} />
      </Routes>
    );
  }


  return (
    <AuthContext.Provider value={{isLoggedIn:isLoggedIn,login:login,logout:logout}}>
      <Router>
        <MainNavigation />
        <main>
         {routes}
         </main> 
      </Router>   
    </AuthContext.Provider>
  );
}

export default App;
