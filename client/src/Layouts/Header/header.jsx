import { useState, useEffect } from 'react';
import { faBell, faMagnifyingGlass, faShoppingCart, faUser, faRightFromBracket, faStore, faRectangleAd } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import {LogoWhite} from '../../components/Logo/logo';
import './header.css'
import {MenuCart, MenuHome} from '../../components/Menu';
import axios from 'axios';
import { apiCart } from '../../utils/API';


const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faUser}/>,
        title:'Hồ sơ của tôi',
        to: '/account/profile',
        onclick: false
    },
    {
        icon: <FontAwesomeIcon icon={faStore}/>,
        title:'Kênh bán hàng',
        to: '/seller/select-category',
        onclick: false
    },
    {
        icon: <FontAwesomeIcon icon={faRightFromBracket}/>,
        title:'Đăng xuất',
        onclick: true
    },
];

function Header() {
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        setCurrentUser(JSON.parse(localStorage.getItem(process.env.REACT_APP_KEY)));
    },[]);

    //Lấy số lượng item trong cart
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

    return ( 
        <>
            <div className = "home-header" >
                <div className="home-header-wrapper">
                    <div className='home-header-logo'>
                        <Link to="/">
                            <LogoWhite/>
                        </Link>
                    </div>

                    <div className="home-header-search">
                        <input type = "text"
                        placeholder = 'Tìm tên sản phẩm ...'
                        spellCheck = { false }/> 
                        <button className = 'home-header-btn-search' >
                            <FontAwesomeIcon icon={faMagnifyingGlass}/>
                            Tìm kiếm 
                        </button> 
                    </div>
                    {currentUser === undefined || currentUser === null? (
                        <div className="home-header-action">
                            <Link to='/register'>
                                <button className='btn-text btn-sm strong'>
                                    Đăng ký
                                </button>
                            </Link>
                            <Link to='/login'>
                                <button className='btn-outline btn-sm strong'>
                                    Đăng nhập
                                </button>
                            </Link>
                        </div>
                    ) : (
                        <div className="home-header-action">
                            {currentUser.role==='admin' && (
                                <Link to='/admin/product-management' className='home-header-user-cart'>
                                    <FontAwesomeIcon icon={faRectangleAd}/>
                                </Link>
                            )}
                            <button className='home-header-user-notification'>
                                <FontAwesomeIcon icon={faBell}/>
                            </button>
                            <MenuCart>
                                <Link className='home-header-user-cart' to='/cart'>
                                    <FontAwesomeIcon icon={faShoppingCart} />
                                    <span>{arrCart.length}</span>
                                </Link>
                            </MenuCart>
                            
                            <MenuHome items={MENU_ITEMS}>
                                <img src={`/img/${currentUser.avatar}`} alt="user" className='home-header-user-image'/> 
                            </MenuHome>
                        </div>
                    )}
                </div>
            </div>  
        </> 
    );
}

export default Header;