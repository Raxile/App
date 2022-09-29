import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import NewPlace from "./places/pages/NewPlace";
import Users from "./user/pages/Users";

const App = () => {
  return (
    <>
      <Router>
         <Routes>
            <Route exact path="/" element={ <Users />} />
            <Route exact path="/places/new" element={ <NewPlace />} />
            <Route path="*" element={<Navigate to="/"/>} />
    
         </Routes> 
      </Router>   
    </>
  );
}

export default App;
