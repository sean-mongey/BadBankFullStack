import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CurrentUserProvider } from "./components/context.js";
import NavBar from "./components/navbar.js";
import Home from "./pages/home.js";
import CreateAccount from "./pages/createAccount.js";
import Login from "./pages/login.js";
import Deposit from "./pages/deposit.js";
import Withdraw from "./pages/withdraw.js";
import TransactionHistory from "./pages/transactionHistory.js";
import AllData from "./pages/allData.js";
import Footer from "./components/footer.js";
import Transfer from "./pages/transfer.js";
import UserTransactions from "./pages/userTransactions.js";

function Spa() {
  return (
    <Router>
      <CurrentUserProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/createAccount" element={<CreateAccount />} />
          <Route path="/login" element={<Login />} />
          <Route path="/deposit" element={<Deposit />} />
          <Route path="/withdraw" element={<Withdraw />} />
          <Route path="/transactionHistory" element={<TransactionHistory />} />
          <Route path="/transfer" element={<Transfer />} />
          <Route path="/allData" element={<AllData />} />
          <Route
            path="/userTransactions/:email"
            element={<UserTransactions />}
          />{" "}
        </Routes>
        <Footer />
      </CurrentUserProvider>
    </Router>
  );
}

export default Spa;
