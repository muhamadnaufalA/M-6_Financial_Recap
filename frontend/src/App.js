import { BrowserRouter, Switch, Route } from "react-router-dom";

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

import Dashboard from "./pages/Dashboard";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />
      </Switch>
      <div className="wrapper">
        <Sidebar />
        <div className="main">
          <Navbar />
          <main className="content">
            <Switch>
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/income" component={Income} />
              <Route exact path="/editIncome/:id" component={EditIncome} />
              <Route exact path="/outcome" component={Outcome} />
              <Route exact path="/edit-outcome/:id" component={EditOutcome} />
              <Route exact path="/budgetrule" component={BudgetRule} />
              <Route exact path="/category" component={Category} />
              <Route exact path="/editCategory/:id" component={EditCategory} />
              <Route exact path="/wallet" component={Wallet} />
              <Route exact path="/editWallet/:id" component={EditWallet} />
            </Switch>
          </main>
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
