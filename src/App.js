import logo from './logo.svg';
import './App.css';
import ProductList from './screens/product/productList';
import Signup from './screens/user/Signup';
import SignInSide from './screens/user/Signin';
import { BrowserRouter} from "react-router-dom"
import { useSelector } from 'react-redux';
import ManagerNavBar from './navs/managerNavBar';
import UserNavBar from './navs/userNavBar';
import GuestNavBar from './navs/guestNavBar'
import Routing from './navs/routing'
import OrderList from './screens/order/orderList'
import UserList from './screens/user/userList';


// import { Login } from '@mui/icons-material';
function App() {
  const currentFromRedux = useSelector(state => state.user.type)
  return (
    <div className="App">
     {/* <ProductList></ProductList> */}
     {/* <HookForm></HookForm> */}
      {/* <SignInSide></SignInSide> */}
      {/* <GuestNavBar></GuestNavBar> */}
      <BrowserRouter> 
      {/* <GuestNavBar></GuestNavBar> */}
      {currentFromRedux === "guest" ? <GuestNavBar></GuestNavBar> : currentFromRedux === "manager" ? <ManagerNavBar></ManagerNavBar>: <UserNavBar></UserNavBar>} 
      <Routing></Routing>
      {/* <Signup></Signup> */}
      {/* <ManagerNavBar></ManagerNavBar> */}
     </BrowserRouter>
     {/* <UserList></UserList> */}
     {/* <OrderList></OrderList> */}

    </div>
  );
}

export default App;
