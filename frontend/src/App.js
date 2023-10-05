import {BrowserRouter, Switch, Route} from "react-router-dom"

import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import Income from "./components/Income";
// // Import pages
// import Dashboard from './template1/pages/Dashboard';

// import './template1/css/style.css';

// import './template1/charts/ChartjsConfig';

function App() { 
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Login/>
        </Route>
        <Route exact path="/register">
          <Register/>
        </Route>
        <Route exact path="/dashboard">
          <Navbar/>
          <Dashboard/>
        </Route>
        <Route exact path="/income">
          <Navbar/>
          <Income/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
