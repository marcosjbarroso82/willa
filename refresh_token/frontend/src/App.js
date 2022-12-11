import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import PrivateRoute from './utils/PrivateRoute'
import { AuthProvider } from './context/AuthContext'

import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import BuyerContracts from './pages/BuyerContractsPage'
import SellerContracts from './pages/SellerContractsPage'
import CreateBuyerContract from './pages/CreateBuyerContractPage'
import ContractPage from './pages/ContractPage'
import Header from './components/Header'

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Header/>
          <PrivateRoute component={BuyerContracts} path="/buyer-contracts/" exact/>
          <PrivateRoute component={SellerContracts} path="/seller-contracts/" exact/>
          <PrivateRoute component={CreateBuyerContract} path="/create-buyer-contract/" exact/>
          { /* <PrivateRoute component={SellerContracts} path="/seller-contracts/" exact/> */
          }
          <PrivateRoute component={ContractPage} path="/contracts/:id" exact/>


          <PrivateRoute component={HomePage} path="/" exact/>
          <Route component={LoginPage} path="/login"/>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
