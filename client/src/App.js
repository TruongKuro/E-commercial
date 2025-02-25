import {BrowserRouter,Routes,Route } from "react-router-dom";
import Detail from "./pages/Product/detail";
import Home from './pages/Product/home'
import Login from './pages/Auth/login'
import Register from './pages/Auth/register'
import AddProduct from "./pages/Seller/Product/AddProduct";
import DeletedProduct from "./pages/Seller/Product/DeletedProduct";
import ListProduct from "./pages/Seller/Product/ListProduct";
import SelectCategory from "./pages/Seller/Product/SelectCategory";
import Shop from "./pages/Product/shop";
import Cart from "./pages/Product/cart";
import Checkout from "./pages/Product/checkout";
import Profile from "./pages/User/Profile";
import Address from "./pages/User/Address";
import ChangePassword from "./pages/User/Password";
import Order from "./pages/User/Order";
import Favorite from "./pages/User/Favorite";
import Viewed from "./pages/User/Viewed";
import WordList from "./WordList";
import AddCategory from "./pages/Admin/AddCategory";
import ProductManagement from "./pages/Admin/ProductManagement";
import OrderManagement from "./pages/Admin/OrderManagement";
import ShopManagement from "./pages/Admin/ShopManagement";
import PaymentSuccess from "./pages/Product/paymentSuccess";
import ProfileShop from "./pages/Seller/Shop/profile";
import Category from "./pages/Product/category";


function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/word-list" element={<WordList/>}/>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/product/detail/:id" element={<Detail/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/checkout/:id" element={<Checkout/>}/>
          <Route path="/payment-success" element={<PaymentSuccess/>}/>
          <Route path="/shop" element={<Shop/>}/>
          <Route path="/category/:id" element={<Category/>}/>

          <Route path="/account/profile" element={<Profile/>}/>
          <Route path="/account/address" element={<Address/>}/>
          <Route path="/account/change-password" element={<ChangePassword/>}/>
          <Route path="/account/order" element={<Order/>}/>
          <Route path="/account/favorite" element={<Favorite/>}/>
          <Route path="/account/viewed" element={<Viewed/>}/>

          <Route path="/seller/list-product" element={<ListProduct/>}/>
          <Route path="/seller/select-category" element={<SelectCategory/>}/>
          <Route path="/seller/add-product" element={<AddProduct/>}/>
          <Route path="/seller/product/trash" element={<DeletedProduct/>}/>
          <Route path="/seller/shop/profile" element={<ProfileShop/>}/>

          <Route path="/admin/product-management" element={<ProductManagement/>}/>
          <Route path="/admin/shop-management" element={<ShopManagement/>}/>
          <Route path="/admin/order-management" element={<OrderManagement/>}/>
          <Route path="/admin/add-category" element={<AddCategory/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
