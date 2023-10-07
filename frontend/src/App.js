import {BrowserRouter, Switch, Route} from "react-router-dom"

import Login from "./components/Login";
import Register from "./components/Register";
import Income from "./components/Income";
import EditIncome from "./components/EditIncome";

import Dashboard from "./pages/Dashboard";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

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

         {/* Dashboard */}
          <Route exact path="/dashboard">
          <div className="wrapper">
            <Sidebar/>
              <div className="main">
                <Navbar/>
                <main className="content">
                  <div className="container-fluid p-0">
                    <Dashboard/>
                  </div>
                </main>
                <Footer/>
              </div>
            </div>
          </Route>

        {/* Income Page */}
        <Route exact path="/income">
          <div className="wrapper">
            <Sidebar/>
            <div className="main">
              <Navbar/>
              <main className="content">
                  <div className="container-fluid p-0">
                    <Income/>
                  </div>
              </main>
            </div>
          </div>
        </Route>

        {/* Edit Income Page */}
        <Route exact path="/editIncome/:id">
          <div className="wrapper">
            <Sidebar/>
              <div className="main">
                <Navbar/>
                <main className="content">
                  <div className="container-fluid p-0">
                    <EditIncome/>
                  </div>
                </main>
              </div>
          </div>
        </Route>

      </Switch>
    </BrowserRouter>
  );
}

export default App;
