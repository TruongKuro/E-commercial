import './header.css'
import '../../main.css'
import {useState, useEffect} from 'react';
import {Link, NavLink, useNavigate} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox, faDolly, faPowerOff, faStore } from '@fortawesome/free-solid-svg-icons';

function HeaderAdmin({children}) {
    const navigate=useNavigate();

    const submitLogout=()=>{
        localStorage.clear();
        navigate('/');
    }

    const [currentUser, setCurrentUser] = useState({});
    useEffect(() => {
        setCurrentUser(JSON.parse(localStorage.getItem(process.env.REACT_APP_KEY)));
    },[]);

    return ( 
        <div className="admin-container">
            <div className="admin-header">
                <div className="admin-header-left">
                    <NavLink to='#' className="admin-header-left-click">Sản phẩm</NavLink>
                    <NavLink to='#'>Loại sản phẩm</NavLink>
                    <NavLink to='#'>Xuất xứ</NavLink>
                </div>
                <div className="admin-header-right">
                    <img src={`/img/${currentUser.avatar}`} alt="" />
                    <span>{currentUser.name}</span>
                </div>
            </div>
            <div className="admin-sidebar">
                <Link to="#" className="admin-sidebar-user">
                    <img src={`/img/${currentUser.avatar}`} alt="" />
                    <span>{currentUser.name}</span>
                </Link>
                <div className="admin-sidebar-menu">
                    <NavLink to='/admin/product-management'
                    className={({isActive}) => (isActive ? 'admin-sidebar-menu-link-active' : '')}>
                        <FontAwesomeIcon icon={faBox}/>
                        <span>Sản phẩm</span>
                    </NavLink>
                    <NavLink to='/admin/shop-management' 
                    className={({isActive}) => (isActive ? 'admin-sidebar-menu-link-active' : '')}>
                        <FontAwesomeIcon icon={faStore}/>
                        <span>Nhà bán hàng</span>
                    </NavLink>
                    <NavLink to='/admin/order-management'
                    className={({isActive}) => (isActive ? 'admin-sidebar-menu-link-active' : '')}>
                        <FontAwesomeIcon icon={faDolly}/>
                        <span>Đơn hàng</span>
                    </NavLink>
                    <button onClick={submitLogout}>
                        <FontAwesomeIcon icon={faPowerOff}/>
                        <span>Đăng xuất</span>
                    </button>
                </div>
            </div>
            <div className="admin-main">
                {children}
            </div>
        </div>
    );
}

export default HeaderAdmin;