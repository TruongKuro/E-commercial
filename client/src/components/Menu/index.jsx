import ItemMenu from "./ItemMenu";
import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import './menu.css'
import Popper from "../Popper";
import { useEffect, useState } from "react";
import axios from "axios";
import { apiCart } from "../../utils/API";
import { Link } from "react-router-dom";

export const MenuHome = ({children, items=[]}) => {
    const renderItems=()=>{
        return items.map((item, index)=>(
            <ItemMenu key={index} data={item}/>
        ));
    };

    return ( 
        <Tippy
            interactive 
            placement='bottom-end'
            render={attrs => ( 
                <div className='card-menu' tabIndex="-1" {...attrs}>
                    <Popper>
                        {renderItems()}
                    </Popper>
                </div>
            )}>
           {children}
        </Tippy>    
    );
}

export const MenuCart = ({children})=> {

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

    const arrCart=[];
    for(var i=0;i<itemCart.length;i++){

        for(var j=0; j<itemCart[i].items.length; j++) {
            arrCart.push(itemCart[i].items[j]); 
        }
    }

    const renderItems=()=>{
        return arrCart.slice(0, 3).map((item, index)=>(
            <Link to="" key={index}>
                <div className="menu-cart-item">
                    <div className="menu-cart-item-image">
                        <img src={`/img/${item.productId.image1}`} alt="" />
                    </div>
                    <div className="menu-cart-item-content">
                        <div className="menu-cart-item-content-name">{item.productId.name}</div>
                        <div className="menu-cart-item-content-bottom">
                            <div className="menu-cart-item-content-quantity">
                                x{item.quantity}
                            </div>
                            <div className="menu-cart-item-content-sum">
                                <span>đ</span>
                                {Number(item.productId.price*item.quantity).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        ));
    };

    return (
       <Tippy
            interactive
            placement='bottom-end'
            render={attrs => ( 
                <div className='card-menu-cart' tabIndex="-1" {...attrs}>
                    <Popper>
                        {arrCart.length!==0 ? (
                            <>
                                <p className="m-8">Sản phẩm trong giỏ hàng</p>
                                    {renderItems()}
                                <div className="flex-center-end">
                                    <Link to='/cart'><button className="btn-main btn-lg mr-8 mb-8">Xem giỏ hàng</button></Link>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="menu-cart-empty">
                                    <div className="menu-cart-empty-content">
                                        <img src="/shop-cart-icon.png" alt="" />
                                        <div className="menu-cart-empty-content-text">CHƯA CÓ SẢN PHẨM NÀO TRONG GIỎ HÀNG</div>
                                    </div>
                                </div>
                            </>
                        )}  
                    </Popper>
                </div>
            )}>
           {children}
        </Tippy>   
    )
}
