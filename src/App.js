import React from "react";
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
import Users from "./user/pages/Users";

const App = () => {
  return (
    <>
      <Router>
        <MainNavigation />
        <main>
         <Routes>
            <Route exact path="/" element={ <Users />} />
            <Route path="/:userId/places" element={<UserPlaces />} />
            <Route exact path="/places/new" element={ <NewPlace />} />
            <Route path="/places/:placeId" element={<UpdatePlace />}  />
            <Route path="*" element={<Navigate to="/"/>} />
    
         </Routes>
         </main> 
      </Router>   
    </>
  );
}

export default App;
