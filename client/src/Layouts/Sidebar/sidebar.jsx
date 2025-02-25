import { faBoxArchive, faEye, faHeart, faLock, faMap, faPen, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './sidebar.css';


function SidebarUser({arrUser}) {

    return ( 
        <div className="col-2">
            <Link to="/account/profile" className="sidebar-info mb-24">
                <img src={`/img/${arrUser.avatar}`} alt=""/>
                <div className="profile-name">
                    <p className="strong">{arrUser.name}</p>
                    <p className="sidebar-name-edit">
                        <FontAwesomeIcon icon={faPen} className="mr-4"/>
                        Sửa tài khoản
                    </p>
                </div>
            </Link>

            <NavLink to="/account/profile" 
            className={({isActive}) => (isActive ? "sidebar-link sidebar-link-active" : "sidebar-link")}>
                <FontAwesomeIcon icon={faUser}/>
                <span>Hồ sơ của tôi</span>
            </NavLink>
            <NavLink to="/account/address" 
            className={({isActive}) => (isActive ? "sidebar-link sidebar-link-active" : "sidebar-link")}>
                <FontAwesomeIcon icon={faMap}/>
                <span>Địa chỉ giao hàng</span>
            </NavLink>
            <NavLink to="/account/change-password" 
            className={({isActive}) => (isActive ? "sidebar-link sidebar-link-active" : "sidebar-link")}>
                <FontAwesomeIcon icon={faLock}/>
                <span>Thay đổi mật khẩu</span>
            </NavLink>
            <NavLink to="/account/order" 
            className={({isActive}) => (isActive ? "sidebar-link sidebar-link-active" : "sidebar-link")}>
                <FontAwesomeIcon icon={faBoxArchive}/>
                <span>Đơn hàng của bạn</span>
            </NavLink>
            <NavLink to="/account/favorite" 
            className={({isActive}) => (isActive ? "sidebar-link sidebar-link-active" : "sidebar-link")}>
                <FontAwesomeIcon icon={faHeart}/>
                <span>Sản phẩm yêu thích</span>
            </NavLink>
            <NavLink to="/account/viewed" 
            className={({isActive}) => (isActive ? "sidebar-link sidebar-link-active" : "sidebar-link")}>
                <FontAwesomeIcon icon={faEye}/>
                <span>Sản phẩm đã xem</span>
            </NavLink>
        </div>
    );
}

export default SidebarUser;