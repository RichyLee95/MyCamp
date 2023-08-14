import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import CampsiteIndex from "./components/HomePage/CampsiteIndex";
import SingleCampsite from "./components/SingleCampsite/SingleCampsite";
import ManageCampsites from "./components/ManageCampsite/ManageCampsite";
import CreateCampsite from "./components/CreateCampsite/CreateCampsite";
import EditCampsite from "./components/CreateCampsite/EditCampsite";
function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/' component={CampsiteIndex}/>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path='/campsites/current' component={ManageCampsites}/>
          <Route exact path='/campsites/new' component={CreateCampsite}/>
          <Route exact path="/campsites/:campsiteId" component={SingleCampsite}/>
          
          <Route exact path='/campsites/:campsiteId/edit' component={EditCampsite}/>
          
          
          
        </Switch>
      )}
    </>
  );
}

export default App;
