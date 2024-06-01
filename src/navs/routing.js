import { Route, Routes } from "react-router-dom";
import Signup from '../screens/user/Signup';
import SignInSide from '../screens/user/Signin';
import ProductList from '../screens/product/productList';
import OrderList from "../screens/order/orderList";
import AddProduct from "../screens/product/AddProduct";
import UserList from '../screens/user/userList'
import Cart from "../screens/order/cart";
import CompleteOrder from '../screens/order/payment'
import OneProduct from "../screens/product/oneProduct";
import Payment from "../screens/order/payment";
import CongratCard from "../screens/order/CongratCard";

export default function Routing() {

    return (
        <Routes>
            <Route path="/" element={<ProductList />}></Route>
            <Route path='/products' element={<ProductList />}></Route>
            <Route path="productList" element={<ProductList />}></Route>
            <Route path="signin" element={<SignInSide />}></Route>
            <Route path="signup" element={<Signup />}></Route>
            <Route path='/products/:mini' element={<ProductList />}></Route>
            <Route path="orders" element={<OrderList />}></Route>
            <Route path="addProducr" element={<AddProduct />}></Route>
            <Route path="users" element={<UserList />}></Route>
            <Route path="cart" element={<Cart />}></Route>
            <Route path="payment" element={<Payment />}></Route>
            <Route path="addProduct/:id" element={<AddProduct />}></Route>
            <Route path="oneProduct/:id" element={<OneProduct />}></Route>
            <Route path='/congrat' element={<CongratCard />}></Route>
        </Routes>
    )
}