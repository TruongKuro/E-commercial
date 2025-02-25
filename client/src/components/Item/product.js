import '../../main.css'
import '../../pages/Product/home.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight, faComment, faList, faPlus, faUsers, faStar } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function Product() {
    return ( 
        <>
            <div className="w-20">
                <div className="product-item">
                    <Link to='/detail' className="product-item-link">
                        <div className="product-item-image">
                            <img src="http://www.richs.com.vn/images/cong-thuc/L%C3%A0m%20b%C3%A1nh/banh%20kem%20ya-ua%20trai%20cay/IMG_8974.jpg" alt="Product Image" className="product-item-img"/>
                        </div>
                        <div className="product-item-content">
                            <p className="product-item-name"> Bánh kem hoàng gia</p>
                            <div className="product-item-action">
                            <div className="product-item-star">
                                <FontAwesomeIcon icon={faStar} className="product-item-star-icon"/>
                                <FontAwesomeIcon icon={faStar} className="product-item-star-icon"/>
                                <FontAwesomeIcon icon={faStar} className="product-item-star-icon"/>
                                <FontAwesomeIcon icon={faStar} className="product-item-star-stroke"/>
                                <FontAwesomeIcon icon={faStar} className="product-item-star-stroke"/>
                            </div>
                            <span className="product-item-sold" >Đã bán 2</span>
                            </div>
                            <div className="product-item-card-price">
                                <p className="product-item-old-price">100.000 <span>đ</span></p>
                                <p className="product-item-new-price">60.000 <span>đ</span></p>
                            </div>
                                            
                            <div className="product-sale-off">
                                <span className="product-sale-off-percent">50%</span>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>                
        </>
     );
}

export default Product;