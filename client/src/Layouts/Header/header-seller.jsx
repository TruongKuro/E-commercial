import { useState, useEffect } from 'react';
import { faAnglesDown, faAnglesUp, faHouse, faIdBadge, faRightFromBracket, faShoppingBag, faBox, faStore } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { LogoBlack } from '../../components/Logo/logo';
import { MenuHome} from '../../components/Menu';
import '../../main.css'
import './header.css'

const MENU_ITEMS_SELLER = [
    {
        icon: <FontAwesomeIcon icon={faHouse}/>,
        title:'Về trang chủ',
        to: '/',
        onclick: false
    },
    {
        icon: <FontAwesomeIcon icon={faIdBadge}/>,
        title:'Hồ sơ cửa hàng',
        to: '/seller/shop-profile',
        onclick: false
    },
    {
        icon: <FontAwesomeIcon icon={faRightFromBracket}/>,
        title:'Đăng xuất',
        onclick: true
    },
];

function HeaderSeller({children}) {
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        setCurrentUser(JSON.parse(localStorage.getItem(process.env.REACT_APP_KEY)));
    },[]);

    return ( 
        <div className='seller-container'>
            <div className="seller-header">
                <div className="seller-header-left">
                    <Link to="/seller"><LogoBlack/></Link>
                    <p className="seller-header-title">KÊNH BÁN HÀNG</p>
                </div>
                <div className="flex-center">
                    <MenuHome items={MENU_ITEMS_SELLER}>
                        <div className="seller-header-user">
                            <img src={`./img/${currentUser.avatar}`} alt="" className="seller-header-user-avatar"/>
                            <p className="seller-header-user-name">{currentUser.name}</p>
                        </div>
                    </MenuHome>
                </div>
                
            </div>
            <div className="seller-sidebar">
                <div className="seller-sidebar-list">
                    <div className="seller-sidebar-list-title">
                        <div className="flex-center">
                            <FontAwesomeIcon icon={faShoppingBag} className='seller-sidebar-list-icon'/>
                            <p className="seller-sidebar-list-name">Quản Lý Sản Phẩm</p>
                        </div>

                        <div className="seller-sidebar-list-icon-up-down">
                            <FontAwesomeIcon icon={faAnglesUp} className='seller-sidebar-icon-up'/>
                            <FontAwesomeIcon icon={faAnglesDown} className='eller-sidebar-icon-down hidden'/>
                        </div>
                    </div>
                    <ul className="seller-sidebar-list-ul">
                        <li>
                            <Link to='/seller/list-product' className="seller-sidebar-list-item">
                                Danh sách sản phẩm
                            </Link>
                        </li>
                        <li>
                            <Link to='/seller/select-category' className="seller-sidebar-list-item">
                                Thêm sản phẩm mới
                            </Link>
                        </li>
                        <li>
                            <Link to='/seller/product/trash' className="seller-sidebar-list-item">
                                Sản phẩm đã xóa
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="seller-sidebar-list">
                    <div className="seller-sidebar-list-title">
                        <div className="flex-center">
                            <FontAwesomeIcon icon={faBox} className='seller-sidebar-list-icon'/>
                            <p className="seller-sidebar-list-name">Quản Lý Đơn Hàng</p>
                        </div>

                        <div className="seller-sidebar-list-icon-up-down">
                            <FontAwesomeIcon icon={faAnglesUp} className='seller-sidebar-icon-up'/>
                            <FontAwesomeIcon icon={faAnglesDown} className='eller-sidebar-icon-down hidden'/>
                        </div>
                    </div>
                    <ul className="seller-sidebar-list-ul">
                        <li><a href="" className="seller-sidebar-list-item">Danh Sách Đơn Hàng</a></li>
                        <li><a href="" className="seller-sidebar-list-item">Đơn Hàng Đã Hủy</a></li>
                        <li><a href="" className="seller-sidebar-list-item">Đơn Trả Hàng</a></li>
                    </ul>
                </div>
                <div className="seller-sidebar-list">
                    <div className="seller-sidebar-list-title">
                        <div className="flex-center">
                            <FontAwesomeIcon icon={faStore} className='seller-sidebar-list-icon'/>
                            <p className="seller-sidebar-list-name">Quản Lý Cửa Hàng</p>
                        </div>
    
                        <div className="seller-sidebar-list-icon-up-down">
                            <FontAwesomeIcon icon={faAnglesUp} className='seller-sidebar-icon-up'/>
                            <FontAwesomeIcon icon={faAnglesDown} className='eller-sidebar-icon-down hidden'/>
                        </div>
                    </div>
                    <ul className="seller-sidebar-list-ul">
                        <li>
                            <Link to='/seller/shop/profile' className="seller-sidebar-list-item">
                                Hồ sơ của hàng
                            </Link>
                        </li>
                        <li><a href="" className="seller-sidebar-list-item">Danh mục cửa hàng</a></li>
                        <li><a href="" className="seller-sidebar-list-item">Đánh giá của hàng</a></li>
                    </ul>
                </div>
            </div>
            <div className="seller-main">
                {children}
            </div>
        </div>
    );
}

export default HeaderSeller;