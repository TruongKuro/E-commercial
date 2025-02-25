import { faBasketShopping, faComment } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { useState } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import ContainerHome from "../../Layouts/Additional/container-home";
import Header from "../../Layouts/Header/header";
import './cart.css';
import { apiCart } from '../../utils/API';
import ItemsCart from '../../Layouts/Cart/items';
import SumPrice from '../../Layouts/Cart/sum';

function Cart() {
    const [currentUser, setCurrentUser] = useState({});
    useEffect(() => {
        setCurrentUser(JSON.parse(localStorage.getItem(process.env.REACT_APP_KEY)));
    },[]);
    
    const [itemCart, getItemCart]=useState([]);
    useEffect(()=>{
        const fetch=async()=>{
            const res=await axios.post(apiCart,{
                userId: currentUser._id,
            });
            getItemCart(res.data);
        }
        fetch();
    },[itemCart]);

    
    return ( 
        <>
            <Header/>
            <ContainerHome>
                {itemCart.length!==0 ? (
                    <div className="row-container mt-12" id='hidden'>
                        <div className="col-6 flex-center">
                            <div className="cart-checkbox">
                                <div className="cart-checkbox-outline">
                                    <div className="cart-checkbox-fill">
                                        <img src="./checking-mark.png" alt="" />
                                    </div>
                                </div>
                            </div>
                            <p className="cart-title-name-product">Sản Phẩm</p>
                        </div>
                        <div className="col-6 flex-center">
                            <p className="cart-title-name-item">Đơn Giá</p>
                            <p className="cart-title-name-item">Số Lượng</p>
                            <p className="cart-title-name-item">Thành Tiền</p>
                            <p className="cart-title-name-item">Thao Tác</p>
                        </div>
                    </div>
                ): (
                    <div className="cart-empty">
                        <div className="cart-empty-content">
                            <FontAwesomeIcon icon={faBasketShopping}/>
                            <span>CHƯA CÓ SẢN PHẨM NÀO TRONG GIỎ HÀNG</span>
                        </div>
                    </div>
                )}

                {itemCart.map((cart, index)=>(
                    <div key={index}>
                        <div className="row-container mt-12">
                            <div className="col-6 flex-center">
                                <div className="cart-checkbox">
                                    <div className="cart-checkbox-outline">
                                        <div className="cart-checkbox-fill">
                                            <img src="./checking-mark.png" alt="" />
                                        </div>
                                    </div>
                                </div>
                                <div className="cart-title-name-shop">
                                    <Link to='#'>{cart.shopId.name}</Link>
                                    <FontAwesomeIcon icon={faComment}/>
                                </div>
                            </div>
                        </div>
                        {cart.items.map((item, index)=>(
                            <div key={index}>
                                <ItemsCart item={item} shop={cart.shopId} customer={cart.customerId}/>
                            </div>
                        ))}
                        <SumPrice cart={cart}/>
                    </div>
                ))}

            </ContainerHome>
        </>
     );
}

export default Cart;