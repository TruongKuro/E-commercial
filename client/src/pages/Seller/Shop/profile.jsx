import { useState, useEffect } from 'react';
import HeaderSeller from '../../../Layouts/Header/header-seller';
import './shop.css';

function ProfileShop() {

    const [currentUser, setCurrentUser] = useState({});
    useEffect(() => {
        setCurrentUser(JSON.parse(localStorage.getItem(process.env.REACT_APP_KEY)));
    },[]);

    const [formData, setFormData] = useState({nameShop:''});
    

    const changeInput=(event)=>{
        
    }
    return ( 
        <HeaderSeller>
            <div className="seller-main-container">
                <h1>HỒ SƠ CỬA HÀNG</h1>

                <div className="w-50 mtb-12">
                    <div className="card-input w-100">
                        <label htmlFor="" className="label-text-left">Tên shop</label>
                        <input type="text" className="input-text-right" onChange={e=>changeInput(e)}/>
                    </div>
                </div>

                <div className="seller-shop-cover-image">
                    <img src={`/img/${currentUser.coverImage}`} alt="" />
                    <div className="seller-shop-cover-image-edit">
                        <div className='seller-shop-cover-image-edit-wrapper'>
                            <span>Đổi ảnh bìa</span>
                            <input type="file" name="file" />
                        </div>
                    </div>
                    <div className="seller-shop-avatar">
                        <div className="seller-shop-avatar-image">
                            <img src={`/img/${currentUser.avatarShop}`} alt="" />
                        </div>
                        <div className="seller-shop-avatar-image-btn-edit">
                            <span>Đổi ảnh</span>
                            <input type="file" name="file" />
                        </div>
                    </div>
                </div>

                <button className="btn-main btn-lg mt-12">Lưu thay đổi</button>
                
            </div>
        </HeaderSeller>
    );
}

export default ProfileShop;