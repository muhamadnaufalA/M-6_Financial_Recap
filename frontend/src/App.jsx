import {BrowserRouter, Switch, Route, Redirect } from "react-router-dom"
import Cookies from "js-cookie";

//Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Income from "./pages/Income";
import EditIncome from "./pages/EditIncome";
import Outcome from "./pages/Outcome";
import Category from "./pages/Category";
import EditCategory from "./pages/EditCategory";
import Wallet from "./pages/Wallet";
import EditWallet from "./pages/EditWallet";
import EditOutcome from "./pages/EditOutcome";
import BudgetRule from "./pages/BudgetRule";
import Recap from "./pages/Recap";
import EditBudgetRule from "./pages/EditBudgetRule";
import Dashboard from "./pages/Dashboard";

//Components
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() { 
  // const isLogin = Cookies.get("userId");
  // const ProtectedRoute = ({ children }) => {
  //   return isLogin ? children : <Redirect to="/" />;
  // };

  const Layout = ({ children }) => {
    return (
      <div className="wrapper">
        <Sidebar />
        <div className="main">
          <Navbar />
          <main className="content">
            <div className="container-fluid p-0">{children}</div>
          </main>
          <Footer />
        </div>
      </div>
    );
  };

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Login/>
        </Route>

        <Route exact path="/register">
          <Register/>
        </Route>

        {/* <ProtectedRoute> */}
          {/* Dashboard */}
          <Route exact path="/dashboard">
            <Layout><Dashboard/></Layout>
          </Route>
          
          {/* Recap */}
          <Route exact path="/recap">
            <Layout><Recap/></Layout>
          </Route>

          {/* Income Page */}
          <Route exact path="/income">
            <Layout><Income/></Layout>        
          </Route>

          {/* Edit Income Page */}
          <Route exact path="/editIncome/:id">
            <Layout><EditIncome/></Layout>      
          </Route>

          {/* Outcome Page */}
          <Route exact path="/outcome">
            <Layout><Outcome/></Layout>     
          </Route>

          {/* Edit Outcome Page */}
          <Route exact path="/edit-outcome/:id">
            <Layout><EditOutcome/></Layout>
          </Route>

          {/* Budget Rule Page */}
          <Route exact path="/budgetrule">
            <Layout><BudgetRule/></Layout>    
          </Route>

          {/* Category Page */}
          <Route exact path="/category">
            <Layout><Category/></Layout> 
          </Route>

          {/* Edit Category Page */}
          <Route exact path="/editCategory/:id">
            <Layout><EditCategory/></Layout>
          </Route>

          {/* Wallet Page */}
          <Route exact path="/wallet">
            <Layout><Wallet/></Layout>
          </Route>

          {/* Edit Wallet Page */}
          <Route exact path="/editWallet/:id">
            <Layout><EditWallet/></Layout>
          </Route>

          {/* Edit Wallet Page */}
          <Route exact path="/edit-budget-rule/:id">
            <Layout><EditBudgetRule/></Layout>
          </Route>
        {/* </ProtectedRoute> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;